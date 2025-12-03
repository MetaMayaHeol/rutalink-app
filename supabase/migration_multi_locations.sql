-- Phase 3.1: Multi-Location Support for Services
-- This migration adds support for services covering multiple cities

-- 1. Add locations array column to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS locations TEXT[] DEFAULT '{}';

-- 2. Create GIN index for efficient array searches
CREATE INDEX IF NOT EXISTS idx_services_locations 
ON services USING GIN (locations);

-- 3. Migrate existing data: Use user's city as default location
UPDATE services s
SET locations = ARRAY[u.city]
FROM users u
WHERE s.user_id = u.id 
  AND u.city IS NOT NULL 
  AND (s.locations IS NULL OR array_length(s.locations, 1) IS NULL);

-- 4. Add comment for documentation
COMMENT ON COLUMN services.locations IS 'Array of city names where this service is offered. Allows guides to offer tours in multiple cities.';

-- Verification queries (run these to check migration success)
-- Count services with locations
-- SELECT COUNT(*) FROM services WHERE array_length(locations, 1) > 0;

-- Show services with multiple locations
-- SELECT id, title, locations FROM services WHERE array_length(locations, 1) > 1;

-- Find services available in specific city
-- SELECT title, locations FROM services WHERE 'Mérida' = ANY(locations);
