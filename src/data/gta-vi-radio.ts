export type RadioSource = 'trailer1' | 'trailer2' | 'extended' | 'launch'

/** Estações clássicas de Vice City, usadas aqui só como homenagem. */
export type HomageStation =
  | 'V-Rock'
  | 'Emotion 98.3'
  | 'Wave 103'
  | 'Fever 105'
  | 'Flash FM'
  | 'Wildstyle'
  | 'Radio Espantoso'
  | 'K-Chat'

export type RadioTrack = {
  id: string
  title: string
  artist: string
  year: number
  source: RadioSource
  youtubeId: string
  station: HomageStation
}

/**
 * Faixas ouvidas em material oficial da Rockstar (trailers, Extended Look e
 * Launch Trailer).
 * Não inclui vazamentos. O player toca via YouTube (vídeos oficiais / Topic),
 * sem hospedar o áudio neste site.
 */
export const GTA_VI_RADIO: RadioTrack[] = [
  {
    id: 'love-is-a-long-road',
    title: 'Love Is a Long Road',
    artist: 'Tom Petty',
    year: 1989,
    source: 'trailer1',
    youtubeId: 'xAgUYyosqVM',
    station: 'V-Rock',
  },
  {
    id: 'thunder-island',
    title: 'Thunder Island',
    artist: 'Jay Ferguson',
    year: 1977,
    source: 'trailer2',
    youtubeId: 'kJpPmXOB7eE',
    station: 'Flash FM',
  },
  {
    id: 'child-support',
    title: 'Child Support',
    artist: 'Zenglen',
    year: 2004,
    source: 'trailer2',
    youtubeId: '6u4RnEPJXmY',
    station: 'Radio Espantoso',
  },
  {
    id: 'everybody-have-fun-tonight',
    title: 'Everybody Have Fun Tonight',
    artist: 'Wang Chung',
    year: 1986,
    source: 'trailer2',
    youtubeId: 'BoXu6QmxpJE',
    station: 'Wave 103',
  },
  {
    id: 'talkin-to-myself-again',
    title: "Talkin' to Myself Again",
    artist: 'Tammy Wynette',
    year: 1987,
    source: 'trailer2',
    youtubeId: 'QG52v7AOVVU',
    station: 'K-Chat',
  },
  {
    id: 'hot-together',
    title: 'Hot Together',
    artist: 'The Pointer Sisters',
    year: 1986,
    source: 'trailer2',
    youtubeId: 'H3Aay-47ZT0',
    station: 'Fever 105',
  },
  {
    id: 'people-are-people',
    title: 'People Are People',
    artist: 'Depeche Mode',
    year: 1984,
    source: 'extended',
    youtubeId: 'MzGnX-MbYE4',
    station: 'Wave 103',
  },
  {
    id: 'love-bites',
    title: 'Love Bites',
    artist: 'Def Leppard',
    year: 1988,
    source: 'extended',
    youtubeId: 'W4XiSFyYRE8',
    station: 'V-Rock',
  },
  {
    id: 'against-all-odds',
    title: 'Against All Odds (Take a Look at Me Now)',
    artist: 'Phil Collins',
    year: 1984,
    source: 'extended',
    youtubeId: 'wuvtoyVi7vY',
    station: 'Emotion 98.3',
  },
  {
    id: 'devil-woman',
    title: 'Devil Woman',
    artist: 'Cliff Richard',
    year: 1976,
    source: 'extended',
    youtubeId: 'aDKhq-lCHCo',
    station: 'Flash FM',
  },
  {
    id: 'let-your-love-flow',
    title: 'Let Your Love Flow',
    artist: 'The Bellamy Brothers',
    year: 1976,
    source: 'extended',
    youtubeId: 'C-S-c5etj9E',
    station: 'Flash FM',
  },
  {
    id: 'cars-and-girls',
    title: 'Cars and Girls',
    artist: 'Prefab Sprout',
    year: 1988,
    source: 'extended',
    youtubeId: '4UPiTz5g3Ks',
    station: 'Wave 103',
  },
  {
    id: 'inner-light',
    title: 'Inner Light',
    artist: 'Elderbrook & Bob Moses',
    year: 2023,
    source: 'extended',
    youtubeId: 'sKqg6nJv4b0',
    station: 'Fever 105',
  },
  {
    id: 'skrilla',
    title: 'Skrilla',
    artist: 'Kodak Black',
    year: 2014,
    source: 'extended',
    youtubeId: 'l0U7SxXHkPY',
    station: 'Wildstyle',
  },
  {
    id: 'pop-bottles',
    title: 'Pop Bottles',
    artist: 'Birdman, Lil Wayne',
    year: 2007,
    source: 'extended',
    youtubeId: '6B5kLs1lSjs',
    station: 'Wildstyle',
  },
  {
    id: 'pound-town',
    title: 'Pound Town',
    artist: 'Sexyy Red, Tay Keith',
    year: 2022,
    source: 'extended',
    youtubeId: 'UqLRrt-6e2Y',
    station: 'Wildstyle',
  },
  {
    id: 'mine-o-mine',
    title: "Mine O' Mine",
    artist: 'Aluna & Jayda G',
    year: 2023,
    source: 'extended',
    youtubeId: 'YQdQhJmX3pE',
    station: 'Emotion 98.3',
  },
  {
    id: 'flower-in-a-hurricane',
    title: 'Flower in a Hurricane',
    artist: 'Justice, Tame Impala, SZA, King Gizzard & The Lizard Wizard',
    year: 2026,
    source: 'launch',
    youtubeId: '5dPwBWvmcbQ',
    station: 'Wave 103',
  },
]

export const LUMEN_MUSIC_DOWNLOAD = '/api/download/lumen-music'
export const LUMEN_MUSIC_GITHUB = 'https://github.com/Lumen-Connection/lumen-music'
