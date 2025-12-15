'use client'

import { useMemo } from 'react'

interface PublicLinkDisplayProps {
  slug: string | null
}

export function PublicLinkDisplay({ slug }: PublicLinkDisplayProps) {
  const displayUrl = useMemo(() => {
    if (!slug) return ''
    // Use SSR-safe fallback, will be hydrated on client
    const appUrl = typeof window !== 'undefined' 
      ? (process.env.NEXT_PUBLIC_APP_URL || window.location.origin)
      : (process.env.NEXT_PUBLIC_APP_URL || 'https://mysenda.com')
    const cleanUrl = appUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    return `${cleanUrl}/g/${slug}`
  }, [slug])

  if (!slug) {
    return <span>Configura tu perfil para obtener tu enlace</span>
  }

  if (!displayUrl) {
    return <span>Cargando...</span>
  }

  return <span>{displayUrl}</span>
}
