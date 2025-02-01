import { redirect } from 'next/navigation';
import React, { useState, useContext, createContext, useEffect } from 'react';

const defaultAuth: AuthProvider = {
    user: null,
    errors: [],
    isLoading: true
}
const authContext: any = createContext<AuthProvider>(defaultAuth)

export function ProvideAuth({ children }: any) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = (): AuthProvider => {
    return useContext(authContext)
}

function useProvideAuth(): AuthProvider {
    const [user, setUser] = useState<any | null>(null); // TODO: Type this
    const [errors, setErrors] = useState<any | null>([]); // TODO: Type this
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        authCheck()
    }, [])

    async function authCheck() {
        setIsLoading(true)
        const authRequest = await fetch(`/api/users/me`)
        const authResponse = await authRequest.json()
        if (!authResponse.isAuth) {
            redirect('/login')
        }
        setUser(authResponse)
        setIsLoading(false)
    }

    return { user, errors, isLoading }
}

export type AuthProvider = {
    user: any | null,
    errors: any | null,
    isLoading: boolean
}