import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { UpcomingProjectsPageContent } from '@/components/upcoming/UpcomingProjectsPageContent'
import { homePath } from '@/data/service-links'
import { JsonLd, breadcrumbLd } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Novos Projetos',
  description:
    'O que a Lumen Connection está construindo e quando chega: cronograma dos próximos lançamentos, com contagem regressiva para os que já têm data confirmada.',
  alternates: {
    canonical: '/novosprojetos',
    languages: {
      'pt-BR': '/novosprojetos',
      'en-US': '/en/upcoming-projects',
      'x-default': '/novosprojetos',
    },
  },
}

export default function NovosProjetosPage() {
  return (
    <>
      <ServiceHeader />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <main id="main-content" tabIndex={-1}>
          <UpcomingProjectsPageContent locale="pt" />
        </main>
        <Footer />
      </div>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Início', url: homePath('pt') },
          { name: 'Novos Projetos', url: '/novosprojetos' },
        ])}
      />
    </>
  )
}
