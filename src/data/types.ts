import type { LucideIcon } from 'lucide-react'

/** Etapa de uma linha do tempo (ex.: evolução de uma marca/logo). */
export type TimelineStep = {
  /** Rótulo da etapa exibido no marcador (ex.: '1', '1.1', '2', '3'). */
  step: string
  title: string
  title_en?: string
  description: string
  description_en?: string
  /** Uma ou mais imagens que ilustram a etapa. */
  images: string[]
}

export type ProjectItem = {
  id: number
  title: string
  title_en?: string
  description: string
  description_en?: string
  image: string
  /**
   * Ajuste da mídia de capa: 'cover' (padrão) recorta para preencher;
   * 'contain' mostra a imagem inteira sem cortes (ideal para logos).
   */
  imageFit?: 'cover' | 'contain'
  /** Poster exibido enquanto o vídeo (quando image é vídeo) não é carregado. */
  poster?: string
  url?: string
  downloadUrl?: string
  desktopOnly?: boolean
  gallery?: string[]
  /** Quando presente, o card abre uma linha do tempo cronológica em vez da galeria. */
  timeline?: TimelineStep[]
  subcategory?: string
  subcategory_en?: string
}

export type HeroSlideExtra = {
  ctaLabel?: string
  ctaHref?: string
  subtitle?: string
}

export type Project = {
  id: number
  title: string
  title_en?: string
  category: string
  category_en?: string
  description: string
  description_en?: string
  stats: string
  stats_en?: string
  color: string
  gradient: string
  icon: LucideIcon
  image: string
  bannerImage: string
  items: ProjectItem[]
  subtitle?: string
  subtitle_en?: string
  showInHero?: boolean
  heroOnly?: boolean
  ctaLabel?: string
  ctaLabel_en?: string
  ctaHref?: string
}

export type SuccessCase = {
  imagem: string
  nome: string
  nome_en?: string
  descrição: string
  descrição_en?: string
  descriçãoLonga?: string
  descriçãoLonga_en?: string
  url?: string
  tagLabel?: string
  tagLabel_en?: string
}

export type NavItem = {
  label: string
  href: string
}
