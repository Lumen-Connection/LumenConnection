import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Game Mods — Lumen Connection'

export default function Image() {
  return renderOgImage({
    eyebrow: 'Lumen Connection',
    title: 'Game Mods',
    subtitle: 'Open-source maps, game modes and experiments.',
  })
}
