import { useState } from 'react'
import { m, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { navItems } from '@/app/portfolioData'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { UpcomingProjects } from '@/components/UpcomingProjects'

const LumenAIModal = dynamic(
  () => import('@/components/LumenAIModal').then((mod) => mod.LumenAIModal),
  { ssr: false },
)
import { useTranslation } from '@/lib/i18n/LocaleContext'
import { useActiveColor } from '@/lib/active-color'
import type { TranslationKey } from '@/lib/i18n/translations'

const NAV_KEY_BY_HREF: Record<string, TranslationKey> = {
  '#home': 'nav.home',
  '#success-cases': 'nav.successCases',
  '#projects': 'nav.projects',
  '#contact': 'nav.contact',
}

export function Header() {
  const { t } = useTranslation()
  const { activeColor } = useActiveColor()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLumenAIModalOpen, setIsLumenAIModalOpen] = useState(false)
  const openLumenAIModal = () => {
    setIsLumenAIModalOpen(true)
    setIsMenuOpen(false)
  }
  const navLabel = (href: string, fallback: string) => {
    const key = NAV_KEY_BY_HREF[href]
    return key ? t(key) : fallback
  }

  const lumenStyle = {
    color: activeColor,
    borderColor: `${activeColor}66`,
    backgroundColor: `${activeColor}0d`,
    boxShadow: `0 0 24px -8px ${activeColor}66`,
    transition: 'color 600ms ease, border-color 600ms ease, background-color 600ms ease, box-shadow 600ms ease',
  } as const

  const { scrollY } = useScroll()
  const headerBackground = useTransform(scrollY, [0, 100], ['transparent', 'rgba(10, 10, 10, 0.95)'])
  const headerOpacity = useTransform(scrollY, [0, 700], [1, 0])
  const headerY = useTransform(scrollY, [0, 700], [0, -120])

  // @container + variantes @min-[90rem]: como rem escala com o zoom de texto
  // do widget de acessibilidade, o header colapsa para o menu hambúrguer quando
  // o conteúdo deixa de caber — coisa que breakpoints md: (px de viewport) não
  // detectam. (90rem em vez de @7xl/80rem: com o "Projetos Chegando" o conteúdo
  // completo precisa de ~87rem; abaixo disso os blocos se sobrepunham.)
  return (
    <m.header role="banner" className="@container fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: headerBackground, opacity: headerOpacity, y: headerY }}>
      <div className="container mx-auto px-5 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <m.a
            href="#home"
            aria-label={t('nav.goHomeAria')}
            className="flex items-center shrink min-w-0 mr-3 sm:mr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/LC - Logos/Lumen Connection white logo.webp"
              alt="Lumen Connection"
              width={480}
              height={50}
              className="h-5 sm:h-6 md:h-7 w-auto select-none"
              draggable={false}
              decoding="async"
              fetchPriority="high"
            />
          </m.a>

          <nav aria-label={t('nav.mainLabel')} className="hidden @min-[90rem]:flex items-center gap-6">
            {navItems.map((item, i) => (
              <m.a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-xs font-medium tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                {navLabel(item.href, item.label)}
              </m.a>
            ))}
            <m.button
              type="button"
              onClick={openLumenAIModal}
              className="group relative inline-flex items-center whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase border focus-visible:outline-none focus-visible:ring-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * navItems.length }}
              whileHover={{
                backgroundColor: `${activeColor}1a`,
                borderColor: `${activeColor}b3`,
              }}
              whileTap={{ scale: 0.97 }}
              aria-haspopup="dialog"
              style={{ ...lumenStyle, ['--tw-ring-color' as string]: activeColor }}
            >
              <CornerBrackets color={`${activeColor}bf`} />
              Lumen AI
            </m.button>
          </nav>

          <div className="hidden @min-[90rem]:flex items-center gap-3">
            <UpcomingProjects /> {/*Não esquecer de melhorar mais isso aki*/}
            <m.a
              href="#contact"
              className="relative inline-flex items-center whitespace-nowrap px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase text-white/90 border border-white/15 hover:border-white/40 hover:bg-white/5 transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CornerBrackets />
              {t('nav.contactCta')}
            </m.a>
            <LanguageSwitcher variant="compact" />
          </div>

          <div className="@min-[90rem]:hidden flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <span aria-hidden="true" className="w-px h-5 bg-white/15" />
            <button
              type="button"
              className="-mr-1 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
            {isMenuOpen ? <X aria-hidden="true" className="w-5 h-5" /> : <Menu aria-hidden="true" className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            id="mobile-nav"
            className="@min-[90rem]:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav aria-label={t('nav.mobileLabel')} className="container mx-auto px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navLabel(item.href, item.label)}
                </a>
              ))}
              <button
                type="button"
                onClick={openLumenAIModal}
                className="relative inline-flex items-center justify-center mt-1 px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase border focus-visible:outline-none focus-visible:ring-2"
                aria-haspopup="dialog"
                style={{ ...lumenStyle, ['--tw-ring-color' as string]: activeColor }}
              >
                <CornerBrackets color={`${activeColor}bf`} />
                Lumen AI
              </button>
              <a
                href="#contact"
                className="relative mt-3 inline-flex items-center justify-center px-5 py-3 text-xs font-medium tracking-[0.15em] uppercase text-white/90 border border-white/15"
                onClick={() => setIsMenuOpen(false)}
              >
                <CornerBrackets />
                {t('nav.contactCta')}
              </a>
              <UpcomingProjects variant="inline" />
            </nav>
          </m.div>
        )}
      </AnimatePresence>

      {isLumenAIModalOpen && <LumenAIModal onClose={() => setIsLumenAIModalOpen(false)} activeColor={activeColor} />}
    </m.header>
  )
}