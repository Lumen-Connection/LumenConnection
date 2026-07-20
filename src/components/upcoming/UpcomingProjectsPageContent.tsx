'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, LayoutGrid, ShieldCheck } from 'lucide-react'
import { CornerBrackets, SectionLabel } from '@/components/ui/corner-brackets'
import { CoverFallback } from '@/components/upcoming/CoverFallback'
import { homePath } from '@/data/service-links'
import { tField } from '@/lib/i18n/tField'
import { futureProjects, type FutureProject } from '@/data/future-projects'
import { upcomingProjects, type UpcomingProject } from '@/data/upcoming-projects'
import type { Locale } from '@/lib/i18n/translations'
import {
  COUNTDOWN_WINDOW_MS,
  formatCountdown,
  formatLaunchDate,
  getUpcomingProjects,
  localTimezoneLabel,
} from '@/lib/upcoming'

const COPY = {
  pt: {
    eyebrow: 'Lumen Connection',
    title: 'Novos Projetos',
    intro:
      'O que está em construção no estúdio e quando chega.',
    back: 'Voltar para a home',
    nextUp: 'Próximo lançamento',
    schedule: 'Cronograma',
    futureSection: 'Futuros Projetos',
    ndaTitle: 'Projetos da Lumen Connection',
    ndaBody:
      'Os projetos chegando e os futuros projetos desta página são todos da própria Lumen Connection. Trabalhos entregues aos nossos clientes são cobertos por NDA: não divulgamos nenhum detalhe deles aqui.',
    tbd: 'Em breve',
    allProjects: 'Ver projetos publicados',
    empty: 'Nenhum lançamento anunciado no momento.',
    countdownAria: 'Tempo restante para o lançamento',
  },
  en: {
    eyebrow: 'Lumen Connection',
    title: 'Upcoming Projects',
    intro:
      'What the studio is building and when it lands.',
    back: 'Back to home',
    nextUp: 'Next launch',
    schedule: 'Schedule',
    futureSection: 'Future Projects',
    ndaTitle: 'Lumen Connection projects',
    ndaBody:
      'The upcoming and future projects on this page are all Lumen Connection’s own. Work delivered to our clients is covered by NDA: we publish no details about it here.',
    tbd: 'Coming soon',
    allProjects: 'See published projects',
    empty: 'No launches announced at the moment.',
    countdownAria: 'Time remaining until launch',
  },
} as const

type Copy = (typeof COPY)[Locale]

/**
 * Data/hora e cronômetro dependem do fuso da máquina, então só renderizam
 * depois da hidratação (`now` nulo no SSR) para não divergir do HTML do servidor.
 */
function LaunchTiming({
  project,
  now,
  locale,
  copy,
  size = 'sm',
}: {
  project: UpcomingProject
  now: number | null
  locale: Locale
  copy: Copy
  size?: 'sm' | 'lg'
}) {
  const dateClass = size === 'lg' ? 'text-sm sm:text-base' : 'text-xs'
  const countdownClass =
    size === 'lg' ? 'text-2xl sm:text-4xl text-white' : 'text-sm text-white/85'

  if (!project.launchAt) {
    return (
      <p className={`${dateClass} font-medium tracking-[0.15em] uppercase text-orange-500`}>
        {copy.tbd}
      </p>
    )
  }

  if (now === null) {
    return <p className={`${dateClass} text-white/60 leading-relaxed`}>&nbsp;</p>
  }

  const msLeft = Date.parse(project.launchAt) - now
  if (msLeft <= COUNTDOWN_WINDOW_MS) {
    return (
      <p
        aria-label={copy.countdownAria}
        className={`${countdownClass} font-mono tabular-nums tracking-tight`}
      >
        {formatCountdown(msLeft)}
      </p>
    )
  }

  return (
    <p className={`${dateClass} text-white/60 leading-relaxed`}>
      <time dateTime={project.launchAt}>{formatLaunchDate(project.launchAt, locale)}</time>
      <br />
      {localTimezoneLabel(locale)}
    </p>
  )
}

/** Capas 'contain' são logos com fundo transparente: precisam de respiro em volta. */
function ProjectCover({
  project,
  sizes,
  pad = 'p-4',
}: {
  project: UpcomingProject
  sizes: string
  pad?: string
}) {
  if (!project.image) return <CoverFallback />
  return (
    <Image
      src={project.image}
      alt=""
      fill
      sizes={sizes}
      className={project.imageFit === 'contain' ? `object-contain ${pad}` : 'object-cover'}
    />
  )
}

