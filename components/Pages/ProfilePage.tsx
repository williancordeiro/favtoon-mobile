import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableNativeFeedback, Keyboard, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileInput from '../templates/ProfileInput';
import TextArea from '../Inputs/TextArea';
import UserIcon from '../templates/UserIcon';
import Title from '../templates/Title';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeContext } from '../context/ThemeContext';
import { GlobalStyle } from '../Style/GlobalStyle';
import { router } from 'expo-router';
import UserService from '@/src/services/UserService';
import { pb } from '@/src/services/PocketBase';
import Input from '../Inputs/Input';

const generateRandomUserId = (length: number) => {
  return Math.random().toString(36).substr(2, length);
}

const id = generateRandomUserId(8);

export default function ProfilePage() {
  const [icon, setIcon] = useState<number | { uri: string }>(require('@/assets/images/default-icon.png'));
  const [name, setName] = useState('');
  const [username, setUsername] = useState('@'+ id);
  //const [password, setPassword] = useState('');
  const service = UserService();

  //Input from ProfileInput.tsx
  const [campEdit, setCampEdit] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const focus = () => {
    setIsFocused(true);
  }

  /*const blur = () => {
    setCampEdit(false);
    setIsFocused(false);
  }*/

  const handleEdit = () => {
    setCampEdit(true);
  }

  const { colors } = useThemeContext();
  const globalStyles = GlobalStyle(colors);

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
          aspect: [1, 1],
          quality: 1,
      });

      if(!result.canceled) {
        const imageUri = result.assets[0].uri;
        setIcon({ uri: imageUri });

        try {
          const user = service.getCurrentUser();
          await service.updateUserImage(user.id, imageUri);
          alert('Image updated successfully!');
          fetchUser(); // <-- Atualiza o estado com o novo avatar
        } catch (error) {
          alert('Failed to update image');
          console.error('Error updating image:', error);
        }
      }
  }

  const SettingsPage = () => {
    router.push('/settings');
  }
  
  const fetchUser = async () => {
    const user = service.getCurrentUser?.();
    if (user) {
      setName(user.name || '');
      setUsername(user.username || '@' + id);
      if (user.avatar) {
        const avatarUri = pb.files.getURL(user, user.avatar);
        setIcon({ uri: avatarUri });
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);  
  
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>

      <View style={styles.container}>

        <TouchableOpacity 
          style={[{
            marginTop: '19%',
            alignItems: 'flex-end'
          }]}
          onPress={SettingsPage}
        >

          <Ionicons name="settings-outline" size={32} style={[{color: colors.opacity}]}/>

        </TouchableOpacity>

        <Title style={[{color: colors.primary, textAlign: 'center', fontSize: 34}]}>Profile</Title>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

          <ScrollView>

            <View style={styles.icon}>

              <UserIcon source={icon} />

              <TouchableOpacity style={[styles.addImage, {backgroundColor: colors.success}]} onPress={selectImage}>
                <Text style={styles.addImageTxt}>+</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.userDetail}>

                <View >
                  <ProfileInput 
                    inputProps={{
                      placeholder: 'Username. . .',
                      value: name,
                      onChangeText: setName,
                      editable: campEdit,
                      onFocus: focus,
                      //onBlur: blur
                    }} 
                    btnProps={{
                      onPress: handleEdit,
                    }}
                  />

                  <ProfileInput 
                    inputProps={{
                      placeholder: '@',
                      value: username,
                      onChangeText: setUsername,
                      editable: campEdit,
                      onFocus: focus,                      
                      //onBlur: blur
                    }}
                    btnProps={{
                      onPress: handleEdit,
                    }}
                  />

                  <ProfileInput 
                    inputProps={{
                      placeholder: '• • • • • •',
                      placeholderTextColor: colors.opacity,
                      editable: false,
                    }}
                  />

                  <TextInput 
                    style={[globalStyles.input, styles.input]}
                    placeholder='Bio. . .'
                    placeholderTextColor={colors.opacity}
                    multiline={true}
                    numberOfLines={4}
                  />

                  {campEdit ? (
                    <TouchableOpacity
                      style={[styles.exitButton, {backgroundColor: colors.success}]}
                      //onPress={handleSave}
                    >
                      <Text style={{fontSize: 28, color: '#FFF', fontWeight: 'bold'}}>Salvar</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.exitButton, {backgroundColor: colors.danger}]}
                      //onPress={/* função de logout */}
                    >
                      <Text style={[{fontSize: 28, color: '#FFFFFF', fontWeight: 'bold'}]}>Exit</Text>
                    </TouchableOpacity>
                  )}
                  
                </View>
            
            </View>
            
            <View>
            
            </View>
          
          </ScrollView>
        
        </KeyboardAvoidingView>
      
      </View>
    
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Roboto'
    },
    input: {
      borderWidth: 3,
      borderRadius: 9,
      fontSize: 28,
      paddingStart: 9,
      paddingVertical: 12,
    },
    icon: {
      alignItems: 'center',
      position: 'relative',
    },
    userDetail: {

    },
    addImage: {
      position: 'relative',
      bottom: 70,
      left: 30,
      padding: 5,
      paddingHorizontal: 9,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    addImageTxt: {
      color: '#FFFFFF',
      fontSize: 18,
      lineHeight: 18,
    },
    exitButton: {
      marginTop: 12,
      marginBottom: '60%',
      borderRadius: 9,
      paddingVertical: 12,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    }
});