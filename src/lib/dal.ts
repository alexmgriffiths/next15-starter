import 'server-only'

import { PrismaClient } from '@prisma/client';
import { getUserIdFromSession } from './redis';

const prisma = new PrismaClient();

export const getUserSession = async () => {
    const userId = await getUserIdFromSession();
    if (!userId) throw new Error("No session");
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
}