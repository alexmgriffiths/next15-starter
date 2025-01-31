import 'server-only'

import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { getUserIdFromSession } from './redis';

const prisma = new PrismaClient();

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);
    if (!session?.token) redirect('/login');

    const userId = await getUserIdFromSession();
    if (!userId) redirect('/logout')
    const userData = await prisma.user.findFirst({
        where: { id: userId }, select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            profilePicture: true,
            phoneNumber: true,
            isPhoneVerified: true,
            isEmailVerified: true,
            createdAt: true,
            updatedAt: true,
            lastLogin: true,
            dateOfBirth: true,
            role: true
        }
    })

    return { isAuth: true, ...userData }
});