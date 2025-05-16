import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native'
import React from 'react'

export default function TextArea(props: TextInputProps) {
    return (
        <TextInput
            {...props}
            style={styles.textArea}
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