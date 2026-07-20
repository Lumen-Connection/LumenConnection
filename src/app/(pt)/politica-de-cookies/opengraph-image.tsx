import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Política de Cookies — Lumen Connection'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Lumen Connection',
    title: 'Política de Cookies',
    subtitle: 'O que guardamos no seu navegador e por quê.',
  })
}
