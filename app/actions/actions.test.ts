/**
 * Server Actions Integration Tests
 * 
 * These tests mock the Supabase client to test server action logic
 * without hitting the real database.
 */
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

// Mock the modules before importing the actions
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

vi.mock('next/headers', () => ({
  headers: vi.fn(() => Promise.resolve({
    get: (name: string) => name === 'x-forwarded-for' ? '127.0.0.1' : null,
  })),
}))

vi.mock('@/lib/ratelimit', () => ({
  apiRateLimit: {
    limit: vi.fn(() => Promise.resolve({ success: true })),
  },
}))

vi.mock('@/lib/notifications', () => ({
  sendNotification: vi.fn(() => Promise.resolve({ db: true })),
}))

// Helper to create a mock Supabase client
function createMockSupabase(overrides: Record<string, unknown> = {}) {
  const mockBuilder = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
    ...overrides,
  }

  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id' } },
      }),
    },
    from: vi.fn(() => mockBuilder),
    ...overrides,
  }
}

describe('Server Actions - Profile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should update profile successfully', async () => {
    const mockSupabase = createMockSupabase()
    const updateMock = vi.fn().mockReturnValue({
      eq: vi.fn().mockResolvedValue({ error: null }),
    })
    mockSupabase.from = vi.fn((table: string) => {
      if (table === 'users') {
        return { update: updateMock }
      }
      return {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: { slug: 'test-slug', active: true } }),
      }
    })

    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { updateProfile } = await import('./profile')
    
    const result = await updateProfile({
      name: 'John Doe',
      country: 'Mexico',
      languages: ['es', 'en'],
      bio: 'Test bio',
      city: 'Cancun',
      whatsapp: '+521234567890',
      photo_url: '',
    })

    expect(result).toEqual({ success: true })
    expect(mockSupabase.auth.getUser).toHaveBeenCalled()
  })

  it('should reject invalid profile data', async () => {
    const mockSupabase = createMockSupabase()
    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { updateProfile } = await import('./profile')
    
    const result = await updateProfile({
      name: 'J', // Too short
      country: 'Mexico',
      languages: [], // Empty
    } as any)

    expect(result).toEqual({ error: 'Datos inválidos' })
  })

  it('should reject XSS in profile name', async () => {
    const mockSupabase = createMockSupabase()
    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { updateProfile } = await import('./profile')
    
    const result = await updateProfile({
      name: '<script>alert(1)</script>',
      country: 'Mexico',
      languages: ['es'],
    } as any)

    expect(result).toEqual({ error: 'Datos inválidos' })
  })
})

describe('Server Actions - Booking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create booking successfully', async () => {
    const mockSupabase = createMockSupabase()
    mockSupabase.from = vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockResolvedValue({ error: null }),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null }), // No existing booking
    }))

    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { createBooking } = await import('./booking')
    
    const formData = new FormData()
    formData.append('service_id', '123e4567-e89b-12d3-a456-426614174000')
    formData.append('user_id', '123e4567-e89b-12d3-a456-426614174001')
    formData.append('customer_name', 'Jane Doe')
    formData.append('customer_whatsapp', '+529991234567')
    formData.append('date', '2025-12-25')
    formData.append('time', '10:00')

    const result = await createBooking(null, formData)

    expect(result.success).toBe(true)
    expect(result.message).toContain('WhatsApp')
  })

  it('should reject invalid booking data', async () => {
    const mockSupabase = createMockSupabase()
    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { createBooking } = await import('./booking')
    
    const formData = new FormData()
    formData.append('service_id', 'not-a-uuid')
    formData.append('user_id', 'not-a-uuid')
    formData.append('customer_name', 'Jane')
    formData.append('customer_whatsapp', '123') // Invalid
    formData.append('date', '2025-12-25')
    formData.append('time', '10:00')

    const result = await createBooking(null, formData)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Datos inválidos')
  })

  it('should reject double booking', async () => {
    const mockSupabase = createMockSupabase()
    mockSupabase.from = vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: { id: 'existing-booking' } }), // Existing booking
    }))

    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { createBooking } = await import('./booking')
    
    const formData = new FormData()
    formData.append('service_id', '123e4567-e89b-12d3-a456-426614174000')
    formData.append('user_id', '123e4567-e89b-12d3-a456-426614174001')
    formData.append('customer_name', 'Jane Doe')
    formData.append('customer_whatsapp', '+529991234567')
    formData.append('date', '2025-12-25')
    formData.append('time', '10:00')

    const result = await createBooking(null, formData)

    expect(result.success).toBe(false)
    expect(result.error).toContain('no está disponible')
  })

  it('should reject XSS in customer name', async () => {
    const mockSupabase = createMockSupabase()
    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { createBooking } = await import('./booking')
    
    const formData = new FormData()
    formData.append('service_id', '123e4567-e89b-12d3-a456-426614174000')
    formData.append('user_id', '123e4567-e89b-12d3-a456-426614174001')
    formData.append('customer_name', '<script>alert(1)</script>')
    formData.append('customer_whatsapp', '+529991234567')
    formData.append('date', '2025-12-25')
    formData.append('time', '10:00')

    const result = await createBooking(null, formData)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Datos inválidos')
  })
})

describe('Server Actions - Reviews', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch approved reviews', async () => {
    const mockReviews = [
      { id: '1', reviewer_name: 'Alice', rating: 5, comment: 'Great guide!', approved: true },
      { id: '2', reviewer_name: 'Bob', rating: 4, comment: 'Very nice tour', approved: true },
    ]

    const mockSupabase = createMockSupabase()
    mockSupabase.from = vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: mockReviews, error: null }),
    }))

    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { getReviews } = await import('./reviews')
    
    const result = await getReviews('test-guide-id')

    expect(result).toHaveLength(2)
    expect(result[0].reviewer_name).toBe('Alice')
  })

  it('should submit review successfully', async () => {
    const mockSupabase = createMockSupabase()
    mockSupabase.from = vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockResolvedValue({ error: null }),
      eq: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null }), // No existing review
    }))

    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { submitReview } = await import('./reviews')
    
    const formData = new FormData()
    formData.append('guideId', '123e4567-e89b-12d3-a456-426614174000')
    formData.append('reviewerName', 'Carlos')
    formData.append('rating', '5')
    formData.append('comment', 'Excellent tour guide, very knowledgeable!')

    const result = await submitReview(formData)

    expect(result.success).toBe(true)
    expect(result.needsApproval).toBe(true)
  })

  it('should reject duplicate review within 24h', async () => {
    const mockSupabase = createMockSupabase()
    mockSupabase.from = vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ 
        data: { id: 'existing-review', created_at: new Date().toISOString() } 
      }),
    }))

    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { submitReview } = await import('./reviews')
    
    const formData = new FormData()
    formData.append('guideId', '123e4567-e89b-12d3-a456-426614174000')
    formData.append('reviewerName', 'Carlos')
    formData.append('rating', '5')
    formData.append('comment', 'Another great experience!')

    const result = await submitReview(formData)

    expect(result.error).toContain('24 horas')
  })

  it('should reject short reviews', async () => {
    const mockSupabase = createMockSupabase()
    const { createClient } = await import('@/lib/supabase/server')
    ;(createClient as Mock).mockResolvedValue(mockSupabase)

    const { submitReview } = await import('./reviews')
    
    const formData = new FormData()
    formData.append('guideId', '123e4567-e89b-12d3-a456-426614174000')
    formData.append('reviewerName', 'Carlos')
    formData.append('rating', '5')
    formData.append('comment', 'Good') // Too short

    const result = await submitReview(formData)

    expect(result.error).toBeDefined()
  })
})
