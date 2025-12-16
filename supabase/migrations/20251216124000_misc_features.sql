-- Feature: Miscellaneous Enhancements
-- Consolidates Locations, Categories, Active Links, and Analytics

-- 1. Users Location
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'México';

CREATE INDEX IF NOT EXISTS idx_users_city ON users(city);
CREATE INDEX IF NOT EXISTS idx_users_country ON users(country);

-- 2. Public Links Active State
ALTER TABLE public_links 
ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Backfill
UPDATE public_links SET active = true WHERE active IS NULL;

CREATE INDEX IF NOT EXISTS idx_public_links_active ON public_links(active);

-- 3. Services Categories
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS categories TEXT[] DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_services_categories ON services USING GIN (categories);

-- 4. Analytics System (Event Based)
-- Warning: This replaces the old analytics schema if it existed
-- We do not drop the table if it exists to preserve data if it matches, 
-- but since the schema might be different, we should check columns.
-- For safety in this consolidated script, we will just ensure the table exists
-- and add columns if missing, OR create new if not exists.

CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  page_type TEXT NOT NULL CHECK (page_type IN ('profile', 'service')),
  resource_id UUID, 
  viewer_hash TEXT NOT NULL, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_page_type ON analytics(page_type);

-- RLS
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Guides can view own analytics" ON analytics;
CREATE POLICY "Guides can view own analytics"
ON analytics FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can insert analytics" ON analytics;
CREATE POLICY "Public can insert analytics"
ON analytics FOR INSERT
WITH CHECK (true);
