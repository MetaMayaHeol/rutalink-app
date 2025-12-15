'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceSchema, type ServiceFormValues } from '@/lib/utils/validators'
import { createService, updateService } from '@/app/actions/services'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { MultiImageUploader } from '@/components/dashboard/MultiImageUploader'
import { MultiSelect } from '@/components/ui/multi-select'
import { toast } from 'sonner'
import { LoadingButton } from '@/components/ui/LoadingButton'
import { useRouter } from 'next/navigation'
import { cities as staticCities, type City } from '@/lib/seo/cities'
import { activities } from '@/lib/seo/activities'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { ListInput } from '@/components/dashboard/ListInput'
import { ItineraryInput } from '@/components/dashboard/ItineraryInput'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES, MAX_SERVICE_PHOTOS } from '@/lib/utils/constants'

interface ServiceFormProps {
  initialData?: ServiceFormValues
  serviceId?: string
  userId: string
  cities?: City[]
}

export function ServiceForm({ initialData, serviceId, userId, cities }: ServiceFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const availableCities = cities || staticCities

  const defaultValues: ServiceFormValues = initialData || {
    title: '',
    subtitle: '',
    description: '',
    price: 0,
    duration: 60,
    active: true,
    photos: [],
    locations: [],
    categories: [],
    itinerary: [],
    includes: [],
    excludes: [],
    requirements: [],
    meeting_point: '',
    cancellation_policy: 'flexible',
    max_pax: 10,
    languages: [],
  }

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema) as any,
    defaultValues,
  })

  const onSubmit = async (data: ServiceFormValues) => {
    setLoading(true)
    try {
      let result
      
      if (serviceId) {
        result = await updateService(serviceId, data)
      } else {
        result = await createService(data)
      }

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(serviceId ? 'Servicio actualizado' : 'Servicio creado')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (_error) {
      toast.error('Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  const languageOptions = SUPPORTED_LANGUAGES.map(lang => ({
    label: LANGUAGE_NAMES[lang],
    value: lang
  }))

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="logistics">Itinerario y Logística</TabsTrigger>
            <TabsTrigger value="photos">Fotos</TabsTrigger>
          </TabsList>
          
          {/* General Info */}
          <TabsContent value="general">
            <div className="space-y-6 border p-4 rounded-xl bg-white">
              <div className="space-y-2">
                <Label htmlFor="title">Título del servicio <span className="text-red-500">*</span></Label>
                <Input placeholder="Ej: Tour Cenote Azul" {...form.register('title')} />
                {form.formState.errors.title && <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>}
              </div>

               <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo (Corto y Comercial)</Label>
                <Input placeholder="Ej: Una aventura inolvidable en la selva maya" {...form.register('subtitle')} />
                {form.formState.errors.subtitle && <p className="text-sm text-red-500">{form.formState.errors.subtitle.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categorías <span className="text-red-500">*</span></Label>
                  <MultiSelect
                    options={activities.map(a => ({ label: a.name, value: a.name }))}
                    selected={form.watch('categories') || []}
                    onChange={(selected) => form.setValue('categories', selected)}
                    placeholder="Selecciona categorías..."
                  />
                  {form.formState.errors.categories && <p className="text-sm text-red-500">{form.formState.errors.categories.message}</p>}
                </div>
                 <div className="space-y-2">
                  <Label>Ciudades <span className="text-red-500">*</span></Label>
                  <MultiSelect
                    options={availableCities.map(c => ({ label: c.name, value: c.name }))}
                    selected={form.watch('locations') || []}
                    onChange={(selected) => form.setValue('locations', selected)}
                    placeholder="Selecciona ciudades..."
                  />
                  {form.formState.errors.locations && <p className="text-sm text-red-500">{form.formState.errors.locations.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio (MXN) <span className="text-red-500">*</span></Label>
                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...form.register('price')} />
                  {form.formState.errors.price && <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duración (minutos) <span className="text-red-500">*</span></Label>
                  <Input type="number" min="15" step="15" placeholder="60" {...form.register('duration')} />
                  {form.formState.errors.duration && <p className="text-sm text-red-500">{form.formState.errors.duration.message}</p>}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Details */}
          <TabsContent value="details">
            <div className="space-y-6 border p-4 rounded-xl bg-white">
               <div className="space-y-2">
                <Label htmlFor="description">Descripción Completa</Label>
                <Textarea 
                  placeholder="Describe detalladamente la experiencia, qué hace único este tour..." 
                  rows={6}
                  className="resize-none"
                  {...form.register('description')} 
                />
                <p className="text-xs text-gray-500 text-right">{form.watch('description')?.length || 0}/2000 caracteres</p>
                {form.formState.errors.description && <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <Label>Idiomas del Tour</Label>
                    <MultiSelect
                      options={languageOptions}
                      selected={form.watch('languages') || []}
                      onChange={(selected) => form.setValue('languages', selected)}
                      placeholder="Selecciona idiomas..."
                    />
                </div>
                <div className="space-y-2">
                  <Label>Máximo de Personas (Max Pax)</Label>
                  <Input type="number" min="1" {...form.register('max_pax')} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Política de Cancelación</Label>
                <Select 
                  onValueChange={(val: any) => form.setValue('cancellation_policy', val)}
                  defaultValue={form.watch('cancellation_policy')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una política" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">Flexible (Reembolso completo 24h antes)</SelectItem>
                    <SelectItem value="moderate">Moderada (Reembolso 50% 24h antes)</SelectItem>
                    <SelectItem value="strict">Estricta (Sin reembolso)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Logistics */}
          <TabsContent value="logistics">
             <div className="space-y-8 border p-4 rounded-xl bg-white">
                <ItineraryInput 
                  values={form.watch('itinerary') || []} 
                  onChange={(val) => form.setValue('itinerary', val)} 
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <ListInput
                    label="¿Qué incluye?"
                    placeholder="Ej: Transporte, Bebidas..."
                    values={form.watch('includes') || []}
                    onChange={(val) => form.setValue('includes', val)}
                  />
                   <ListInput
                    label="¿Qué NO incluye?"
                    placeholder="Ej: Propinas, Souvenirs..."
                    values={form.watch('excludes') || []}
                    onChange={(val) => form.setValue('excludes', val)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <ListInput
                    label="Requisitos / Qué llevar"
                    placeholder="Ej: Traje de baño, Repelente..."
                    values={form.watch('requirements') || []}
                    onChange={(val) => form.setValue('requirements', val)}
                  />
                  <div className="space-y-2">
                     <Label>Punto de Encuentro</Label>
                     <Textarea 
                       placeholder="Dirección exacta o instrucciones para encontrarte..."
                       rows={3}
                       {...form.register('meeting_point')}
                     />
                  </div>
                </div>
             </div>
          </TabsContent>

          {/* Photos */}
           <TabsContent value="photos">
            <div className="space-y-6 border p-4 rounded-xl bg-white">
               <MultiImageUploader
                values={form.watch('photos') || []}
                onChange={(urls) => form.setValue('photos', urls)}
                bucket="guide-photos"
                path={`${userId}/services`}
                maxPhotos={MAX_SERVICE_PHOTOS}
              />
              <p className="text-sm text-gray-500">
                Sube hasta 5 fotos de alta calidad. La primera será la portada.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
           <div className="flex items-center gap-2">
              <Switch
                checked={form.watch('active')}
                onCheckedChange={(checked) => form.setValue('active', checked)}
              />
               <Label>Visible al público</Label>
           </div>
           
           <LoadingButton 
            type="submit" 
            className="bg-green-600 hover:bg-green-700 font-bold px-8"
            loading={loading}
          >
            {serviceId ? 'Guardar Cambios' : 'Publicar Actividad'}
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}
