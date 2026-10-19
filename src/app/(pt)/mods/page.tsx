import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { ModsPageContent } from '@/components/mods/ModsPageContent'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { homePath } from '@/data/service-links'
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Mods de Jogos',
  description:
    'Mods de jogos da Lumen Connection: mapas, modos de jogo e experimentos de código aberto, como o Crashsite para Escape from Tarkov (SPT).',
  alternates: {
    canonical: '/mods',
    languages: {
      'pt-BR': '/mods',
      'en-US': '/en/mods',
      'x-default': '/mods',
    },
  },
}

export default function ModsPage() {
  return (
    <>
      <ServiceHeader />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <main id="main-content" tabIndex={-1}>
          <ModsPageContent locale="pt" />
        </main>
        <Footer />
      </div>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Início', url: homePath('pt') },
          { name: 'Mods de Jogos', url: '/mods' },
        ])}
      />
    </>
  )
}
