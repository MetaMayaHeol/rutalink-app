export interface FAQItem {
  question: string
  answer: string
}

export function generateCityFAQs(cityName: string): FAQItem[] {
  return [
    {
      question: `¿Cuál es la mejor época para visitar ${cityName}?`,
      answer: `La mejor época para visitar ${cityName} es generalmente de noviembre a marzo, cuando el clima es más fresco y seco. Sin embargo, ${cityName} tiene su encanto durante todo el año.`
    },
    {
      question: `¿Necesito un guía turístico para visitar ${cityName}?`,
      answer: `Aunque puedes recorrer ${cityName} por tu cuenta, contratar un guía local certificado te permitirá descubrir historias ocultas, acceder a lugares exclusivos y entender mejor la cultura local.`
    },
    {
      question: `¿Qué actividades no me puedo perder en ${cityName}?`,
      answer: `En ${cityName}, no te puedes perder su centro histórico, la gastronomía local y las zonas arqueológicas cercanas. Un guía local puede personalizar un itinerario según tus intereses.`
    },
    {
      question: `¿Es seguro viajar a ${cityName}?`,
      answer: `${cityName} es considerado uno de los destinos seguros en la región. Como en cualquier lugar turístico, se recomienda tomar precauciones básicas y seguir las recomendaciones de los locales.`
    },
    {
      question: `¿Cómo encuentro guías confiables en ${cityName}?`,
      answer: `En RutaLink, puedes encontrar perfiles de guías verificados en ${cityName}, leer reseñas de otros viajeros y contactarlos directamente por WhatsApp sin intermediarios.`
    }
  ]
}

export function generateActivityFAQs(activityName: string): FAQItem[] {
  return [
    {
      question: `¿Cuáles son los mejores lugares para ${activityName} en Yucatán?`,
      answer: `La Península de Yucatán ofrece escenarios increíbles para ${activityName.toLowerCase()}. Dependiendo de tu nivel de experiencia, un guía local puede recomendarte los sitios más adecuados y menos concurridos.`
    },
    {
      question: `¿Necesito experiencia previa para realizar tours de ${activityName}?`,
      answer: `La mayoría de los tours de ${activityName.toLowerCase()} se adaptan a diferentes niveles, desde principiantes hasta expertos. Es importante comunicar tu experiencia a tu guía para que ajuste la actividad.`
    },
    {
      question: `¿Qué debo llevar para un tour de ${activityName}?`,
      answer: `Para ${activityName.toLowerCase()}, generalmente necesitarás ropa cómoda, protección solar biodegradable y agua. Tu guía te proporcionará una lista específica de equipo necesario al reservar.`
    },
    {
      question: `¿Es seguro realizar ${activityName} en la zona?`,
      answer: `Sí, siempre y cuando lo hagas con guías certificados que conozcan el terreno y las condiciones locales. En RutaLink verificamos a nuestros guías para tu seguridad.`
    },
    {
      question: `¿Cuánto cuesta un tour de ${activityName}?`,
      answer: `Los precios para ${activityName.toLowerCase()} varían según la duración, el equipo incluido y si es privado o grupal. Contacta directamente a los guías en RutaLink para obtener cotizaciones personalizadas.`
    }
  ]
}
