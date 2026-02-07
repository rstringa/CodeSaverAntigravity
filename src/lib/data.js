import { supabase } from './supabase';

// Map database fields to application fields if they differ
const mapSnippet = (s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    code: s.code,
    categoryId: s.category_id,
    createdAt: s.created_at,
    updatedAt: s.updated_at
});

const mapCategory = (c) => ({
    id: c.id,
    name: c.name,
    parentId: c.parent_id,
    createdAt: c.created_at
});

export async function getSnippets() {
    const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching snippets:', error);
        return [];
    }
    return data.map(mapSnippet);
}

export async function getSnippetById(id) {
    const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching snippet:', error);
        return null;
    }
    return mapSnippet(data);
}

export async function addSnippet(snippet) {
    const { data, error } = await supabase
        .from('snippets')
        .insert([{
            title: snippet.title,
            description: snippet.description,
            code: snippet.code,
            category_id: snippet.categoryId || null
        }])
        .select()
        .single();

    if (error) {
        console.error('Error adding snippet:', error);
        throw error;
    }
    return mapSnippet(data);
}

export async function updateSnippet(id, updatedData) {
    const payload = {
        updated_at: new Date().toISOString()
    };
    if (updatedData.title !== undefined) payload.title = updatedData.title;
    if (updatedData.description !== undefined) payload.description = updatedData.description;
    if (updatedData.code !== undefined) payload.code = updatedData.code;
    if (updatedData.categoryId !== undefined) payload.category_id = updatedData.categoryId;

    const { data, error } = await supabase
        .from('snippets')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating snippet:', error);
        return null;
    }
    return mapSnippet(data);
}

export async function deleteSnippet(id) {
    const { error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting snippet:', error);
        throw error;
    }
}

export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
    return data.map(mapCategory);
}

export async function addCategory(category) {
    const { data, error } = await supabase
        .from('categories')
        .insert([{
            name: category.name,
            parent_id: category.parentId || null
        }])
        .select()
        .single();

    if (error) {
        console.error('Error adding category:', error.message, error.details, error.hint);
        throw error;
    }
    return mapCategory(data);
}

export async function updateCategory(id, updatedData) {
    const { data, error } = await supabase
        .from('categories')
        .update({
            name: updatedData.name
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating category:', error);
        return null;
    }
    return mapCategory(data);
}

export async function deleteCategory(id) {
    // Note: The SQL schema handles "ON DELETE CASCADE" for subcategories
    // and "ON DELETE SET NULL" (or default general) for snippets.
    // However, if we want to mimic the exact behavior of moving snippets to General:

    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}
