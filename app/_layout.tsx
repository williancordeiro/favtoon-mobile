import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Header from '@/components/Header';
import Title from '@/components/Title';

export default function _layout() {
    return <Tabs 
        screenOptions={{
            header: () => (
                <Header>
                    <Title>Favtoon</Title>
                </Header>
            ),
            tabBarStyle: {
                borderTopWidth: 0,
            },
        }}
    />
}

const styles = StyleSheet.create({

});