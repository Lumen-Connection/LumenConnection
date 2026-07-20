import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Novos Projetos — Lumen Connection'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Lumen Connection',
    title: 'Novos Projetos',
    subtitle: 'O que o estúdio está construindo e quando chega.',
  })
}
