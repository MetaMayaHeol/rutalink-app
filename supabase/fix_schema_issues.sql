-- FIX SCRIPT: Run this to resolve all database issues at once

-- 1. Ensure 'subtitle' and other columns exist (in case migration failed)
ALTER TABLE services ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT '[]'::JSONB;
ALTER TABLE services ADD COLUMN IF NOT EXISTS includes TEXT[] DEFAULT '{}';
ALTER TABLE services ADD COLUMN IF NOT EXISTS excludes TEXT[] DEFAULT '{}';
ALTER TABLE services ADD COLUMN IF NOT EXISTS requirements TEXT[] DEFAULT '{}';
ALTER TABLE services ADD COLUMN IF NOT EXISTS meeting_point TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS cancellation_policy TEXT DEFAULT 'flexible';
ALTER TABLE services ADD COLUMN IF NOT EXISTS max_pax INTEGER;
ALTER TABLE services ADD COLUMN IF NOT EXISTS languages TEXT[] DEFAULT '{}';

-- 2. Fix Description Limit (Increase from 300 to 3000)
ALTER TABLE services DROP CONSTRAINT IF EXISTS services_description_check;
ALTER TABLE services ADD CONSTRAINT services_description_check CHECK (char_length(description) <= 3000);

-- 3. Verify 'active' column exists (just in case)
ALTER TABLE services ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;
