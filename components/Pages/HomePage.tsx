import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Search from '../Inputs/Search'
import AddBtn from '../Btns/AddBtn';
import { useFocusEffect, useRouter } from 'expo-router';
//import series from '@/data/series.json';
import SerieBtn from '../templates/SerieBtn';
//import { imageMap } from '@/data/ImageMap';
import axios from 'axios';
import { IP } from '@/data/adress';
import { useThemeContext } from '../context/ThemeContext';
import { GlobalStyle } from '../Style/GlobalStyle';


type Serie = {
    id: string | number;
    title: string;
    image: string;
}

export default function HomePage() {
    const router = useRouter();
    const [series, setSeries] = useState<Serie[]>([]);
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('');
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);

    const addSerie = () => {
        router.navigate('/(stack)/add');
    }

    const handlePress = (item: {id: string, title: string}) => {
        router.push({
            pathname: '/(stack)/[id]',
            params: { id: item.id ,title: item.title }
        })
    }

    /*useEffect(() => {
        const fetchSearch = async () => {
            try {
                const response = await fetch(`http://${IP}:3001/series?title_like=${query}`);
                const result = await response.json();
                setSeries(result);
            } catch (error) {
                console.log('Erro ao buscar serie:\n', error);
            }
        }

        const timeOut = setTimeout(() => {
            if (query)
                fetchSearch();
            else
                setSeries([]);
        }, 500);

        return () => clearTimeout(timeOut);
    }, [query]);*/

    useFocusEffect(
        useCallback(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get(`http://${IP}:3001/series`);
                setSeries(response.data);
            } catch (error) {
                console.log('Erro ao buscar series no JSON server\n', error);
                console.log(IP)
            } finally {
                setLoading(false);
            }
        };
        
            fetchSeries();
        }, [])
    )

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='#0000FF' />
            </View>
        )
    }

    if (!series) {
        return (
            <View style={[{flex: 1}]}>
                <Text>Not Found</Text>
            </View>
        )
    }

  return (
    <View style={[globalStyles.container, styles.container]}>
        <View style={styles.searchBar}>
            <Search style={[{}]} placeholder='Search. . .' placeholderTextColor='grey' value={query} onChangeText={setQuery}></Search>
        </View>
        <View style={styles.btn}>
            <AddBtn onPress={addSerie} />
        </View>
        <View style={styles.main}>
            <FlatList 
                data={series}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <SerieBtn 
                            image={{ uri: item.image }}
                            title={item.title}
                            onPress={() => handlePress({id: item.id.toString(), title: item.title})}
                        />
                    )
                }}                
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginBottom: 60,
    },
    searchBar: {

    },
    main: {

    },
    btn: {
        top: 530,
        left: 300,
        position: 'absolute',
        zIndex: 999
    }
});