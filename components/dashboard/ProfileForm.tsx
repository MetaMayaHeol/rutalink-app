'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, type ProfileFormValues } from '@/lib/utils/validators'
import { updateProfile } from '@/app/dashboard/profile/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageUploader } from '@/components/dashboard/ImageUploader'
import { toast } from 'sonner'
import { SUPPORTED_LANGUAGES } from '@/lib/utils/constants'
import { Loader2 } from 'lucide-react'

interface ProfileFormProps {
  initialData: ProfileFormValues
  userId: string
}

export function ProfileForm({ initialData, userId }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: ProfileFormValues) => {
    setLoading(true)
    try {
      const result = await updateProfile(data)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Perfil actualizado correctamente')
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Photo */}
      <div className="space-y-2">
        <Label>Foto de perfil</Label>
        <ImageUploader
          value={form.watch('photo_url') || ''}
          onChange={(url) => form.setValue('photo_url', url)}
          bucket="guide-photos"
          path={`${userId}/profile`}
        />
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          placeholder="Ej: Carlos Mendoza"
          {...form.register('name')}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
        )}
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Biografía</Label>
        <Textarea
          id="bio"
          placeholder="Cuéntanos sobre ti..."
          rows={4}
          {...form.register('bio')}
        />
        {form.formState.errors.bio && (
          <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>
        )}
        <p className="text-xs text-gray-500 text-right">
          {form.watch('bio')?.length || 0}/300 caracteres
        </p>
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          placeholder="+52 984 123 4567"
          {...form.register('whatsapp')}
        />
        <p className="text-xs text-gray-500">
          Formato internacional requerido (ej: +52...)
        </p>
        {form.formState.errors.whatsapp && (
          <p className="text-sm text-red-500">{form.formState.errors.whatsapp.message}</p>
        )}
      </div>

      {/* Language */}
      <div className="space-y-2">
        <Label>Idioma principal</Label>
        <Select
          defaultValue={initialData.language}
          onValueChange={(value: any) => form.setValue('language', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.language && (
          <p className="text-sm text-red-500">{form.formState.errors.language.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 font-bold h-12" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando...
          </>
        ) : (
          'Guardar cambios'
        )}
      </Button>
    </form>
  )
}
