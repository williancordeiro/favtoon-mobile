import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Input from './Inputs/Input'
import UserName from './UserName';

const generateRandomUserId = (length: number) => {
  return Math.random().toString(36).substr(2, length);
}



export default function ProfilePage() {
  const [nameEdit, setNameEdit] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [idEdit, setIdEdit] = useState(false);
  const [idFocus, setIdFocus] = useState(false);

  const editName = () => {
    setNameEdit(true);
    setNameFocus(true);
  }

  const editId = () => {
    setIdEdit(true);
    setIdFocus(true);
  }

  return (
    <View style={styles.container}>
        <View>

        </View>
        <View style={styles.userDetail}>
            <View >
              <UserName placeholder='Username. . .' editableInp={nameEdit} handlePress={editName} focus={nameFocus} />
              <UserName placeholder='@' value={''} editableInp={idEdit} handlePress={editId} focus={idFocus} />
            </View>
            <View></View>
            <View></View>
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
    },
    icon: {

    },
    userDetail: {

    },
});