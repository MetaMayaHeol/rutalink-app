import Link from 'next/link'
import { activities } from '@/lib/seo/activities'
import { 
  UtensilsCrossed, 
  Landmark, 
  TreePine, 
  ShoppingBag, 
  Camera, 
  Palmtree,
  Waves,
  Sparkles
} from 'lucide-react'

// Map activity slugs to Lucide icons
const activityIcons: Record<string, any> = {
  'gastronomia': UtensilsCrossed,
  'cultura-historia': Landmark,
  'naturaleza-aventura': TreePine,
  'compras-artesanias': ShoppingBag,
  'fotografia': Camera,
  'playas-cenotes': Waves,
  'arqueologia': Palmtree,
  'experiencias-locales': Sparkles,
}

export function ActivitiesGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explorez par Type d'Activité
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des expériences authentiques guidées par des experts locaux
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.slug] || Sparkles

            return (
              <Link
                key={activity.slug}
                href={`/actividad/${activity.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100 hover:border-green-200"
              >
                <div className="aspect-[4/5] p-6 flex flex-col items-center justify-center text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <Icon size={32} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {activity.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {activity.description.split('.')[0]}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-semibold text-green-600">
                      Découvrir →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/explorar"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-lg group"
          >
            Parcourir tous les guides
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
