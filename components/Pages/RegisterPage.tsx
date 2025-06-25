import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import Title from '../templates/Title'
import { useThemeContext } from '../context/ThemeContext'
import { GlobalStyle } from '../Style/GlobalStyle';
import { router } from 'expo-router';
import FormRegister from '../templates/FormRegister';

export default function Register() {
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[{flex: 1}]}
    >

      <View style={[globalStyles.main]}>
          <Title style={[styles.title, {color: colors.primary}]}>Register</Title>
          
          <ScrollView>
                  
          <FormRegister />

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.text]}>Or</Text>
          </View>
          
          <TouchableOpacity
            onPress={() => router.push('/login')}
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
            <Text style={[{color: colors.primary, fontSize: 24, fontWeight: 'bold'}]}>Login</Text>
          </TouchableOpacity>
      
        </ScrollView>
      </View>
    
    </KeyboardAvoidingView>
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
        marginBottom: '50%',
    }
})