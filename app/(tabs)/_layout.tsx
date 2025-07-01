import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Header from '@/components/templates/Header';
import Title from '@/components/templates/Title';
import { useThemeContext } from '@/components/context/ThemeContext';

export default function _layout() {
    const { colors } = useThemeContext();
    
    return <Tabs 
        screenOptions={{
            header: () => (
                <Header>
                    <Title style={[{marginTop: 20,}]}>Favtoon</Title>                    
                </Header>
            ),
            tabBarStyle: {
                backgroundColor: colors.primary,
            },
            tabBarInactiveTintColor: colors.tabBarActiveTintColor,
            tabBarActiveTintColor: colors.tabBarInactiveTintColor,
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