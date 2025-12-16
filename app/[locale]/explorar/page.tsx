import { createClient } from '@supabase/supabase-js'
import { DirectoryClient } from '@/components/directory/DirectoryClient'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'explorar' })
 
  return {
    title: `${t('title')} | MySenda`,
    description: t('metaDescription')
  }
}

// Force dynamic to ensure we see the latest data (and avoid caching issues during testing)
export const dynamic = 'force-dynamic'

interface GuideWithUserResponse {
  slug: string
  user: {
    id: string
    name: string | null
    bio: string | null
    photo_url: string | null
    languages: string[] | null
    city: string | null
    country: string | null
    is_verified: boolean | null
  } | null
}

export default async function ExplorePage() {
  // Use Service Role Key to bypass RLS policies for the public directory
  // This ensures we can read user profiles even if RLS is set to private
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Fetch guides with public profiles
  const { data: guides, error } = await supabase
    .from('public_links')
    .select(`
      slug,
      user:users (
        id,
        name,
        bio,
        photo_url,
        languages,
        city,
        country,
        is_verified
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching guides:', error)
  }

  const typedGuides = guides as GuideWithUserResponse[] | null

  // Transform data for the client component
  const formattedGuides = await Promise.all((typedGuides || []).map(async (item) => {
    const userId = item.user?.id
    
    // Calculate average rating for this guide
    let averageRating = 0
    let reviewCount = 0
    
    if (userId) {
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('guide_id', userId)
        .eq('approved', true)
      
      if (reviews && reviews.length > 0) {
        reviewCount = reviews.length
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0)
        averageRating = totalRating / reviewCount
      }
    }

    return {
      slug: item.slug,
      name: item.user?.name || 'Guía MySenda',
      bio: item.user?.bio ?? null,
      photo_url: item.user?.photo_url ?? null,
      languages: item.user?.languages ?? null,
      city: item.user?.city ?? null,
      country: item.user?.country ?? null,
      is_verified: item.user?.is_verified ?? false,
      // Only include rating fields if there are reviews
      ...(reviewCount > 0 && {
        averageRating,
        reviewCount,
      }),
    }
  }))

  return <DirectoryClient initialGuides={formattedGuides} />
}

