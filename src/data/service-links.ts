import type { Locale } from '@/lib/i18n/translations'

export type ServiceId = 'web' | 'software' | 'mobile' | 'video' | 'design' | '3d' | 'vfx'

export type ServiceLink = {
  id: ServiceId
  slugPt: string
  slugEn: string
  labelPt: string
  labelEn: string
}

/**
 * Fonte única dos pares de rota PT/EN das páginas de serviço.
 * Mantido separado de services-seo.ts para que componentes client
 * (Footer, LanguageSwitcher) não carreguem o conteúdo editorial completo.
 */
export const SERVICE_LINKS: ServiceLink[] = [
  {
    id: 'web',
    slugPt: 'desenvolvimento-web',
    slugEn: 'web-development',
    labelPt: 'Desenvolvimento Web',
    labelEn: 'Web Development',
  },
  {
    id: 'software',
    slugPt: 'desenvolvimento-de-software',
    slugEn: 'software-development',
    labelPt: 'Desenvolvimento de Software',
    labelEn: 'Software Development',
  },
  {
    id: 'mobile',
    slugPt: 'desenvolvimento-mobile',
    slugEn: 'mobile-development',
    labelPt: 'Desenvolvimento Mobile',
    labelEn: 'Mobile Development',
  },
  {
    id: 'video',
    slugPt: 'edicao-de-video',
    slugEn: 'video-editing',
    labelPt: 'Edição de Vídeo',
    labelEn: 'Video Editing',
  },
  {
    id: 'design',
    slugPt: 'design-grafico',
    slugEn: 'graphic-design',
    labelPt: 'Design Gráfico e Branding',
    labelEn: 'Graphic Design & Branding',
  },
  {
    id: '3d',
    slugPt: 'modelagem-3d',
    slugEn: '3d-modeling',
    labelPt: 'Modelagem 3D',
    labelEn: '3D Modeling',
  },
  {
    id: 'vfx',
    slugPt: 'vfx',
    slugEn: 'vfx',
    labelPt: 'Efeitos Visuais (VFX)',
    labelEn: 'Visual Effects (VFX)',
  },
]

export function homePath(locale: Locale): string {
  return locale === 'en' ? '/en' : '/'
}

export function servicePath(locale: Locale, link: ServiceLink): string {
  return locale === 'en' ? `/en/services/${link.slugEn}` : `/servicos/${link.slugPt}`
}

/** Pares PT/EN de páginas avulsas (fora de /servicos). */
const PAGE_PAIRS: { pt: string; en: string }[] = [
  { pt: '/politica-de-cookies', en: '/en/cookie-policy' },
]

/**
 * Dado um pathname, retorna a rota equivalente no idioma alvo,
 * ou null quando não existe par conhecido (aí o switcher só troca o texto).
 */
export function alternatePath(pathname: string, target: Locale): string | null {
  const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  if (path === '/' || path === '/en') return homePath(target)

  const pair = PAGE_PAIRS.find((p) => p.pt === path || p.en === path)
  if (pair) return target === 'en' ? pair.en : pair.pt

  const ptMatch = path.match(/^\/servicos\/([^/]+)$/)
  if (ptMatch) {
    const link = SERVICE_LINKS.find((s) => s.slugPt === ptMatch[1])
    return link ? servicePath(target, link) : null
  }

  const enMatch = path.match(/^\/en\/services\/([^/]+)$/)
  if (enMatch) {
    const link = SERVICE_LINKS.find((s) => s.slugEn === enMatch[1])
    return link ? servicePath(target, link) : null
  }

  return null
}
