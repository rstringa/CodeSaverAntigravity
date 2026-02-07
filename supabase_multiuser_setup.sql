-- 1. Añadir user_id a las tablas existentes
ALTER TABLE categories ADD COLUMN user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();
ALTER TABLE snippets ADD COLUMN user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();

-- 2. Actualizar las políticas de RLS para que sean por usuario
-- Primero eliminamos las públicas antiguas
DROP POLICY IF EXISTS "Allow public read" ON categories;
DROP POLICY IF EXISTS "Allow public insert" ON categories;
DROP POLICY IF EXISTS "Allow public update" ON categories;
DROP POLICY IF EXISTS "Allow public delete" ON categories;

DROP POLICY IF EXISTS "Allow public read" ON snippets;
DROP POLICY IF EXISTS "Allow public insert" ON snippets;
DROP POLICY IF EXISTS "Allow public update" ON snippets;
DROP POLICY IF EXISTS "Allow public delete" ON snippets;

-- 3. Crear nuevas políticas basadas en auth.uid()
-- Categorías
CREATE POLICY "Users can see their own categories" ON categories 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own categories" ON categories 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories" ON categories 
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories" ON categories 
    FOR DELETE USING (auth.uid() = user_id);

-- Snippets
CREATE POLICY "Users can see their own snippets" ON snippets 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own snippets" ON snippets 
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own snippets" ON snippets 
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own snippets" ON snippets 
    FOR DELETE USING (auth.uid() = user_id);

-- Nota: Para que el default auth.uid() funcione en el INSERT, 
-- asegúrate de que el cliente de Supabase esté enviando el token del usuario.
