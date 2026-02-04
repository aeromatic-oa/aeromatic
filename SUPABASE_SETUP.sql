-- Crear tabla de contactos
CREATE TABLE IF NOT EXISTS contactos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  proyecto TEXT NOT NULL,
  correo TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Crear índice para búsquedas por correo
CREATE INDEX IF NOT EXISTS idx_contactos_correo ON contactos(correo);

-- Crear índice para búsquedas por fecha
CREATE INDEX IF NOT EXISTS idx_contactos_created_at ON contactos(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE contactos ENABLE ROW LEVEL SECURITY;

-- Crear política para INSERT (permitir inserciones públicas)
CREATE POLICY "Allow public inserts" ON contactos
  FOR INSERT
  WITH CHECK (true);

-- Crear política para SELECT (solo para usuarios autenticados - opcional)
-- CREATE POLICY "Allow authenticated users to read" ON contactos
--   FOR SELECT
--   USING (auth.role() = 'authenticated');

-- Crear política para DELETE (solo admin)
-- CREATE POLICY "Allow admin to delete" ON contactos
--   FOR DELETE
--   USING (auth.role() = 'admin');
