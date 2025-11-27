/**
 * Generates a WhatsApp link with pre-filled message
 * @param phoneNumber - Phone number in international format (+52...)
 * @param serviceName - Name of the service
 * @param date - Optional date string
 * @param time - Optional time string
 * @returns WhatsApp URL with encoded message
 */
export function generateWhatsAppLink(
  phoneNumber: string,
  serviceName: string,
  date?: string,
  time?: string
): string {
  // Remove + and spaces from phone number
  const cleanPhone = phoneNumber.replace(/[\s+]/g, '')
  
  // Build message
  let message = `Hola! Estoy interesado en el tour: "${serviceName}".`
  
  if (date) {
    message += `\nFecha: ${date}`
  }
  
  if (time) {
    message += `\nHorario: ${time}`
  }
  
  // URL encode the message
  const encodedMessage = encodeURIComponent(message)
  
  // Return WhatsApp URL
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

/**
 * Detects if user is on mobile device
 * @returns true if mobile, false otherwise
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Opens WhatsApp with fallback to web version
 * @param url - WhatsApp URL
 */
export function openWhatsApp(url: string): void {
  if (isMobile()) {
    // On mobile, open WhatsApp app directly
    window.location.href = url
  } else {
    // On desktop, open WhatsApp Web in new tab
    const webUrl = url.replace('https://wa.me/', 'https://web.whatsapp.com/send?phone=')
    window.open(webUrl, '_blank')
  }
}
