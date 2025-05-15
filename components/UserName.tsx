import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Input from './Inputs/Input'
import EditBtn from './Btns/EditBtn'
import FontAwesome from '@expo/vector-icons/FontAwesome';


type UserNameProps = {
    placeholder: string,
    value?: string,
    editableInp: boolean,
    handlePress: () => void,
    focus: boolean,
}

export default function UserName({placeholder, value, editableInp, focus, handlePress}: UserNameProps) {
    return (
    <View style={styles.container}>
        <Input 
            style={styles.input} 
            placeholder={placeholder} 
            placeholderTextColor={'#D1D1D6'} 
            value={value} 
            editable={editableInp}
            autoFocus={focus}
        >

        </Input>
        <View style={styles.divider}></View>
        <EditBtn 
            style={styles.btn}
            onPress={handlePress}
        >
            <FontAwesome name="pencil" size={26} color="#007AFF" />
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
        borderColor: '#007AFF',
        marginBottom: 9,
    },
    input: {
        borderWidth: 0,
        fontSize: 26,
        paddingStart: 9,
        paddingVertical: 9,
        color: '#D1D1D6'
    },
    divider: {
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    btn: {
        borderWidth: 0,
        paddingHorizontal: 15,
    }
});