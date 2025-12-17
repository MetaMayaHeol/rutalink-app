'use client'

import { useActionState } from 'react'
import { updatePassword } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'

export const dynamic = 'force-dynamic'

const initialState = {
  error: '',
  success: false,
  message: ''
}

export default function UpdatePasswordPage() {
  const [state, action, isPending] = useActionState(updatePassword, initialState)
  const t = useTranslations('auth')

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{t('newPasswordTitle')}</h1>
          <p className="text-gray-600">
            {t('newPasswordDesc')}
          </p>
        </div>

        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">{t('newPasswordLabel')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={t('passwordPlaceholder')}
              required
              disabled={isPending}
              className="h-12"
              minLength={8}
            />
            <p className="text-xs text-gray-500">{t('minChars')}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('confirmPasswordLabel')}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder={t('passwordPlaceholder')}
              required
              disabled={isPending}
              className="h-12"
              minLength={8}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-bold"
          >
            {isPending ? t('updating') : t('updatePasswordBtn')}
          </Button>

          {state?.error && (
            <div className="p-4 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
              {state.error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
