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
                    <Title style={[{marginTop: 20,}]}>Favtoon</Title>
                </Header>
            ),
            tabBarStyle: {
                backgroundColor: '#007AFF'
            },
            tabBarInactiveTintColor: '#000000',
            tabBarActiveTintColor: '#FFFFFF',
            tabBarLabelStyle: {
                fontSize: 20,
                bottom: 10,
            },
            tabBarIcon: () => null
        }}
    />
}

const styles = StyleSheet.create({

});