/**
 * Add a cache-busting parameter to an image URL
 * This forces the browser to reload the image when it changes
 */
export function addCacheBuster(url: string | null | undefined): string | null {
  if (!url) return null
  
  // Don't add cache buster to external URLs (like Unsplash)
  if (url.includes('unsplash.com')) return url
  
  // Add timestamp as query parameter
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}t=${Date.now()}`
}

/**
 * Get cache-busted URL for Supabase storage images
 * Uses a more stable approach based on last modified time if available
 */
export function getImageUrl(url: string | null | undefined, lastModified?: string | Date): string | null {
  if (!url) return null
  
  // Don't modify external URLs
  if (url.includes('unsplash.com')) return url
  
  // Use last modified time if available, otherwise use current time
  const timestamp = lastModified 
    ? new Date(lastModified).getTime() 
    : Date.now()
  
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}v=${timestamp}`
}
