import { Image, ImageProps, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeContext } from '../context/ThemeContext';

export default function UserIcon(props: ImageProps) {
    const { colors } = useThemeContext();

    return (
        <Image
            {...props}
            style={[styles.icon, { borderColor: colors.primary }]}
        />
    )
}

const styles = StyleSheet.create({
    icon: {
        marginVertical: 50,
        width: 160,
        height: 160,
        borderWidth: 3,
        borderRadius: '50%',
    }
});