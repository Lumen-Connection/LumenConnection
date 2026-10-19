import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { ModsPageContent } from '@/components/mods/ModsPageContent'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { homePath } from '@/data/service-links'
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Game Mods',
  description:
    'Lumen Connection game mods: open-source maps, game modes and experiments, like Crashsite for Escape from Tarkov (SPT).',
  alternates: {
    canonical: '/en/mods',
    languages: {
      'pt-BR': '/mods',
      'en-US': '/en/mods',
      'x-default': '/mods',
    },
  },
}

export default function GameModsPage() {
  return (
    <>
      <ServiceHeader />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <main id="main-content" tabIndex={-1}>
          <ModsPageContent locale="en" />
        </main>
        <Footer />
      </div>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', url: homePath('en') },
          { name: 'Game Mods', url: '/en/mods' },
        ])}
      />
    </>
  )
}
