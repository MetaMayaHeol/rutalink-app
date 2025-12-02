'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Check if the current authenticated user is an admin
 * @returns true if user is admin, false otherwise
 */
export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  const { data: profile } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  return profile?.is_admin === true
}

/**
 * Get current user ID if user is admin, otherwise return null
 */
export async function getAdminUserId(): Promise<string | null> {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  return profile?.is_admin === true ? user.id : null
}

/**
 * Require admin access - throws error or redirects if not admin
 * Use this at the start of admin-only server actions or pages
 */
export async function requireAdmin(): Promise<void> {
  const adminCheck = await isAdmin()
  
  if (!adminCheck) {
    redirect('/dashboard')
  }
}
