import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'

const protectedRoutes = ['/dashboard', '/logout']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (isProtectedRoute && !session?.token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (isPublicRoute && session?.token && !req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    if (req.nextUrl.pathname.startsWith('/logout')) {
        const cookieStore = await cookies();
        cookieStore.delete('session')
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    return NextResponse.next()
}

// Don't run on the below routes
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}