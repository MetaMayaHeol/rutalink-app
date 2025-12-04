"use client"

import * as React from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface MultiSelectOption {
  label: string
  value: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Sélectionner...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value]
    onChange(newSelected)
    setInputValue("") // Reset search after selection
  }

  const handleCreate = () => {
    if (inputValue && !selected.includes(inputValue)) {
      onChange([...selected, inputValue])
      setInputValue("")
    }
  }

  const handleRemove = (value: string) => {
    onChange(selected.filter((item) => item !== value))
  }

  // Filter options based on input
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            type="button" // Important: prevent form submission
          >
            {selected.length > 0
              ? `${selected.length} sélectionné${selected.length > 1 ? 's' : ''}`
              : placeholder}
            <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Rechercher ou ajouter..." 
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandEmpty>
              <div className="p-2">
                <p className="text-sm text-muted-foreground mb-2">Aucune ville trouvée.</p>
                {inputValue && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={handleCreate}
                    type="button"
                  >
                    <span className="mr-2">+</span>
                    Ajouter "{inputValue}"
                  </Button>
                )}
              </div>
            </CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleSelect(option.value)}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selected.includes(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected items as badges */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((value) => {
            const option = options.find((opt) => opt.value === value)
            return (
              <Badge
                key={value}
                variant="secondary"
                className="gap-1 pr-1"
              >
                {option?.label || value}
                <button
                  type="button"
                  onClick={() => handleRemove(value)}
                  className="ml-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
