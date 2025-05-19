import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import Search from '../Inputs/Search'
import AddBtn from '../Btns/AddBtn';
import { useRouter } from 'expo-router';
import series from '@/data/series.json';
import SerieBtn from '../SerieBtn';

const imageMap: Record<string, any> = {
    serie1: require('../../public/images/serie1.png'),
    serie2: require('../../public/images/serie2.png'),
    serie3: require('../../public/images/serie3.png'),
    serie4: require('../../public/images/serie4.png'),
    serie5: require('../../public/images/serie5.png'),
    serie6: require('../../public/images/serie6.png'),
}

export default function HomePage() {
    const router = useRouter();

    const addSerie = () => {
        router.navigate('/(stack)/add');
    }

    const handlePress = (item: {id: string, title: string}) => {
        router.push({
            pathname: '/(stack)/[id]',
            params: { id: item.id ,title: item.title }
        })
    }

  return (
    <View style={styles.container}>
        <View style={styles.searchBar}>
            <Search placeholder='Search. . .' placeholderTextColor='grey'></Search>
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
                            image={imageMap[item.image]}
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
        fontFamily: 'Roboto',
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