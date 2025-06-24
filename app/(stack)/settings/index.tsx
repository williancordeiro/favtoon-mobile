import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import SettingPage from '@/components/Pages/SettingPage'

export default function Setting() {
  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <Stack.Screen options={{ title: 'Settings' }} />
      <SettingPage />
    </View>
  )
}