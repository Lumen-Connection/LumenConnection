'use client'

import { CornerBrackets } from '@/components/ui/corner-brackets'
import { CONTACT, buildMailtoUrl, buildWhatsAppUrl } from '@/lib/contact'
import { useTranslation } from '@/lib/i18n/LocaleContext'
import { SERVICE_LINKS, homePath, servicePath } from '@/data/service-links'

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/lumenconnection/',
    ariaKey: 'footer.instagramAria',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    href: 'https://x.com/LumenConnection',
    ariaKey: 'footer.twitterAria',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
] as const

export function Footer() {
  const { t, locale } = useTranslation()
  return (
    <footer role="contentinfo" className="py-10 sm:py-12 md:py-14 border-t border-white/10 bg-black">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-5">
              <img
                src="/LC - Logos/Lumen Connection white logo.webp"
                alt="Lumen Connection"
                width={480}
                height={50}
                className="h-9 sm:h-10 w-auto select-none"
                draggable={false}
                decoding="async"
                loading="lazy"
              />
            </div>
            <p className="text-white/90 text-sm leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4 mt-5">
              {SOCIAL_LINKS.map(({ href, ariaKey, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t(ariaKey)}
                  className="text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <nav aria-label={t('footer.services')}>
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/90 mb-5">
              {t('footer.services')}
            </p>
            <ul className="space-y-3 text-white/90 text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={servicePath(locale, link)}
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  >
                    {locale === 'en' ? link.labelEn : link.labelPt}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/90 mb-5">
              {t('footer.contact')}
            </p>
            <ul className="space-y-3 text-white/90 text-sm">
              <li className="break-all">
                <a
                  href={buildMailtoUrl()}
                  aria-label={`${t('footer.emailAria')} ${CONTACT.email}`}
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                Lumen Connection —{' '}
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t('footer.whatsappAria')} ${CONTACT.phoneDisplay}`}
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="text-white/90 pt-1">{CONTACT.location}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 md:mt-14 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5">
            <p className="text-white/90 text-xs tracking-wider">{t('footer.copyright')}</p>
            <a
              href={locale === 'en' ? '/en/cookie-policy' : '/politica-de-cookies'}
              className="text-white/60 text-xs tracking-wider underline underline-offset-4 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              {t('footer.cookiePolicy')}
            </a>
          </div>
          <a
            href={`${homePath(locale)}#contact`}
            className="relative inline-flex items-center px-4 py-2 text-[10px] font-medium tracking-[0.25em] uppercase text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-colors"
          >
            <CornerBrackets color="rgba(255,255,255,0.4)" />
            Luiz Felipe · Matheus Moreira · Gabriel Dias
          </a>
        </div>
      </div>
    </footer>
  )
}