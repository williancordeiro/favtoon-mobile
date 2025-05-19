import { View, Text } from 'react-native'
import React from 'react'
import SeriePage from '@/components/Pages/SeriePage'
import { Stack, useLocalSearchParams } from 'expo-router';

export default function Serie() {
  const { id, title } = useLocalSearchParams<{id: string, title: string}>();
  return (
    <View>
      <Stack.Screen options={{title: title}} />
      <SeriePage id={id} />
    </View>
  )
}