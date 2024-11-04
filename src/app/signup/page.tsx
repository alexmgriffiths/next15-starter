import { Metadata } from "next"
import Link from "next/link"

import { Fingerprint } from "lucide-react"
import UserAuthFlow from "@/components/user-auth-flow/user-auth-flow"
import UserAuthRegisterFlow from "@/components/user-auth-register-flow/user-auth-register-flow"

export const metadata: Metadata = {
    title: "Create an account",
    description: "Create an account",
}

export default function SignUpPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center" style={{ margin: '0 auto' }}>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <Fingerprint className="mx-auto h-6 w-6" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Lets create your account
                    </p>
                </div>
                <UserAuthRegisterFlow />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        href="/register"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Don&apos;t have an account? Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}