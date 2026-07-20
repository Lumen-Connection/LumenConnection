import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Upcoming Projects — Lumen Connection'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Lumen Connection',
    title: 'Upcoming Projects',
    subtitle: 'What the studio is building and when it lands.',
  })
}
