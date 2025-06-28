import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TouchableNativeFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router';
import { useThemeContext } from '../context/ThemeContext';
import { GlobalStyle } from '../Style/GlobalStyle';
import SerieService from '@/src/services/SerieService';
import UserService from '@/src/services/UserService';

export default function FormSerieAdd() {
    const [image, setImage] = useState(require('../../assets/images/default-image.png'));
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('2025');
    const [genre, setGenre] = useState('');
    const [seasons, setSeason] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const router = useRouter();
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);
    const serive = SerieService();
    const userService = UserService();

    const handleSave = async () => {
        if (!title || !year || !genre || !seasons) {
            alert('Title, year, genre, and seasons are required fields.');
            return;
        }

        if (isNaN(Number(year)) || year.length !== 4) {
            alert('Year must be a 4-digit number.');
            return;
        }

        const user = userService.getCurrentUser();
        if (!user) {
            alert('User not logged in');
            return;
        }

        const serieData = {
            title,
            year: Number(year),
            genre,
            seasons: Number(seasons),
            synopsis,
            user_id: user.id
        };

        try {
            let response;
            
            if (image.uri && image.uri !== require('../../assets/images/default-image.png')) {
                const formData = new FormData();
                
                formData.append('title', serieData.title);
                formData.append('year', serieData.year.toString());
                formData.append('genre', serieData.genre);
                formData.append('seasons', serieData.seasons.toString());
                formData.append('synopsis', serieData.synopsis);
                formData.append('user_id', serieData.user_id);
                
                formData.append('image', {
                    uri: image.uri,
                    type: 'image/jpeg',
                    name: 'serie-image.jpg'
                } as any);
                
                response = await serive.createSerie(formData);
            } else {
                response = await serive.createSerie(serieData);
            }
            
            if (response) {
                alert('The series was saved successfully!');
                router.back();
            } else {
                alert('Error! The series cannot be saved.');
            }
        } catch (error: any) {
            console.error('Error creating series:', error);
            alert('Error! The series cannot be saved.');
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
                        value={seasons}
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
    image: {
        borderWidth: 3,
        borderRadius: 9,
        width: 320,
        height: 160,
        marginBottom: 9,
    }
})