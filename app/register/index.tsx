import { View, Text, StatusBar, Button } from 'react-native'
import React from 'react'
import { useThemeContext } from '@/components/context/ThemeContext';
import { GlobalStyle } from '@/components/Style/GlobalStyle';
import RegisterPage from '@/components/Pages/RegisterPage';

export default function Register() {
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <RegisterPage />
    </View>
  )
}