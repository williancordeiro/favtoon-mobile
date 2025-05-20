import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import ProfilePage from '@/components/Pages/ProfilePage'

export default function Profile() {
  return (
    <View style={styles.container}>
      <Tabs.Screen options={{title: 'Profile'}} />
      <ProfilePage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  }
});