'use client'

import { AuthProvider, useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {

  const auth: AuthProvider = useAuth()
  if (!auth || auth.isLoading) {
    return (
      <h1>You will be redirected shortly...</h1>
    )
  }

  if (!auth.user || !auth.user.isAuth) {
    redirect('/login')
  } else {
    redirect('/dashboard')
  }
}