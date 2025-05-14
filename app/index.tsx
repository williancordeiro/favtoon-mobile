import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function Home() {
  return (
    <View>
        <StatusBar barStyle={'light-content'} />
        <Tabs.Screen options={{title: 'Home'}} />
    </View>
  )
}