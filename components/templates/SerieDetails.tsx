import { View, Text, Image, ImageSourcePropType, StyleSheet, TextInput } from 'react-native'
import React from 'react'

type SerieDetailsProps = {
    image: ImageSourcePropType;
    title: string,
    year: number,
    genre: string,
    season: number,
    synopsis: string,

}

export default function SerieDetails({ image, title, year, genre, season, synopsis }: SerieDetailsProps) {
  return (
    <View>
      <Image source={image} />
      <View>
        <Text>Title:</Text>
        <Text>{ title }</Text>
        <Text>Year:</Text>
        <Text>{ year }</Text>
        <Text>Genre:</Text>
        <Text>{ genre }</Text>
        <Text>N° of Seasons:</Text>
        <Text>{ season }</Text>
        <Text>Synopsis:</Text>
        <TextInput multiline={true} numberOfLines={6} value={synopsis} editable={false} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {

    },
    main: {

    },
    image: {

    },
    title: {

    },
    text: {

    }
});