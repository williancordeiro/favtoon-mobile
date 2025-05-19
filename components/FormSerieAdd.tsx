import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableNativeFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

export default function FormSerieAdd() {
    const [image, setImage] = useState(require('../assets/images/default-image.png'));
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('2025');
    const [genre, setGenre] = useState('');
    const [season, setSeason] = useState('');
    const [sinopse, setSinopse] = useState('');

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
            aspect: [4, 3],
            quality: 1,
        });

        if(!result.canceled) {
            setImage({ uri: result.assets[0].uri });
        }
    }

    return (
        <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.form}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView>                
                        <TouchableOpacity style={styles.uploadImage} onPress={selectImage}>
                            <Image source={image} />
                        </TouchableOpacity>
                        <TextInput 
                            style={styles.inputForm}
                            placeholder='Serie title. . .'
                            placeholderTextColor={'grey'}
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            keyboardType='numeric'
                            maxLength={4} 
                            style={styles.inputForm}
                            placeholder='2025'
                            value={year}
                            onChangeText={setYear}
                        />
                        <TextInput 
                            style={styles.inputForm}
                            placeholder='Genre. . .'
                            placeholderTextColor={'grey'}
                            value={genre}
                            onChangeText={setGenre}
                        />
                        <TextInput
                            keyboardType='numeric'
                            maxLength={2} 
                            style={styles.inputForm}
                            placeholder='Nº of seasons'
                            placeholderTextColor={'grey'}
                            value={season}
                            onChangeText={setSeason}
                        />
                        <TextInput 
                            style={styles.inputFormSinopse}
                            placeholder='Sinopse. . .'
                            placeholderTextColor={'grey'}
                            value={sinopse}
                            onChangeText={setSinopse}
                        />
                        <TouchableOpacity style={styles.buttonForm}>
                            <Text style={[{color: '#FFFFFF', fontSize: 21, fontWeight: 'bold'}]}>Salvar</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>            
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    form: {
        width: 350,
    },
    inputForm: {
        borderColor: '#007AFF',
        borderWidth: 3,
        borderRadius: 9,
        fontSize: 21,
        paddingVertical: 12,
        paddingStart: 9,
        marginBottom: 9,
    },
    inputFormSinopse: {
        borderColor: '#007AFF',
        borderWidth: 3,
        borderRadius: 9,
        fontSize: 21,
        paddingTop: 9,
        paddingBottom: 90,
        paddingStart: 9,
        marginBottom: 9,
    },
    buttonForm: {
        backgroundColor: '#007AFF',
        borderRadius: 9,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadImage: {
        backgroundColor: '#D1D1D6',
        borderColor: '#007AFF',
        borderWidth: 3,
        borderRadius: 9,
        marginTop: 32,
        marginBottom: 9, 
        paddingTop: 19,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',   
    },
    yearPicker: {
        borderRadius: 9,
        margin: 9,
        backgroundColor: '#007AFF',
        color: 'black'
    }
})