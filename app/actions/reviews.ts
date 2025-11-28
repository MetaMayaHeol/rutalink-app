'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const reviewSchema = z.object({
  guideId: z.string().uuid(),
  reviewerName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'El comentario debe tener al menos 10 caracteres').max(500, 'El comentario es muy largo'),
})

export async function submitReview(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    guideId: formData.get('guideId'),
    reviewerName: formData.get('reviewerName'),
    rating: Number(formData.get('rating')),
    comment: formData.get('comment'),
  }

  const validatedFields = reviewSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { guideId, reviewerName, rating, comment } = validatedFields.data

  // Simple rate limiting: Create an identifier based on name + guide
  // In production, you'd use IP address or user session
  const reviewerIdentifier = `${reviewerName.toLowerCase().trim()}_${guideId}`

  // Check if this person already reviewed this guide
  const { data: existingReview } = await supabase
    .from('reviews')
    .select('id')
    .eq('guide_id', guideId)
    .eq('reviewer_identifier', reviewerIdentifier)
    .single()

  if (existingReview) {
    return { error: 'Ya has dejado una reseña para este guía.' }
  }

  const { error } = await supabase
    .from('reviews')
    .insert({
      guide_id: guideId,
      reviewer_name: reviewerName,
      rating,
      comment,
      reviewer_identifier: reviewerIdentifier,
      approved: false // Requires admin approval
    })

  if (error) {
    console.error('Error submitting review:', error)
    return { error: 'Error al guardar la reseña. Inténtalo de nuevo.' }
  }

  // Note: Review won't appear until admin approves it
  return { success: true, needsApproval: true }
}

export async function getReviews(guideId: string) {
  const supabase = await createClient()

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('guide_id', guideId)
    .eq('approved', true) // Only show approved reviews
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return reviews
}
