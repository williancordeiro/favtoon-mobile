import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableNativeFeedback, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios';
import { useRouter } from 'expo-router';
import { IP } from '@/data/adress';
import { useThemeContext } from '../context/ThemeContext';
import { GlobalStyle } from '../Style/GlobalStyle';

export default function FormSerieAdd() {
    const [image, setImage] = useState(require('../../assets/images/default-image.png'));
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('2025');
    const [genre, setGenre] = useState('');
    const [season, setSeason] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const router = useRouter();
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);
    const scrollViewRef = useRef<ScrollView>(null);

    //data base
    const handleSave = async () => {
        const newSerie = {
            title,
            year,
            genre,
            season,
            synopsis,
            image: image.uri || null
        };

        try {
            await axios.post(`http://${IP}:3001/series`, newSerie);
            alert('The series was saved successfully!');
            router.back()
        } catch (error) {
            console.log(error);
            alert('Erro ao salvar serieError! The series cannot be saved.!');
        }
    }

    const permission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, but we need permission for upload image!');
            return false
        }
        return true;
    }

    const selectImage = async () => {
        const permissionGranted = await permission();
        if (!permissionGranted) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if(!result.canceled) {
            setImage({ uri: result.assets[0].uri });
        }
    }

    return (
        <KeyboardAvoidingView 
            style={[{flex: 1,}]} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            keyboardVerticalOffset={80} 
        >
            <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.form}>               
                    <TouchableOpacity onPress={selectImage}>
                        <Image source={image} style={[styles.image, globalStyles.input]} />
                    </TouchableOpacity>
                    <TextInput 
                        style={[styles.inputForm, globalStyles.input]}
                        placeholder='Serie title. . .'
                        placeholderTextColor={colors.opacity}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        keyboardType='numeric'
                        maxLength={4} 
                        style={[styles.inputForm, globalStyles.input]}
                        placeholder='2025'
                        placeholderTextColor={colors.opacity}
                        value={year}
                        onChangeText={setYear}
                    />
                    <TextInput 
                        style={[styles.inputForm, globalStyles.input]}
                        placeholder='Genre. . .'
                        placeholderTextColor={colors.opacity}
                        value={genre}
                        onChangeText={setGenre}
                    />
                    <TextInput
                        keyboardType='numeric'
                        maxLength={2} 
                        style={[styles.inputForm, globalStyles.input]}
                        placeholder='Nº of seasons'
                        placeholderTextColor={colors.opacity}
                        value={season}
                        onChangeText={setSeason}
                    />
                    <TextInput 
                        style={[styles.inputFormSinopse, globalStyles.input]}
                        placeholder='Sinopse. . .'
                        placeholderTextColor={colors.opacity}
                        value={synopsis}
                        onChangeText={setSynopsis}
                        multiline={true}
                        numberOfLines={6}
                    />
                    <TouchableOpacity style={[styles.buttonForm, globalStyles.btn]} onPress={handleSave} >
                        <Text style={[{color: '#FFFFFF', fontSize: 21, fontWeight: 'bold'}]}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </TouchableNativeFeedback>
        </KeyboardAvoidingView>            
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 16,
    },
    form: {
        width: '100%',
        maxWidth: 350,
        height: '100%',
    },
    inputForm: {
        width: '100%',
        borderWidth: 3,
        borderRadius: 9,
        fontSize: 21,
        paddingVertical: 12,
        paddingStart: 9,
        marginBottom: 9,
    },
    inputFormSinopse: {
        width: '100%',
        borderWidth: 3,
        borderRadius: 9,
        fontSize: 21,
        paddingTop: 9,
        paddingBottom: 40,
        paddingStart: 9,
        marginBottom: 9,
    },
    buttonForm: {
        width: '100%',
        borderRadius: 9,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    /*uploadImage: {
        backgroundColor: '#D1D1D6',
        borderColor: '#007AFF',
        borderWidth: 3,
        borderRadius: 9,
        marginTop: 32,
        marginBottom: 9, 
        //paddingTop: 19,
        //paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',   
    },*/
    image: {
        borderWidth: 3,
        borderRadius: 9,

        width: 320,
        height: 160,
        marginBottom: 9,
    },
    yearPicker: {
        borderRadius: 9,
        margin: 9,
        backgroundColor: '#007AFF',
        color: 'black'
    }
})