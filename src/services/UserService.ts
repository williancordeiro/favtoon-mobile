import { pb } from './PocketBase'

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
        updateUserImage
    }

}