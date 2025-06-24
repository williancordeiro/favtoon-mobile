import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import AddSerie from '@/components/Pages/AddSerie'
import { useThemeContext } from '@/components/context/ThemeContext'
import { GlobalStyle } from '@/components/Style/GlobalStyle'

export default function SerieAdd() {
  const { colors } = useThemeContext();
  const globalStyles = GlobalStyle(colors);

  return (
    <View style={[globalStyles.container]}>
        <StatusBar barStyle={'light-content'} />
        <Stack.Screen options={{title: 'Add Serie'}} />
        <AddSerie />
    </View>
  )
}