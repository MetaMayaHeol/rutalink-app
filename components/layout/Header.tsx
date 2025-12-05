"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, MapPin, Compass, Globe } from 'lucide-react'
import { cities } from '@/lib/seo/cities'
import { activities } from '@/lib/seo/activities'
import { useTranslations, useLocale } from 'next-intl'
import { locales } from '@/lib/i18n/config'

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  
  // Get path without locale prefix for language switching
  const pathWithoutLocale = pathname.replace(/^\/(es|fr)/, '') || '/'
  
  // Group cities by state
  const yucatan = cities.filter(c => c.state === 'Yucatán')
  const quintanaRoo = cities.filter(c => c.state === 'Quintana Roo')
  const campeche = cities.filter(c => c.state === 'Campeche')

  // Language names
  const languageNames: Record<string, string> = {
    es: 'Español',
    fr: 'Français',
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-5">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-green-600 transition-colors">
            <Compass className="text-green-600" size={28} />
            RutaLink
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Destinations Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  {t('destinations')}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="text-xs text-gray-500 uppercase">Yucatán</DropdownMenuLabel>
                {yucatan.map((city) => (
                  <DropdownMenuItem key={city.slug} asChild>
                    <Link href={`/${locale}/ciudad/${city.slug}`} className="cursor-pointer">
                      <MapPin size={14} className="mr-2 text-gray-400" />
                      {city.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                
                {quintanaRoo.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-gray-500 uppercase">Quintana Roo</DropdownMenuLabel>
                    {quintanaRoo.map((city) => (
                      <DropdownMenuItem key={city.slug} asChild>
                        <Link href={`/${locale}/ciudad/${city.slug}`} className="cursor-pointer">
                          <MapPin size={14} className="mr-2 text-gray-400" />
                          {city.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}

                {campeche.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-gray-500 uppercase">Campeche</DropdownMenuLabel>
                    {campeche.map((city) => (
                      <DropdownMenuItem key={city.slug} asChild>
                        <Link href={`/${locale}/ciudad/${city.slug}`} className="cursor-pointer">
                          <MapPin size={14} className="mr-2 text-gray-400" />
                          {city.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Activities Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  {t('activities')}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {activities.map((activity) => (
                  <DropdownMenuItem key={activity.slug} asChild>
                    <Link href={`/${locale}/actividad/${activity.slug}`} className="cursor-pointer">
                      {activity.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Guides Link */}
            <Link href={`/${locale}/explorar`}>
              <Button variant="ghost">
                {t('guides')}
              </Button>
            </Link>
          </nav>

          {/* CTA Buttons + Language Switcher */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Globe size={16} />
                  <span className="hidden sm:inline">{languageNames[locale]}</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map((loc) => (
                  <DropdownMenuItem key={loc} asChild>
                    <Link 
                      href={`/${loc}${pathWithoutLocale}`} 
                      className={`cursor-pointer ${loc === locale ? 'font-bold text-green-600' : ''}`}
                    >
                      {languageNames[loc]}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={`/${locale}/auth/login`} className="hidden sm:block">
              <Button variant="outline" size="sm">
                {t('becomeGuide')}
              </Button>
            </Link>
            <Link href={`/${locale}/explorar`}>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                {t('findGuide')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
