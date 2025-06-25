import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { GlobalStyle } from '../Style/GlobalStyle';

export default function FormLogin() {
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);

  return (
    <View style={[globalStyles.main, {marginTop: '20%'}]}>
        <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder='email. . .'
            placeholderTextColor={colors.opacity}
        />

        <TextInput
            style={[globalStyles.input, styles.input]}
            placeholder='password. . .'
            placeholderTextColor={colors.opacity}
            secureTextEntry={true}
        />

        <TouchableOpacity
            style={[globalStyles.btn, styles.btn]}
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