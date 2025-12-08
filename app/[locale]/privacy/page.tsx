import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-static'

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('footer')

  return (
    <div className="container mx-auto px-5 py-24">
      <h1 className="text-3xl font-bold mb-8">{t('privacy')}</h1>
      <div className="prose max-w-none">
        <p>Last updated: {new Date().toLocaleDateString(locale)}</p>
        <p>This is a placeholder for the Privacy Policy.</p>
        {/* TODO: Add real legal content */}
      </div>
    </div>
  )
}
