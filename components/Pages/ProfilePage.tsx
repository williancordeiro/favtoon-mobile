import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProfileInput from '../ProfileInput';
import TextArea from '../Inputs/TextArea';
import UserIcon from '../UserIcon';

const generateRandomUserId = (length: number) => {
  return Math.random().toString(36).substr(2, length);
}

const id = generateRandomUserId(8);

export default function ProfilePage() {
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('@'+ id)
  const [userPassword, setUserPass] = useState('')
  //console.log(userName +'\n'+ userId +'\n'+ userPassword)
  
  return (
    <View style={styles.container}>
        <View style={styles.icon}>
          <UserIcon source={require('@/assets/images/default-icon.png')} />
          <TouchableOpacity style={styles.addImage}>
            <Text style={styles.addImageTxt}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userDetail}>
            <View >
              <ProfileInput placeholder='Username. . .' value={userName} onChangeText={setUserName} />
              <ProfileInput placeholder='@' value={userId} onChangeText={setUserId} />
              <ProfileInput placeholder='• • • • • •' value={userPassword} onChangeText={setUserPass} secureTextEntry={true} />
              <TextArea placeholder='Bibliographi. . .' />
            </View>
        </View>
        <View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
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
    }
});