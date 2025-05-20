import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Title from '../templates/Title';
import FormSerieAdd from '../templates/FormSerieAdd';

export default function AddSerie() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.title}>Add Serie</Title>
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
    color: '#007AFF',
    marginTop: 120,
    marginBottom: 20,
    fontSize: 36,
  },
  formContainer: {
  }
});