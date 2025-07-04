import { View, Text, Image, ImageSourcePropType, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useActionSheet } from '@expo/react-native-action-sheet'
import axios from 'axios';
import { IP } from '@/data/adress';
import { router } from 'expo-router';
import { useThemeContext } from '../context/ThemeContext';
import { GlobalStyle } from '../Style/GlobalStyle';
import SerieService from '@/src/services/SerieService';
import UserService from '@/src/services/UserService';

type SerieDetailsProps = {
    image: ImageSourcePropType;
    title: string,
    year: number,
    genre: string,
    season: number,
    synopsis: string,
    id: string | number,

}

export default function SerieDetails({ image, title, year, genre, season, synopsis, id }: SerieDetailsProps) {
  const { showActionSheetWithOptions } = useActionSheet();

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newYear, setNewYear] = useState(year.toString());
  const [newGenre, setNewGenre] = useState(genre);
  const [newSeason, setNewSeason] = useState(season.toString());
  const [newSynopsis, setNewSynopsis] = useState(synopsis);
  const { colors } = useThemeContext();
  const globalStyles = GlobalStyle(colors);
  const service = SerieService();
  const userService = UserService();

  const editSerie = async () => {
    try {
      const currentUser = userService.getCurrentUser();
      if (!currentUser) {
        Alert.alert('Error', 'User not authenticated. Please login again.');
        router.replace('/login');
        return;
      }

      await service.updateSerie(String(id), {
        title: newTitle,
        year: Number(newYear),
        genre: newGenre,
        seasons: Number(newSeason),
        synopsis: newSynopsis,
      });

      Alert.alert('Success!', 'The series was saved successfully!');
      setEditing(false);
      router.back();
    } catch (error) {
      console.error('Error editing series:\n', error);
      Alert.alert('Error', 'The series was not saved');
    }
  }

  const deleteSerie = async (id: string | number) => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete the series?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await service.deleteSerie(String(id));
              Alert.alert('Deleted', 'Series removed successfully.');
              router.back();
            } catch (error) {
              console.log('Error deleting series:\n', error);
              Alert.alert('Error', 'Error deleting the series.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  const onPress = () => {
    const options = ['Edit', 'Cancel', 'Delete'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex?: number) => {
      switch (selectedIndex) {
        case 0:
          setEditing(true);
          break;
        
        case cancelButtonIndex:
          break;

        case destructiveButtonIndex: 
          deleteSerie(id);
          break;
      }
    })
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
                  style={[{flex: 1,}]} 
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                  keyboardVerticalOffset={80} 
      >
        <ScrollView>
          <Image style={styles.image} source={image} />
          <View style={styles.main}>
            <View style={styles.detailGroup}>
              <Text style={[globalStyles.title, styles.title]}>Title:</Text>
              <TextInput style={styles.text} value={newTitle} onChangeText={setNewTitle} editable={editing} />
            </View>
            <View style={styles.detailGroup}>
              <Text style={[globalStyles.title, styles.title]}>Year:</Text>
              <TextInput style={styles.text} value={newYear} onChangeText={setNewYear} editable={editing} />
            </View>
            <View style={styles.detailGroup}>
              <Text style={[globalStyles.title, styles.title]}>Genre:</Text>
              <TextInput style={styles.text} value={newGenre} onChangeText={setNewGenre} editable={editing} />
            </View>
            <View style={styles.detailGroup}>
              <Text style={[globalStyles.title, styles.title]}>N° of Seasons:</Text>
              <TextInput style={styles.text} value={newSeason} onChangeText={setNewSeason} editable={editing} />
            </View>
            <View style={styles.detailGroup}>
              <Text style={[globalStyles.title, styles.title]} >Synopsis:</Text>
              <TextInput style={styles.textArea} multiline={true} numberOfLines={14} value={newSynopsis} onChangeText={setNewSynopsis} editable={editing} />
            </View>
          </View>
          <View style={styles.btn}>
            {editing ? (
              <TouchableOpacity style={styles.btnOptions} onPress={editSerie} >
                <Text style={styles.btnTxt}>Save</Text>
              </TouchableOpacity>  
            ) : (
            <TouchableOpacity style={styles.btnOptions} onPress={onPress} >
              <Text style={styles.btnTxt}>Options</Text>
            </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      
    },
    main: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'left',
    },
    detailGroup: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 412,
      height: 200,
    },
    title: {
      marginStart: 9,
      fontSize: 18,
      textAlign: 'left',
    },
    text: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#FFFFFF',
      marginStart: 9,
      marginBottom: 9,
      paddingVertical: 9,
      paddingStart: 9,
      borderColor: '#007AFF',
      borderBottomWidth: 2,
      width: '90%',
      fontSize: 21,
    },
    textArea: {
      width: '90%',
      padding: 6,
      marginHorizontal: 9,
      borderWidth: 2,
      borderRadius: 9,
      textAlign: 'justify',
      alignItems: 'center',
      borderColor: '#007AFF',
      marginBottom: 12,
      fontSize: 21,
    },
    btn: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 50,
    },
    btnOptions: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#007AFF',
      borderRadius: 9,
      width: '80%',
      paddingVertical: 9,
    },
    btnTxt: {
      color: '#FFFFFF',
      fontSize: 21,
      fontWeight: 'bold',
    }
});