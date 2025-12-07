'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { generateWhatsAppLink, openWhatsApp } from '@/lib/whatsapp'
import { CalendarIcon, Clock, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

import { trackWhatsappClick } from '@/lib/actions/analytics'

interface BookingSectionProps {
  serviceName: string
  whatsapp: string
  availableWeekdays: number[]
  availableTimeslots: string[]
  guideId: string
  serviceId: string
}

export function BookingSection({ 
  serviceName, 
  whatsapp, 
  availableWeekdays, 
  availableTimeslots,
  guideId,
  serviceId
}: BookingSectionProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()

  const handleBooking = () => {
    if (!date || !time) return

    // Track click
    trackWhatsappClick('service', guideId, serviceId)
      .catch(err => console.error('Error tracking booking click:', err))

    const formattedDate = format(date, 'd MMM yyyy', { locale: es })
    const link = generateWhatsAppLink(whatsapp, serviceName, formattedDate, time)
    openWhatsApp(link)
  }

  // Disable dates that are not in availableWeekdays
  const isDateDisabled = (date: Date) => {
    // getDay() returns 0 for Sunday, 1 for Monday...
    // Our DB uses 0 for Monday, 6 for Sunday (from constants.ts WEEKDAYS)
    // So we need to map JS getDay() to our system
    // JS: 0=Sun, 1=Mon, ..., 6=Sat
    // Ours: 0=Mon, ..., 5=Sat, 6=Sun
    
    const jsDay = date.getDay()
    const ourDay = jsDay === 0 ? 6 : jsDay - 1
    
    return !availableWeekdays.includes(ourDay) || date < new Date()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Reserva tu lugar</h3>
        
        {/* Date Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Fecha</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={isDateDisabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Slots */}
        {date && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Horario</label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimeslots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={cn(
                    "py-2 px-3 rounded-lg text-sm font-medium border transition-colors",
                    time === slot
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <Button 
          onClick={handleBooking}
          disabled={!date || !time}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold h-12 text-lg gap-2"
        >
          <Send size={20} />
          Reservar por WhatsApp
        </Button>
      </div>
    </div>
  )
}
