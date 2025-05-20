import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

export default function _layout() {
    return (
        <ActionSheetProvider
        >
            <Stack 
                screenOptions={{
                    headerShown: false
                }}
            />
        </ActionSheetProvider>
    )
}