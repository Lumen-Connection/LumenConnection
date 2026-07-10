'use client'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { homePath } from '@/data/service-links'
import { useLocale } from '@/lib/i18n/LocaleContext'

const LABELS = {
  pt: { projects: 'Projetos', contact: 'Contato', homeAria: 'Lumen Connection — Página inicial' },
  en: { projects: 'Projects', contact: 'Contact', homeAria: 'Lumen Connection — Home' },
} as const

/**
 * Header simplificado das páginas de serviço: sempre visível e com links
 * absolutos para as seções da home (o Header da home usa âncoras #fragment
 * e some com o scroll — inadequado para páginas de conteúdo longo).
 */
export function ServiceHeader() {
  const { locale } = useLocale()
  const home = homePath(locale)
  const labels = LABELS[locale]

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
        <a
          href={home}
          className="flex items-center shrink min-w-0 mr-2 sm:mr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          aria-label={labels.homeAria}
        >
          <img
            src="/LC - Logos/Lumen Connection white logo.webp"
            alt="Lumen Connection"
            width={480}
            height={50}
            className="h-5 sm:h-6 md:h-7 w-auto max-w-full select-none"
            draggable={false}
            decoding="async"
          />
        </a>
        <nav className="flex items-center shrink-0 gap-3 sm:gap-6 text-xs sm:text-sm text-white/80">
          <a
            href={`${home}#projects`}
            className="hidden sm:inline hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            {labels.projects}
          </a>
          <a
            href={`${home}#contact`}
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            {labels.contact}
          </a>
          {/* Em telas pequenas o PT/EN expandido não cabe: entra o globo compacto */}
          <div className="sm:hidden">
            <LanguageSwitcher variant="compact" />
          </div>
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  )
}
