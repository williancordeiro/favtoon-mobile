import { pb }  from './PocketBase';

export default function SerieService() {

    const createSerie = async (data: any) => {
        try {
            const serie = await pb.collection('series').create(data);
            return serie;
        } catch (error) {
            console.error('Error creating series:', error);
            throw error;
        }
    }

    const getSerieById = async (id: string) => {
        try {
            if (!id) {
                throw new Error('Series ID is required');
            }
            
            const serie = await pb.collection('series').getOne(id);
            return serie;
        } catch (error: any) {
            if (error.status === 404) {
                throw new Error('Series not found');
            } else if (error.status === 401) {
                throw new Error('User not authorized');
            } else if (error.status === 403) {
                throw new Error('Access denied. Check series permissions.');
            } else {
                throw new Error(error.message || 'Error fetching series');
            }
        }
    }

    const getSerieByIdWithFilter = async (id: string, userId: string) => {
        try {
            if (!id) {
                throw new Error('Series ID is required');
            }
            
            const series = await pb.collection('series').getFullList({
                filter: `id = "${id}" && user_id = "${userId}"`,
            });
            
            if (series.length === 0) {
                throw new Error('Series not found or does not belong to user');
            }
            
            return series[0];
        } catch (error: any) {
            throw error;
        }
    }

    const getSerieByUserId = async (userId: string) => {
        try {
            const series = await pb.collection('series').getFullList({
                filter: `user_id = "${userId}"`,
                sort: '-created',
            });
            return series;
        } catch (error) {
            console.error('Error fetching series:', error);
            throw error;
        }
    }

    const getSerieImage = async (serie: any) => {
        try {
            if (!serie || !serie.image) {
                return null;
            }
            
            const image = await pb.files.getURL(serie, serie.image);
            return image;
        } catch (error: any) {
            return null;
        }
    }

    const updateSerie = async (id: string, data: any) => {
        try {
            const updatedSerie = await pb.collection('series').update(id, data);
            return updatedSerie;
        } catch (error) {
            console.error('Error updating series:', error);
            throw error;
        }
    }

    const deleteSerie = async (id: string) => {
        try {
            await pb.collection('series').delete(id);
        } catch (error) {
            console.error('Error deleting series:', error);
            throw error;
        }
    }

    return {
        createSerie,
        getSerieById,
        getSerieByIdWithFilter,
        getSerieByUserId,
        getSerieImage,
        updateSerie,
        deleteSerie
    };
}