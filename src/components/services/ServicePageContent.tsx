import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { buildWhatsAppUrl } from '@/lib/contact'
import { tField } from '@/lib/i18n/tField'
import type { Locale } from '@/lib/i18n/translations'
import { SERVICE_LINKS, homePath, servicePath } from '@/data/service-links'
import {
  getPortfolioItems,
  getServiceContent,
  type ServiceSeo,
} from '@/data/services-seo'

const UI = {
  pt: {
    home: 'Início',
    tools: 'Tecnologias e ferramentas',
    portfolio: 'Projetos do portfólio',
    faq: 'Perguntas frequentes',
    otherServices: 'Outros serviços',
    viewProject: 'Ver projeto',
    contactAlt: 'Ou envie uma mensagem pela',
    contactPage: 'página de contato',
  },
  en: {
    home: 'Home',
    tools: 'Technologies & tools',
    portfolio: 'Portfolio projects',
    faq: 'Frequently asked questions',
    otherServices: 'Other services',
    viewProject: 'View project',
    contactAlt: 'Or send a message through the',
    contactPage: 'contact page',
  },
} as const

/**
 * Conteúdo das páginas de serviço: server component puro (sem framer-motion)
 * para que todo o texto — inclusive o FAQ — saia no HTML inicial.
 */
export function ServicePageContent({
  service,
  locale,
}: {
  service: ServiceSeo
  locale: Locale
}) {
  const content = getServiceContent(service, locale)
  const ui = UI[locale]
  const home = homePath(locale)
  const items = getPortfolioItems(service)
  const otherServices = SERVICE_LINKS.filter((link) => link.id !== service.id)

  return (
    <article className="pt-16">
      {/* Banner com capa, breadcrumb e h1 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black" aria-hidden />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 30% 60%, ${service.color}40 0%, transparent 70%)`,
            }}
            aria-hidden
          />
        </div>
        <div className="relative container mx-auto px-5 sm:px-6 py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/60">
              <li>
                <a
                  href={home}
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {ui.home}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: service.color }}>
                {locale === 'en' ? service.link.labelEn : service.link.labelPt}
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white max-w-4xl mb-6">
            {content.h1}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
            {content.intro[0]}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-5 sm:px-6 pb-16 sm:pb-24 space-y-14 sm:space-y-20">
        {/* Introdução restante */}
        {content.intro.length > 1 && (
          <section className="max-w-3xl space-y-4">
            {content.intro.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-white/80 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        )}

        {/* Seções editoriais */}
        {content.sections.map((section) => (
          <section key={section.heading} className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-white/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Ferramentas */}
        <section className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">{ui.tools}</h2>
          <ul className="flex flex-wrap gap-2.5">
            {content.tools.map((tool) => (
              <li
                key={tool}
                className="relative px-3.5 py-1.5 text-xs sm:text-sm text-white/85 border border-white/15 bg-white/[0.03]"
              >
                <CornerBrackets color={`${service.color}80`} size={7} inset={-3} />
                {tool}
              </li>
            ))}
          </ul>
        </section>

        {/* Portfólio */}
        {items.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{ui.portfolio}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {items.map((item) => {
                const title = tField(item, 'title', locale)
                const description = tField(item, 'description', locale)
                const subcategory = tField(item, 'subcategory', locale)
                const isVideo = item.image.endsWith('.webm')
                const isContain = item.imageFit === 'contain'
                return (
                  <div
                    key={`${service.id}-${item.id}-${item.title}`}
                    className="group relative border border-white/10 bg-white/[0.02] hover:border-white/25 transition-colors"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      {isVideo ? (
                        <video
                          src={item.image}
                          poster={item.poster}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="metadata"
                          aria-label={title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          src={item.image}
                          alt={title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={`transition-transform duration-500 ${
                            isContain
                              ? 'object-contain p-6'
                              : 'object-cover group-hover:scale-[1.03]'
                          }`}
                        />
                      )}
                    </div>
                    <div className="p-5">
                      {subcategory && (
                        <p
                          className="text-[10px] font-medium tracking-[0.25em] uppercase mb-2"
                          style={{ color: service.color }}
                        >
                          {subcategory}
                        </p>
                      )}
                      <h3 className="text-sm sm:text-base font-semibold text-white mb-2 leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                        {description}
                      </p>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                        >
                          {ui.viewProject}
                          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* FAQ — <details> nativo: conteúdo indexável sem JavaScript */}
        <section className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{ui.faq}</h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {content.faq.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-sm sm:text-base font-medium text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
                  {q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-white/50 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative max-w-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 text-center">
          <CornerBrackets color={`${service.color}90`} size={12} inset={-5} />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{content.ctaTitle}</h2>
          <a
            href={buildWhatsAppUrl(content.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black font-medium text-xs sm:text-sm tracking-wide hover:bg-white/90 transition-colors"
          >
            {content.ctaLabel}
            <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </a>
          <p className="mt-4 text-xs sm:text-sm text-white/60">
            {ui.contactAlt}{' '}
            <a
              href={`${home}#contact`}
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              {ui.contactPage}
            </a>
            .
          </p>
        </section>

        {/* Linkagem interna entre serviços */}
        <section>
          <h2 className="text-sm font-medium tracking-[0.3em] uppercase text-white/60 mb-5">
            {ui.otherServices}
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {otherServices.map((link) => (
              <li key={link.id}>
                <a
                  href={servicePath(locale, link)}
                  className="text-white/75 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {locale === 'en' ? link.labelEn : link.labelPt}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
