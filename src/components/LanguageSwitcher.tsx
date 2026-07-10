'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { LOCALES, LOCALE_LABEL, type Locale } from '@/lib/i18n/translations'
import { alternatePath } from '@/data/service-links'

const SHORT_LABEL: Record<Locale, string> = { pt: 'PT', en: 'EN' }

/**
 * Seletor de idioma em duas variantes:
 * - "expanded" (padrão): globo + botões PT/EN lado a lado (mobile e páginas de serviço).
 * - "compact": só globo + setinha, com dropdown das opções — usado no header
 *   desktop para liberar espaço.
 */
export function LanguageSwitcher({
  className = '',
  variant = 'expanded',
}: {
  className?: string
  variant?: 'expanded' | 'compact'
}) {
  const { locale, setLocale, t } = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const handleSelect = (code: Locale) => {
    // Persiste a preferência (comportamento original da home) e navega
    // para a rota equivalente no outro idioma quando ela existir.
    setLocale(code)
    setOpen(false)
    const target = alternatePath(pathname ?? '/', code)
    if (target && target !== pathname) router.push(target)
  }

  // Fecha o dropdown compacto com clique fora ou Esc
  useEffect(() => {
    if (!open) return
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
  }, [open])

  if (variant === 'compact') {
    return (
      <div ref={rootRef} className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="language-switcher-menu"
          aria-label={t('lang.label')}
          className="relative inline-flex items-center gap-1.5 px-3 py-2.5 border border-white/15 bg-black/45 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <CornerBrackets />
          <Globe aria-hidden="true" className="h-4 w-4" />
          <ChevronDown
            aria-hidden="true"
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        <AnimatePresence>
          {open && (
            <m.div
              id="language-switcher-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute right-0 top-full mt-3 min-w-[170px] border border-white/15 bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
            >
              <CornerBrackets color="rgba(255,255,255,0.38)" size={9} inset={-4} />
              <ul>
                {LOCALES.map((code) => {
                  const active = code === locale
                  return (
                    <li key={code}>
                      <button
                        type="button"
                        onClick={() => handleSelect(code)}
                        aria-pressed={active}
                        aria-label={`${t('lang.switchTo')} ${LOCALE_LABEL[code]}`}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                          active
                            ? 'bg-white text-black'
                            : 'text-white/75 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{SHORT_LABEL[code]}</span>
                        <span className="font-medium normal-case tracking-normal">
                          {LOCALE_LABEL[code]}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div
      className={`group relative inline-flex h-8 sm:h-9 shrink-0 items-stretch border border-white/15 bg-black/45 text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-[2px] transition-colors hover:border-white/40 hover:bg-black/55 ${className}`}
      role="group"
      aria-label={t('lang.label')}
    >
      <CornerBrackets color="rgba(255,255,255,0.38)" size={8} inset={-3} />
      <span
        aria-hidden="true"
        className="inline-flex w-7 sm:w-8 items-center justify-center border-r border-white/10 text-white/65 transition-colors group-hover:text-white/90"
      >
        <Globe className="h-3.5 w-3.5" />
      </span>
      {LOCALES.map((code, i) => {
        const active = code === locale
        return (
          <m.button
            key={code}
            type="button"
            onClick={() => handleSelect(code)}
            className={`relative inline-flex min-w-8 sm:min-w-9 items-center justify-center px-2 sm:px-2.5 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
              active
                ? 'bg-white text-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            } ${i < LOCALES.length - 1 ? 'border-r border-white/10' : ''}`}
            whileTap={{ scale: 0.96 }}
            aria-pressed={active}
            aria-label={`${t('lang.switchTo')} ${LOCALE_LABEL[code]}`}
          >
            {SHORT_LABEL[code]}
          </m.button>
        )
      })}
    </div>
  )
}
