'use client'

import { AuthProvider, useAuth } from "@/hooks/use-auth"

export default function Dashboard() {

    const auth: AuthProvider = useAuth()
    if (!auth || auth.isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <code>
                {JSON.stringify(auth)}
            </code>
        </>
    )
}