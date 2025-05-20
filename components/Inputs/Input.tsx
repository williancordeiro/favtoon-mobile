import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native'
import React from 'react'

export default function Input(props: TextInputProps) {
    return (
        <TextInput
            {...props}
            style={[styles.input, props.style]}
        >

        </TextInput>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 3,
        borderColor: '#007AFF',
        flex: 1,
    }
});