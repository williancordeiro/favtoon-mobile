import { View, Text, ViewProps, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../Style/GlobalStyle';
import { useThemeContext } from '../context/ThemeContext';

export default function Header(props: ViewProps) {
  const { colors } = useThemeContext();
  const globalStyles = GlobalStyle(colors)
  return (
    <View {...props} style={[globalStyles.header]}>
      {props.children}
    </View>
  )
}