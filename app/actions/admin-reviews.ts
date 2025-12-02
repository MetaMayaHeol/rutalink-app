'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/admin'
import { revalidatePath } from 'next/cache'

export type ReviewWithGuide = {
  id: string
  guide_id: string
  reviewer_name: string
  rating: number
  comment: string
  approved: boolean
  created_at: string
  guide: {
    name: string | null
    email: string
  } | null
}

/**
 * Get all pending (unapproved) reviews
 * Admin only
 */
export async function getPendingReviews(): Promise<ReviewWithGuide[]> {
  await requireAdmin()
  
  const supabase = await createClient()

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select(`
      *,
      guide:users!reviews_guide_id_fkey (
        name,
        email
      )
    `)
    .eq('approved', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching pending reviews:', error)
    return []
  }

  return reviews as ReviewWithGuide[]
}

/**
 * Get all reviews (approved and pending)
 * Admin only
 */
export async function getAllReviews(): Promise<ReviewWithGuide[]> {
  await requireAdmin()
  
  const supabase = await createClient()

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select(`
      *,
      guide:users!reviews_guide_id_fkey (
        name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all reviews:', error)
    return []
  }

  return reviews as ReviewWithGuide[]
}

/**
 * Approve a review
 * Admin only
 */
export async function approveReview(reviewId: string) {
  await requireAdmin()
  
  const supabase = await createClient()

  const { error } = await supabase
    .from('reviews')
    .update({ approved: true })
    .eq('id', reviewId)

  if (error) {
    console.error('Error approving review:', error)
    return { error: 'Error al aprobar la reseña' }
  }

  revalidatePath('/dashboard/admin/reviews')
  return { success: true }
}

/**
 * Reject (delete) a review
 * Admin only
 */
export async function rejectReview(reviewId: string) {
  await requireAdmin()
  
  const supabase = await createClient()

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)

  if (error) {
    console.error('Error rejecting review:', error)
    return { error: 'Error al rechazar la reseña' }
  }

  revalidatePath('/dashboard/admin/reviews')
  return { success: true }
}
