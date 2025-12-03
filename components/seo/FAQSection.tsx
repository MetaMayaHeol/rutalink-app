import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQItem } from "@/lib/seo/faq-generator"

interface FAQSectionProps {
  title: string
  faqs: FAQItem[]
}

export function FAQSection({ title, faqs }: FAQSectionProps) {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {title}
          </h2>
          
          <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border border-gray-200 px-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-gray-100 last:border-0">
                <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-green-600 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
