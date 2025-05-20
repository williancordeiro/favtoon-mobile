import { Image, ImageProps, StyleSheet } from 'react-native'
import React from 'react'

export default function UserIcon(props: ImageProps) {
    return (
        <Image
            {...props}
            style={styles.icon}
        />
    )
}

const styles = StyleSheet.create({
    icon: {
        marginVertical: 50,
        width: 130,
        height: 130,
        borderWidth: 3,
        borderRadius: 70,
        borderColor: '#007AFF'
    }
});