'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronDown, LayoutGrid } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { useTranslation } from '@/lib/i18n/LocaleContext'
import { tField } from '@/lib/i18n/tField'
import { upcomingProjectsPath } from '@/data/service-links'
import { upcomingProjects, type UpcomingProject } from '@/data/upcoming-projects'
import {
  COUNTDOWN_WINDOW_MS,
  formatCountdown,
  formatLaunchDate,
  getUpcomingProjects,
  localTimezoneLabel,
} from '@/lib/upcoming'
import type { Locale } from '@/lib/i18n/translations'

function LaunchInfo({
  project,
  now,
  locale,
  tbdLabel,
}: {
  project: UpcomingProject
  now: number
  locale: Locale
  tbdLabel: string
}) {
  if (!project.launchAt) {
    return <p className="text-xs text-white/60">{tbdLabel}</p>
  }
  const msLeft = Date.parse(project.launchAt) - now
  if (msLeft <= COUNTDOWN_WINDOW_MS) {
    return (
      <p className="text-xs text-white/75 font-mono tabular-nums">
        {formatCountdown(msLeft)}
      </p>
    )
  }
  return (
    <p className="text-xs text-white/60 leading-relaxed">
      {formatLaunchDate(project.launchAt, locale)}
      <br />
      {localTimezoneLabel(locale)}
    </p>
  )
}

/**
 * "Projetos Chegando" no estilo do "Upcoming Launches" da SpaceX, integrado
 * ao Header: cronômetro T- para lançamentos na próxima semana e data formatada
 * para os demais. Lançamentos passados saem da lista sozinhos.
 *
 * - variant="dropdown": gatilho no header desktop com painel ancorado abaixo.
 * - variant="inline": seção expansível dentro do menu mobile.
 */
export function UpcomingProjects({
  variant = 'dropdown',
}: {
  variant?: 'dropdown' | 'inline'
}) {
  const { t, locale } = useTranslation()
  const [open, setOpen] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [open])

  // Fecha o dropdown com clique fora ou Esc
  useEffect(() => {
    if (!open || variant !== 'dropdown') return
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, variant])

  const items = getUpcomingProjects(upcomingProjects, now)

  if (items.length === 0) return null

  const panelContent = (
    <>
      <ul className="border-t border-white/10">
        {items.map((project) => (
          <li
            key={project.id}
            className="flex items-center gap-3.5 px-4 py-3.5 border-b border-white/10"
          >
            <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-sm bg-white/5">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="56px"
                className={
                  project.imageFit === 'contain'
                    ? 'object-contain p-1.5'
                    : 'object-cover'
                }
              />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/45 mb-0.5 truncate">
                {tField(project, 'category', locale)}
              </p>
              <p className="text-sm font-semibold text-white leading-snug mb-1">
                {tField(project, 'title', locale)}
              </p>
              <LaunchInfo
                project={project}
                now={now}
                locale={locale}
                tbdLabel={t('upcoming.tbd')}
              />
            </div>
          </li>
        ))}
      </ul>
      <a
        href={upcomingProjectsPath(locale)}
        onClick={() => setOpen(false)}
        className="flex items-center justify-center gap-2 px-4 py-3 text-[10px] font-medium tracking-[0.25em] uppercase text-white/65 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
      >
        <LayoutGrid aria-hidden="true" className="w-3.5 h-3.5" />
        {t('upcoming.all')}
      </a>
    </>
  )

  if (variant === 'inline') {
    return (
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="upcoming-projects-inline"
          className="relative w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium tracking-[0.15em] uppercase text-white/90 border border-white/15 bg-black/45 hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <CornerBrackets />
          {t('upcoming.title')}
          <ChevronDown
            aria-hidden="true"
            className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              id="upcoming-projects-inline"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="relative mt-3 border border-white/15 bg-white/[0.02]">
                <CornerBrackets color="rgba(255,255,255,0.38)" size={9} inset={-4} />
                {panelContent}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="upcoming-projects-panel"
        aria-label={t('upcoming.toggleAria')}
        className="relative inline-flex items-center gap-3 whitespace-nowrap px-4 py-2.5 text-xs font-medium tracking-[0.15em] uppercase text-white/90 border border-white/15 bg-black/45 hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
      >
        <CornerBrackets />
        {t('upcoming.title')}
        <ChevronDown
          aria-hidden="true"
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id="upcoming-projects-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-3 w-[320px] max-w-[calc(100vw-2rem)] border border-white/15 bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          >
            <CornerBrackets color="rgba(255,255,255,0.38)" size={9} inset={-4} />
            <p className="px-4 py-3 text-[11px] font-medium tracking-[0.25em] uppercase text-white/85">
              {t('upcoming.title')}
            </p>
            {panelContent}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
