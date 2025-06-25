import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import ThemeContextProvider from '@/components/context/ThemeContext'
import Header from '@/components/templates/Header'
import Title from '@/components/templates/Title'

export default function _layout() {
    return (
        <ThemeContextProvider>
            <ActionSheetProvider>
                <Stack 
                    screenOptions={{
                        header: () => (
                            <Header>
                                <Title style={[{marginTop: 20}]}>Favtoon</Title>
                            </Header>
                        )
                    }}
                />
            </ActionSheetProvider>
        </ThemeContextProvider>
    )
}