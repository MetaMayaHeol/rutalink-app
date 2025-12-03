import { MetadataRoute } from 'next'
import { createStaticClient } from '@/lib/supabase/static'
import { cities } from '@/lib/seo/cities'
import { activities } from '@/lib/seo/activities'

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
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cancellation-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // City pages (SEO landing pages)
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/ciudad/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Activity pages (SEO landing pages)
  const activityPages: MetadataRoute.Sitemap = activities.map((activity) => ({
    url: `${baseUrl}/actividad/${activity.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Guide profiles
  const guidePages: MetadataRoute.Sitemap = (publicLinks || []).map((link) => ({
    url: `${baseUrl}/g/${link.slug}`,
    lastModified: new Date(link.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Services
  const servicePages: MetadataRoute.Sitemap = (services || []).map((service) => ({
    url: `${baseUrl}/s/${service.id}`,
    lastModified: new Date(service.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...cityPages, ...activityPages, ...guidePages, ...servicePages]
}

