import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { GlobalStyle } from '../Style/GlobalStyle';
import UserService from '@/src/services/UserService';
import { router } from 'expo-router';

export default function FormRegister() {
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    //const [username, setUsername] = useState('');
    const service = UserService();

    const handleRegister = () => {
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            alert('Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const randomUsername = Math.floor(Math.random() * 1000000);
        const username = `@${name.toLowerCase()}${randomUsername.toString().padStart(6, '0')}`;

       service.createUser(email, password, confirmPassword, name, username)
           .then(() => {
               //alert('User registered successfully');
               router.push('/login');
           })
           .catch((error: any) => {
               //alert('Error registering user: ' + JSON.stringify(error?.data || error));
               alert('Error registering user')
               console.error('Error registering user:', error);
           });
    }

  return (
    <View style={[globalStyles.main, {marginTop: '20%'}]}>
        <TextInput
            style={[
                globalStyles.input, styles.input]}
            placeholder='name. . .'
            placeholderTextColor={colors.opacity}
            value={name}
            onChangeText={setName}
        />
        <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder='email. . .'
            placeholderTextColor={colors.opacity}
            value={email}
            onChangeText={setEmail}
        />

        <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder='password. . .'
            placeholderTextColor={colors.opacity}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
        />

        <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder='confirm pass. . .'
            placeholderTextColor={colors.opacity}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
            testID='register-button'
            style={[globalStyles.btn, styles.btn]}
            onPress={handleRegister}
        >
            <Text style={[{color: colors.withe, fontSize: 24, fontWeight: 'bold'}]}>Register</Text>
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