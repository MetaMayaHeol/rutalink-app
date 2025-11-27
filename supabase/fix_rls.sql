-- Fix for RLS error 42501
-- Run this in Supabase SQL Editor

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);