/** Destaque do próximo lançamento, no espírito do hero do /launches da SpaceX. */
function FeaturedProject({
  project,
  now,
  locale,
  copy,
}: {
  project: UpcomingProject
  now: number | null
  locale: Locale
  copy: Copy
}) {
  return (
    <section className="mb-16 sm:mb-24">
      <SectionLabel color="#f97316" className="mb-5">
        {copy.nextUp}
      </SectionLabel>
      <div className="relative border border-white/15 bg-white/[0.02]">
        <CornerBrackets color="rgba(255,255,255,0.38)" size={12} inset={-6} />
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[22rem] bg-black overflow-hidden">
            <ProjectCover
              project={project}
              sizes="(min-width: 768px) 50vw, 100vw"
              pad="p-10 sm:p-14"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/70"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 md:p-10">
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/45">
              {tField(project, 'category', locale)}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {tField(project, 'title', locale)}
            </h2>
            <LaunchTiming
              project={project}
              now={now}
              locale={locale}
              copy={copy}
              size="lg"
            />
            {project.description && (
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                {tField(project, 'description', locale)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectRow({
  project,
  index,
  now,
  locale,
  copy,
}: {
  project: UpcomingProject
  index: number
  now: number | null
  locale: Locale
  copy: Copy
}) {
  return (
    <li className="group flex flex-col gap-3 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.03] sm:grid sm:grid-cols-[2.5rem_10rem_1fr_13rem] sm:items-center sm:gap-6 sm:py-6">
      <span className="font-mono text-xs tabular-nums text-white/30">
        {String(index).padStart(2, '0')}
      </span>
      <div className="relative h-40 w-full overflow-hidden border border-white/10 bg-black sm:h-24 sm:w-40">
        <ProjectCover project={project} sizes="(min-width: 640px) 10rem, 100vw" pad="p-3" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/45 mb-1">
          {tField(project, 'category', locale)}
        </p>
        <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug mb-1.5">
          {tField(project, 'title', locale)}
        </h3>
        {project.description && (
          <p className="text-sm text-white/60 leading-relaxed max-w-prose">
            {tField(project, 'description', locale)}
          </p>
        )}
      </div>
      <div className="sm:text-right">
        <LaunchTiming project={project} now={now} locale={locale} copy={copy} />
      </div>
    </li>
  )
}

/** Ideia em estudo: só número, título e resumo — sem capa e sem data. */
function FutureProjectRow({
  project,
  index,
  locale,
}: {
  project: FutureProject
  index: number
  locale: Locale
}) {
  return (
    <li className="group flex flex-col gap-2 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.03] sm:grid sm:grid-cols-[2.5rem_1fr] sm:items-baseline sm:gap-6 sm:py-6">
      <span className="font-mono text-xs tabular-nums text-white/30">
        {String(index).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug mb-1.5">
          {tField(project, 'title', locale)}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed max-w-prose">
          {tField(project, 'description', locale)}
        </p>
      </div>
    </li>
  )
}

export function UpcomingProjectsPageContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  // Antes da hidratação não dá para saber o "agora" do visitante: a lista
  // completa vai para o HTML e os lançamentos vencidos saem no primeiro tick.
  const items = getUpcomingProjects(upcomingProjects, now ?? 0)
  const [featured, ...rest] = items

  return (
    <article className="pt-28 pb-16 sm:pb-24">
      <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
        <a
          href={homePath(locale)}
          className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5" />
          {copy.back}
        </a>

        <header className="mb-12 sm:mb-16 max-w-3xl">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-orange-500 mb-4">
            {copy.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            {copy.title}
          </h1>
          <p className="text-white/70 leading-relaxed">{copy.intro}</p>
        </header>

        <aside className="relative mb-12 sm:mb-16 max-w-3xl border border-orange-500/30 bg-orange-500/[0.06] p-5 sm:p-6">
          <CornerBrackets color="rgba(249,115,22,0.55)" size={10} inset={-5} />
          <p className="flex items-center gap-2.5 text-xs font-medium tracking-[0.2em] uppercase text-orange-500 mb-2.5">
            <ShieldCheck aria-hidden="true" className="w-4 h-4 shrink-0" />
            {copy.ndaTitle}
          </p>
          <p className="text-sm text-white/70 leading-relaxed">{copy.ndaBody}</p>
        </aside>

        {items.length === 0 ? (
          <p className="text-white/60">{copy.empty}</p>
        ) : (
          <>
            <FeaturedProject project={featured} now={now} locale={locale} copy={copy} />

            {rest.length > 0 && (
              <section className="mb-16 sm:mb-20">
                <SectionLabel className="mb-2">{copy.schedule}</SectionLabel>
                <ul className="border-t border-white/10">
                  {rest.map((project, i) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      index={i + 2}
                      now={now}
                      locale={locale}
                      copy={copy}
                    />
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        {futureProjects.length > 0 && (
          <section className="mb-16 sm:mb-20">
            <SectionLabel className="mb-2">{copy.futureSection}</SectionLabel>
            <ul className="border-t border-white/10">
              {futureProjects.map((project, i) => (
                <FutureProjectRow
                  key={project.id}
                  project={project}
                  index={i + 1}
                  locale={locale}
                />
              ))}
            </ul>
          </section>
        )}

        <a
          href={`${homePath(locale)}#projects`}
          className="relative inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-medium tracking-[0.2em] uppercase text-white/90 border border-white/15 bg-black/45 hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <CornerBrackets />
          <LayoutGrid aria-hidden="true" className="w-3.5 h-3.5" />
          {copy.allProjects}
        </a>
      </div>
    </article>
  )
}
