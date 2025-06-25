import { pb } from './PocketBase'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserService() {

    const createUser = async (email: string, password: string, passwordConfirm: string, name: string, username: string) => {
        try {
            const user = await pb.collection('users').create({
                email,
                password,
                passwordConfirm,
                name,
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
            await AsyncStorage.setItem('user_token', pb.authStore.token);
            await AsyncStorage.setItem('user_model', JSON.stringify(pb.authStore.model));
            return authData;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    const restoreSession = async () => {
        const token = await AsyncStorage.getItem('user_token');
        const model = await AsyncStorage.getItem('user_model');
        if (token && model) {
            pb.authStore.save(token, JSON.parse(model));
            return true;
        }
        return false;
    }

    const logout = async () => {
        try {
            await pb.authStore.clear();
            await AsyncStorage.removeItem('user_token');
            await AsyncStorage.removeItem('user_model');
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

    const updateUserImage = async (userId: string, imageFile: File) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await pb.collection('users').update(userId, formData);
            return response;
        } catch (error) {
            console.error('Error updating user image:', error);
            throw error;
        }
    }

    return {
        createUser,
        login,
        logout,
        updateUserImage,
        restoreSession
    }

}