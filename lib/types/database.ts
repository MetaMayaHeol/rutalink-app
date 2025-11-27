export interface User {
  id: string
  email: string
  name: string | null
  bio: string | null
  whatsapp: string | null
  photo_url: string | null
  language: 'es' | 'en' | 'fr'
  created_at: string
}

export interface Service {
  id: string
  user_id: string
  title: string
  description: string
  price: number
  duration: number // in minutes
  active: boolean
  created_at: string
}

export interface ServicePhoto {
  id: string
  service_id: string
  url: string
  order: number
}

export interface GuidePhoto {
  id: string
  user_id: string
  url: string
  order: number
}

export interface Availability {
  id: string
  user_id: string
  weekday: number // 0-6 (Monday-Sunday)
  active: boolean
}

export interface TimeSlot {
  id: string
  user_id: string
  time: string
  active: boolean
}

export interface PublicLink {
  id: string
  user_id: string
  slug: string
}

export interface Analytics {
  id: string
  user_id: string
  page_type: string
  views: number
  date: string
}

// Extended types with relations
export interface ServiceWithPhotos extends Service {
  photos: ServicePhoto[]
}

export interface GuideProfile extends User {
  photos: GuidePhoto[]
  services: ServiceWithPhotos[]
  public_link: PublicLink | null
}
