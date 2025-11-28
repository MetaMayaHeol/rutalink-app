import { Star } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

interface Review {
  id: string
  reviewer_name: string
  rating: number
  comment: string | null
  created_at: string
}

interface ReviewsListProps {
  reviews: Review[]
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-gray-500">Este guía aún no tiene reseñas. ¡Sé el primero en opinar!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white border-b border-gray-100 pb-6 last:border-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-gray-900">{review.reviewer_name}</h4>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: es })}
            </span>
          </div>
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={`${
                  star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
