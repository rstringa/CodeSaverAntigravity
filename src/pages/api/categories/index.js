import { getCategories, addCategory } from '../../../lib/data';

export const GET = async () => {
    const categories = await getCategories();
    return new Response(JSON.stringify(categories), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};

export const POST = async ({ request }) => {
    const body = await request.json();
    const newCategory = await addCategory(body);
    return new Response(JSON.stringify(newCategory), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
};
