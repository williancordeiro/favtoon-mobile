import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native'
import React from 'react'

export default function AddBtn(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props} style={[styles.btn, props.style]}>
        <Text style={styles.txt}>+</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#0CCB1F',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        margin: 0,
        padding: 0,
    },
    txt: {
        color: '#FFFFFF',
        fontSize: 32,
        lineHeight: 32,
    }
});