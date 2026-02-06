import { getSnippetById, updateSnippet, deleteSnippet } from '../../../lib/data';

export const GET = async ({ params }) => {
    const snippet = await getSnippetById(params.id);
    if (!snippet) return new Response(null, { status: 404 });
    return new Response(JSON.stringify(snippet), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};

export const PUT = async ({ params, request }) => {
    const body = await request.json();
    const updated = await updateSnippet(params.id, body);
    if (!updated) return new Response(null, { status: 404 });
    return new Response(JSON.stringify(updated), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};

export const DELETE = async ({ params }) => {
    await deleteSnippet(params.id);
    return new Response(null, { status: 204 });
};
