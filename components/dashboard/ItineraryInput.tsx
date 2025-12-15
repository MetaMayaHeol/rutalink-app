'use client'

import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ItineraryItem {
  title: string
  description?: string
  duration?: string
}

interface ItineraryInputProps {
  values: ItineraryItem[]
  onChange: (values: ItineraryItem[]) => void
}

export function ItineraryInput({ values = [], onChange }: ItineraryInputProps) {
  const handleAdd = () => {
    onChange([...values, { title: '', description: '', duration: '' }])
  }

  const handleRemove = (index: number) => {
    const newValues = [...values]
    newValues.splice(index, 1)
    onChange(newValues)
  }

  const handleChange = (index: number, field: keyof ItineraryItem, value: string) => {
    const newValues = [...values]
    newValues[index] = { ...newValues[index], [field]: value }
    onChange(newValues)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Label className="text-base">Itinerario</Label>
        <Button type="button" onClick={handleAdd} variant="outline" size="sm" className="gap-2">
          <Plus size={16} />
          Agregar Parada
        </Button>
      </div>

      {values.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed rounded-xl bg-gray-50 text-gray-500">
          <p>Describe el flujo del tour paso a paso.</p>
          <Button type="button" variant="link" onClick={handleAdd}>
            Agregar primera parada
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {values.map((item, index) => (
          <div key={index} className="relative p-4 border rounded-xl bg-white shadow-sm space-y-3">
            <div className="absolute right-2 top-2">
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Eliminar parada"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <div className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                {index + 1}
              </div>
              <Input
                placeholder="Título de la parada (ej: Encuentro en el muelle)"
                className="font-medium"
                value={item.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-[1fr,120px] gap-3 ml-8">
               <Textarea
                placeholder="Descripción de la actividad en este punto..."
                className="h-20 resize-none text-sm"
                value={item.description || ''}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
              />
              <div className="space-y-1">
                 <Label className="text-xs text-gray-500">Duración</Label>
                 <Input 
                   placeholder="Ej: 30 min" 
                   className="text-sm"
                   value={item.duration || ''}
                   onChange={(e) => handleChange(index, 'duration', e.target.value)}
                 />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
