import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Search from '../Inputs/Search'
import AddBtn from '../Btns/AddBtn';
import { useFocusEffect, useRouter } from 'expo-router';
import SerieBtn from '../templates/SerieBtn';
import { useThemeContext } from '../context/ThemeContext';
import { GlobalStyle } from '../Style/GlobalStyle';
import SerieService from '@/src/services/SerieService';
import UserService from '@/src/services/UserService';


type Serie = {
    id: string | number;
    title: string;
    image: string | null;
}

export default function HomePage() {
    const router = useRouter();
    const [series, setSeries] = useState<Serie[]>([]);
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('');
    const { colors } = useThemeContext();
    const globalStyles = GlobalStyle(colors);
    const service = SerieService();
    const userService = UserService();

    const addSerie = () => {
        router.navigate('/(stack)/add');
    }

    const handlePress = (serie: Serie) => {
        router.push({
            pathname: `/(stack)/[id]`,
            params: { id: serie.id.toString(), title: serie.title }
        });
    };

    const fetchSeries = async () => {
        try {
            setLoading(true);
            
            const user = userService.getCurrentUser();
            if (!user) {
                alert('User not logged in. Please login again.');
                router.replace('/login');
                return;
            }
            
            const response = await service.getSerieByUserId(user.id);
            const seriesWithImages = await Promise.all(response.map(async (serie: any) => {
                try {
                    const image = await service.getSerieImage(serie);
                    return {
                        ...serie,
                        image: image
                    };
                } catch (imageError) {
                    return {
                        ...serie,
                        image: null
                    };
                }
            }));
            setSeries(seriesWithImages);
        } catch (error: any) {
            if (error.status === 401 || error.message?.includes('unauthorized')) {
                alert('Session expired. Please login again.');
                router.replace('/login');
            } else {
                alert(`Failed to load series: ${error.message || 'Unknown error'}`);
            }
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchSeries();
        }, [])
    );

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='#0000FF' />
            </View>
        )
    }

    if (!series) {
        return (
            <View style={[{flex: 1}]}>
                <Text>Not Found</Text>
            </View>
        )
    }

  return (
    <View style={[globalStyles.container, styles.container]}>
        <View style={styles.searchBar}>
            <Search style={[{}]} placeholder='Search. . .' placeholderTextColor='grey' value={query} onChangeText={setQuery}></Search>
        </View>
        <View style={styles.btn}>
            <AddBtn
                testID='add-serie-button'
                onPress={addSerie}
            />
        </View>
        <View style={styles.main}>
            <FlatList
                style={{marginBottom: '7%'}} 
                data={series}
                keyExtractor={(item) => item.id.toString()}                
                renderItem={({ item }) => {
                    return (
                        <SerieBtn 
                            image={item.image ? { uri: item.image } : require('@/assets/images/default-image.png')}
                            title={item.title}
                            onPress={() => handlePress(item)}
                        />
                    )
                }}                
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    searchBar: {

    },
    main: {
        marginBottom: 0,
    },
    btn: {
        top: 530,
        left: 300,
        position: 'absolute',
        zIndex: 999
    }
});