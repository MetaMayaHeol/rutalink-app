-- Phase 2: Trust & Social Proof

-- 1. Add is_verified column to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- 2. Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guide_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    reviewer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable RLS for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for reviews

-- Allow public read access to reviews
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews FOR SELECT 
USING (true);

-- Allow public insert access (for now, anyone can leave a review)
CREATE POLICY "Anyone can create a review" 
ON public.reviews FOR INSERT 
WITH CHECK (true);

-- 5. Create index for faster lookups
CREATE INDEX IF NOT EXISTS reviews_guide_id_idx ON public.reviews(guide_id);
