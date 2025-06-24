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

    const getSerieByUserId = async (userId: string) => {
        try {
            const series = await pb.collection('series').getFullList({
                filter: `userId = "${userId}"`,
                sort: '-created',
            });
            return series;
        } catch (error) {
            console.error('Error fetching series:', error);
            throw error;
        }
    }
}