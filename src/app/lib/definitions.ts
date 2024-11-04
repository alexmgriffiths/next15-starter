import { z } from 'zod'

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'A valid email is required' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        }).trim()
})

export const SignupFormSchema = z.object({
    email: z.string().email({ message: 'A valid email is required' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        }).trim(),
    firstName: z.string().min(2, { message: 'Please enter a longer first-name' }).max(15, { message: "Please enter a shorter first name" }),
    lastName: z.string().min(2, { message: 'Please enter a longer last-name' }).max(15, { message: "Please enter a shorter last name" }),
})

export type SessionPayload = | {
    token?: string
} | undefined

export type SignupFormState =
    | {
        errors?: {
            email?: string[]
            password?: string[],
            firstName?: string[],
            lastName?: string[],
        }
        message?: string
    }
    | undefined

export type LoginFormState = | {
    error?: string
} | undefined