import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SerieDetails from '../templates/SerieDetails'
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
//import serie from '@/data/series.json';
//import { imageMap } from '@/data/ImageMap';
import axios from 'axios';
import { IP } from '@/data/adress';

type Serie = {
    id: string | number;
    title: string;
    year: number;
    genre: string;
    season: number;
    synopsis: string;
    image: string;
}

type SeriePageProps = {
    id: string
}

export default function SeriePage({ id }: SeriePageProps) {
    //const serie = serie.find((serie) => serie.id.toString() === id);
    const [serie, setSeries] = useState<Serie>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get(`http://${IP}:3001/series/${id}`);
                setSeries(response.data);
            } catch (error) {
                console.log(`Erro ao buscar serie selecionada pelo id ${id} \n`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchSeries();
    }, [id]);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='#0000FF' />
            </View>
        )
    }

    if (!serie) {
        return (
            <View style={[{flex: 1}]}>
                <Text>Not Found</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SerieDetails
                image={{ uri: serie.image }}
                title={serie.title}
                year={serie.year}
                genre={serie.genre}
                season={serie.season}
                synopsis={serie.synopsis}
                id={serie.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});