/** Rota do easter egg — fora do sitemap e do robots. */
export const VICE_SECRET_PATH = '/vice'

/**
 * Canal oficial de dois membros da Lumen Connection — trabalho conjunto
 * sobre GTA VI (notícias, tutoriais, rumores, reações e análises).
 */
export const NEXT_STATION = {
  name: 'NextStation',
  handle: '@NextStationgta6',
  channelId: 'UCNZIhOyK9d7ew7KJUyYXbgw',
  videosUrl: 'https://www.youtube.com/@NextStationgta6/videos',
  channelUrl: 'https://www.youtube.com/@NextStationgta6',
  subscribeUrl: 'https://www.youtube.com/@NextStationgta6?sub_confirmation=1',
} as const

export type NextStationKind = 'news' | 'tutorial' | 'rumor' | 'reaction' | 'analysis'

export const NEXT_STATION_VIDEOS: {
  id: string
  youtubeId: string
  title: string
  kind: NextStationKind
  featured?: boolean
}[] = [
  {
    id: 'extended-look-react',
    youtubeId: 'PwGJUTj4DmU',
    title: 'Reagindo ao Olhar Estendido de GTA 6',
    kind: 'reaction',
    featured: true,
  },
  {
    id: 'tommy-vi',
    youtubeId: 'OPDZUYFuf_g',
    title: 'Tommy Vercetti em GTA VI?',
    kind: 'rumor',
  },
  {
    id: 'extended-unplayable',
    youtubeId: 'MCidaJMoVA0',
    title: 'Já pode adiar para 2030?',
    kind: 'reaction',
  },
]
