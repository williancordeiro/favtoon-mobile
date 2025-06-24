import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import ProfilePage from '@/components/Pages/ProfilePage'
import { GlobalStyle } from '@/components/Style/GlobalStyle';
import { useThemeContext } from '@/components/context/ThemeContext';

export default function Profile() {
  const { colors } = useThemeContext();
  const globalStyles = GlobalStyle(colors);

  return (
    <View style={[{...globalStyles.container, ...styles.container}]}>
      <Tabs.Screen options={{title: 'Profile'}} />
      <ProfilePage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  }
});