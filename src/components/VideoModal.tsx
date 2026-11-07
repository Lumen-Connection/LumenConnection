'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { m, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { useTranslation } from '@/lib/i18n/LocaleContext'

/**
 * Player em tela cheia para vídeos com som. Abre a partir de um clique, então
 * o navegador permite o autoplay com áudio. Funciona com vídeos horizontais e
 * verticais: o vídeo se ajusta à altura disponível sem cortes.
 */
export function VideoModal({
  src,
  poster,
  title,
  description,
  onClose,
}: {
  src: string
  poster?: string
  title: string
  description?: string
  onClose: () => void
}) {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const titleId = `video-title-${title.replace(/\s+/g, '-').toLowerCase()}`

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    previouslyFocused.current = document.activeElement as HTMLElement | null

    const dialog = dialogRef.current
    const focusables = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), video, [tabindex]:not([tabindex="-1"])',
    )
    focusables?.[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab' && focusables && focusables.length > 0) {
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
            className="relative z-10 w-full sm:w-auto sm:min-w-[420px] max-w-5xl max-h-[95vh] flex flex-col bg-[#0a0a0a] border border-white/10 focus:outline-none"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <CornerBrackets color="rgba(255,255,255,0.6)" size={14} inset={-6} />

            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/10 shrink-0">
              <h2 id={titleId} className="min-w-0 flex-1 text-sm sm:text-base font-semibold text-white truncate tracking-tight">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 w-9 h-9 border border-white/15 bg-black/60 text-white/90 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label={t('video.close')}
              >
                <X aria-hidden="true" size={16} />
              </button>
            </div>

            <div className="bg-black flex items-center justify-center min-h-0">
              <video
                src={src}
                poster={poster}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="block max-w-full max-h-[75vh] sm:max-h-[80vh] w-auto h-auto"
              />
            </div>

            {description && (
              <p className="hidden sm:block shrink-0 border-t border-white/10 px-6 py-3 max-w-3xl text-white/65 text-xs leading-relaxed">
                {description}
              </p>
            )}
          </m.div>
        </div>
      </m.div>
    </AnimatePresence>,
    document.body,
  )
}
