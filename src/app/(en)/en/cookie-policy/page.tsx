import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { CookiePolicyContent } from '@/components/legal/CookiePolicyContent'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'What Lumen Connection stores in your browser: language preference, accessibility settings and consent. No third-party trackers.',
  alternates: {
    canonical: '/en/cookie-policy',
    languages: {
      'pt-BR': '/politica-de-cookies',
      'en-US': '/en/cookie-policy',
      'x-default': '/politica-de-cookies',
    },
  },
}

export default function CookiePolicyPage() {
  return (
    <>
      <ServiceHeader />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <main id="main-content" tabIndex={-1}>
          <CookiePolicyContent locale="en" />
        </main>
        <Footer />
      </div>
    </>
  )
}
