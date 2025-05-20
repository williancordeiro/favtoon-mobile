import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native'
import React from 'react'

type SerieBtnProps = {
    title: string;
    image: ImageSourcePropType;
    onPress: () => void
};

export default function SerieBtn({title, image, onPress }: SerieBtnProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={image} style={styles.image}/>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        //borderWidth: 2,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        borderWidth: 1,
        borderColor: '#007AFF',
        borderTopEndRadius: 9,
        borderTopStartRadius: 9,
        width: 346,
        height: 160,
    },
    title: {
        backgroundColor: '#007AFF',
        color: '#FFFFFF',
        paddingVertical: 12,
        paddingStart: 9,
        fontSize: 16,
        borderBottomStartRadius: 9,
        borderBottomEndRadius: 9,
    }
});