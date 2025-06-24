import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import ThemeContextProvider from '@/components/context/ThemeContext'

export default function _layout() {
    return (
        <ThemeContextProvider>
            <ActionSheetProvider>
                <Stack 
                    screenOptions={{
                        headerShown: false
                    }}
                />
            </ActionSheetProvider>
        </ThemeContextProvider>
    )
}