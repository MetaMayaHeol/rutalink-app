import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-static'

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('footer')

  const content = {
    es: (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar MySenda, usted acepta estar legalmente vinculado por estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Descripción del Servicio</h2>
          <p>
            MySenda es una plataforma digital que facilita la conexión entre viajeros y guías turísticos locales. Actuamos únicamente como un directorio y facilitador de contacto. MySenda es una herramienta tecnológica independiente y no agencia de viajes ni operador turístico.
          </p>
          <p className="mt-2">
            No organizamos ni controlamos los tours ofrecidos por los guías. La contratación de servicios es un acuerdo directo entre el viajero y el guía.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Cuentas de Usuario</h2>
          <p>
            Para acceder a ciertas funciones, puede que necesite registrarse. Usted es responsable de mantener la confidencialidad de su cuenta y de toda la actividad que ocurra bajo ella. Debe proporcionar información precisa y actualizada.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Conducta del Usuario</h2>
          <p>Usted se compromete a no utilizar el servicio para:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Publicar contenido falso, inexacto o engañoso.</li>
            <li>Acosar, amenazar o difamar a otros usuarios o guías.</li>
            <li>Infringir derechos de propiedad intelectual o privacidad.</li>
            <li>Realizar actividades fraudulentas o ilegales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Responsabilidades de los Guías</h2>
          <p>
            Los guías son profesionales independientes responsables de la calidad, seguridad y legalidad de sus servicios. MySenda verifica ciertos datos, pero no garantiza el desempeño de ningún guía.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Limitación de Responsabilidad</h2>
          <p>
            MySenda <strong>no será responsable</strong> de ningún daño, lesión, pérdida o disputa que surja de las interacciones o transacciones entre usuarios y guías. Cualquier reclamo relacionado con un tour debe dirigirse al guía correspondiente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Pagos</h2>
          <p>
            La mayoría de las transacciones se acuerdan y realizan directamente entre el viajero y el guía (ej. pago en efectivo o transferencia directa). MySenda no cobra comisiones por estas transacciones directas y no es responsable de procesar estos pagos ni de emitir reembolsos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de la plataforma (diseño, logotipos, texto) es propiedad de MySenda o de sus licenciantes y está protegido por derechos de autor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Ley Aplicable</h2>
          <p>
            Estos términos se regirán e interpretarán de acuerdo con las leyes de México. Cualquier disputa se someterá a la jurisdicción exclusiva de los tribunales competentes en dicha jurisdicción.
          </p>
        </section>
      </div>
    ),
    fr: (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptation des conditions</h2>
          <p>
            En accédant et en utilisant MySenda, vous acceptez d'être légalement lié par ces Conditions d'Utilisation. Si vous n'êtes pas d'accord avec une partie de ces conditions, vous ne devez pas utiliser nos services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Description du service</h2>
          <p>
            MySenda est une plateforme numérique qui facilite la mise en relation entre les voyageurs et les guides touristiques locaux. Nous agissons uniquement en tant qu'annuaire et facilitateur de contact. MySenda est un outil technologique indépendant et non une agence de voyages ou un voyagiste.
          </p>
          <p className="mt-2">
            Nous n'organisons ni ne contrôlons les visites proposées par les guides. La réservation de services est un accord direct entre le voyageur et le guide.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Comptes utilisateurs</h2>
          <p>
            Pour accéder à certaines fonctionnalités, vous devrez peut-être vous inscrire. Vous êtes responsable du maintien de la confidentialité de votre compte et de toute activité s'y déroulant. Vous devez fournir des informations exactes et à jour.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Conduite de l'utilisateur</h2>
          <p>Vous vous engagez à ne pas utiliser le service pour :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Publier du contenu faux, inexact ou trompeur.</li>
            <li>Harceler, menacer ou diffamer d'autres utilisateurs ou guides.</li>
            <li>Enfreindre les droits de propriété intellectuelle ou la vie privée.</li>
            <li>Mener des activités frauduleuses ou illégales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Responsabilités des guides</h2>
          <p>
             Les guides sont des professionnels indépendants responsables de la qualité, de la sécurité et de la légalité de leurs services. MySenda vérifie certaines données mais ne garantit pas la performance d'un guide.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Limitation de responsabilité</h2>
          <p>
            MySenda <strong>ne sera pas responsable</strong> des dommages, blessures, pertes ou litiges découlant des interactions ou des transactions entre les utilisateurs et les guides. Toute réclamation liée à une visite doit être adressée au guide concerné.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Paiements</h2>
          <p>
            La plupart des transactions sont convenues et effectuées directement entre le voyageur et le guide (par exemple, paiement en espèces ou virement direct). MySenda ne facture pas de commission pour ces transactions directes et n'est pas responsable du traitement de ces paiements ni de l'émission de remboursements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de la plateforme (design, logos, textes) est la propriété de MySenda ou de ses concédants et est protégé par le droit d'auteur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Loi applicable</h2>
          <p>
            Ces conditions seront régies et interprétées conformément aux lois du Mexique. Tout litige sera soumis à la compétence exclusive des tribunaux compétents de cette juridiction.
          </p>
        </section>
      </div>
    ),
    en: (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using MySenda, you agree to be legally bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
          <p>
            MySenda is a digital platform that facilitates the connection between travelers and local tour guides. We act solely as a directory and contact facilitator. MySenda is an independent technological tool and not a travel agency or tour operator.
          </p>
          <p className="mt-2">
            We do not organize or control the tours offered by guides. Booking services is a direct agreement between the traveler and the guide.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
          <p>
            To access certain features, you may need to register. You are responsible for maintaining the confidentiality of your account and all activity occurring under it. You must provide accurate and up-to-date information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. User Conduct</h2>
          <p>You agree not to use the service to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Post false, inaccurate, or misleading content.</li>
            <li>Harass, threaten, or defame other users or guides.</li>
            <li>Infringe intellectual property rights or privacy.</li>
            <li>Engage in fraudulent or illegal activities.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Guide Responsibilities</h2>
          <p>
             Guides are independent professionals responsible for the quality, safety, and legality of their services. MySenda verifies certain data but does not guarantee the performance of any guide.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
          <p>
            MySenda <strong>shall not be liable</strong> for any damages, injuries, losses, or disputes arising from interactions or transactions between users and guides. Any claim related to a tour must be directed to the relevant guide.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Payments</h2>
          <p>
            Most transactions are agreed upon and made directly between the traveler and the guide (e.g., cash payment or direct transfer). MySenda does not charge commissions for these direct transactions and is not responsible for processing these payments or issuing refunds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Intellectual Property</h2>
          <p>
            All platform content (design, logos, text) is owned by MySenda or its licensors and is protected by copyright.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Applicable Law</h2>
          <p>
            These terms shall be governed and interpreted in accordance with the laws of Mexico. Any dispute shall be submitted to the exclusive jurisdiction of the competent courts in that jurisdiction.
          </p>
        </section>
      </div>
    )
  }

  const selectedContent = locale === 'en' ? content.en : (locale === 'fr' ? content.fr : content.es)

  return (
    <div className="container mx-auto px-5 py-24">
      <h1 className="text-3xl font-bold mb-8">{t('terms')}</h1>
      <div className="prose max-w-none text-gray-700">
        <p className="text-sm text-gray-500 mb-8">
          {locale === 'fr' ? 'Dernière mise à jour :' : 'Última actualización:'} {new Date().toLocaleDateString(locale)}
        </p>
        {selectedContent}
      </div>
    </div>
  )
}
