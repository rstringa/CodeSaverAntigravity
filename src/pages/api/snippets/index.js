import { getSnippets, addSnippet } from '../../../lib/data';

export const GET = async () => {
    const snippets = await getSnippets();
    return new Response(JSON.stringify(snippets), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};

export const POST = async ({ request }) => {
    const body = await request.json();
    const newSnippet = await addSnippet(body);
    return new Response(JSON.stringify(newSnippet), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
};
