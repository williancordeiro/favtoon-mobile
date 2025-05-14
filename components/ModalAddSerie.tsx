import { View, Text, ModalProps, Modal, StyleSheet } from 'react-native'
import React from 'react'

export default function ModalAddSerie(props: ModalProps) {
  return (
    <Modal 
        {...props} 
        style={styles.modal} 
        animationType="slide"
        transparent={true}
    >

    </Modal>
  )
}

const styles = StyleSheet.create({
    modal: {

    }
});