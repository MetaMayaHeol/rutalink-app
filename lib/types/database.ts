/**
 * Supabase Database Types
 * Generated from the database schema
 * 
 * Use these types for type-safe Supabase queries
 */

// ============================================
// BASE TABLE TYPES
// ============================================

export interface Database {
  public: {
    Tables: {
      users: {
        Row: UserRow
        Insert: UserInsert
        Update: UserUpdate
      }
      services: {
        Row: ServiceRow
        Insert: ServiceInsert
        Update: ServiceUpdate
      }
      service_photos: {
        Row: ServicePhotoRow
        Insert: ServicePhotoInsert
        Update: ServicePhotoUpdate
      }
      guide_photos: {
        Row: GuidePhotoRow
        Insert: GuidePhotoInsert
        Update: GuidePhotoUpdate
      }
      availability: {
        Row: AvailabilityRow
        Insert: AvailabilityInsert
        Update: AvailabilityUpdate
      }
      timeslots: {
        Row: TimeslotRow
        Insert: TimeslotInsert
        Update: TimeslotUpdate
      }
      public_links: {
        Row: PublicLinkRow
        Insert: PublicLinkInsert
        Update: PublicLinkUpdate
      }
      analytics: {
        Row: AnalyticsRow
        Insert: AnalyticsInsert
        Update: AnalyticsUpdate
      }
      reviews: {
        Row: ReviewRow
        Insert: ReviewInsert
        Update: ReviewUpdate
      }
      cities: {
        Row: CityRow
        Insert: CityInsert
        Update: CityUpdate
      }
      notifications: {
        Row: NotificationRow
        Insert: NotificationInsert
        Update: NotificationUpdate
      }
      bookings: {
        Row: BookingRow
        Insert: BookingInsert
        Update: BookingUpdate
      }
    }
  }
}

// ============================================
// USER TYPES
// ============================================

export interface UserRow {
  id: string
  email: string
  name: string | null
  bio: string | null
  whatsapp: string | null
  photo_url: string | null
  languages: string[]
  city: string | null
  country: string | null
  is_verified: boolean
  onboarding_completed: boolean
  created_at: string
}

export interface UserInsert {
  id: string
  email: string
  name?: string | null
  bio?: string | null
  whatsapp?: string | null
  photo_url?: string | null
  languages?: string[]
  city?: string | null
  country?: string | null
  is_verified?: boolean
  onboarding_completed?: boolean
}

export interface UserUpdate {
  name?: string | null
  bio?: string | null
  whatsapp?: string | null
  photo_url?: string | null
  languages?: string[]
  city?: string | null
  country?: string | null
  is_verified?: boolean
  onboarding_completed?: boolean
}

// ============================================
// SERVICE TYPES
// ============================================

