import { View, Text, TouchableOpacityProps, Touchable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function EditBtn(props: TouchableOpacityProps) {
    return (
        <TouchableOpacity
            {...props}
            style={[styles.editBtn, props.style]}
        >
            {props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    editBtn: {
        borderWidth: 3,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    }
});