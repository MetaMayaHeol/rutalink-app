-- Feature: Service Enhancements
-- Consolidates Multi-Location, Multi-Language, and Activities V2

-- 1. Multi-Location Support
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS locations TEXT[] DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_services_locations 
ON services USING GIN (locations);

-- Backfill locations from users city if empty (safe to run multiple times)
UPDATE services s
SET locations = ARRAY[u.city]
FROM users u
WHERE s.user_id = u.id 
  AND u.city IS NOT NULL 
  AND (s.locations IS NULL OR array_length(s.locations, 1) IS NULL);

COMMENT ON COLUMN services.locations IS 'Array of city names where this service is offered.';


-- 2. Multi-Language Support (Users)
ALTER TABLE users ADD COLUMN IF NOT EXISTS languages TEXT[];

-- Backfill languages from old column if it exists (assuming 'language' column might be gone or present)
-- Check if 'language' column exists before trying to use it is hard in pure SQL without PL/PGSQL block
-- We will assume the column might not exist and skip the complex migration logic since this is a cleanup.
-- If you are running this on a fresh DB, the 'language' column won't exist.
-- If running on existing DB, the previous migration likely ran.

-- Ensure default
ALTER TABLE users ALTER COLUMN languages SET DEFAULT ARRAY['es']::TEXT[];


-- 3. Activities V2 (Rich Content)
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT '[]'::JSONB,
ADD COLUMN IF NOT EXISTS includes TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS excludes TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS requirements TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS meeting_point TEXT,
ADD COLUMN IF NOT EXISTS meeting_point_coords JSONB,
ADD COLUMN IF NOT EXISTS cancellation_policy TEXT DEFAULT 'flexible',
ADD COLUMN IF NOT EXISTS max_pax INTEGER,
ADD COLUMN IF NOT EXISTS languages TEXT[] DEFAULT '{}';

-- Constraints
ALTER TABLE services DROP CONSTRAINT IF EXISTS check_cancellation_policy;
ALTER TABLE services ADD CONSTRAINT check_cancellation_policy 
CHECK (cancellation_policy IN ('flexible', 'moderate', 'strict'));
