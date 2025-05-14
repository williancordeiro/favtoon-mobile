import { View, Text, PressableProps, Pressable } from 'react-native'
import React from 'react'

export default function EditBtn(props: PressableProps) {
    return (
        <Pressable
            {...props}
        >
            {props.children}
        </Pressable>
    )
}