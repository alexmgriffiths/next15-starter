export function httpError(status: number, error: string) {
    return new Response(JSON.stringify({ error }), { status, headers: { 'Content-Type': 'application/json' } });
}

export function httpSuccess(response: any) {
    return new Response(JSON.stringify(response), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
