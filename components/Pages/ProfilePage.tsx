import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableNativeFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import ProfileInput from '../templates/ProfileInput';
import TextArea from '../Inputs/TextArea';
import UserIcon from '../templates/UserIcon';
import Title from '../templates/Title';
import * as ImagePicker from 'expo-image-picker'

const generateRandomUserId = (length: number) => {
  return Math.random().toString(36).substr(2, length);
}

const id = generateRandomUserId(8);

export default function ProfilePage() {
  const [icon, setIcon] = useState(require('@/assets/images/default-icon.png'))
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('@'+ id)
  const [userPassword, setUserPass] = useState('')

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
              setIcon({ uri: result.assets[0].uri });
          }
      }
  //console.log(userName +'\n'+ userId +'\n'+ userPassword)
  
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <Title style={[{color: '#007AFF', textAlign: 'center', marginVertical: 20, fontSize: 34}]}>Profile</Title>
            <View style={styles.icon}>
              <UserIcon source={icon} />
              <TouchableOpacity style={styles.addImage} onPress={selectImage}>
                <Text style={styles.addImageTxt}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userDetail}>
                <View >
                  <ProfileInput placeholder='Username. . .' value={userName} onChangeText={setUserName} />
                  <ProfileInput placeholder='@' value={userId} onChangeText={setUserId} />
                  <ProfileInput placeholder='• • • • • •' value={userPassword} onChangeText={setUserPass} secureTextEntry={true} />
                  <TextArea placeholder='Bibliographi. . .' placeholderTextColor={'grey'} multiline={true} numberOfLines={4} />
                  <TouchableOpacity style={styles.exitButton}>
                    <Text style={[{fontSize: 28, color: '#FFFFFF', fontWeight: 'bold'}]}>Exit</Text>
                  </TouchableOpacity>
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
    icon: {
      alignItems: 'center',
      position: 'relative',
    },
    userDetail: {

    },
    addImage: {
      backgroundColor: '#0CCB1F',
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
      backgroundColor: 'red',
      marginTop: 12,
      borderRadius: 9,
      paddingVertical: 12,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    }
});