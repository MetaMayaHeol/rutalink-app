import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-static'

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('footer')

  const content = {
    es: (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web que visita guardan en su ordenador o dispositivo móvil. Se utilizan ampliamente para hacer que los sitios web funcionen, o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. ¿Cómo utilizamos las cookies?</h2>
          <p>Utilizamos cookies para:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio (ej. mantener su sesión activa).</li>
            <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo los visitantes interactúan con el sitio (ej. páginas más visitadas) de forma anónima.</li>
            <li><strong>Cookies de funcionalidad:</strong> Permiten que el sitio recuerde sus preferencias (ej. idioma).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Cookies de terceros</h2>
          <p>
            Podemos utilizar servicios de terceros (como herramientas de análisis) que también pueden establecer cookies en su dispositivo. MySenda no controla estas cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. ¿Cómo controlar las cookies?</h2>
          <p>
            Puede controlar y/o eliminar las cookies según desee. Puede eliminar todas las cookies que ya están en su ordenador y puede configurar la mayoría de los navegadores para que no las acepten. Sin embargo, si hace esto, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y que algunos servicios y funcionalidades no funcionen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Actualizaciones</h2>
          <p>
            Nuestra Política de Cookies puede cambiar ocasionalmente. Le recomendamos revisar esta página periódicamente para estar informado sobre el uso de cookies.
          </p>
        </section>
      </div>
    ),
    fr: (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Qu'est-ce que les cookies ?</h2>
          <p>
            Les cookies sont de petits fichiers texte enregistrés sur votre ordinateur ou appareil mobile par les sites web que vous visitez. Ils sont largement utilisés pour faire fonctionner les sites web, ou pour les faire fonctionner plus efficacement, ainsi que pour fournir des informations aux propriétaires du site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Comment utilisons-nous les cookies ?</h2>
          <p>Nous utilisons des cookies pour :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (ex. maintenir votre session active).</li>
            <li><strong>Cookies de performance :</strong> Nous aident à comprendre comment les visiteurs interagissent avec le site (ex. pages les plus visitées) de manière anonyme.</li>
            <li><strong>Cookies de fonctionnalité :</strong> Permettent au site de se souvenir de vos préférences (ex. langue).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Cookies tiers</h2>
          <p>
            Nous pouvons utiliser des services tiers (comme des outils d'analyse) qui peuvent également placer des cookies sur votre appareil. MySenda ne contrôle pas ces cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Comment contrôler les cookies ?</h2>
          <p>
            Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà présents sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour qu'ils les bloquent. Toutefois, si vous faites cela, vous devrez peut-être ajuster manuellement certaines préférences à chaque visite d'un site et certains services et fonctionnalités peuvent ne pas fonctionner.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Mises à jour</h2>
          <p>
            Notre Politique de Cookies peut changer occasionnellement. Nous vous recommandons de consulter cette page régulièrement pour rester informé de l'utilisation des cookies.
          </p>
        </section>
      </div>
    ),
    en: (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. What are cookies?</h2>
          <p>
            Cookies are small text files that websites you visit save on your computer or mobile device. They are widely used to make websites work, or work more efficiently, as well as to provide information to site owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. How do we use cookies?</h2>
          <p>We use cookies to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Essential Cookies:</strong> Necessary for the site to function (e.g., keeping your session active).</li>
            <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with the site (e.g., most visited pages) anonymously.</li>
            <li><strong>Functionality Cookies:</strong> Allow the site to remember your preferences (e.g., language).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Third-party Cookies</h2>
          <p>
            We may use third-party services (such as analytics tools) that may also set cookies on your device. MySenda does not control these cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. How to control cookies?</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies already on your computer and can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Updates</h2>
          <p>
            Our Cookie Policy may change occasionally. We recommend reviewing this page periodically to stay informed about cookie usage.
          </p>
        </section>
      </div>
    )
  }

  const selectedContent = locale === 'en' ? content.en : (locale === 'fr' ? content.fr : content.es)

  return (
    <div className="container mx-auto px-5 py-24">
      <h1 className="text-3xl font-bold mb-8">{t('cookies')}</h1>
      <div className="prose max-w-none text-gray-700">
        <p className="text-sm text-gray-500 mb-8">
          {locale === 'fr' ? 'Dernière mise à jour :' : 'Última actualización:'} {new Date().toLocaleDateString(locale)}
        </p>
        {selectedContent}
      </div>
    </div>
  )
}
