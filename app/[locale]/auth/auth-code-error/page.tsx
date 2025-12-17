import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function AuthErrorPage() {
  const t = await getTranslations('auth')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('authErrorTitle')}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {t('authErrorDesc')}
        </p>

        <Link href="/auth/login">
          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold h-12">
            {t('tryAgainBtn')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
