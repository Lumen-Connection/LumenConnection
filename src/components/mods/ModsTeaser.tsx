'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { gameMods } from '@/data/game-mods'
import { modsPath } from '@/data/service-links'
import { useLocale } from '@/lib/i18n/LocaleContext'

const COPY = {
  pt: {
    eyebrow: 'Mods de Jogos',
    title: 'Também fazemos mods.',
    body: 'Mapas, modos de jogo e experimentos de código aberto. O primeiro é o Crashsite, uma raid hardcore de sobrevivência para Escape from Tarkov (SPT).',
    cta: 'Ver mods',
  },
  en: {
    eyebrow: 'Game Mods',
    title: 'We make mods too.',
    body: 'Open-source maps, game modes and experiments. The first one is Crashsite, a hardcore survival raid for Escape from Tarkov (SPT).',
    cta: 'See mods',
  },
} as const

/** Chamada para /mods no fim da seção de projetos da home. */
export function ModsTeaser() {
  const { locale } = useLocale()
  const copy = COPY[locale]
  const featured = gameMods[0]

  return (
    <a
      href={modsPath(locale)}
      className="group relative mt-12 sm:mt-16 max-w-6xl mx-auto grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] border border-white/15 bg-white/[0.02] hover:border-white/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
    >
      <CornerBrackets color="rgba(255,255,255,0.38)" size={12} inset={-6} />
      <div className="relative aspect-[1448/560] md:aspect-auto md:min-h-[14rem] bg-black overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
        <Image
          src={featured.image}
          alt={`${featured.game}: ${featured.title}`}
          fill
          sizes="(min-width: 768px) 40rem, 100vw"
          className="object-contain p-4 sm:p-6 transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
        <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-orange-500">{copy.eyebrow}</p>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{copy.title}</h3>
        <p className="text-sm text-white/70 leading-relaxed">{copy.body}</p>
        <span className="mt-2 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-white group-hover:text-orange-400 transition-colors">
          {copy.cta}
          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  )
}