export interface ServiceRow {
  id: string
  user_id: string
  title: string
  subtitle: string | null
  description: string | null
  price: number
  duration: number
  active: boolean
  locations: string[]
  categories: string[]
  itinerary: ItineraryItem[]
  includes: string[]
  excludes: string[]
  requirements: string[]
  meeting_point: string | null
  cancellation_policy: 'flexible' | 'moderate' | 'strict'
  max_pax: number | null
  languages: string[]
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export interface ItineraryItem {
  title: string
  description?: string
  duration?: string
}

export interface ServiceInsert {
  user_id: string
  title: string
  subtitle?: string | null
  description?: string | null
  price: number
  duration: number
  active?: boolean
  locations?: string[]
  categories?: string[]
  itinerary?: ItineraryItem[]
  includes?: string[]
  excludes?: string[]
  requirements?: string[]
  meeting_point?: string | null
  cancellation_policy?: 'flexible' | 'moderate' | 'strict'
  max_pax?: number | null
  languages?: string[]
}

export interface ServiceUpdate {
  title?: string
  subtitle?: string | null
  description?: string | null
  price?: number
  duration?: number
  active?: boolean
  locations?: string[]
  categories?: string[]
  itinerary?: ItineraryItem[]
  includes?: string[]
  excludes?: string[]
  requirements?: string[]
  meeting_point?: string | null
  cancellation_policy?: 'flexible' | 'moderate' | 'strict'
  max_pax?: number | null
  languages?: string[]
  deleted_at?: string | null
}

// ============================================
// SERVICE PHOTOS TYPES
// ============================================

export interface ServicePhotoRow {
  id: string
  service_id: string
  url: string
  order: number
}

export interface ServicePhotoInsert {
  service_id: string
  url: string
  order: number
}

export interface ServicePhotoUpdate {
  url?: string
  order?: number
}

// ============================================
// GUIDE PHOTOS TYPES
// ============================================

export interface GuidePhotoRow {
  id: string
  user_id: string
  url: string
  order: number
}

export interface GuidePhotoInsert {
  user_id: string
  url: string
  order: number
}

export interface GuidePhotoUpdate {
  url?: string
  order?: number
}

// ============================================
// AVAILABILITY TYPES
// ============================================

export interface AvailabilityRow {
  id: string
  user_id: string
  weekday: number
  active: boolean
}

export interface AvailabilityInsert {
  user_id: string
  weekday: number
  active?: boolean
}

export interface AvailabilityUpdate {
  active?: boolean
}

// ============================================
// TIMESLOT TYPES
// ============================================

export interface TimeslotRow {
  id: string
  user_id: string
  time: string
  active: boolean
}

export interface TimeslotInsert {
  user_id: string
  time: string
  active?: boolean
}

export interface TimeslotUpdate {
  active?: boolean
}

// ============================================
// PUBLIC LINKS TYPES
// ============================================

export interface PublicLinkRow {
  id: string
  user_id: string
  slug: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface PublicLinkInsert {
  user_id: string
  slug: string
  active?: boolean
}

export interface PublicLinkUpdate {
  slug?: string
  active?: boolean
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface AnalyticsRow {
  id: string
  user_id: string
  page_type: string
  views: number
  date: string
}

export interface AnalyticsInsert {
  user_id: string
  page_type: string
  views?: number
  date?: string
}

export interface AnalyticsUpdate {
  views?: number
}

// ============================================
// REVIEWS TYPES
// ============================================

export interface ReviewRow {
  id: string
  guide_id: string
  reviewer_name: string
  rating: number
  comment: string | null
  approved: boolean
  reviewer_identifier: string | null
  created_at: string
}

export interface ReviewInsert {
  guide_id: string
  reviewer_name: string
  rating: number
  comment?: string | null
  approved?: boolean
  reviewer_identifier?: string | null
}

export interface ReviewUpdate {
  approved?: boolean
}

// ============================================
// CITIES TYPES
// ============================================

export interface CityRow {
  id: string
  slug: string
  name: string
  state: string | null
  description: string | null
  meta_description: string | null
  hero_image: string | null
  highlights: string[]
  is_active: boolean
  created_at: string
}

export interface CityInsert {
  slug: string
  name: string
  state?: string | null
  description?: string | null
  meta_description?: string | null
  hero_image?: string | null
  highlights?: string[]
  is_active?: boolean
}

export interface CityUpdate {
  name?: string
  state?: string | null
  description?: string | null
  meta_description?: string | null
  hero_image?: string | null
  highlights?: string[]
  is_active?: boolean
}

// ============================================
// NOTIFICATIONS TYPES
// ============================================

export interface NotificationRow {
  id: string
  user_id: string
  type: 'booking_request' | 'info' | 'alert' | 'system'
  title: string
  message: string
  link: string | null
  read: boolean
  created_at: string
}

export interface NotificationInsert {
  user_id: string
  type: 'booking_request' | 'info' | 'alert' | 'system'
  title: string
  message: string
  link?: string | null
  read?: boolean
}

export interface NotificationUpdate {
  read?: boolean
}

// ============================================
// BOOKINGS TYPES
// ============================================

export type BookingStatus = 'pending_confirmation' | 'confirmed' | 'cancelled' | 'completed'

export interface BookingRow {
  id: string
  service_id: string
  user_id: string
  customer_name: string
  customer_whatsapp: string
  date: string
  time: string
  status: BookingStatus
  created_at: string
}

export interface BookingInsert {
  service_id: string
  user_id: string
  customer_name: string
  customer_whatsapp: string
  date: string
  time: string
  status?: BookingStatus
}

export interface BookingUpdate {
  status?: BookingStatus
}

// ============================================
// JOINED/EXTENDED TYPES
// ============================================

/**
 * User with nested public link (from public_links join)
 */
export interface UserWithPublicLink extends UserRow {
  public_link?: PublicLinkRow | null
}

/**
 * Service with photos (from service_photos join)
 */
export interface ServiceWithPhotos extends ServiceRow {
  photos: ServicePhotoRow[]
}

/**
 * Guide profile for public display (guides directory)
 */
export interface GuideProfile {
  slug: string
  name: string | null
  bio: string | null
  photo_url: string | null
  languages: string[] | null
  city: string | null
  country: string | null
  is_verified: boolean | null
}

/**
 * Full guide with all relations (for guide profile page)
 */
export interface FullGuideProfile {
  id: string
  slug: string
  user: UserRow
  services: ServiceWithPhotos[]
  availability: AvailabilityRow[]
  timeslots: TimeslotRow[]
  reviews: ReviewRow[]
}

/**
 * Featured guide response from homepage query
 */
export interface FeaturedGuide {
  slug: string
  user: {
    name: string | null
    bio: string | null
    photo_url: string | null
    languages: string[] | null
    city: string | null
    country: string | null
    is_verified: boolean | null
  } | null
}

// ============================================
// HELPER TYPES
// ============================================

/**
 * Helper type to extract Row type from a table
 */
export type TableRow<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row']

/**
 * Helper type to extract Insert type from a table
 */
export type TableInsert<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert']

/**
 * Helper type to extract Update type from a table
 */
export type TableUpdate<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Update']

// Legacy type aliases for backwards compatibility
export type User = UserRow
export type Service = ServiceRow
export type ServicePhoto = ServicePhotoRow
export type GuidePhoto = GuidePhotoRow
export type Availability = AvailabilityRow
export type TimeSlot = TimeslotRow
export type PublicLink = PublicLinkRow
export type Analytics = AnalyticsRow
export type Review = ReviewRow
export type City = CityRow
export type Notification = NotificationRow
export type Booking = BookingRow
