-- Feature: Reviews System
-- Consolidated migration for Reviews, Moderation, and RLS

-- 1. Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guide_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    reviewer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    approved BOOLEAN DEFAULT false,
    reviewer_identifier TEXT
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS reviews_guide_id_idx ON public.reviews(guide_id);
CREATE INDEX IF NOT EXISTS reviews_approved_idx ON public.reviews(approved);
CREATE INDEX IF NOT EXISTS reviews_identifier_guide_idx ON public.reviews(reviewer_identifier, guide_id);

-- 3. RLS Policies
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Reset policies to ensure clean state
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
DROP POLICY IF EXISTS "Approved reviews are viewable by everyone" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can create a review" ON public.reviews;
DROP POLICY IF EXISTS "Admins can view all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Guides can view their own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Guides can view reviews for themselves" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;

-- 3.1 Public Insert (Anyone can leave a review)
CREATE POLICY "Anyone can create a review" 
ON public.reviews FOR INSERT 
WITH CHECK (true);

-- 3.2 Public Select (Only approved reviews)
CREATE POLICY "Public can view approved reviews" 
ON public.reviews FOR SELECT 
USING (approved = true);

-- 3.3 Admin Select (View all reviews)
CREATE POLICY "Admins can view all reviews" 
ON public.reviews FOR SELECT 
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- 3.4 Admin Update (Approve reviews)
CREATE POLICY "Admins can update reviews" 
ON public.reviews FOR UPDATE 
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- 3.5 Admin Delete (Reject reviews)
CREATE POLICY "Admins can delete reviews" 
ON public.reviews FOR DELETE 
USING (
  (SELECT is_admin FROM public.users WHERE id = auth.uid()) = true
);

-- 3.6 Guide Select (View reviews for themselves, even unapproved?)
-- Currently implemented as: Guides see what public sees on profile, 
-- but might want to see pending reviews in dashboard? 
-- For now, let's allow guides to see all reviews linked to them.
CREATE POLICY "Guides can view reviews for themselves" 
ON public.reviews FOR SELECT 
USING (auth.uid() = guide_id);
