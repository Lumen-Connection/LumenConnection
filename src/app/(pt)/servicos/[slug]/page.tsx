import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { ServiceHeader } from '@/components/services/ServiceHeader'
import { ServicePageContent } from '@/components/services/ServicePageContent'
import { SERVICE_LINKS, homePath, servicePath } from '@/data/service-links'
import { getServiceBySlug, getServiceContent } from '@/data/services-seo'
import { serviceMetadata } from '@/lib/seo/metadata'
import { JsonLd, breadcrumbLd, faqLd, serviceLd } from '@/lib/seo/jsonld'

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICE_LINKS.map((link) => ({ slug: link.slugPt }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug('pt', slug)
  if (!service) return {}
  return serviceMetadata(service, 'pt')
}

export default async function ServicoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getServiceBySlug('pt', slug)
  if (!service) notFound()
  const content = getServiceContent(service, 'pt')

  return (
    <>
      <ServiceHeader />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <main id="main-content" tabIndex={-1}>
          <ServicePageContent service={service} locale="pt" />
        </main>
        <Footer />
      </div>
      <JsonLd data={serviceLd(service, 'pt')} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Início', url: homePath('pt') },
          { name: service.link.labelPt, url: servicePath('pt', service.link) },
        ])}
      />
      <JsonLd data={faqLd(content.faq)} />
    </>
  )
}
