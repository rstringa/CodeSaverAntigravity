-- 1. Crear tabla de categorías
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Insertar categoría general por defecto (esto es opcional, pero útil)
INSERT INTO categories (id, name) VALUES ('00000000-0000-0000-0000-000000000000', 'General') ON CONFLICT (id) DO NOTHING;

-- 3. Crear tabla de snippets
CREATE TABLE snippets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    code TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL DEFAULT '00000000-0000-0000-0000-000000000000',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Habilitar RLS (Row Level Security) - IMPORTANTE: Para este ejemplo desactivaremos RLS 
-- o crearemos políticas públicas para simplificar, pero en producción deberías protegerlo.
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE snippets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON categories FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON categories FOR DELETE USING (true);

CREATE POLICY "Allow public read" ON snippets FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON snippets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON snippets FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON snippets FOR DELETE USING (true);
