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
                paddingVertical: 0,
            },
            tabBarLabelStyle: {
                fontSize: 20,
                paddingVertical: 0,
                marginTop: 0,
            },
            tabBarIconStyle: {
                margin: 0,
                padding: 0,
            },
            tabBarIcon: () => null
        }}
    />
}

const styles = StyleSheet.create({

});