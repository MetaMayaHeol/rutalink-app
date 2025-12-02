'use client'

import { useState } from 'react'
import { ReviewWithGuide } from '@/app/actions/admin-reviews'
import { ReviewCard } from '@/components/admin/ReviewCard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { getPendingReviews, getAllReviews } from '@/app/actions/admin-reviews'

type ReviewsClientProps = {
  initialPendingReviews: ReviewWithGuide[]
  initialAllReviews: ReviewWithGuide[]
}

export function ReviewsClient({ 
  initialPendingReviews, 
  initialAllReviews 
}: ReviewsClientProps) {
  const [pendingReviews, setPendingReviews] = useState(initialPendingReviews)
  const [allReviews, setAllReviews] = useState(initialAllReviews)
  const [refreshing, setRefreshing] = useState(false)

  const refreshData = async () => {
    setRefreshing(true)
    const [pending, all] = await Promise.all([
      getPendingReviews(),
      getAllReviews()
    ])
    setPendingReviews(pending)
    setAllReviews(all)
    setRefreshing(false)
  }

  return (
    <div>
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pendientes {pendingReviews.length > 0 && `(${pendingReviews.length})`}
          </TabsTrigger>
          <TabsTrigger value="all">
            Todas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pendingReviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ¡Todo al día!
              </h3>
              <p className="text-sm text-gray-600">
                No hay reseñas pendientes de aprobar
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onUpdate={refreshData}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {allReviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Sin reseñas
              </h3>
              <p className="text-sm text-gray-600">
                Aún no hay reseñas en el sistema
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {allReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onUpdate={refreshData}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {refreshing && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm">
          Actualizando...
        </div>
      )}
    </div>
  )
}
