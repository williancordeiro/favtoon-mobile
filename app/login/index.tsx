import { View, Text, StatusBar, Button } from 'react-native'
import React from 'react'
import { useThemeContext } from '@/components/context/ThemeContext';
import { GlobalStyle } from '@/components/Style/GlobalStyle';
import LoginPage from '@/components/Pages/LoginPage';

export default function index() {
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <LoginPage />
    </View>
  )
}