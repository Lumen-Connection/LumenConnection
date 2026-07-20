import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Lumen Connection — Digital Studio'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Digital Studio',
    title: 'Digital Engineering & Visual Production',
    subtitle: 'Web · Software · Mobile · Video · 3D · Brazil',
  })
}
