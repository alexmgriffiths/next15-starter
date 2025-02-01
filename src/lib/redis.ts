'use server'
import 'server-only';
import Redis from 'ioredis';
import { cookies } from 'next/headers';
import { decrypt, encrypt } from './session';
import { randomBytes } from 'crypto';

const redis = new Redis(parseInt(process.env.REDIS_PORT!), process.env.REDIS_HOST!)

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    const sessionToken = randomBytes(32).toString('hex');

    const redis = new Redis(parseInt(process.env.REDIS_PORT!), process.env.REDIS_HOST!)
    await redis.set(`session-${sessionToken}`, userId);
    const session = await encrypt({ token: sessionToken });
    (await cookies()).set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })
}

export async function getSessionId() {
    const cookieStore = await cookies();
    const sessionCookie = await decrypt(cookieStore.get('session')?.value);
    return sessionCookie?.token
}

export async function getUserIdFromSession() {

    const redis = new Redis(parseInt(process.env.REDIS_PORT!), process.env.REDIS_HOST!)
    const sessionId = await getSessionId()
    if (!sessionId) return null;
    try {
        return await redis.get(`session-${sessionId}`);
    } catch (error) {
        console.error(error);
        return null;
    }
}