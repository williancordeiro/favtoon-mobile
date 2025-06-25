import { View, Text, StyleSheet, TextInputProps, TouchableOpacityProps } from 'react-native'
import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EditBtn from '../Btns/EditBtn'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useThemeContext } from '../context/ThemeContext';

type InputProps = TextInputProps;
type BtnProps = TouchableOpacityProps;

type ProfileInputProps = {
    inputProps?: InputProps;
    btnProps?: BtnProps;
}

export default function ProfileInput({ inputProps, btnProps }: ProfileInputProps) {
    const { colors } = useThemeContext();


    return (
    <View style={[styles.container, {borderColor: colors.primary}]}>
        <Input 
            style={[styles.input, inputProps?.style]}
            {...inputProps}
        >

        </Input>
        <View style={[styles.divider, {borderColor: colors.primary}]}></View>
        <EditBtn 
            style={styles.btn}
            {...btnProps}
        >
            <FontAwesome name="pencil" size={26} style={[{color: colors.primary}]} />
        </EditBtn>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 3,
        borderRadius: 9,
        marginBottom: 9,
    },
    input: {
        borderWidth: 0,
        fontSize: 28,
        paddingStart: 9,
        paddingVertical: 12,
    },
    divider: {
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    btn: {
        borderWidth: 0,
        paddingHorizontal: 18,
    }
});