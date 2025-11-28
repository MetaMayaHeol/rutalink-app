'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'
import { toast } from 'sonner'
import { submitReview } from '@/app/actions/reviews'

interface ReviewFormProps {
  guideId: string
  onSuccess?: () => void
}

export function ReviewForm({ guideId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    if (rating === 0) {
      toast.error('Por favor selecciona una calificación')
      return
    }

    setIsSubmitting(true)
    formData.append('guideId', guideId)
    formData.append('rating', rating.toString())

    const result = await submitReview(formData)

    setIsSubmitting(false)

    if (result?.error) {
      if (typeof result.error === 'string') {
        toast.error(result.error)
      } else {
        toast.error('Por favor verifica los campos')
      }
    } else {
      if (result?.needsApproval) {
        toast.success('¡Gracias! Tu reseña está pendiente de aprobación.')
      } else {
        toast.success('¡Gracias por tu reseña!')
      }
      if (onSuccess) onSuccess()
      // Reset form logic could go here or parent handles it
    }
  }

  return (
    <form action={handleSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <h3 className="font-bold text-lg mb-4">Deja una reseña</h3>
      
      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">Calificación</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={24}
                  className={`${
                    star <= (hoverRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
          <input type="hidden" name="rating" value={rating} />
        </div>

        <div>
          <Label htmlFor="reviewerName">Tu Nombre</Label>
          <Input id="reviewerName" name="reviewerName" placeholder="Ej: Juan Pérez" required />
        </div>

        <div>
          <Label htmlFor="comment">Comentario</Label>
          <Textarea 
            id="comment" 
            name="comment" 
            placeholder="Cuéntanos qué tal fue tu experiencia..." 
            required 
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white hover:bg-gray-800">
          {isSubmitting ? 'Enviando...' : 'Publicar Reseña'}
        </Button>
      </div>
    </form>
  )
}
