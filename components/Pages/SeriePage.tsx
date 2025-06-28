import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SerieDetails from '../templates/SerieDetails'
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import SerieService from '@/src/services/SerieService';
import UserService from '@/src/services/UserService';

type Serie = {
    id: string | number;
    title: string;
    year: number;
    genre: string;
    seasons: number;
    synopsis: string;
    image: string | null;
}

type SeriePageProps = {
    id: string
}

export default function SeriePage({ id }: SeriePageProps) {
    const [serie, setSeries] = useState<Serie>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const service = SerieService();
    const userService = UserService();

    const fetchSeries = async () => {
        if (!id) {
            setError('Series ID not provided');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            
            const currentUser = userService.getCurrentUser();
            if (!currentUser) {
                setError('User not authenticated. Please login again.');
                setLoading(false);
                return;
            }
            
            let response;
            try {
                response = await service.getSerieByIdWithFilter(id, currentUser.id);
            } catch (filterError) {
                response = await service.getSerieById(id);
            }
            
            if (response) {
                const image = await service.getSerieImage(response);
                setSeries({
                    id: response.id,
                    title: response.title,
                    year: response.year,
                    genre: response.genre,
                    seasons: response.seasons,
                    synopsis: response.synopsis,
                    image: image
                });
            } else {
                setError(`Series with ID ${id} not found`);
            }
        } catch (error: any) {
            if (error.status === 403) {
                setError('Access denied. Check if you have permission to access this series.');
            } else if (error.status === 401) {
                setError('Session expired. Please login again.');
            } else {
                setError(`Error loading series: ${error.message || 'Unknown error'}`);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const restoreSession = async () => {
            try {
                await userService.restoreSession();
            } catch (error) {
                // Handle error silently
            }
        };
        
        restoreSession();
    }, []);

    useEffect(() => {
        fetchSeries();
    }, [id]);

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size='large' color='#0000FF' />
                <Text style={styles.loadingText}>Loading series...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <TouchableOpacity 
                    style={styles.retryButton} 
                    onPress={() => {
                        setLoading(true);
                        fetchSeries();
                    }}
                >
                    <Text style={styles.retryButtonText}>Try again</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (!serie) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.errorText}>Series not found</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SerieDetails
                image={serie.image ? { uri: serie.image } : require('@/assets/images/default-image.png')}
                title={serie.title}
                year={serie.year}
                genre={serie.genre}
                season={serie.seasons}
                synopsis={serie.synopsis}
                id={serie.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666'
    },
    errorText: {
        fontSize: 16,
        color: '#d32f2f',
        textAlign: 'center',
        marginBottom: 20
    },
    retryButton: {
        backgroundColor: '#0066cc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});