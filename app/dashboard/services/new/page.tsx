import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ServiceForm } from '@/components/dashboard/ServiceForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function NewServicePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-5 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ChevronLeft size={24} />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex-1">Nuevo servicio</h1>
      </div>

      <div className="p-5 max-w-md mx-auto">
        <ServiceForm userId={user.id} />
      </div>
    </div>
  )
}
