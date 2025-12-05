import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  
  return {
    title: `${t('title')} - RutaLink`,
    description: t('subtitle'),
  }
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  
  const t = await getTranslations('faq')

  const travelerFAQs = [
    { question: t('travelerQ1'), answer: t('travelerA1') },
    { question: t('travelerQ2'), answer: t('travelerA2') },
    { question: t('travelerQ3'), answer: t('travelerA3') },
    { question: t('travelerQ4'), answer: t('travelerA4') },
    { question: t('travelerQ5'), answer: t('travelerA5') },
    { question: t('travelerQ6'), answer: t('travelerA6') },
  ]

  const guideFAQs = [
    { question: t('guideQ1'), answer: t('guideA1') },
    { question: t('guideQ2'), answer: t('guideA2') },
    { question: t('guideQ3'), answer: t('guideA3') },
    { question: t('guideQ4'), answer: t('guideA4') },
    { question: t('guideQ5'), answer: t('guideA5') },
    { question: t('guideQ6'), answer: t('guideA6') },
  ]

  const technicalFAQs = [
    { question: t('techQ1'), answer: t('techA1') },
    { question: t('techQ2'), answer: t('techA2') },
    { question: t('techQ3'), answer: t('techA3') },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-5">
          <Link href={`/${locale}`}>
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 mb-8">
              <ChevronLeft size={20} />
              {t('backHome')}
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-300">{t('subtitle')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-5 py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Para Viajeros */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                V
              </span>
              {t('forTravelers')}
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {travelerFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`traveler-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Para Guías */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                G
              </span>
              {t('forGuides')}
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {guideFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`guide-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Técnicas */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">
                T
              </span>
              {t('technical')}
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {technicalFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`tech-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Contact CTA */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('noAnswer')}</h3>
            <p className="text-gray-600 mb-6">{t('teamHelp')}</p>
            <Link href={`/${locale}/support`}>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                {t('contactSupport')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
