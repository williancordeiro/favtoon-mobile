import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EditBtn from '../Btns/EditBtn'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useThemeContext } from '../context/ThemeContext';

type ProfileInputProps = {
    placeholder: string,
    value?: string,
    onChangeText: (text: string) => void,
    secureTextEntry?: boolean,
}


export default function ProfileInput({ placeholder, value, onChangeText, secureTextEntry }: ProfileInputProps) {
    const [campEdit, setCampEdit] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { colors } = useThemeContext();

    const focusTrue = () => {
        setIsFocused(true);
    }

    const blur = () => {
        setCampEdit(false);
        setIsFocused(false);
    }

    const handlePress = () => {
        setCampEdit(true);
    }

    return (
    <View style={[styles.container, {borderColor: colors.primary}]}>
        <Input 
            style={[styles.input, {color: isFocused ? colors.text : colors.opacity}]} 
            placeholderTextColor={'#D1D1D6'}
            editable={campEdit}
            onFocus={focusTrue}
            onBlur={blur}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        >

        </Input>
        <View style={[styles.divider, {borderColor: colors.primary}]}></View>
        <EditBtn 
            style={styles.btn}
            onPress={handlePress}
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