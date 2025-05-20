import { View, Text, TextInputProps, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function Search(props: TextInputProps) {
  return (
    <TextInput {...props} style={styles.search}></TextInput>
  )
}

const styles = StyleSheet.create({
    search: {
        borderColor: 'grey',
        borderBottomWidth: 2,
        paddingLeft: 5,
        paddingBottom: 1,
    }
});