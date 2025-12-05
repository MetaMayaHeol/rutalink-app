'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type AvailabilityData = {
  weekdays: { weekday: number; active: boolean }[]
  timeslots: { time: string; active: boolean }[]
}

export async function saveAvailability(data: AvailabilityData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // 1. Upsert weekdays
  if (data.weekdays.length > 0) {
    const weekdaysToUpsert = data.weekdays.map((d) => ({
      user_id: user.id,
      weekday: d.weekday,
      active: d.active,
    }))

    const { error: weekdaysError } = await supabase
      .from('availability')
      .upsert(weekdaysToUpsert, { onConflict: 'user_id,weekday' })

    if (weekdaysError) {
      console.error('Error updating weekdays:', weekdaysError)
      return { error: 'Error al guardar los días disponibles' }
    }
  }

  // 2. Upsert timeslots
  if (data.timeslots.length > 0) {
    const timeslotsToUpsert = data.timeslots.map((t) => ({
      user_id: user.id,
      time: t.time,
      active: t.active,
    }))

    const { error: timeslotsError } = await supabase
      .from('timeslots')
      .upsert(timeslotsToUpsert, { onConflict: 'user_id,time' })

    if (timeslotsError) {
      console.error('Error updating timeslots:', timeslotsError)
      return { error: 'Error al guardar los horarios' }
    }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/availability')
  
  return { success: true }
}
