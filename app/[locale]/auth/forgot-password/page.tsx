'use client'

import { useActionState, useMemo } from 'react'
import { sendPasswordResetEmail } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const dynamic = 'force-dynamic'

const initialState = {
  error: '',
  success: false,
  message: ''
}

export default function ForgotPasswordPage() {
  const [state, action, isPending] = useActionState(sendPasswordResetEmail, initialState)
  
  const origin = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return window.location.origin
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Recuperar contraseña</h1>
          <p className="text-gray-600">
            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        <form action={action} className="space-y-4">
          <input type="hidden" name="origin" value={origin} />
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
              disabled={isPending}
              className="h-12"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-bold"
          >
            {isPending ? 'Enviando...' : 'Enviar enlace'}
          </Button>

          {state?.error && (
            <div className="p-4 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
              {state.error}
            </div>
          )}

          {state?.success && (
            <div className="p-4 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200">
              {state.message}
            </div>
          )}
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          <a href="/auth/login" className="text-green-600 hover:underline font-medium">
            Volver al inicio de sesión
          </a>
        </p>
      </div>
    </div>
  )
}
