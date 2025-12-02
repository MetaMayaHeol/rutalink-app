-- Add admin functionality to users table

-- 1. Add is_admin column (default false)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Create index for faster admin queries
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin) WHERE is_admin = true;

-- 3. Grant yourself admin access (replace with your actual email)
-- UPDATE users SET is_admin = true WHERE email = 'your.email@example.com';

-- Note: To grant admin access to a user, run:
-- UPDATE users SET is_admin = true WHERE email = 'user@example.com';
-- To revoke: UPDATE users SET is_admin = false WHERE email = 'user@example.com';
