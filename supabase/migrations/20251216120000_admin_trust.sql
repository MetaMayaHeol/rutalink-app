-- Feature: Admin and Trust
-- Consolidated migration for Admin and Verification features

-- 1. Add is_admin column to users
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Add is_verified column to users
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- 3. Indexes
CREATE INDEX IF NOT EXISTS users_is_admin_idx ON public.users(is_admin) WHERE is_admin = true;
CREATE INDEX IF NOT EXISTS users_is_verified_idx ON public.users(is_verified) WHERE is_verified = true;

-- Note: To grant admin access, you must manually update the user row
-- UPDATE users SET is_admin = true WHERE email = '...';
