export const POST = async ({ request, cookies }) => {
    const { session } = await request.json();

    if (!session) {
        return new Response(JSON.stringify({ message: 'No session provided' }), { status: 400 });
    }

    const { access_token, refresh_token } = session;

    cookies.set('sb-access-token', access_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    });

    cookies.set('sb-refresh-token', refresh_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    });

    return new Response(JSON.stringify({ message: 'Session synchronized' }), { status: 200 });
};

export const DELETE = async ({ cookies }) => {
    cookies.delete('sb-access-token', { path: '/' });
    cookies.delete('sb-refresh-token', { path: '/' });
    return new Response(JSON.stringify({ message: 'Logged out' }), { status: 200 });
};
