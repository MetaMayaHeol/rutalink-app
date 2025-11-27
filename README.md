# RutaLink MVP

Una plataforma para guías turísticos que permite crear perfiles públicos, gestionar servicios y recibir reservas vía WhatsApp.

## 🚀 Stack Tecnológico

- **Frontend/Backend**: Next.js 14 (App Router)
- **Base de datos**: Supabase (PostgreSQL + Auth + Storage)
- **UI**: shadcn/ui + TailwindCSS
- **Lenguaje**: TypeScript
- **Deployment**: Vercel

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta de Supabase (gratuita)
- npm o pnpm

## 🛠️ Configuración Inicial

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea una cuenta en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a **Project Settings** > **API**
4. Copia las siguientes credenciales:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configurar Base de Datos

Ve a **SQL Editor** en Supabase y ejecuta el siguiente script para crear las tablas:

```sql
-- Tabla: users
CREATE TABLE users (
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
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT CHECK (char_length(description) <= 300),
  price NUMERIC(10,2) NOT NULL,
  duration INTEGER NOT NULL, -- en minutos
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: service_photos
CREATE TABLE service_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  "order" INTEGER NOT NULL
);

-- Tabla: guide_photos
CREATE TABLE guide_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  "order" INTEGER NOT NULL
);

-- Tabla: availability
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  weekday INTEGER NOT NULL CHECK (weekday >= 0 AND weekday <= 6),
  active BOOLEAN DEFAULT true
);

-- Tabla: timeslots
CREATE TABLE timeslots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  time TEXT NOT NULL,
  active BOOLEAN DEFAULT true
);

-- Tabla: public_links
CREATE TABLE public_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL
);

-- Tabla: analytics (opcional)
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  page_type TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_services_user_id ON services(user_id);
CREATE INDEX idx_service_photos_service_id ON service_photos(service_id);
CREATE INDEX idx_guide_photos_user_id ON guide_photos(user_id);
CREATE INDEX idx_availability_user_id ON availability(user_id);
CREATE INDEX idx_timeslots_user_id ON timeslots(user_id);
CREATE INDEX idx_public_links_slug ON public_links(slug);
CREATE INDEX idx_public_links_user_id ON public_links(user_id);
```

### 5. Configurar Autenticación

1. Ve a **Authentication** > **Providers** en Supabase
2. Habilita **Email** provider
3. En **Email Templates**, personaliza el template de Magic Link (opcional)
4. En **URL Configuration**, agrega:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

### 6. Configurar Storage (para imágenes)

1. Ve a **Storage** en Supabase
2. Crea un bucket llamado `guide-photos`
3. Configura las políticas de acceso:

```sql
-- Permitir lectura pública
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'guide-photos');

-- Permitir subida solo a usuarios autenticados
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'guide-photos' AND auth.role() = 'authenticated');

-- Permitir eliminación solo al propietario
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (bucket_id = 'guide-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 🏃 Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
rutalink-app/
├── app/
│   ├── auth/              # Autenticación (login, callback, signout)
│   ├── dashboard/         # Dashboard del guía (protegido)
│   ├── g/[slug]/          # Página pública del guía (TODO)
│   ├── s/[serviceId]/     # Página pública del servicio (TODO)
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Componentes shadcn/ui
│   ├── dashboard/         # Componentes del dashboard (TODO)
│   └── public/            # Componentes públicos (TODO)
├── lib/
│   ├── supabase/          # Clientes Supabase
│   ├── types/             # TypeScript types
│   ├── utils/             # Utilidades (formatters, constants)
│   └── whatsapp.ts        # Generación de enlaces WhatsApp
└── middleware.ts          # Middleware de autenticación
```

## ✅ Estado Actual

### ✓ Completado
- [x] Configuración inicial del proyecto
- [x] Autenticación con Magic Link
- [x] Middleware de protección de rutas
- [x] Dashboard básico
- [x] Landing page
- [x] Utilidades (WhatsApp, formatters, etc.)

### 🚧 En Progreso
- [ ] Gestión de perfil
- [ ] CRUD de servicios
- [ ] Gestión de disponibilidades
- [ ] Páginas públicas (guía y servicio)
- [ ] Upload de imágenes
- [ ] Integración completa de WhatsApp

## 🔜 Próximos Pasos

1. **Configurar Supabase** (sigue las instrucciones arriba)
2. **Crear página de perfil** (`/dashboard/profile`)
3. **Crear CRUD de servicios** (`/dashboard/services/*`)
4. **Crear páginas públicas** (`/g/[slug]`, `/s/[serviceId]`)
5. **Implementar upload de imágenes**
6. **Testing y optimización**

## 📚 Recursos

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación Supabase](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TailwindCSS](https://tailwindcss.com/docs)

## 🤝 Contribuir

Este es un proyecto MVP. Las contribuciones son bienvenidas.

## 📄 Licencia

MIT
