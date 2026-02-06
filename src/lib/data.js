import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SNIPPETS_FILE = path.join(DATA_DIR, 'snippets.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

// Helper to ensure files exist
async function ensureFiles() {
    try {
        await fs.access(SNIPPETS_FILE);
    } catch {
        await fs.writeFile(SNIPPETS_FILE, JSON.stringify([]));
    }
    try {
        await fs.access(CATEGORIES_FILE);
    } catch {
        await fs.writeFile(CATEGORIES_FILE, JSON.stringify([{ id: 'general', name: 'General', parentId: null }]));
    }
}

export async function getSnippets() {
    await ensureFiles();
    const data = await fs.readFile(SNIPPETS_FILE, 'utf-8');
    return JSON.parse(data);
}

export async function saveSnippets(snippets) {
    await fs.writeFile(SNIPPETS_FILE, JSON.stringify(snippets, null, 2));
}

export async function getSnippetById(id) {
    const snippets = await getSnippets();
    return snippets.find(s => s.id === id);
}

export async function addSnippet(snippet) {
    const snippets = await getSnippets();
    const newSnippet = {
        ...snippet,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
    };
    snippets.push(newSnippet);
    await saveSnippets(snippets);
    return newSnippet;
}

export async function updateSnippet(id, updatedData) {
    const snippets = await getSnippets();
    const index = snippets.findIndex(s => s.id === id);
    if (index !== -1) {
        snippets[index] = { ...snippets[index], ...updatedData, updatedAt: new Date().toISOString() };
        await saveSnippets(snippets);
        return snippets[index];
    }
    return null;
}

export async function deleteSnippet(id) {
    const snippets = await getSnippets();
    const filtered = snippets.filter(s => s.id !== id);
    await saveSnippets(filtered);
}

export async function getCategories() {
    await ensureFiles();
    const data = await fs.readFile(CATEGORIES_FILE, 'utf-8');
    return JSON.parse(data);
}

export async function saveCategories(categories) {
    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
}

export async function addCategory(category) {
    const categories = await getCategories();
    const newCategory = {
        ...category,
        id: crypto.randomUUID()
    };
    categories.push(newCategory);
    await saveCategories(categories);
    return newCategory;
}

export async function updateCategory(id, updatedData) {
    const categories = await getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
        categories[index] = { ...categories[index], ...updatedData };
        await saveCategories(categories);
        return categories[index];
    }
    return null;
}

export async function deleteCategory(id) {
    const categories = await getCategories();
    if (id === 'general') return;

    // Find all IDs to delete (parent + its children)
    const idsToDelete = [id];
    const children = categories.filter(c => c.parentId === id);
    children.forEach(child => idsToDelete.push(child.id));

    // Filter categories
    const newCategories = categories.filter(c => !idsToDelete.includes(c.id));
    await saveCategories(newCategories);

    // Reassign snippets from all deleted categories to General
    const snippets = await getSnippets();
    const updatedSnippets = snippets.map(s => {
        if (idsToDelete.includes(s.categoryId)) {
            return { ...s, categoryId: 'general' };
        }
        return s;
    });
    await saveSnippets(updatedSnippets);
}
