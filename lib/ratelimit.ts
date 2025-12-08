import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

// Prevent instantiation if env vars are missing during build/dev without KV
const isKvConfigured = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN

export const authRateLimit = isKvConfigured
  ? new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 requests per minute
      analytics: true,
      prefix: 'ratelimit:auth',
    })
  : {
      // Mock implementation if KV not configured
      limit: async () => ({ success: true, limit: 10, remaining: 10, reset: 0 }),
    }

export const apiRateLimit = isKvConfigured
  ? new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(60, '60 s'), // 60 requests per minute
      analytics: true,
      prefix: 'ratelimit:api',
    })
  : {
      limit: async () => ({ success: true, limit: 60, remaining: 60, reset: 0 }),
    }
