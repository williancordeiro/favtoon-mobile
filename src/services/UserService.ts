import { pb } from './PocketBase';

export default function UserService() {
    
    const createUser = async (email: string, password: string, username: string) => {
        try {
            const user = await pb.collection('users').create({
                email,
                password,
                username
            });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const authData = await pb.collection('users').authWithPassword(email, password);
            return authData;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    const logout = async () => {
        try {
            await pb.authStore.clear();
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

}