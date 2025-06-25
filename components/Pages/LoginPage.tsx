import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Title from '../templates/Title'
import { useThemeContext } from '../context/ThemeContext'
import { GlobalStyle } from '../Style/GlobalStyle';
import FormLogin from '../templates/FormLogin';
import { router } from 'expo-router';

export default function LoginPage() {
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);

  return (
    <View style={[globalStyles.main]}>
      <Title style={[styles.title, {color: colors.primary}]}>Login</Title>

      <FormLogin />
      <Text style={[styles.text]}>Or</Text>
      <TouchableOpacity
        onPress={() => router.push('/register')}
        style={[
            styles.btn,
            globalStyles.btn,
            {
                backgroundColor: colors.secondary,
                borderColor: colors.primary,
                borderWidth: 3
            }
        ]}
      >
        <Text style={[{color: colors.primary, fontSize: 24, fontWeight: 'bold'}]}>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

 const styles = StyleSheet.create({
    title: {
        fontSize: 36,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 26,
        marginVertical: 20
    },
    btn: {
        borderRadius: 9,
        width: 300,
        height: 50,
    }
})