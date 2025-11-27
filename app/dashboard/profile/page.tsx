import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/dashboard/ProfileForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  let profile = (await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()).data

  // If profile doesn't exist, create it (fallback if trigger didn't fire)
  if (!profile) {
    const { data: newProfile, error } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email!,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating profile:', error)
      return <div className="p-5 text-red-600">Error al crear el perfil. Por favor contacta soporte.</div>
    }

    profile = newProfile
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-5 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ChevronLeft size={24} />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex-1">Mi perfil</h1>
      </div>

      <div className="p-5 max-w-md mx-auto">
        <ProfileForm 
          initialData={{
            name: profile.name || '',
            bio: profile.bio || '',
            whatsapp: profile.whatsapp || '',
            language: profile.language || 'es',
            photo_url: profile.photo_url || '',
          }}
          userId={user.id}
        />
      </div>
    </div>
  )
}
