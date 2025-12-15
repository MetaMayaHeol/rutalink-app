import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getAnalyticsData } from '@/lib/actions/analytics'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart'
import { ExportButton } from '@/components/dashboard/ExportButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch analytics data
  const rawData = await getAnalyticsData(user.id)

  // Process data for charts and stats
  // Filter only 'view' events for the main charts/counts, unless stated otherwise
  // But wait, older rows might have null event_type (default 'view' added in DB but existing rows valid?)
  // DB default handles new rows. Existing rows: I added NOT NULL DEFAULT 'view', so they should be 'view'.
  
  const views = rawData.filter(d => !d.event_type || d.event_type === 'view')
  const clicks = rawData.filter(d => d.event_type === 'whatsapp_click')

  const totalViews = views.length
  const totalClicks = clicks.length
  const profileViews = views.filter(d => d.page_type === 'profile').length
  const serviceViews = views.filter(d => d.page_type === 'service').length

  // Group by date for chart (last 30 days)
  const viewsByDate = new Map<string, number>()
  const today = new Date()
  
  // Initialize last 30 days with 0
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    viewsByDate.set(dateStr, 0)
  }

  // Fill with actual data (Views only)
  views.forEach(item => {
    const dateStr = new Date(item.created_at).toISOString().split('T')[0]
    if (viewsByDate.has(dateStr)) {
      viewsByDate.set(dateStr, (viewsByDate.get(dateStr) || 0) + 1)
    }
  })

  const chartData = Array.from(viewsByDate.entries()).map(([date, views]) => ({
    date,
    views
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <ExportButton data={rawData} filename={`mysenda-analytics-${new Date().toISOString().split('T')[0]}.csv`} />
      </div>

      <StatsCards 
        totalViews={totalViews}
        profileViews={profileViews}
        serviceViews={serviceViews}
        whatsappClicks={totalClicks}
      />

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Visitas en los últimos 30 días</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AnalyticsChart data={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
