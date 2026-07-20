import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Cookie Policy — Lumen Connection'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Lumen Connection',
    title: 'Cookie Policy',
    subtitle: 'What we store in your browser and why.',
  })
}
