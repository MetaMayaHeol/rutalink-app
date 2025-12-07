-- Add event_type column to analytics table
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS event_type TEXT NOT NULL DEFAULT 'view';

-- Add check constraint for event_type
ALTER TABLE analytics 
  ADD CONSTRAINT analytics_event_type_check 
  CHECK (event_type IN ('view', 'whatsapp_click'));

-- Add index on event_type
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
