/**
 * Informações oficiais do GTA VI usadas na página secreta /vice.
 * Fonte: rockstargames.com/VI e a Newswire da Rockstar (revisado em 19/10/2026).
 */

/**
 * Lançamento oficial (PS5 / Xbox Series X|S), reconfirmado pela Rockstar em
 * out/2026. O horário exato varia por loja; usamos meia-noite ET.
 */
export const GTA_VI_LAUNCH_AT = '2026-11-19T00:00:00-05:00'

export const GTA_VI_PLATFORMS = 'PS5 · Xbox Series X|S'

export const GTA_VI_OFFICIAL_URL = 'https://www.rockstargames.com/VI'

const NEWSWIRE = 'https://www.rockstargames.com/newswire/article'

type Bilingual = { pt: string; en: string }

export const GTA_VI_FACTS: { label: Bilingual; value: Bilingual }[] = [
  {
    label: { pt: 'Lançamento', en: 'Release' },
    value: { pt: '19 de novembro de 2026', en: 'November 19, 2026' },
  },
  {
    label: { pt: 'Plataformas', en: 'Platforms' },
    value: { pt: GTA_VI_PLATFORMS, en: GTA_VI_PLATFORMS },
  },
  {
    label: { pt: 'Pré-download', en: 'Pre-load' },
    value: { pt: '12 nov · cópias digitais', en: 'Nov 12 · digital copies' },
  },
  {
    label: { pt: 'Edições', en: 'Editions' },
    value: { pt: 'Standard · Ultimate', en: 'Standard · Ultimate' },
  },
  {
    label: { pt: 'Protagonistas', en: 'Leads' },
    value: { pt: 'Jason Duval · Lucia Caminos', en: 'Jason Duval · Lucia Caminos' },
  },
  {
    label: { pt: 'Estado', en: 'State' },
    value: { pt: 'Leonida · seis regiões', en: 'Leonida · six regions' },
  },
  {
    label: { pt: 'Trilha original', en: 'Original score' },
    value: { pt: 'Justice', en: 'Justice' },
  },
  {
    label: { pt: 'PC', en: 'PC' },
    value: { pt: 'Ainda não anunciado', en: 'Not announced yet' },
  },
]

/** Linha do tempo da Newswire, do mais novo ao mais antigo. */
export const GTA_VI_NEWSWIRE: { date: string; title: Bilingual; url: string }[] = [
  {
    date: '2026-10-15',
    title: { pt: 'Launch Trailer no ar', en: 'Launch Trailer is out' },
    url: `${NEWSWIRE}/517572321a549a/watch-the-grand-theft-auto-vi-launch-trailer`,
  },
  {
    date: '2026-10-08',
    title: { pt: 'Primeiras estações de rádio', en: 'First in-game radio stations' },
    url: `${NEWSWIRE}/o3982oa93a23k4/the-music-of-grand-theft-auto-vi-in-game-radio-stations`,
  },
  {
    date: '2026-10-08',
    title: { pt: 'Coleção na Rockstar Store', en: 'Collection at the Rockstar Store' },
    url: `${NEWSWIRE}/759875393o5253/grand-theft-auto-vi-collection-now-at-the-rockstar-store`,
  },
  {
    date: '2026-09-24',
    title: {
      pt: 'Pré-venda da Vice City Collection',
      en: 'Vice City Collection pre-orders',
    },
    url: `${NEWSWIRE}/9k2a49ook82o57/pre-order-the-goodtime-state-vice-city-collection-now-while-supplies-l`,
  },
  {
    date: '2026-08-27',
    title: { pt: 'An Extended Look estreia', en: 'An Extended Look premieres' },
    url: `${NEWSWIRE}/4k138k8okkk483/grand-theft-auto-vi-an-extended-look-now-playing`,
  },
]

