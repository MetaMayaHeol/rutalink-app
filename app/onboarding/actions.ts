'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { slugify } from '@/lib/utils/formatters'

export async function updateOnboardingProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const name = formData.get('name') as string
  const bio = formData.get('bio') as string
  const whatsapp = formData.get('whatsapp') as string
  const photoUrl = formData.get('photo_url') as string

  if (!name || !whatsapp) {
    return { error: 'Nombre y WhatsApp son obligatorios' }
  }

  // Update user
  const { error: userError } = await supabase
    .from('users')
    .update({ name, bio, whatsapp, photo_url: photoUrl })
    .eq('id', user.id)

  if (userError) return { error: userError.message }

  // Create/Update public link
  let slug = slugify(name)
  const { data: existingSlug } = await supabase
    .from('public_links')
    .select('slug')
    .eq('slug', slug)
    .single()
    
  if (existingSlug) {
    slug = `${slug}-${Math.floor(Math.random() * 1000)}`
  }

  await supabase.from('public_links').upsert({
    user_id: user.id,
    slug
  }, { onConflict: 'user_id' })

  return { success: true }
}

export async function createOnboardingService(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const title = formData.get('title') as string
  const price = parseFloat(formData.get('price') as string)
  const duration = parseInt(formData.get('duration') as string)

  if (!title || !price || !duration) {
    return { error: 'Todos los campos son obligatorios' }
  }

  const { error } = await supabase
    .from('services')
    .insert({
      user_id: user.id,
      title,
      price,
      duration,
      active: true,
      description: 'Mi primer servicio en RutaLink' // Default description
    })

  if (error) return { error: error.message }

  return { success: true }
}

export async function completeOnboarding() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('users')
    .update({ onboarding_completed: true })
    .eq('id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
