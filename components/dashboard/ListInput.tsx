'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ListInputProps {
  label: string
  placeholder?: string
  values: string[]
  onChange: (values: string[]) => void
  emptyMessage?: string
}

export function ListInput({ label, placeholder, values = [], onChange, emptyMessage }: ListInputProps) {
  const [newValue, setNewValue] = useState('')

  const handleAdd = () => {
    if (newValue.trim()) {
      onChange([...values, newValue.trim()])
      setNewValue('')
    }
  }

  const handleRemove = (index: number) => {
    const newValues = [...values]
    newValues.splice(index, 1)
    onChange(newValues)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      <div className="flex gap-2">
        <Input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || 'Escribe y presiona Enter...'}
        />
        <Button type="button" onClick={handleAdd} variant="secondary" size="icon">
          <Plus size={18} />
        </Button>
      </div>

      <div className="space-y-2">
        {values.length === 0 && (
          <p className="text-sm text-gray-400 italic">{emptyMessage || 'No hay elementos'}</p>
        )}
        
        {values.map((value, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md border text-sm group">
            <span>{value}</span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
