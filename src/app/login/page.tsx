import { Metadata } from "next"
import Link from "next/link"

import { Fingerprint } from "lucide-react"
import UserAuthFlow from "@/components/user-auth-flow/user-auth-flow"

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
}

export default function LoginPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center" style={{ margin: '0 auto' }}>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <Fingerprint className="mx-auto h-6 w-6" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email to sign in to your account
                    </p>
                </div>
                <UserAuthFlow />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        href="/signup"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Don&apos;t have an account? Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}