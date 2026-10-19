/**
 * Mods de jogos listados em /mods. Textos baseados no README de cada
 * repositório — mantenha versão e requisitos em dia com a release.
 */
export type GameMod = {
  id: string
  title: string
  /** Jogo base e a plataforma de mods em que ele roda. */
  game: string
  platform: string
  description: string
  description_en?: string
  image: string
  features: { pt: string[]; en: string[] }
  requirements: { pt: string[]; en: string[] }
  version?: string
  license?: string
  stack?: string
  repoUrl: string
  repoLabel: string
}

export const gameMods: GameMod[] = [
  {
    id: 'crashsite',
    title: 'Crashsite',
    game: 'Escape from Tarkov',
    platform: 'SPT 4.1.6',
    description:
      'Uma localização hardcore de sobrevivência para o SPT, inspirada em The Division: Survival. É uma raid separada e selecionável em Customs: noite permanente, loot abundante, todos os doze chefes e uma toxina incurável que tira vida aos poucos.',
    description_en:
      'A hardcore survival location for SPT, inspired by The Division: Survival. It is a separate, selectable raid into Customs: permanent night, abundant loot, all twelve bosses and an incurable toxin that steadily drains your health.',
    image: '/images/mods/crashsite.webp',
    features: {
      pt: [
        'Exige PMC nível 21 para entrar.',
        'Sempre 01:00 — a noite nunca acaba.',
        'Os doze chefes regulares e suas escoltas chegam até os oito minutos de raid.',
        'Loot denso e portas destrancadas: nenhuma chave é necessária.',
        'Toxina permanente: cura e imunidade ajudam, antídotos não.',
        'Sem equipamento inicial: só a faca, uma M9 emprestada e o container seguro.',
      ],
      en: [
        'PMC level 21 required to infil.',
        'Always 01:00 — the night never ends.',
        'All twelve regular bosses and their escorts arrive by the eight-minute mark.',
        'Dense loot and unlocked doors: no keys required.',
        'Permanent toxin: healing and immunity help, antidotes do not.',
        'No starting equipment: just your knife, a loaner M9 and your secure container.',
      ],
    },
    requirements: {
      pt: [
        'SPT 4.1.6 instalado.',
        'Extraia o pacote da release na raiz da instalação do SPT: o plugin do cliente vai para BepInEx/plugins e o mod do servidor para SPT_Runtime/user/mods.',
        'O Fika ainda não é suportado.',
      ],
      en: [
        'SPT 4.1.6 installed.',
        'Extract the release package into your SPT installation root: the client plugin goes to BepInEx/plugins and the server mod to SPT_Runtime/user/mods.',
        'Fika is not supported yet.',
      ],
    },
    version: '1.0.0',
    license: 'AGPL-3.0',
    stack: 'C# · BepInEx',
    repoUrl: 'https://github.com/Decade-GitHub/crashsite',
    repoLabel: 'Decade-GitHub/crashsite',
  },
]
