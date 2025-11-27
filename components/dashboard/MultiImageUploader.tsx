'use client'

import { ImageUploader } from './ImageUploader'
import { Label } from '@/components/ui/label'

interface MultiImageUploaderProps {
  values: string[]
  onChange: (urls: string[]) => void
  bucket: string
  path: string
  maxPhotos?: number
}

export function MultiImageUploader({ 
  values = [], 
  onChange, 
  bucket, 
  path, 
  maxPhotos = 3 
}: MultiImageUploaderProps) {
  
  const handleUpdate = (index: number, url: string) => {
    const newValues = [...values]
    if (url) {
      newValues[index] = url
    } else {
      // Remove the item if url is empty (delete)
      newValues.splice(index, 1)
    }
    onChange(newValues)
  }

  const handleAdd = (url: string) => {
    if (url) {
      onChange([...values, url])
    }
  }

  return (
    <div className="space-y-2">
      <Label>Fotos del servicio ({values.length}/{maxPhotos})</Label>
      <div className="flex flex-wrap gap-4">
        {/* Existing photos */}
        {values.map((url, index) => (
          <ImageUploader
            key={`${url}-${index}`}
            value={url}
            onChange={(newUrl) => handleUpdate(index, newUrl)}
            bucket={bucket}
            path={path}
          />
        ))}

        {/* Add new photo button (if below limit) */}
        {values.length < maxPhotos && (
          <ImageUploader
            onChange={handleAdd}
            bucket={bucket}
            path={path}
          />
        )}
      </div>
    </div>
  )
}
