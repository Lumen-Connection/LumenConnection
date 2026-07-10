import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { CookiePolicyContent } from '@/components/legal/CookiePolicyContent'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description:
    'Saiba o que a Lumen Connection guarda no seu navegador: preferência de idioma, acessibilidade e consentimento. Sem rastreadores de terceiros.',
  alternates: {
    canonical: '/politica-de-cookies',
    languages: {
      'pt-BR': '/politica-de-cookies',
      'en-US': '/en/cookie-policy',
      'x-default': '/politica-de-cookies',
    },
  },
}

export default function PoliticaDeCookiesPage() {
  return (
    <>
      <ServiceHeader />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <main id="main-content" tabIndex={-1}>
          <CookiePolicyContent locale="pt" />
        </main>
        <Footer />
      </div>
    </>
  )
}
