-- RutaLink Database Schema
-- Execute this script in Supabase SQL Editor

-- ============================================
-- TABLES
-- ============================================

-- Tabla: users
-- Representa los perfiles de los guías
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  bio TEXT CHECK (char_length(bio) <= 300),
  whatsapp TEXT,
  photo_url TEXT,
  language TEXT DEFAULT 'es' CHECK (language IN ('es', 'en', 'fr')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: services
-- Servicios/actividades ofrecidas por los guías
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT CHECK (char_length(description) <= 300),
  price NUMERIC(10,2) NOT NULL,
  duration INTEGER NOT NULL, -- en minutos
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: service_photos
-- Hasta 3 fotos por servicio
CREATE TABLE IF NOT EXISTS service_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  "order" INTEGER NOT NULL CHECK ("order" >= 1 AND "order" <= 3)
);

-- Tabla: guide_photos
-- 3 fotos generales del guía
CREATE TABLE IF NOT EXISTS guide_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  "order" INTEGER NOT NULL CHECK ("order" >= 1 AND "order" <= 3)
);

-- Tabla: availability
-- Disponibilidad simple ON/OFF por día de la semana
CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  weekday INTEGER NOT NULL CHECK (weekday >= 0 AND weekday <= 6), -- 0=Lunes, 6=Domingo
  active BOOLEAN DEFAULT true,
  UNIQUE(user_id, weekday)
);

-- Tabla: timeslots
-- Franjas horarias disponibles
CREATE TABLE IF NOT EXISTS timeslots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  time TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  UNIQUE(user_id, time)
);

-- Tabla: public_links
-- Enlaces públicos limpios para los guías
CREATE TABLE IF NOT EXISTS public_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: analytics (opcional, para futuro)
-- Seguimiento de vistas
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  page_type TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  UNIQUE(user_id, page_type, date)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_services_user_id ON services(user_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_service_photos_service_id ON service_photos(service_id);
CREATE INDEX IF NOT EXISTS idx_guide_photos_user_id ON guide_photos(user_id);
CREATE INDEX IF NOT EXISTS idx_availability_user_id ON availability(user_id);
CREATE INDEX IF NOT EXISTS idx_timeslots_user_id ON timeslots(user_id);
CREATE INDEX IF NOT EXISTS idx_public_links_slug ON public_links(slug);
CREATE INDEX IF NOT EXISTS idx_public_links_user_id ON public_links(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeslots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public can view user profiles" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para services
CREATE POLICY "Users can manage own services" ON services
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public can view active services" ON services
  FOR SELECT USING (active = true);

-- Políticas para service_photos
CREATE POLICY "Users can manage own service photos" ON service_photos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM services
      WHERE services.id = service_photos.service_id
      AND services.user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view service photos" ON service_photos
  FOR SELECT USING (true);

-- Políticas para guide_photos
CREATE POLICY "Users can manage own guide photos" ON guide_photos
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public can view guide photos" ON guide_photos
  FOR SELECT USING (true);

-- Políticas para availability
CREATE POLICY "Users can manage own availability" ON availability
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public can view availability" ON availability
  FOR SELECT USING (true);

-- Políticas para timeslots
CREATE POLICY "Users can manage own timeslots" ON timeslots
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public can view timeslots" ON timeslots
  FOR SELECT USING (true);

-- Políticas para public_links
CREATE POLICY "Users can manage own public links" ON public_links
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public can view public links" ON public_links
  FOR SELECT USING (true);

-- Políticas para analytics
CREATE POLICY "Users can view own analytics" ON analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics" ON analytics
  FOR INSERT WITH CHECK (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Función para crear usuario automáticamente después del registro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear usuario automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Nota: Ejecuta esto en la consola de Storage de Supabase
-- o usa el código SQL si tienes acceso a la extensión storage

-- Crear bucket para fotos de guías
INSERT INTO storage.buckets (id, name, public)
VALUES ('guide-photos', 'guide-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'guide-photos');

CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'guide-photos' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'guide-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================
-- SEED DATA (opcional, para testing)
-- ============================================

-- Puedes descomentar esto para crear datos de prueba
/*
-- Usuario de ejemplo
INSERT INTO users (id, email, name, bio, whatsapp, language)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'carlos@example.com',
  'Carlos Mendoza',
  'Guía certificado con 8 años de experiencia. Conozco todos los secretos de la Riviera Maya.',
  '+52 984 123 4567',
  'es'
);

-- Enlace público
INSERT INTO public_links (user_id, slug)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'carlos-mendoza-playa');

-- Servicios de ejemplo
INSERT INTO services (user_id, title, description, price, duration, active)
VALUES 
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Tour Cenote Azul',
    'Descubre el magnifique Cenote Azul. Baignade dans des eaux cristallines.',
    50.00,
    180,
    true
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Visite de Tulum',
    'Explora las ruinas mayas de Tulum con un guía experto.',
    80.00,
    300,
    true
  );
*/
