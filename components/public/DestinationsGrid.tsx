import Link from 'next/link'
import { cities } from '@/lib/seo/cities'
import { MapPin } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

export async function DestinationsGrid() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Fetch guide counts for all cities in parallel
  const citiesWithCounts = await Promise.all(
    cities.map(async (city) => {
      // Count unique guides who have active services in this city
      const { data, error } = await supabase
        .from('services')
        .select('user_id')
        .contains('locations', [city.name])
        .eq('active', true)
      
      // Get unique user IDs
      const uniqueGuides = new Set(data?.map(s => s.user_id))
      return { ...city, guideCount: uniqueGuides.size }
    })
  )

  // Filter cities with at least 1 guide and sort by count (descending)
  const activeCities = citiesWithCounts
    .filter(c => c.guideCount > 0)
    .sort((a, b) => b.guideCount - a.guideCount)
    .slice(0, 8)

  // If no cities have guides yet (e.g. fresh install), show top 4 by default but with 0 count
  const displayCities = activeCities.length > 0 
    ? activeCities 
    : cities.slice(0, 4).map(c => ({ ...c, guideCount: 0 }))

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explorez la Péninsule du Yucatán
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les destinations les plus prisées avec des guides locaux experts
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayCities.map((city) => (
            <Link
              key={city.slug}
              href={`/ciudad/${city.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="aspect-[4/5] p-6 flex flex-col justify-end">
                {/* Guide Count Badge */}
                {city.guideCount > 0 && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm">
                    {city.guideCount} guide{city.guideCount > 1 ? 's' : ''}
                  </div>
                )}

                {/* Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin size={20} className="text-green-600" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {city.state}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/explorar"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-lg group"
          >
            Voir toutes les destinations
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
