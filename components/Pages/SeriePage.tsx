import { View, Text } from 'react-native'
import React from 'react'
import SerieDetails from '../templates/SerieDetails'
import serie from '@/data/series.json';
import { useLocalSearchParams } from 'expo-router';

type SeriePageProps = {
    id: string
}

export default function SeriePage({ id }: SeriePageProps) {
    const item = serie.find((item) => item.id.toString() === id);

    if (!item) {
        return (
            <View>
                <Text>Não Encontrado</Text>
            </View>
        )
    }

    return (
        <View>
            <SerieDetails image={0} title={item.title} year={item.year} genre={item.genre} season={item['n season']} synopsis={item.synopsis} />
        </View>
    )
}