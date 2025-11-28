-- Configuration du bucket 'verification-docs' via Supabase Dashboard
-- Les policies de Storage ne peuvent PAS être créées via SQL, uniquement via l'interface

-- ============================================
-- INSTRUCTIONS POUR CONFIGURER LE BUCKET
-- ============================================

-- 1. Allez dans: Storage > Buckets dans le Dashboard Supabase
-- 2. Cliquez sur "New bucket"
-- 3. Configurez:
--    - Name: verification-docs
--    - Public: NON (décoché)
--    - Allowed MIME types: image/jpeg,image/jpg,image/png,image/webp,application/pdf
--    - File size limit: 5 MB (5242880 bytes)

-- 4. Une fois le bucket créé, allez dans: Storage > Policies
-- 5. Cliquez sur "New Policy" pour le bucket 'verification-docs'

-- ============================================
-- POLICY 1: Upload (INSERT)
-- ============================================
-- Policy name: Users can upload their verification docs
-- Allowed operation: INSERT
-- Policy definition:
-- (bucket_id = 'verification-docs' AND (auth.uid())::text = (storage.foldername(name))[1])

-- ============================================
-- POLICY 2: Select (SELECT)  
-- ============================================
-- Policy name: Users can view their own docs
-- Allowed operation: SELECT
-- Policy definition:
-- (bucket_id = 'verification-docs' AND (auth.uid())::text = (storage.foldername(name))[1])

-- ============================================
-- POLICY 3: Update (UPDATE)
-- ============================================
-- Policy name: Users can update their docs
-- Allowed operation: UPDATE
-- Policy definition:
-- (bucket_id = 'verification-docs' AND (auth.uid())::text = (storage.foldername(name))[1])

-- ============================================
-- POLICY 4: Delete (DELETE)
-- ============================================
-- Policy name: Users can delete their docs
-- Allowed operation: DELETE
-- Policy definition:
-- (bucket_id = 'verification-docs' AND (auth.uid())::text = (storage.foldername(name))[1])

-- Note: Les admins peuvent toujours voir tous les fichiers via Storage > verification-docs
