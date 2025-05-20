import { View, Text, ViewProps, StyleSheet } from 'react-native'
import React from 'react'

export default function Header(props: ViewProps) {
  return (
    <View {...props} style={styles.header}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }
});