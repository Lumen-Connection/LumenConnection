export type UpcomingProject = {
  id: number
  title: string
  title_en?: string
  category: string
  category_en?: string
  /** Miniatura exibida no widget e capa da listagem em /novosprojetos */
  image: string
  /** Enquadramento da capa: 'contain' para logos, 'cover' (padrão) para fotos */
  imageFit?: 'cover' | 'contain'
  /** Resumo exibido em /novosprojetos */
  description?: string
  description_en?: string
  /**
   * Data/hora do lançamento em ISO 8601 com fuso (ex.: '2026-07-31T00:00:00-03:00').
   * Quando definida e faltar menos de 7 dias, o widget exibe o cronômetro "T-";
   * acima disso, exibe a data formatada. Lançamentos passados somem da lista.
   * Sem data, o item aparece com o rótulo "Em breve".
   */
  launchAt?: string
}

export const upcomingProjects: UpcomingProject[] = [
  {
    id: 1,
    title: 'Lumen Stream',
    category: 'Desenvolvimento de Software',
    category_en: 'Software Development',
    image: '/images/projects/branding/lumen-stream/lumen-stream-final.png',
    imageFit: 'contain',
    description:
      'Um só lugar para baixar e converter suas mídias: o Lumen Stream centraliza downloads e conversões de formato, sem depender de um punhado de sites diferentes a cada arquivo.',
    description_en:
      'One place to download and convert your media: Lumen Stream centralizes downloads and format conversions, with no need to juggle a handful of different sites for every file.',
    launchAt: '2026-07-31T00:00:00-03:00',
  },
  {
    id: 2,
    title: 'Lumen Music 2.0',
    category: 'Desenvolvimento de Software',
    category_en: 'Software Development',
    image: '/images/projects/software/LumenMusic-Banner.webp',
    description:
      'A próxima geração do reprodutor de áudio desktop feito em C++17 com Qt 6 — biblioteca local, playlists, fila, temas e persistência em SQLite, tudo offline e sem cadastro.',
    description_en:
      'The next generation of the desktop audio player built in C++17 with Qt 6 — local library, playlists, queue, themes and SQLite persistence, all offline and with no account required.',
    launchAt: '2026-08-05T00:00:00-03:00',
  },
  {
    id: 3,
    title: 'DemoDisc',
    category: 'Desenvolvimento Web',
    category_en: 'Web Development',
    image: '/images/projects/design/DemoDisc/DemoDiscHome.png',
    description:
      'Revista digital colaborativa de jogos retrô: os leitores escrevem os artigos, votam em rankings ao vivo e debatem em polls, na estética chunky-neon das bancas de 1997.',
    description_en:
      'Community-driven retro gaming magazine: readers write the articles, vote on live rankings and argue in the polls, wrapped in the chunky-neon energy of a 1997 newsstand.',
    launchAt: '2026-09-30T00:00:00-03:00',
  },
]
