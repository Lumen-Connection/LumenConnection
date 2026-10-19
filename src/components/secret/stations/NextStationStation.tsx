'use client'

import { useState } from 'react'
import { ExternalLink, Play, Youtube } from 'lucide-react'
import { NEXT_STATION, NEXT_STATION_VIDEOS, type NextStationKind } from '@/data/secret-vice'
import type { Locale } from '@/lib/i18n/translations'
import type { Station } from '../dashboard/stations'
import { StationHeader } from './StationHeader'

const KIND_LABEL: Record<Locale, Record<NextStationKind, string>> = {
  pt: { news: 'Notícia', tutorial: 'Tutorial', rumor: 'Rumor', reaction: 'Reação', analysis: 'Análise' },
  en: { news: 'News', tutorial: 'Tutorial', rumor: 'Rumor', reaction: 'Reaction', analysis: 'Analysis' },
}

const COPY = {
  pt: {
    title: 'A última estação antes da saída.',
    body: 'Canal oficial de dois membros da Lumen Connection — um trabalho conjunto, feito no calor desta espera. Notícias, tutoriais, rumores, reações aos trailers e análises de GTA VI.',
    note: 'Não é o canal da Rockstar. É o recorte da Lumen sobre o VI.',
    topics: ['Notícias', 'Tutoriais', 'Rumores', 'Reações', 'Análises'],
    featured: 'Em destaque',
    watch: 'Assistir',
    ctaVideos: 'Ver todos os vídeos',
    ctaSubscribe: 'Inscrever-se',
    members: 'Dois da Lumen · trabalho conjunto',
  },
  en: {
    title: 'The last station before the exit.',
    body: 'Official channel of two Lumen Connection members — a joint project, made in the heat of this wait. News, tutorials, rumors, trailer reactions and GTA VI analysis.',
    note: 'Not Rockstar’s channel. Lumen’s cut of VI.',
    topics: ['News', 'Tutorials', 'Rumors', 'Reactions', 'Analysis'],
    featured: 'Featured',
    watch: 'Watch',
    ctaVideos: 'Watch all videos',
    ctaSubscribe: 'Subscribe',
    members: 'Two from Lumen · a joint project',
  },
} as const

export function NextStationStation({
  locale,
  station,
  onWatch,
}: {
  locale: Locale
  station: Station
  onWatch: () => void
}) {
  const copy = COPY[locale]
  const kinds = KIND_LABEL[locale]
  const featured = NEXT_STATION_VIDEOS.find((video) => video.featured) ?? NEXT_STATION_VIDEOS[0]
  const rest = NEXT_STATION_VIDEOS.filter((video) => video.id !== featured.id)
  const [started, setStarted] = useState(false)

  return (
    <div>
      <StationHeader locale={locale} station={station} title={copy.title} body={copy.body} />

      <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.8fr)] gap-6 lg:gap-8 items-start">
        <div className="space-y-5">
          <article className="border border-white/10 bg-black/50">
            <div className="relative aspect-video bg-black">
              {started ? (
                <iframe
                  title={featured.title}
                  src={`https://www.youtube-nocookie.com/embed/${featured.youtubeId}?autoplay=1&rel=0`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onWatch()
                    setStarted(true)
                  }}
                  className="group absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4ad8]"
                  aria-label={`${copy.watch}: ${featured.title}`}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${featured.youtubeId}/hqdefault.jpg`}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#ff4ad8] bg-black/50 text-[#ff4ad8] group-hover:bg-[#ff4ad8] group-hover:text-black transition-colors">
                      <Play aria-hidden="true" className="w-6 h-6 fill-current ml-1" />
                    </span>
                  </span>
                </button>
              )}
            </div>
            <div className="p-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#5ce1ff]">
                {copy.featured} · {kinds[featured.kind]}
              </p>
              <p className="mt-2 text-sm sm:text-base text-white/85">{featured.title}</p>
            </div>
          </article>

          <div className="grid sm:grid-cols-2 gap-4">
            {rest.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="group border border-white/10 bg-black/40 hover:border-[#5ce1ff]/40 transition-colors overflow-hidden"
              >
                <div className="aspect-video bg-black relative">
                  <img
                    src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt=""
                    className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/50 text-white">
                      <Youtube aria-hidden="true" className="w-4 h-4" />
                    </span>
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#ff4ad8]">{kinds[video.kind]}</p>
                  <p className="mt-2 text-sm text-white/80 group-hover:text-white">{video.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <aside className="vice-lcd p-5 sm:p-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#ff4ad8] mb-3">{copy.members}</p>
          <p className="font-[family-name:var(--font-vice-display)] tracking-[0.12em] text-3xl text-white">
            {NEXT_STATION.name}
          </p>
          <p className="mt-1 font-mono text-sm text-white/55">{NEXT_STATION.handle}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {copy.topics.map((topic) => (
              <li
                key={topic}
                className="px-2.5 py-1 text-[10px] tracking-[0.22em] uppercase text-[#ffb4e6] border border-[#ff4ad8]/35 bg-[#ff4ad8]/5"
              >
                {topic}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2">
            <a
              href={NEXT_STATION.videosUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase text-black bg-[#ff4ad8] hover:bg-[#ff7ae4] transition-colors"
            >
              <Youtube aria-hidden="true" className="w-4 h-4" />
              {copy.ctaVideos}
            </a>
            <a
              href={NEXT_STATION.subscribeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase text-white/80 border border-white/15 hover:border-white/40 hover:text-white transition-colors"
            >
              <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
              {copy.ctaSubscribe}
            </a>
          </div>
          <p className="mt-5 text-[10px] tracking-[0.18em] uppercase text-white/35">{copy.note}</p>
        </aside>
      </div>
    </div>
  )
}
