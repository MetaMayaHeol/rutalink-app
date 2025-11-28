'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Upload, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

// Allowed MIME types for verification documents
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf'
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes

export default function VerificationPage() {
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'unverified'>('unverified')

  // Check verification status on mount
  useEffect(() => {
    async function checkStatus() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) return

        // Get user's verification status
        const { data: profile } = await supabase
          .from('users')
          .select('is_verified')
          .eq('id', user.id)
          .single()

        if (profile?.is_verified) {
          setVerificationStatus('verified')
        } else {
          // Check if there's a document uploaded (pending)
          const { data: files } = await supabase.storage
            .from('verification-docs')
            .list(user.id)

          if (files && files.length > 0) {
            setVerificationStatus('pending')
          }
        }
      } catch (error) {
        console.error('Error checking verification status:', error)
      } finally {
        setLoading(false)
      }
    }

    checkStatus()
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = e.target.files?.[0]
      if (!file) return

      // Security validation: Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error('Tipo de archivo no permitido. Solo JPG, PNG, WEBP o PDF.')
        return
      }

      // Security validation: Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`Archivo muy grande. Máximo 5MB (tu archivo: ${(file.size / 1024 / 1024).toFixed(2)}MB).`)
        return
      }

      // Additional security: Check file extension
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf']
      if (!fileExt || !allowedExtensions.includes(fileExt)) {
        toast.error('Extensión de archivo no permitida.')
        return
      }

      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('No user found')

      const fileName = `${user.id}/verification_doc_${Date.now()}.${fileExt}`

      // Upload to verification-docs bucket (must be created in Supabase Storage)
      const { error: uploadError } = await supabase.storage
        .from('verification-docs')
        .upload(fileName, file, {
          upsert: true, // Replace if already exists
          contentType: file.type,
        })

      if (uploadError) {
        throw uploadError
      }

      toast.success('Documento subido correctamente. Lo revisaremos pronto.')
      setVerificationStatus('pending')

    } catch (error: any) {
      console.error(error)
      if (error.message?.includes('not found')) {
        toast.error('Error: El bucket de almacenamiento no está configurado. Contacta al administrador.')
      } else if (error.message?.includes('row-level security')) {
        toast.error('Error de permisos. Contacta al administrador.')
      } else {
        toast.error('Error al subir el documento')
      }
    } finally {
      setUploading(false)
      // Reset file input
      e.target.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader title="Verificación de Identidad" />
      
      <div className="max-w-2xl mx-auto p-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-green-600" />
              Obtén tu insignia de Verificado
            </CardTitle>
            <CardDescription>
              La verificación aumenta la confianza de los viajeros y hace que tu perfil destaque.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="text-gray-500 mt-4">Verificando estado...</p>
              </div>
            ) : (
              <>
                {verificationStatus === 'unverified' && (
              <div className="space-y-4">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
                  <h4 className="font-bold mb-1 flex items-center gap-2">
                    <AlertCircle size={16} />
                    Instrucciones
                  </h4>
                  <p className="mb-2">Sube una foto clara de tu identificación oficial (INE, Pasaporte o Licencia). Nos aseguraremos de que coincida con tu perfil.</p>
                  <ul className="list-disc list-inside text-xs space-y-1 mt-2">
                    <li>Formatos permitidos: JPG, PNG, WEBP, PDF</li>
                    <li>Tamaño máximo: 5MB</li>
                    <li>El documento debe ser legible y sin modificaciones</li>
                  </ul>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
                  <Input 
                    type="file" 
                    accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleUpload}
                    disabled={uploading}
                  />
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                      <Upload size={24} />
                    </div>
                    <p className="font-medium text-gray-900">
                      {uploading ? 'Subiendo...' : 'Haz clic para subir tu documento'}
                    </p>
                    <p className="text-xs text-gray-500">JPG, PNG, WEBP o PDF (Máx 5MB)</p>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus === 'pending' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClockIcon />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Verificación en proceso</h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                  Hemos recibido tu documento. Nuestro equipo lo revisará en las próximas 24 horas.
                </p>
              </div>
            )}

            {verificationStatus === 'verified' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">¡Estás verificado!</h3>
                <p className="text-gray-600">
                  Tu perfil ahora muestra la insignia de verificación. ¡Gracias por generar confianza en la comunidad!
                </p>
              </div>
            )}

          </>
        )}

          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