export const GTA_VI_TRAILERS = [
  {
    id: 'launch-trailer',
    title: 'Launch Trailer',
    youtubeId: 'rz1B4B2yBZY',
    date: '2026-10-15',
    song: 'Flower in a Hurricane — Justice',
  },
  {
    id: 'extended-look',
    title: 'An Extended Look',
    youtubeId: 'tJbzMqJGH4k',
    date: '2026-08-27',
    song: 'Pop Bottles → Inner Light',
  },
  {
    id: 'trailer-2',
    title: 'Trailer 2',
    youtubeId: 'VQRLujxTm3c',
    date: '2025-05-06',
    song: 'Hot Together — The Pointer Sisters',
  },
  {
    id: 'trailer-1',
    title: 'Trailer 1',
    youtubeId: 'QdBZY2fkU-0',
    date: '2023-12-04',
    song: 'Love Is a Long Road — Tom Petty',
  },
] as const

/**
 * Primeiras estações oficiais do VI (Newswire, 08/10/2026). Alguns
 * apresentadores aparecem no jogo com nome de personagem.
 */
export const GTA_VI_OFFICIAL_STATIONS = [
  { name: 'Cocoteo FM', genre: { pt: 'Latina', en: 'Latin' }, hosts: 'Bad Bunny · RaiNao' },
  {
    name: 'Back Country Radio',
    genre: { pt: 'Country', en: 'Country' },
    hosts: 'Morgan Wallen · Lana Del Rey',
  },
  {
    name: 'AfroBank FM',
    genre: { pt: 'Afro / amapiano', en: 'Afro / amapiano' },
    hosts: 'Burna Boy · Palms Trax',
  },
  { name: 'The Chamber 106.6', genre: { pt: 'Metal', en: 'Metal' }, hosts: 'Kerry King · Tom Araya' },
  { name: 'Flash FM', genre: { pt: 'Pop / dance', en: 'Pop / dance' }, hosts: 'Robyn · Alex Consani' },
  {
    name: 'Dirty South Classics',
    genre: { pt: 'Rap sulista', en: 'Southern rap' },
    hosts: 'Trick Daddy · Trina',
  },
] as const

export const GTA_VI_REGIONS: { id: string; name: string; image: string; body: Bilingual }[] = [
  {
    id: 'vice-city',
    name: 'Vice City',
    image: '/images/secret/regions/vice-city.jpg',
    body: {
      pt: 'O coração neon de Leonida: praia, arranha-céus na baía e a noite mais barulhenta do estado.',
      en: 'The neon heart of Leonida: beach, towers on the bay and the loudest nights in the state.',
    },
  },
  {
    id: 'leonida-keys',
    name: 'Leonida Keys',
    image: '/images/secret/regions/leonida-keys.jpg',
    body: {
      pt: 'Ilhas de água clara costuradas por pontes — hidroaviões, iates e bares de beira de estrada.',
      en: 'Clear-water islands stitched together by bridges — seaplanes, yachts and roadside bars.',
    },
  },
  {
    id: 'grassrivers',
    name: 'Grassrivers',
    image: '/images/secret/regions/grassrivers.jpg',
    body: {
      pt: 'Pântano sem fim às portas da cidade, onde aerobarcos dividem a água com jacarés.',
      en: 'Endless wetlands at the city’s doorstep, where airboats share the water with gators.',
    },
  },
  {
    id: 'port-gellhorn',
    name: 'Port Gellhorn',
    image: '/images/secret/regions/port-gellhorn.jpg',
    body: {
      pt: 'Costa esquecida de motéis de neon e letreiros que já viram dias melhores.',
      en: 'A forgotten coast of neon motels and signs that have seen better days.',
    },
  },
  {
    id: 'ambrosia',
    name: 'Ambrosia',
    image: '/images/secret/regions/ambrosia.jpg',
    body: {
      pt: 'Interior industrial à sombra da refinaria de açúcar, território de motoclubes.',
      en: 'Industrial heartland in the shadow of the sugar refinery, biker-club territory.',
    },
  },
  {
    id: 'mount-kalaga',
    name: 'Mount Kalaga',
    image: '/images/secret/regions/mount-kalaga.jpg',
    body: {
      pt: 'Parque nacional de mata fechada, trilhas e rios — o lado mais selvagem de Leonida.',
      en: 'A national park of dense woods, trails and rivers — Leonida at its wildest.',
    },
  },
]
