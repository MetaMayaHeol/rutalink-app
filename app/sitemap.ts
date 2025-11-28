import { MetadataRoute } from 'next'
import { createStaticClient } from '@/lib/supabase/static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://rutalink-app.vercel.app'
  const supabase = createStaticClient()

  // Fetch all public links (guide profiles)
  const { data: publicLinks } = await supabase
    .from('public_links')
    .select('slug, updated_at')
    .order('updated_at', { ascending: false })

  // Fetch all active services
  const { data: services } = await supabase
    .from('services')
    .select('id, updated_at')
    .eq('active', true)
    .order('updated_at', { ascending: false })

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/explorar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Guide profiles
  const guidePages: MetadataRoute.Sitemap = (publicLinks || []).map((link) => ({
    url: `${baseUrl}/g/${link.slug}`,
    lastModified: new Date(link.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Services
  const servicePages: MetadataRoute.Sitemap = (services || []).map((service) => ({
    url: `${baseUrl}/s/${service.id}`,
    lastModified: new Date(service.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...guidePages, ...servicePages]
}
