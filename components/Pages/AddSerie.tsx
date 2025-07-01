import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Title from '../templates/Title';
import FormSerieAdd from '../templates/FormSerieAdd';
import { useThemeContext } from '../context/ThemeContext';
import { GlobalStyle } from '../Style/GlobalStyle';

export default function AddSerie() {
  const { colors } = useThemeContext();
  const globalStyles = GlobalStyle(colors);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={[styles.title, globalStyles.title]}>Add Serie</Title>
        <View style={styles.formContainer}>
            <FormSerieAdd />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto'
  },
  title: {
    marginTop: 120,
    marginBottom: 20,
    fontSize: 36,
  },
  formContainer: {
  }
});