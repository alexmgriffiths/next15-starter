'use server'
import { SignupFormState, SignupFormSchema, LoginFormState, LoginFormSchema } from "@/lib/definitions"
import { PrismaClient } from "@prisma/client"
import { hash, compare } from 'bcryptjs'
import { redirect } from "next/navigation"
import { createSession } from "@/lib/redis"

const prisma = new PrismaClient()

export async function login(state: LoginFormState, formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!validatedFields.success) {
        return {
            error: 'Please enter a valid username and password'
        }
    }
    const { email, password } = validatedFields.data;

    const user = await prisma.user.findFirst({ where: { email }, select: { id: true, password: true } });
    if (!user || !user.id || !user.password || !await compare(password, user?.password)) {
        return {
            error: 'Incorrect username or password'
        }
    }

    await createSession(user.id);
    redirect('/dashboard');
}

// State gets passed to the frontend
export async function signup(state: SignupFormState, formData: FormData) {

    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { email, password, firstName, lastName } = validatedFields.data;
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            isEmailVerified: false,
            isPhoneVerified: false,
            role: 'USER',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        select: {
            id: true
        }
    })

    await createSession(newUser.id);
    redirect('/dashboard');
}