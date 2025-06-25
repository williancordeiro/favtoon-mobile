import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { GlobalStyle } from '../Style/GlobalStyle';
import UserService from '@/src/services/UserService';
import { router } from 'expo-router';

export default function FormLogin() {
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const service = UserService();

    const handleLogin = () => {
        if (email === '' || password === '') {
            alert('Please fill in all fields');
            return;
        }

        service.login(email, password)
            .then(() => {
                alert('Login successful');
                router.push('/(tabs)/');
            })
            .catch((error: any) => {
                alert('Error logging in');
                console.error('Error logging in:', error);
            });
    }

  return (
    <View style={[globalStyles.main, {marginTop: '20%'}]}>
        <TextInput
            style={[globalStyles.input, styles.input]}
            value={email}
            onChangeText={setEmail}
            placeholder='email. . .'
            placeholderTextColor={colors.opacity}
        />

        <TextInput
            style={[globalStyles.input, styles.input]}
            value={password}
            onChangeText={setPassword}
            placeholder='password. . .'
            placeholderTextColor={colors.opacity}
            secureTextEntry={true}
        />

        <TouchableOpacity
            style={[globalStyles.btn, styles.btn]}
            onPress={handleLogin}
        >
            <Text style={[{color: colors.withe, fontSize: 24, fontWeight: 'bold'}]}>Login</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 3,
        borderRadius: 9,
        width: 300,
        height: 50,
        fontSize: 24,
        paddingStart: 9,
        marginTop: 15
    },
    btn: {
        borderRadius: 9,
        width: 300,
        height: 50,
        marginTop: 15
    }
})