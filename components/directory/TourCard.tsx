'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocale, useTranslations } from 'next-intl'


interface TourCardProps {
  tour: {
    id: string
    title: string
    description: string
    price: number
    duration: number
    currency?: string
    cover_image: string | null
    averageRating?: number
    reviewCount?: number
    guide: {
        name: string
        photo_url: string | null
        slug: string
        is_verified: boolean
    }
  }
}

export function TourCard({ tour }: TourCardProps) {
  const locale = useLocale()
  const t = useTranslations('common')

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {tour.cover_image ? (
          <Image
            src={tour.cover_image}
            alt={tour.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-600">
             <MapPin size={48} className="opacity-20" />
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">{tour.title}</h3>
            {tour.averageRating && tour.averageRating > 0 && (
                 <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-gray-700">{tour.averageRating.toFixed(1)}</span>
                 </div>
            )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{tour.duration} min</span>
            </div>
            {/* Add more metadata if needed */}
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">
          {tour.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                    {tour.guide.photo_url ? (
                        <Image 
                            src={tour.guide.photo_url} 
                            alt={tour.guide.name} 
                            fill 
                            className="object-cover"
                            sizes="32px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-700 font-medium text-xs">
                            {tour.guide.name[0]}
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 leading-tight">{t('by')}</span>
                    <span className="text-xs font-medium text-gray-900 leading-tight truncate max-w-[100px]">{tour.guide.name}</span>
                </div>
             </div>
             
             <div className="text-right">
                <span className="block text-xs text-gray-500">{t('from')}</span>
                <span className="block font-bold text-green-700">${tour.price}</span>
             </div>
        </div>
        
        <Link href={`/${locale}/s/${tour.id}`} className="mt-4">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              {t('viewDetails')}
            </Button>
        </Link>
      </div>
    </div>
  )
}
