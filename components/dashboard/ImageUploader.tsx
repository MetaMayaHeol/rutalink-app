'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Label } from '@/components/ui/label'
import { Loader2, Upload, X } from 'lucide-react'
import imageCompression from 'browser-image-compression'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  bucket: string
  path: string
}

export function ImageUploader({ value, onChange, bucket, path }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null)
      setUploading(true)

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.')
      }

      const file = e.target.files[0]
      
      // Compress image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: 'image/webp', // Convert to WebP
      }
      
      const compressedFile = await imageCompression(file, options)
      
      const fileExt = 'webp'
      const fileName = `${path}/${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, compressedFile)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
      
      onChange(data.publicUrl)
    } catch (err) {
      const uploadError = err instanceof Error ? err : new Error('Unknown error')
      console.error('Upload error:', uploadError)
      setError(uploadError.message || 'Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-32 h-32">
          <img
            src={value}
            alt="Uploaded image"
            className="w-full h-full object-cover rounded-xl border border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Label
            htmlFor="image-upload"
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 transition-colors"
          >
            {uploading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <>
                <Upload className="h-8 w-8 mb-2" />
                <span className="text-xs font-medium">Subir foto</span>
              </>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </Label>
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
