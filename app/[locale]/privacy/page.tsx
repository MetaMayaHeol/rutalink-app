import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-static'

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('footer')

  const content = {
    es: (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Introducción</h2>
          <p>
            Bienvenido a MySenda. Nos tomamos muy en serio su privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información personal cuando utiliza nuestra plataforma para conectar con guías turísticos locales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Información que Recopilamos</h2>
          <p>Podemos recopilar la siguiente información:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Información de contacto (nombre, número de teléfono para WhatsApp).</li>
            <li>Información de perfil de los guías (fotos, descripción, idiomas).</li>
            <li>Datos de uso y navegación en nuestra plataforma.</li>
            <li>Comunicaciones realizadas a través de nuestras herramientas de contacto.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Uso de la Información</h2>
          <p>Utilizamos su información para:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Facilitar la conexión directa entre viajeros y guías turísticos.</li>
            <li>Mejorar nuestros servicios y la experiencia del usuario.</li>
            <li>Enviar notificaciones importantes sobre su cuenta o servicios.</li>
            <li>Garantizar la seguridad y verificar la identidad de los guías (cuando corresponda).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Compartir Información</h2>
          <p>
            No vendemos su información personal a terceros. Compartimos su información únicamente con:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Guías Turísticos:</strong> Cuando usted decide contactar a un guía, compartimos la información necesaria para facilitar la comunicación (ej. redirigirlo a WhatsApp).</li>
            <li><strong>Proveedores de Servicios:</strong> Que nos ayudan a operar la plataforma (ej. alojamiento web, análisis).</li>
            <li><strong>Autoridades Legales:</strong> Cuando sea requerido por ley.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Seguridad de Datos</h2>
          <p>
            Implementamos medidas de seguridad razonables para proteger su información. Sin embargo, ninguna transmisión por internet es 100% segura, y no podemos garantizar la seguridad absoluta de los datos transmitidos a nuestra plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Sus Derechos</h2>
          <p>
            Usted tiene derecho a acceder, corregir o eliminar su información personal. Si tiene una cuenta de guía, puede editar su perfil directamente. Para otras solicitudes, contáctenos en nuestro canal de soporte.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Cambios en esta Política</h2>
          <p>
            Podemos actualizar esta política ocasionalmente. Le notificaremos sobre cambios significativos publicando la nueva política en esta página.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contacto</h2>
          <p>
            Si tiene preguntas sobre esta política, por favor contáctenos a través de nuestra página de Soporte.
          </p>
        </section>
      </div>
    ),
    fr: (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p>
            Bienvenue sur MySenda. Nous prenons votre vie privée très au sérieux. Cette Politique de Confidentialité décrit comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre plateforme pour entrer en contact avec des guides touristiques locaux.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Informations que nous collectons</h2>
          <p>Nous pouvons collecter les informations suivantes :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Coordonnées (nom, numéro de téléphone pour WhatsApp).</li>
            <li>Informations de profil des guides (photos, description, langues).</li>
            <li>Données d'utilisation et de navigation sur notre plateforme.</li>
            <li>Communications effectuées via nos outils de contact.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Utilisation des informations</h2>
          <p>Nous utilisons vos informations pour :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Faciliter la connexion directe entre les voyageurs et les guides touristiques.</li>
            <li>Améliorer nos services et l'expérience utilisateur.</li>
            <li>Envoyer des notifications importantes concernant votre compte ou nos services.</li>
            <li>Garantir la sécurité et vérifier l'identité des guides (le cas échéant).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Partage des informations</h2>
          <p>
            Nous ne vendons pas vos informations personnelles à des tiers. Nous partageons vos informations uniquement avec :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Guides Touristiques :</strong> Lorsque vous décidez de contacter un guide, nous facilitons la communication (ex. redirection vers WhatsApp).</li>
            <li><strong>Prestataires de services :</strong> Qui nous aident à faire fonctionner la plateforme (ex. hébergement web, analyses).</li>
            <li><strong>Autorités légales :</strong> Lorsque la loi l'exige.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité raisonnables pour protéger vos informations. Cependant, aucune transmission sur Internet n'est sûre à 100 %, et nous ne pouvons garantir la sécurité absolue des données transmises à notre plateforme.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Vos droits</h2>
          <p>
            Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles. Si vous avez un compte guide, vous pouvez modifier votre profil directement. Pour toute autre demande, contactez-nous via notre support.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Modifications de cette politique</h2>
          <p>
            Nous pouvons mettre à jour cette politique occasionnellement. Nous vous informerons des changements importants en publiant la nouvelle politique sur cette page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
          <p>
            Si vous avez des questions concernant cette politique, veuillez nous contacter via notre page Support.
          </p>
        </section>
      </div>
    ),
    en: (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p>
            Welcome to MySenda. We take your privacy very seriously. This Privacy Policy describes how we collect, use, and protect your personal information when you use our platform to connect with local tour guides.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Contact information (name, phone number for WhatsApp).</li>
            <li>Guide profile information (photos, description, languages).</li>
            <li>Usage and navigation data on our platform.</li>
            <li>Communications made through our contact tools.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Use of Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Facilitate direct connection between travelers and tour guides.</li>
            <li>Improve our services and user experience.</li>
            <li>Send important notifications about your account or services.</li>
            <li>Ensure security and verify identity of guides (where applicable).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Information Sharing</h2>
          <p>
            We do not sell your personal information to third parties. We share your information only with:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Tour Guides:</strong> When you decide to contact a guide, we share necessary information to facilitate communication (e.g., redirecting to WhatsApp).</li>
            <li><strong>Service Providers:</strong> Who help us operate the platform (e.g., web hosting, analytics).</li>
            <li><strong>Legal Authorities:</strong> When required by law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no transmission over the internet is 100% secure, and we cannot guarantee absolute security of data transmitted to our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. If you have a guide account, you can edit your profile directly. For other requests, please contact us via our support channel.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Changes to this Policy</h2>
          <p>
            We may update this policy occasionally. We will notify you of significant changes by posting the new policy on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
          <p>
            If you have questions about this policy, please contact us via our Support page.
          </p>
        </section>
      </div>
    )
  }

  const selectedContent = locale === 'en' ? content.en : (locale === 'fr' ? content.fr : content.es)

  return (
    <div className="container mx-auto px-5 py-24">
      <h1 className="text-3xl font-bold mb-8">{t('privacy')}</h1>
      <div className="prose max-w-none text-gray-700">
        <p className="text-sm text-gray-500 mb-8">
          {locale === 'fr' ? 'Dernière mise à jour :' : 'Última actualización:'} {new Date().toLocaleDateString(locale)}
        </p>
        {selectedContent}
      </div>
    </div>
  )
}
