import { updateCategory, deleteCategory } from '../../../lib/data';

export const PUT = async ({ params, request }) => {
    const body = await request.json();
    const updated = await updateCategory(params.id, body);
    if (!updated) return new Response(null, { status: 404 });
    return new Response(JSON.stringify(updated), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};

export const DELETE = async ({ params }) => {
    await deleteCategory(params.id);
    return new Response(null, { status: 204 });
};
