import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeContext } from '../context/ThemeContext';

export default function TextArea(props: TextInputProps) {
    const { colors } = useThemeContext();
    return (
        <TextInput
            {...props}
            style={[styles.textArea, {borderColor: colors.primary}]}
        >
            {props.children}
        </TextInput>
    )
}

const styles = StyleSheet.create({
    textArea: {
        borderColor: '#007AFF',
        justifyContent: 'space-between',
        fontSize: 26,
        borderRadius: 9,
        borderWidth: 3,
        paddingBottom: 142,
    }
});