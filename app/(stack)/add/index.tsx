import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import AddSerie from '@/components/Pages/AddSerie'

export default function SerieAdd() {
  return (
    <View>
        <StatusBar barStyle={'light-content'} />
        <Stack.Screen options={{title: 'Add Serie'}} />
        <AddSerie />
    </View>
  )
}