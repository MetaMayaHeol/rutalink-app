import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL
      
      // Always redirect to update-password page with locale prefix if needed
      // Currently assuming 'fr' or handling via middleware, but let's be safe and use /fr explicitly or rely on middleware 
      // Safest is to redirect to the path and let middleware handle it, or use absolute URL
      
      const targetPath = '/auth/update-password'

      if (baseUrl) {
        return NextResponse.redirect(`${baseUrl}${targetPath}`)
      } else if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${targetPath}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${targetPath}`)
      } else {
        return NextResponse.redirect(`${origin}${targetPath}`)
      }
    } else {
      console.error('Auth error:', error)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
