import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Search from '../Inputs/Search'
import AddBtn from '../Btns/AddBtn';
import { useRouter } from 'expo-router';

export default function HomePage() {
    const router = useRouter();

    const addSerie = () => {
        router.navigate('/(stack)/add');
    }

  return (
    <View style={styles.container}>
        <View style={styles.searchBar}>
            <Search placeholder='Search. . .' placeholderTextColor='grey'></Search>
        </View>
        <View style={styles.main}>
            
            <View style={styles.btn}>
                <AddBtn onPress={addSerie} />
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    searchBar: {

    },
    main: {

    },
    btn: {
        top: 550,
        left: 300,
    }
});