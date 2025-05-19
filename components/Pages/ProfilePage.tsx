import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ProfileInput from '../ProfileInput';
import TextArea from '../Inputs/TextArea';
import UserIcon from '../UserIcon';
import Title from '../Title';

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
      <ScrollView>
        <Title style={[{color: '#007AFF', textAlign: 'center', marginVertical: 20, fontSize: 34}]}>Profile</Title>
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
              <TouchableOpacity style={styles.exitButton}>
                <Text style={[{fontSize: 28, color: '#FFFFFF', fontWeight: 'bold'}]}>Exit</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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