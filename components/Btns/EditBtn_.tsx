import { View, Text, PressableProps, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function EditBtn(props: PressableProps) {
    return (
        <Pressable
            {...props}
            style={(state) => [
                styles.editBtn,
                typeof props.style === 'function' ? props.style(state) : props.style,
            ]}
        >
            {props.children}
        </Pressable>
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