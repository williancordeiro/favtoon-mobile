import { Redirect } from 'expo-router'
import React, { useEffect, useState } from 'react'
import UserService from '@/src/services/UserService'

export default function RedirectLink() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const service = UserService();
            const logged = await service.restoreSession();
            setIsLogged(logged);
            setIsLoading(false);
        };
        checkLogin();
    }, []);

    if (isLoading) return null;

    return <Redirect href={isLogged ? '/(tabs)/' : '/login/'} />
}