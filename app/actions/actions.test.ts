/**
 * Server Actions Integration Tests
 * 
 * These tests mock the Supabase client to test server action logic
 * without hitting the real database.
 * 
 * Note: Uses @ts-expect-error for mock typing due to complex async server action types.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock modules before any imports
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

// Import after mocks
import { createClient } from '@/lib/supabase/server'

// Helper to create mock chain for Supabase queries
function createMockChain(finalValue: any = { data: null, error: null }) {
  return {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue(finalValue),
  }
}

// Helper to mock Supabase client
function mockSupabase(chain: any, withAuth = true) {
  const mock: any = { from: vi.fn(() => chain) }
  if (withAuth) {
    mock.auth = { getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-id' } } }) }
  }
  vi.mocked(createClient).mockResolvedValue(mock)
}

describe('Server Actions - Profile Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should reject profile with short name', async () => {
    mockSupabase(createMockChain())
    const { updateProfile } = await import('./profile')
    
    const result = await updateProfile({
      name: 'J',
      country: 'Mexico',
      languages: ['es'],
    })

    expect(result).toEqual({ error: 'Datos inválidos' })
  })

  it('should reject XSS in profile name', async () => {
    mockSupabase(createMockChain())
    const { updateProfile } = await import('./profile')
    
    const result = await updateProfile({
      name: '<script>alert(1)</script>',
      country: 'Mexico',
      languages: ['es'],
    })

    expect(result).toEqual({ error: 'Datos inválidos' })
  })

  it('should reject empty languages array', async () => {
    mockSupabase(createMockChain())
    const { updateProfile } = await import('./profile')
    
    const result = await updateProfile({
      name: 'John Doe',
      country: 'Mexico',
      languages: [],
    })

    expect(result).toEqual({ error: 'Datos inválidos' })
  })
})

describe('Server Actions - Booking Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should reject invalid UUID', async () => {
    mockSupabase(createMockChain(), false)
    const { createBooking } = await import('./booking')
    
    const formData = new FormData()
    formData.append('service_id', 'not-a-uuid')
    formData.append('user_id', 'not-a-uuid')
    formData.append('customer_name', 'Jane')
    formData.append('customer_whatsapp', '+529991234567')
    formData.append('date', '2025-12-25')
    formData.append('time', '10:00')

    const result = await createBooking(null, formData)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Datos inválidos')
  })

  it('should reject invalid WhatsApp number', async () => {
    mockSupabase(createMockChain(), false)
    const { createBooking } = await import('./booking')
    
    const formData = new FormData()
    formData.append('service_id', '123e4567-e89b-12d3-a456-426614174000')
    formData.append('user_id', '123e4567-e89b-12d3-a456-426614174001')
    formData.append('customer_name', 'Jane Doe')
    formData.append('customer_whatsapp', 'abc') // Invalid - not a number format at all
    formData.append('date', '2025-12-25')
    formData.append('time', '10:00')

    const result = await createBooking(null, formData)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Datos inválidos')
  })

  it('should reject XSS in customer name', async () => {
    mockSupabase(createMockChain(), false)
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

  it('should reject double booking', async () => {
    mockSupabase(createMockChain({ data: { id: 'existing' }, error: null }), false)
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
})

describe('Server Actions - Reviews Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch approved reviews', async () => {
    const mockReviews = [
      { id: '1', reviewer_name: 'Alice', rating: 5, comment: 'Great!', approved: true },
    ]
    const chain = createMockChain()
    chain.order = vi.fn().mockResolvedValue({ data: mockReviews, error: null })
    mockSupabase(chain, false)
    
    const { getReviews } = await import('./reviews')
    const result = await getReviews('test-guide-id')

    expect(result).toHaveLength(1)
    expect(result[0].reviewer_name).toBe('Alice')
  })

  it('should reject short comment', async () => {
    mockSupabase(createMockChain(), false)
    const { submitReview } = await import('./reviews')
    
    const formData = new FormData()
    formData.append('guideId', '123e4567-e89b-12d3-a456-426614174000')
    formData.append('reviewerName', 'Carlos')
    formData.append('rating', '5')
    formData.append('comment', 'Good') // Min 10 chars

    const result = await submitReview(formData)
    expect(result.error).toBeDefined()
  })

  it('should reject invalid rating', async () => {
    mockSupabase(createMockChain(), false)
    const { submitReview } = await import('./reviews')
    
    const formData = new FormData()
    formData.append('guideId', '123e4567-e89b-12d3-a456-426614174000')
    formData.append('reviewerName', 'Carlos')
    formData.append('rating', '10') // Max is 5
    formData.append('comment', 'This was an amazing experience!')

    const result = await submitReview(formData)
    expect(result.error).toBeDefined()
  })

  it('should reject short reviewer name', async () => {
    mockSupabase(createMockChain(), false)
    const { submitReview } = await import('./reviews')
    
    const formData = new FormData()
    formData.append('guideId', '123e4567-e89b-12d3-a456-426614174000')
    formData.append('reviewerName', 'A') // Min 2 chars
    formData.append('rating', '5')
    formData.append('comment', 'This was an amazing experience!')

    const result = await submitReview(formData)
    expect(result.error).toBeDefined()
  })
})
