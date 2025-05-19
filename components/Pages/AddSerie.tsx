import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Title from '../Title';
import FormSerieAdd from '../FormSerieAdd';

export default function AddSerie() {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Add Serie</Title>
      <View style={styles.formContainer}>
          <FormSerieAdd />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#007AFF',
    marginVertical: 25,
    fontSize: 36,
  },
  formContainer: {
  }
});