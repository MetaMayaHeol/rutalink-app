'use server'

import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'
import crypto from 'crypto'

// Initialize Supabase Admin client for writing analytics (bypassing RLS if needed, though we have policies)
// We use service role key to ensure we can write even if user is anon
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * Tracks a generic event (view, click, etc.)
 */
async function trackEvent(
  eventType: 'view' | 'whatsapp_click',
  pageType: 'profile' | 'service',
  guideId: string,
  resourceId?: string
) {
  try {
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

    // Create a hash for deduplication
    // For views: 1 per day per user per resource
    // For clicks: 1 per day per user per resource (conservative lead counting)
    const viewerHash = crypto
      .createHash('sha256')
      .update(`${ip}-${userAgent}-${today}-${eventType}-${pageType}-${resourceId || guideId}`)
      .digest('hex')

    // Check if event already exists for this hash
    const { data: existingEvent } = await supabaseAdmin
      .from('analytics')
      .select('id')
      .eq('viewer_hash', viewerHash)
      .single()

    if (existingEvent) {
      return { success: true, skipped: true }
    }

    // Record new event
    const { error } = await supabaseAdmin.from('analytics').insert({
      user_id: guideId,
      page_type: pageType,
      resource_id: resourceId || null,
      viewer_hash: viewerHash,
      event_type: eventType
    })

    if (error) {
      console.error('Error tracking event:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error in trackEvent:', error)
    return { success: false, error: 'Internal error' }
  }
}

/**
 * Tracks a page view
 */
export async function trackView(
  pageType: 'profile' | 'service',
  guideId: string,
  resourceId?: string
) {
  return trackEvent('view', pageType, guideId, resourceId)
}

/**
 * Tracks a WhatsApp click
 */
export async function trackWhatsappClick(
  pageType: 'profile' | 'service',
  guideId: string,
  resourceId?: string
) {
  return trackEvent('whatsapp_click', pageType, guideId, resourceId)
}

/**
 * Fetches analytics data for a guide
 */
export async function getAnalyticsData(userId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Get date 30 days ago
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: analytics, error } = await supabase
    .from('analytics')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return analytics || []
}
