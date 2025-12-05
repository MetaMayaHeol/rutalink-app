'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setMessage({
        type: 'success',
        text: '¡Revisa tu email! Te hemos enviado un enlace mágico para iniciar sesión.',
      })
      setEmail('')
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Ocurrió un error. Por favor intenta de nuevo.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="w-20 h-20 bg-green-500 rounded-2xl mx-auto mb-8 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">R</span>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">RutaLink</h1>
        <p className="text-center text-gray-600 mb-8">Crea tu página en 2 minutos</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-12 text-base"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-bold"
          >
            {loading ? 'Enviando...' : 'Recibir enlace mágico'}
          </Button>

          {message && (
            <div
              className={`p-4 rounded-lg text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Un enlace de conexión será enviado a tu email
        </p>
      </div>
    </div>
  )
}
