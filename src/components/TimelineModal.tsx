'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { useTranslation } from '@/lib/i18n/LocaleContext'
import { tField } from '@/lib/i18n/tField'
import type { TimelineStep } from '@/data/types'

/** Laranja da marca — acento da linha do tempo, alinhado ao restante do portfólio. */
const ACCENT = '#f97316'

export function TimelineModal({
  steps,
  title,
  description,
  onClose,
}: {
  steps: TimelineStep[]
  title: string
  description?: string
  onClose: () => void
}) {
  const { t, locale } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  // Lido dentro do handler de teclado sem re-registrar o listener a cada zoom.
  const zoomRef = useRef<typeof zoom>(null)
  zoomRef.current = zoom
  const titleId = `timeline-title-${title.replace(/\s+/g, '-').toLowerCase()}`

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    previouslyFocused.current = document.activeElement as HTMLElement | null

    const dialog = dialogRef.current
    dialog
      ?.querySelector<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        if (zoomRef.current) setZoom(null)
        else onClose()
        return
      }
      if (e.key === 'Tab') {
        // Consulta os focáveis a cada Tab: o overlay de zoom entra/sai do DOM.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previouslyFocused.current?.focus?.()
    }
  }, [mounted, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      <m.div
        className="fixed inset-0 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          data-a11y-filter="true"
          className="absolute inset-0 flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#0a0a0a] border border-white/10 focus:outline-none"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <CornerBrackets color="rgba(255,255,255,0.6)" size={14} inset={-6} />

            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/10 shrink-0">
              <div className="min-w-0 flex-1">
                <p
                  className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold mb-0.5"
                  style={{ color: ACCENT }}
                >
                  {t('timeline.subtitle')}
                </p>
                <h2 id={titleId} className="text-sm sm:text-base font-semibold text-white truncate tracking-tight">
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 w-9 h-9 border border-white/15 bg-black/60 text-white/90 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label={t('timeline.close')}
              >
                <X aria-hidden="true" size={16} />
              </button>
            </div>

            {/* Scrollable timeline */}
            <div className="overflow-y-auto min-h-0 [scrollbar-width:thin]">
              {description && (
                <p className="px-4 sm:px-6 pt-4 text-white/65 text-xs sm:text-sm leading-relaxed">
                  {description}
                </p>
              )}

              <ol className="relative px-4 sm:px-6 py-6 space-y-8">
                {steps.map((step, i) => {
                  const stepTitle = tField(step, 'title', locale)
                  const stepDescription = tField(step, 'description', locale)
                  const multi = step.images.length > 1
                  return (
                    <li key={step.step} className="relative pl-11 sm:pl-14">
                      {/* Linha conectora até a próxima etapa */}
                      {i < steps.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute left-4 sm:left-5 top-10 sm:top-11 -bottom-8 w-px bg-white/10"
                        />
                      )}
                      {/* Marcador com o número da etapa */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border text-[11px] sm:text-xs font-bold"
                        style={{
                          borderColor: ACCENT,
                          color: ACCENT,
                          backgroundColor: 'rgba(249,115,22,0.08)',
                        }}
                      >
                        {step.step}
                      </span>

                      <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5 leading-snug pt-1">
                        <span className="sr-only">{t('timeline.step')} {step.step}: </span>
                        {stepTitle}
                      </h3>
                      <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-3">
                        {stepDescription}
                      </p>

                      <div className={`grid gap-2 ${multi ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {step.images.map((src) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setZoom({ src, alt: stepTitle })}
                            className="group relative aspect-video bg-black/60 border border-white/10 hover:border-white/30 overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                            aria-label={`${t('timeline.enlarge')} — ${stepTitle}`}
                          >
                            <Image
                              src={src}
                              alt={stepTitle}
                              fill
                              sizes="(max-width: 768px) 100vw, 360px"
                              className="object-contain p-3"
                            />
                            <span className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-black/60 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ZoomIn aria-hidden="true" className="w-3.5 h-3.5 text-white/85" />
                            </span>
                          </button>
                        ))}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </m.div>
        </div>

        {/* Overlay de zoom da imagem */}
        <AnimatePresence>
          {zoom && (
            <m.div
              className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-8 bg-black/95"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoom(null)}
            >
              <button
                type="button"
                onClick={() => setZoom(null)}
                className="absolute top-4 right-4 w-9 h-9 border border-white/15 bg-black/60 text-white/90 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label={t('timeline.close')}
              >
                <X aria-hidden="true" size={16} />
              </button>
              <div className="relative w-full h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                <Image src={zoom.src} alt={zoom.alt} fill sizes="100vw" className="object-contain" />
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </AnimatePresence>,
    document.body,
  )
}
