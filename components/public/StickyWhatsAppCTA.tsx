'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Send, Phone } from 'lucide-react'

interface StickyWhatsAppCTAProps {
  phoneNumber: string
  guideName?: string
}

export function StickyWhatsAppCTA({ phoneNumber, guideName }: StickyWhatsAppCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    // Show button after short delay for better UX
    const showTimer = setTimeout(() => {
      setIsVisible(true)
      // Start pulsing after button appears
      setTimeout(() => setIsPulsing(true), 500)
    }, 1000)

    // Handle scroll to show/hide based on position
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      
      // Hide during scroll for cleaner experience
      setIsPulsing(false)
      
      // Resume pulsing after scroll stops
      scrollTimeout = setTimeout(() => {
        if (window.scrollY > 100) {
          setIsPulsing(true)
        }
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(showTimer)
      clearTimeout(scrollTimeout)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const formattedNumber = phoneNumber.replace(/\D/g, '')
  const message = guideName 
    ? `Hola ${guideName}, me interesa conocer más sobre tus tours.`
    : 'Hola, me interesa conocer más sobre tus tours.'
  
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      style={{
        // Safe area for notched phones
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="container mx-auto px-4 pb-4 pointer-events-auto">
        <div className="max-w-md mx-auto">
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            onClick={() => {
              // Haptic feedback on mobile (if supported)
              if ('vibrate' in navigator) {
                navigator.vibrate(50)
              }
            }}
          >
            <Button 
              className={`
                w-full h-14 md:h-16
                bg-gradient-to-r from-green-600 to-green-500 
                hover:from-green-700 hover:to-green-600
                text-white font-bold text-base md:text-lg
                shadow-2xl shadow-green-600/40
                rounded-full
                transition-all duration-300
                hover:scale-[1.02]
                active:scale-95
                flex items-center justify-center gap-3
                relative overflow-hidden
                ${isPulsing ? 'animate-pulse-shadow' : ''}
              `}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-white/20 to-green-400/0 animate-shimmer" />
              
              {/* Icon with subtle animation */}
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
                  {isPulsing && (
                    <span className="absolute inset-0 animate-ping">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 opacity-75" />
                    </span>
                  )}
                </div>
                
                <span className="relative z-10">
                  Contactar por WhatsApp
                </span>
                
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </Button>
          </Link>
        </div>
      </div>

      {/* Gradient overlay for better visibility over content */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none -z-10" />
    </div>
  )
}
