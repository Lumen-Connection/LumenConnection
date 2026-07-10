export type UpcomingProject = {
  id: number
  title: string
  title_en?: string
  category: string
  category_en?: string
  /** Miniatura exibida no widget */
  image: string
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
    image: '/images/covers/software-development.jpeg',
    launchAt: '2026-07-31T00:00:00-03:00',
  },
  {
    id: 2,
    title: 'Lumen Music 2.0',
    category: 'Desenvolvimento de Software',
    category_en: 'Software Development',
    image: '/images/projects/software/LumenMusic-Banner.webp',
    launchAt: '2026-08-05T00:00:00-03:00',
  },
  {
    id: 3,
    title: 'DemoDisc',
    category: 'Desenvolvimento Web',
    category_en: 'Web Development',
    image: '/images/projects/design/DemoDisc/DemoDiscHome.png',
    launchAt: '2026-09-30T00:00:00-03:00',
  },
]
