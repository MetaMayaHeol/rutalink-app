import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-static'

export default async function CancellationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('footer')

  const content = {
    es: (
      <div className="prose max-w-none text-gray-700">
        <p className="lead text-xl mb-8">
          En MySenda, creemos en la transparencia y flexibilidad entre viajeros y guías.
        </p>
        
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Políticas Individuales</h3>
        <p className="mb-6">
          Cada guía turístico en MySenda establece sus propias políticas de cancelación. 
          Al contactar a un guía, te recomendamos confirmar por escrito:
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>El plazo límite para cancelar sin costo.</li>
          <li>Si se requiere un depósito y si es reembolsable.</li>
          <li>Qué sucede en caso de mal clima o fuerza mayor.</li>
        </ul>

        <h3 className="text-2xl font-bold mb-4 text-gray-900">Recomendación General</h3>
        <p className="mb-6">
          Sugerimos siempre acordar los detalles por WhatsApp antes de realizar cualquier pago. 
          Si utilizas nuestro servicio de pago garantizado (cuando esté disponible), aplicarán las políticas estándar de protección al viajero.
        </p>
      </div>
    ),
    fr: (
      <div className="prose max-w-none text-gray-700">
        <p className="lead text-xl mb-8">
          Chez MySenda, nous croyons en la transparence et la flexibilité entre les voyageurs et les guides.
        </p>
        
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Politiques Individuelles</h3>
        <p className="mb-6">
          Chaque guide touristique sur MySenda établit ses propres politiques d'annulation. 
          Lors de la prise de contact avec un guide, nous vous recommandons de confirmer par écrit :
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Le délai limite pour annuler sans frais.</li>
          <li>Si un acompte est requis et s'il est remboursable.</li>
          <li>Ce qui se passe en cas de mauvais temps ou de force majeure.</li>
        </ul>

        <h3 className="text-2xl font-bold mb-4 text-gray-900">Recommandation Générale</h3>
        <p className="mb-6">
          Nous suggérons toujours de convenir des détails par WhatsApp avant d'effectuer tout paiement. 
          Si vous utilisez notre service de paiement garanti (lorsqu'il sera disponible), les politiques standard de protection des voyageurs s'appliqueront.
        </p>
      </div>
    ),
    en: (
      <div className="prose max-w-none text-gray-700">
        <p className="lead text-xl mb-8">
          At MySenda, we believe in transparency and flexibility between travelers and guides.
        </p>
        
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Individual Policies</h3>
        <p className="mb-6">
          Each tour guide on MySenda sets their own cancellation policies. 
          When contacting a guide, we recommend confirming in writing:
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>The deadline to cancel without cost.</li>
          <li>If a deposit is required and if it is refundable.</li>
          <li>What happens in case of bad weather or force majeure.</li>
        </ul>

        <h3 className="text-2xl font-bold mb-4 text-gray-900">General Recommendation</h3>
        <p className="mb-6">
          We always suggest agreeing on details via WhatsApp before making any payment. 
          If you use our guaranteed payment service (when available), standard traveler protection policies will apply.
        </p>
      </div>
    )
  }

  const selectedContent = locale === 'en' ? content.en : (locale === 'fr' ? content.fr : content.es)

  return (
    <div className="container mx-auto px-5 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">{t('cancellationPolicy')}</h1>
      {selectedContent}
    </div>
  )
}
