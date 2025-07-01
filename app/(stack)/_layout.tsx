import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useThemeContext } from '@/components/context/ThemeContext'

export default function _layout() {
    const { colors } = useThemeContext()
    return <Stack 
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerTintColor: colors.title
        }}
    />
}