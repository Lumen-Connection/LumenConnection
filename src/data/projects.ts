import {
  Code2,
  Smartphone,
  Heart,
  Video,
  Palette,
  Box,
  Sparkles,
  Zap,
} from 'lucide-react'
import type { Project, ProjectItem, TimelineStep } from './types'

const STATS_PT = 'Projetos concluídos'
const STATS_EN = 'Projects completed'
const COMING_SOON_PT = 'Em breve'
const COMING_SOON_EN = 'Coming soon'

export const projects: Project[] = [
  {
    id: 9,
    title: 'Lumen Connection',
    category: 'Estúdio',
    category_en: 'Studio',
    description:
      'O elo vital entre engenharia digital e estética visual. Da luz que ilumina ideias ao conceitos que conecta mundos.',
    description_en:
      'The vital link between digital engineering and visual aesthetics. From the spark of an idea to the concepts that connect worlds.',
    subtitle: 'Engenharia de Software · Produção Digital de Alta Fidelidade',
    subtitle_en: 'Software Engineering · High-Fidelity Digital Production',
    stats: '',
    color: '#e8c84a',
    gradient: 'from-yellow-400/40 to-transparent',
    icon: Zap,
    image: '/images/hero/lumen-bg.webp',
    bannerImage: '/images/hero/lumen-bg.webp',
    showInHero: true,
    heroOnly: true,
    ctaLabel: 'Conheça o Estúdio',
    ctaLabel_en: 'Meet the Studio',
    ctaHref: '#about',
    items: [],
  },
  {
    id: 1,
    title: 'Desenvolvimento Web',
    title_en: 'Web Development',
    category: 'Desenvolvimento Web',
    category_en: 'Web Development',
    description:
      'Trabalhamos com linguagens e frameworks como JavaScript, React, Python, Java, C#, Next.js, Tailwind, HTML, CSS, e muito mais',
    description_en:
      'We work with languages and frameworks like JavaScript, React, Python, Java, C#, Next.js, Tailwind, HTML, CSS, and much more',
    stats: STATS_PT,
    stats_en: STATS_EN,
    color: '#f97316',
    gradient: 'from-orange-500/40 to-transparent',
    icon: Code2,
    image:
      '/images/stock/programming-background-with-person-working-with-codes-computer-scaled-1.webp',
    bannerImage: '/images/covers/web-development.jpeg',
    items: [
      {
        id: 1,
        title: 'Queridas Compras',
        description:
          'Site de vitrine online desenvolvido em Next.js para diversas lojas regionais de João Pessoa, PB',
        description_en:
          'Online showcase site built in Next.js connecting regional shops in João Pessoa, PB',
        image: '/success-cases/queridas-compras.webp',
        url: 'https://queridascompras.com.br/',
        subcategory: 'Next.js',
      },
      {
        id: 2,
        title: 'MariDicas',
        description:
          'Plataforma de Economia Inteligente desenvolvida em Next.js, com ofertas curadas da Amazon e dicas de compra',
        description_en:
          'Smart-savings platform built in Next.js, featuring curated Amazon deals and shopping tips',
        image: '/success-cases/MariDicas.jpg',
        url: 'https://maridicas.com.br/',
        subcategory: 'Next.js',
      },
      {
        id: 3,
        title: COMING_SOON_PT,
        title_en: COMING_SOON_EN,
        description: COMING_SOON_PT,
        description_en: COMING_SOON_EN,
        image: '/',
      },
    ],
  },
  {
    id: 2,
    title: 'Desenvolvimento de Software',
    title_en: 'Software Development',
    category: 'Desenvolvimento de Software',
    category_en: 'Software Development',
    description: 'Desenvolvimento nativo com Rust, C++, WinUI e Razor',
    description_en: 'Native development with Rust, C++, WinUI and Razor',
    stats: STATS_PT,
    stats_en: STATS_EN,
    color: '#eab308',
    gradient: 'from-yellow-500/40 to-transparent',
    icon: Code2,
    image: '/images/stock/photo-1484417894907-623942c8ee29.webp',
    bannerImage: '/images/covers/software-development.jpeg',
    items: [
      {
        id: 1,
        title: 'Lumen Music',
        description:
          'Reprodutor de áudio desktop leve e elegante para Windows, desenvolvido em C++17 com Qt 6. Biblioteca local com playlists e capas, fila estilo Spotify, sistema de curtidas, edição de metadados, 6 temas personalizáveis e persistência em SQLite — tudo offline e sem cadastro',
        description_en:
          'Lightweight and elegant native Windows audio player, built in C++17 with Qt 6. Local library with playlists and covers, Spotify-style queue, likes, metadata editing, 6 customizable themes and SQLite persistence — all offline, no account required',
        url: 'https://github.com/Lumen-Connection/lumen-music',
        downloadUrl: '/api/download/lumen-music',
        image: '/images/projects/software/LumenMusic-Banner.webp',
        desktopOnly: true,
        subcategory: 'C++',
      },
      {
        id: 2,
        title: 'Lumen Chat',
        description:
          'Cliente de chat com IA leve e nativo para Windows desenvolvido em Rust, se conecta ao OpenRouter para acesso a inúmeros modelos de linguagem através de uma interface única e limpa, com armazenamento seguro de chaves de API via Windows Credential Manager',
        description_en:
          'Lightweight native Windows AI chat client built in Rust. Connects to OpenRouter for access to a wide range of language models through a single, clean interface, with API keys stored securely in the Windows Credential Manager',
        url: 'https://github.com/Lumen-Connection/lumenchat',
        downloadUrl: '/api/download/lumen-chat',
        image: '/images/projects/software/LumenChat-Banner.webp',
        desktopOnly: true,
        subcategory: 'Rust',
      },
    ],
  },
  {
    id: 3,
    title: 'Desenvolvimento Mobile',
    title_en: 'Mobile Development',
    category: 'Desenvolvimento Mobile',
    category_en: 'Mobile Development',
    description: 'Criação rápida usando frameworks como Flutter, React Native e Kotlin',
    description_en: 'Fast development with frameworks like Flutter, React Native and Kotlin',
    stats: STATS_PT,
    stats_en: STATS_EN,
    color: '#22c55e',
    gradient: 'from-green-500/40 to-transparent',
    icon: Smartphone,
    image: '/images/stock/02-desenvolvimento-mobile.webp',
    bannerImage: '/images/covers/mobile-development.jpeg',
    items: [
      {
        id: 1,
        title: COMING_SOON_PT,
        title_en: COMING_SOON_EN,
        description: COMING_SOON_PT,
        description_en: COMING_SOON_EN,
        image: '/',
      },
    ],
  },
  {
    id: 4,
    title: 'Edição de Vídeo e Mídia Social',
    title_en: 'Video Editing & Social Media',
    category: 'Edição de Vídeo e Mídia Social',
    category_en: 'Video Editing & Social Media',
    description:
      'Edição profissional de vídeos com Adobe Premiere Pro, After Effects e Blender — incluindo conteúdo para YouTube, reels, stories e outras mídias sociais',
    description_en:
      'Professional video editing with Adobe Premiere Pro, After Effects and Blender — including YouTube content, Reels, stories and other social formats',
    stats: STATS_PT,
    stats_en: STATS_EN,
    color: '#3b82f6',
    gradient: 'from-blue-500/40 to-transparent',
    icon: Video,
    image: '/images/stock/photo-1614963326505-843868e1d83a.webp',
    bannerImage: '/images/covers/video-editor.jpeg',
    items: [
      {
        id: 1,
        title: '"CRIEI UMA ANIMAÇÃO DE HOMEM-ARANHA: UM NOVO DIA NO BLENDER 3D"',
        title_en: '"I MADE A SPIDER-MAN: BRAND NEW DAY ANIMATION IN BLENDER 3D"',
        description:
          'O vídeo do canal Universo Nerdístico Studios foi realizado através do Adobe Premiere Pro, com um estilo de edição altamente dinâmico',
        description_en:
          'Video produced for the Universo Nerdístico Studios channel, edited in Adobe Premiere Pro with a highly dynamic style',
        image: '/images/projects/video-editing/video-edicao.webp',
        url: 'https://www.youtube.com/watch?v=7WwPkAa9kZQ',
        subcategory: 'Adobe Premiere Pro',
      },
      {
        id: 2,
        title: 'DylannArts - Adesivos Copa do Mundo 2026',
        title_en: 'DylannArts — 2026 World Cup Stickers',
        description: 'Edição de vídeo comercial do DylannArts',
        description_en: 'Commercial video edit for DylannArts',
        image: '/videos/projects/adesivos-copa-mundo-fifa.webm',
        poster: '/videos/posters/adesivos-copa-mundo-fifa.webp',
        url: 'https://www.instagram.com/reel/DXnNKkkEY_6/?igsh=cm5xMTlkdjdrcnZ4',
        subcategory: 'Adobe After Effects',
      },
    ],
  },
  {
    id: 5,
    title: 'Design Gráfico, Branding e Identidade Visual',
    title_en: 'Graphic Design, Branding & Visual Identity',
    category: 'Design Gráfico, Branding e Identidade Visual',
    category_en: 'Graphic Design, Branding & Visual Identity',
    description:
      'Design de logos, banners, cartões de visitas e outros materiais gráficos para empresas e indivíduos',
    description_en:
      'Logos, banners, business cards and other graphic materials for businesses and individuals',
    stats: STATS_PT,
    stats_en: STATS_EN,
    color: '#a855f7',
    gradient: 'from-purple-500/40 to-transparent',
    icon: Heart,
    image: '/images/stock/photo-1506097425191-7ad538b29cef.webp',
    bannerImage: '/images/covers/design.jpeg',
    items: [
      {
        id: 1,
        title: 'DemoDisc — Retro Gaming Tipsheet',
        description:
          'Revista digital colaborativa de jogos retrô. Leitores escrevem os artigos, votam em rankings ao vivo e debatem em polls, embalados na estética chunky-neon dos magazines de games de 1997 — Bungee, halftone, CRT scanlines, starbursts e tipografia de banca de jornal',
        description_en:
          'Community-driven retro gaming magazine. Readers write the articles, vote on live rankings and argue in the polls — wrapped in the chunky, neon, starburst-stamped energy of a 1997 newsstand cover.',
        image: '/images/projects/design/DemoDisc/DemoDiscHome.png',
        gallery: [
          '/images/projects/design/DemoDisc/DemoDiscHome.png',
          '/images/projects/design/DemoDisc/DemoDiscHome2.png',
          '/images/projects/design/DemoDisc/DemoDiscHome3.png',
          '/images/projects/design/DemoDisc/DemoDiscHomeFooter.png',
          '/images/projects/design/DemoDisc/DemoDiscRankings.png',
          '/images/projects/design/DemoDisc/DemoDiscRankings2.png',
          '/images/projects/design/DemoDisc/DemoDiscPolls.png',
          '/images/projects/design/DemoDisc/DemoDiscPolls2.png',
          '/images/projects/design/DemoDisc/DemoDiscPolls3.png',
        ],
        subcategory: 'Web Design',
        subcategory_en: 'Web Design',
      },
      {
        id: 2,
        title: 'Logo Queridas Compras (QC) Motion Design',
        title_en: 'Queridas Compras (QC) Logo — Motion Design',
        description: 'Feito em Adobe After Effects',
        description_en: 'Crafted in Adobe After Effects',
        image: '/images/projects/design/logo-qc-motion-design.webm',
        subcategory: 'Motion Graphics/Design',
        subcategory_en: 'Motion Graphics/Design',
      },
      {
        id: 3,
        title: 'Lumen Music — Banner',
        description:
          'Banner de identidade visual do Lumen Music — reprodutor de áudio desktop nativo para Windows',
        description_en:
          'Visual identity banner for Lumen Music — the native Windows desktop audio player',
        image: '/images/projects/software/LumenMusic-Banner.webp',
        gallery: ['/images/projects/software/LumenMusic-Banner.webp'],
        subcategory: 'Branding',
        subcategory_en: 'Branding',
      },
      {
        id: 4,
        title: 'Lumen Chat — Banner',
        description:
          'Banner de identidade visual do Lumen Chat — cliente de IA desktop nativo para Windows',
        description_en:
          'Visual identity banner for Lumen Chat — the native Windows desktop AI client',
        image: '/images/projects/software/LumenChat-Banner.webp',
        gallery: ['/images/projects/software/LumenChat-Banner.webp'],
        subcategory: 'Branding',
        subcategory_en: 'Branding',
      },
      {
        id: 5,
        title: 'Logo DemoDisc',
        description: 'Identidade visual do logo da revista digital DemoDisc',
        description_en: 'Visual identity for the DemoDisc digital magazine logo',
        image: '/images/projects/branding/DemoDisc/demodisc-logo.png',
        gallery: [
          '/images/projects/branding/DemoDisc/demodisc-logo.png',
          '/images/projects/branding/DemoDisc/demodisc-logo-transparent.png',
        ],
        subcategory: 'Branding',
        subcategory_en: 'Branding',
      },
      {
        id: 6,
        title: 'Lumen Stream — Evolução da Marca',
        title_en: 'Lumen Stream — Brand Evolution',
        description:
          'A identidade visual do Lumen Stream em ordem cronológica: do conceito inicial como "Lumen Downloader" até a logo oficial refinada.',
        description_en:
          'The visual identity of Lumen Stream in chronological order: from its initial concept as "Lumen Downloader" to the refined official logo.',
        image: '/images/projects/branding/lumen-stream/lumen-stream-final.png',
        imageFit: 'contain',
        subcategory: 'Branding',
        subcategory_en: 'Branding',
        timeline: [
          {
            step: '1',
            title: 'Conceito inicial — Lumen Downloader',
            title_en: 'Initial concept — Lumen Downloader',
            description:
              'O projeto nasceu com o nome Lumen Downloader. Esse primeiro conceito girava em torno da ideia de baixar mídia: um losango abrigando uma seta de download em azul-ciano, ao lado do logotipo. Foi o ponto de partida que definiu o símbolo em losango e a linguagem visual da identidade.',
            description_en:
              'The project was born under the name Lumen Downloader. This first concept revolved around downloading media: a diamond holding a cyan download arrow, next to the wordmark. It was the starting point that established the diamond symbol and the visual language of the identity.',
            images: ['/images/projects/branding/lumen-stream/lumen-downloader-full.png'],
          },
          {
            step: '1.1',
            title: 'Detalhes da logo Lumen Downloader',
            title_en: 'Lumen Downloader logo details',
            description:
              'Variações e aplicações da marca Lumen Downloader: o logotipo isolado, o símbolo em losango sozinho e versões em alta resolução para fundos claros e escuros. Esses estudos refinaram proporção, contraste e legibilidade do conjunto.',
            description_en:
              'Variations and applications of the Lumen Downloader brand: the isolated wordmark, the diamond symbol on its own, and high-resolution versions for light and dark backgrounds. These studies refined the proportion, contrast and legibility of the set.',
            images: [
              '/images/projects/branding/lumen-stream/lumen-downloader-wordmark.png',
              '/images/projects/branding/lumen-stream/lumen-downloader-icon.png',
              '/images/projects/branding/lumen-stream/lumen-downloader-full.jpg',
              '/images/projects/branding/lumen-stream/lumen-downloader-icon.jpg',
            ],
          },
          {
            step: '2',
            title: 'Rebranding para Lumen Stream',
            title_en: 'Rebranding to Lumen Stream',
            description:
              'Com a decisão de reposicionar o produto, o nome mudou para Lumen Stream e a marca foi reformulada. Partindo de um mockup inicial monocromático do símbolo, a seta de download deu lugar a um botão de play dentro de uma engrenagem e a paleta migrou do azul para o laranja da Lumen Connection, mantendo o losango como fio condutor.',
            description_en:
              'As the product was repositioned, the name changed to Lumen Stream and the brand was reworked. Starting from an initial monochrome mockup of the symbol, the download arrow gave way to a play button inside a gear and the palette moved from blue to the Lumen Connection orange, keeping the diamond as the common thread.',
            images: [
              '/images/projects/branding/lumen-stream/lumen-stream-rebrand-mockup.png',
              '/images/projects/branding/lumen-stream/lumen-stream-rebrand.png',
            ],
          },
          {
            step: '3',
            title: 'Refinamento final',
            title_en: 'Final refinement',
            description:
              'A versão final simplificou o símbolo: as setas de rotação foram removidas, deixando a engrenagem com o play centralizada no losango. O resultado é a logo oficial da Lumen Stream — mais limpa, equilibrada e pronta para aplicação em qualquer contexto digital.',
            description_en:
              'The final version simplified the symbol: the rotating arrows were removed, leaving the gear-and-play centered inside the diamond. The result is the official Lumen Stream logo — cleaner, balanced and ready for any digital context.',
            images: ['/images/projects/branding/lumen-stream/lumen-stream-final.png'],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Posters',
    title_en: 'Posters',
    category: 'Posters',
    category_en: 'Posters',
    description:
      'Criação de posters artísticos e ilustrações digitais com identidade visual marcante',
    description_en: 'Artistic posters and digital illustrations with a strong visual identity',
    stats: STATS_PT,
    stats_en: STATS_EN,
    color: '#f43f5e',
    gradient: 'from-rose-500/40 to-transparent',
    icon: Palette,
    image: '/',
    bannerImage: '/images/covers/posters.jpeg',
    showInHero: false,
    items: [
      {
        id: 1,
        title: '"Um Novo Dia"',
        title_en: '"Brand New Day"',
        description: 'Homem-Aranha Inspirado em The Amazing Spider-Man N° 345 vs Boomerang',
        description_en: 'Spider-Man inspired by The Amazing Spider-Man #345 vs Boomerang',
        image: '/images/projects/posters/homem-aranha-amazing-345.png',
        url: 'https://www.instagram.com/p/DWKfZoNlGZJ/',
        subcategory: 'Homem-Aranha',
        subcategory_en: 'Spider-Man',
      },
      {
        id: 2,
        title: 'Poster feito por Gabriel Dias',
        title_en: 'Poster by Gabriel Dias',
        description: 'SPIDER-MAN: Brand New Day',
        description_en: 'SPIDER-MAN: Brand New Day',
        image: '/images/projects/posters/spider-man-brand-new-day.png',
        url: 'https://www.instagram.com/p/DNHN7y3tMFn/',
        subcategory: 'Homem-Aranha',
        subcategory_en: 'Spider-Man',
      },
      {
        id: 3,
        title: '"Recomeço"',
        title_en: '"Fresh Start"',
        description: 'Homem-Aranha: Um Novo Dia - 30 de julho 🎬',
        description_en: 'Spider-Man: Brand New Day — July 30 🎬',
        image: '/images/projects/posters/recomeco.jpeg',
        url: 'https://www.instagram.com/p/DWVBuLqlD6y/?igsh=MW11YTgzdHVqYTNkcA==',
        subcategory: 'Homem-Aranha',
        subcategory_en: 'Spider-Man',
      },
    ],
  },
  {
    id: 7,
    title: 'Modelagem 3D',
    title_en: '3D Modeling',
    category: 'Modelagem 3D',
    category_en: '3D Modeling',
    description:
      'Modelagem, texturização e renderização 3D com Blender, incluindo personagens, cenários e objetos',
    description_en:
      '3D modeling, texturing and rendering with Blender — including characters, environments and objects',
    stats: STATS_PT,
    stats_en: STATS_EN,
    color: '#06b6d4',
    gradient: 'from-cyan-500/40 to-transparent',
    icon: Box,
    image: '/images/stock/pexels-cottonbro-7504746-1170x700.webp',
    bannerImage: '/images/covers/blender-3d.jpeg',
    showInHero: true,
    items: [
      {
        id: 1,
        title: 'Ferrari Comercial Trailer',
        title_en: 'Ferrari Commercial Trailer',
        description: 'Modelagem, animação e renderização 3D desenvolvido em Blender',
        description_en: '3D modeling, animation and rendering built in Blender',
        image: '/videos/banners/ferrari-comercial-trailer.webm',
        subcategory: 'Blender',
      },
      {
        id: 2,
        title: 'Em Breve',
        title_en: 'Coming Soon',
        description: COMING_SOON_PT,
        description_en: COMING_SOON_EN,
        image: '/',
      },
    ],
  },
  {
    id: 8,
    title: 'Edição de VFX',
    title_en: 'VFX Editing',
    category: 'Edição de VFX',
    category_en: 'VFX Editing',
    description:
      'Criação de efeitos visuais com After Effects, Blender e outras ferramentas profissionais de VFX',
    description_en:
      'Visual effects with After Effects, Blender and other professional VFX tools',
    stats: STATS_PT,
    stats_en: STATS_EN,
    color: '#f59e0b',
    gradient: 'from-amber-500/40 to-transparent',
    icon: Sparkles,
    image: '/images/stock/video_editing-1-scaled.webp',
    bannerImage: '/images/covers/vfx.jpeg',
    showInHero: true,
    items: [
      {
        id: 1,
        title: COMING_SOON_PT,
        title_en: COMING_SOON_EN,
        description: COMING_SOON_PT,
        description_en: COMING_SOON_EN,
        image: '/',
      },
    ],
  },
]

export const heroProjects: Project[] = projects.filter((p) => p.showInHero !== false)
export const sectionProjects: Project[] = projects.filter((p) => !p.heroOnly)

export type { Project, ProjectItem, TimelineStep }
