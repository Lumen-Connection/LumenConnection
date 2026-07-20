export type FutureProject = {
  id: number
  title: string
  title_en?: string
  /** Resumo curto da ideia: sem capa, sem data, sem promessa de escopo. */
  description: string
  description_en?: string
}

/**
 * Ideias de projeto da própria Lumen Connection ainda sem data nem identidade
 * visual — listadas em /novosprojetos apenas como título e resumo.
 *
 * Diferente de `upcomingProjects`, estes NÃO entram no widget "Projetos
 * Chegando" do header: lá só aparece o que já tem lançamento encaminhado.
 *
 * Nada aqui é trabalho de cliente: entregas para clientes são cobertas por NDA
 * e não têm detalhes divulgados no site.
 */
export const futureProjects: FutureProject[] = [
  {
    id: 2,
    title: 'Lumen Music Mobile',
    description:
      'O Lumen Music no celular: levar para o mobile o reprodutor de áudio que hoje existe só no desktop.',
    description_en:
      'Lumen Music on the phone: bringing the audio player that today exists only on desktop to mobile.',
  },
  {
    id: 3,
    title: 'Lumen AI Core',
    description:
      'Em fase de estudo no estúdio. Mais detalhes serão revelados em breve.',
    description_en:
      'Under study at the studio. More details will be revealed soon.',
  },
]
