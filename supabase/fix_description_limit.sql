-- Migration: Fix Description Limit
-- The original schema had a CHECK constraint limiting description to 300 chars.
-- We need to remove this to allow longer, professional descriptions.

ALTER TABLE services
DROP CONSTRAINT IF EXISTS services_description_check;

-- Optional: Add a new constraint for the new limit (2000) or rely on app validation.
-- For safety, let's allow up to 3000 in DB.
ALTER TABLE services
ADD CONSTRAINT services_description_check 
CHECK (char_length(description) <= 3000);
