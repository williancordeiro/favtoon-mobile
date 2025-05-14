import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import HomePage from '@/components/HomePage'


export default function Home() {
  return (
    <View>
        <StatusBar barStyle={'light-content'} />
        <Tabs.Screen options={{title: 'Home'}} />
        <HomePage />
    </View>
  )
}