-- Migration: Add multi-language support for guides
-- This migration converts the single language column to a languages array

-- Step 1: Add new languages column as array
ALTER TABLE users ADD COLUMN IF NOT EXISTS languages TEXT[];

-- Step 2: Migrate existing data from language to languages
-- Convert single language values to arrays
UPDATE users 
SET languages = ARRAY[language] 
WHERE language IS NOT NULL AND (languages IS NULL OR array_length(languages, 1) IS NULL);

-- Step 3: For users without a language set, default to empty array
UPDATE users 
SET languages = ARRAY[]::TEXT[]
WHERE languages IS NULL;

-- Step 4: Drop the old language column
ALTER TABLE users DROP COLUMN IF EXISTS language;

-- Step 5: Add constraint to ensure at least one language is selected
ALTER TABLE users ADD CONSTRAINT check_languages_not_empty 
CHECK (array_length(languages, 1) > 0);

-- Step 6: Set default for new users
ALTER TABLE users ALTER COLUMN languages SET DEFAULT ARRAY['es']::TEXT[];
