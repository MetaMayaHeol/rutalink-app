import { createClient } from '@/lib/supabase/server'
import { cities as staticCities, type City } from './cities'

// Re-export type City for convenience if needed
export type { City }

export async function getCityResult(slug: string): Promise<City | undefined> {
  // Try DB first
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('cities').select('*').eq('slug', slug).single()
    
    if (data) {
      return {
          slug: data.slug,
          name: data.name,
          state: data.state || 'México',
          description: data.description || '', 
          highlights: data.highlights || [],
          heroImage: data.hero_image,
          metaDescription: data.meta_description || ''
      }
    }
  } catch (error) {
    console.error('Error fetching city from DB:', error)
  }
  
  // Fallback to static (useful for development or if DB migration pending)
  return staticCities.find(c => c.slug === slug)
}

export async function getAllCitiesResults(): Promise<City[]> {
  try {
     const supabase = await createClient()
     const { data } = await supabase.from('cities').select('*').eq('is_active', true)
     
     if (data && data.length > 0) {
         return data.map(dbCity => ({
              slug: dbCity.slug,
              name: dbCity.name,
              state: dbCity.state || 'México',
              description: dbCity.description || '',
              highlights: dbCity.highlights || [],
              heroImage: dbCity.hero_image, // undefined in DB if null? DB is text nullable.
              metaDescription: dbCity.meta_description || ''
         }))
     }
  } catch (error) {
    console.error('Error fetching cities from DB:', error)
  }
   
   return staticCities
}
