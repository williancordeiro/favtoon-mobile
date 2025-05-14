import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'

export default function Title(props: TextProps) {
  return (
    <Text {...props} style={styles.title}>
        {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Roboto',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    }
});