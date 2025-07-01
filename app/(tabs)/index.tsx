import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import HomePage from '@/components/Pages/HomePage'
import { useThemeContext } from '@/components/context/ThemeContext'
import { GlobalStyle } from '@/components/Style/GlobalStyle'

export default function Home() {
  const { colors } = useThemeContext();
  const globalStyles = GlobalStyle(colors);

  return (
    <View style={[globalStyles.container]}>
        <StatusBar barStyle={'light-content'} />
        <Tabs.Screen options={{title: 'Home'}} />
        <HomePage />
    </View>
  )
}