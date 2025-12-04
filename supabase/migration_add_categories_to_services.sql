-- Add categories column to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS categories TEXT[] DEFAULT '{}';

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_services_categories ON services USING GIN (categories);

-- Optional: Migrate existing data based on keywords (best effort)
-- This is complex in SQL, might be better to leave empty or manual update
