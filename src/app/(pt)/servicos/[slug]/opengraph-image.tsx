import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og'
import { SERVICE_LINKS } from '@/data/service-links'
import { getServiceBySlug } from '@/data/services-seo'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Serviço — Lumen Connection'

export function generateStaticParams() {
  return SERVICE_LINKS.map((link) => ({ slug: link.slugPt }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug('pt', slug)
  return renderOgImage({
    eyebrow: 'Serviço',
    title: service?.link.labelPt ?? 'Lumen Connection',
    subtitle: 'Estúdio de engenharia digital e produção visual.',
  })
}
