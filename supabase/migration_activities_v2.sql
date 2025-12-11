-- Migration: Activities V2
-- Add comprehensive fields for professional tours

-- 1. Add new columns to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT '[]'::JSONB,
ADD COLUMN IF NOT EXISTS includes TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS excludes TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS requirements TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS meeting_point TEXT,
ADD COLUMN IF NOT EXISTS meeting_point_coords JSONB, -- {lat: number, lng: number}
ADD COLUMN IF NOT EXISTS cancellation_policy TEXT DEFAULT 'flexible', -- flexible, moderate, strict
ADD COLUMN IF NOT EXISTS max_pax INTEGER,
ADD COLUMN IF NOT EXISTS languages TEXT[] DEFAULT '{}'; -- Languages specific to this tour if different from guide's

-- 2. Add comment/descriptions for documentation
COMMENT ON COLUMN services.subtitle IS 'Short commercial tagline or summary';
COMMENT ON COLUMN services.itinerary IS 'Array of {title, description, duration, order}';
COMMENT ON COLUMN services.meeting_point IS 'Physical address or description of meeting location';

-- 3. Check constraints (Optional, but good practice)
ALTER TABLE services ADD CONSTRAINT check_cancellation_policy 
CHECK (cancellation_policy IN ('flexible', 'moderate', 'strict'));
