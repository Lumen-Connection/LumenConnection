import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Lumen Connection — Estúdio Digital'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Estúdio Digital',
    title: 'Engenharia Digital & Produção Visual',
    subtitle: 'Web · Software · Mobile · Vídeo · 3D · João Pessoa',
  })
}
