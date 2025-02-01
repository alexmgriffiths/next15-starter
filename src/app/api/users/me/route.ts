import { getUserSession } from "@/lib/dal";
import { httpError, httpSuccess } from "@/lib/helpers";

export async function GET(request: any) {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
        return httpError(401, 'Unauthorized')
    }

    const cookies = Object.fromEntries(cookieHeader.split("; ").map((c: string) => c.split("=")));
    const sessionToken = cookies["session"];

    if (!sessionToken) {
        return httpError(401, 'Unauthorized')
    }

    try {
        const userData = await getUserSession()
        return httpSuccess({ ...userData })
    } catch (err) {
        return httpError(401, 'Unauthorized')
    }
}