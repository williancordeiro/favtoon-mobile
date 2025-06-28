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

    const getCurrentUser = () => {
        const user = pb.authStore.model;
        if (!user || !pb.authStore.isValid) {
            return null;
        }
        return user;
    }

    const updateUser = async (userId: string, data: Record<string, any>) => {
        try {
            const updatedUser = await pb.collection('users').update(userId, data);
            pb.authStore.save(pb.authStore.token, updatedUser);
            await AsyncStorage.setItem('user_model', JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const authData = await pb.collection('users').authWithPassword(email, password);
            await AsyncStorage.setItem('user_token', pb.authStore.token);
            await AsyncStorage.setItem('user_model', JSON.stringify(pb.authStore.model));
            return authData;
        } catch (error: any) {
            console.error('Error logging in:', error, error.message);
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

    const updateUserImage = async (userId: string, imageFile: string) => {
        try {
            const formData = new FormData();
            formData.append('avatar', {
                uri: imageFile,
                type: 'image/jpeg',
                name: 'avatar.jpg'
            } as any);

            const response = await pb.collection('users').update(userId, formData);

            pb.authStore.save(pb.authStore.token, response);
            await AsyncStorage.setItem('user_model', JSON.stringify(response));

            return response;
        } catch (error) {
            console.error('Error updating user image:', error);
            throw error;
        }
    }

    const updateUserBio = async (userId: string, bio: string) => {
        try {
            const response = await pb.collection('users').update(userId, { bio });
            return response;
        } catch (error) {
            console.error('Error updating user bio:', error);
            throw error;
        }
    }

    return {
        createUser,
        getCurrentUser,
        updateUser,
        login,
        logout,
        updateUserImage,
        updateUserBio,
        restoreSession
    }

}