import Image from 'next/image'
import { ArrowLeft, Check, Github, LayoutGrid, ShieldAlert } from 'lucide-react'
import { CornerBrackets, SectionLabel } from '@/components/ui/corner-brackets'
import { gameMods, type GameMod } from '@/data/game-mods'
import { homePath } from '@/data/service-links'
import { tField } from '@/lib/i18n/tField'
import type { Locale } from '@/lib/i18n/translations'

const COPY = {
  pt: {
    eyebrow: 'Lumen Connection',
    title: 'Mods de Jogos',
    intro:
      'Mapas, modos de jogo e experimentos que expandem os jogos que a gente joga. Código aberto, com instruções de instalação e o repositório de cada mod.',
    back: 'Voltar para a home',
    featured: 'Mod em destaque',
    features: 'O que muda na raid',
    requirements: 'Requisitos e instalação',
    version: 'Versão',
    license: 'Licença',
    platform: 'Plataforma',
    stack: 'Feito com',
    repo: 'Ver no GitHub',
    noticeTitle: 'Mods não oficiais',
    noticeBody:
      'Os mods desta página são projetos de fãs, sem afiliação com os estúdios dos jogos. Instale por sua conta e risco e sempre faça backup do seu perfil antes.',
    allProjects: 'Ver projetos publicados',
  },
  en: {
    eyebrow: 'Lumen Connection',
    title: 'Game Mods',
    intro:
      'Maps, game modes and experiments that expand the games we play. Open source, with install instructions and the repository for every mod.',
    back: 'Back to home',
    featured: 'Featured mod',
    features: 'What changes in the raid',
    requirements: 'Requirements & install',
    version: 'Version',
    license: 'License',
    platform: 'Platform',
    stack: 'Built with',
    repo: 'View on GitHub',
    noticeTitle: 'Unofficial mods',
    noticeBody:
      'The mods on this page are fan projects, not affiliated with the games’ studios. Install at your own risk and always back up your profile first.',
    allProjects: 'See published projects',
  },
} as const

type Copy = (typeof COPY)[Locale]

function ModCard({ mod, locale, copy }: { mod: GameMod; locale: Locale; copy: Copy }) {
  const meta: [string, string | undefined][] = [
    [copy.platform, mod.platform],
    [copy.version, mod.version],
    [copy.license, mod.license],
    [copy.stack, mod.stack],
  ]
  return (
    <article className="relative border border-white/15 bg-white/[0.02]">
      <CornerBrackets color="rgba(255,255,255,0.38)" size={12} inset={-6} />
      <div className="relative aspect-[1448/560] bg-black overflow-hidden border-b border-white/10">
        <Image
          src={mod.image}
          alt={`${mod.game}: ${mod.title}`}
          fill
          sizes="(min-width: 1152px) 72rem, 100vw"
          className="object-contain"
          priority
        />
      </div>

      <div className="p-6 sm:p-8 md:p-10">
        <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/45 mb-3">{mod.game}</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">{mod.title}</h2>
        <p className="max-w-3xl text-sm sm:text-base text-white/70 leading-relaxed">
          {tField(mod, 'description', locale)}
        </p>

        <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
          {meta
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label} className="border-b border-white/10 py-3 pr-4">
                <dt className="text-[10px] tracking-[0.22em] uppercase text-white/40">{label}</dt>
                <dd className="mt-1 text-sm text-white">{value}</dd>
              </div>
            ))}
        </dl>

        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <section>
            <SectionLabel color="#f97316" className="mb-4">
              {copy.features}
            </SectionLabel>
            <ul className="space-y-3">
              {mod.features[locale].map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                  <Check aria-hidden="true" className="mt-0.5 w-4 h-4 shrink-0 text-orange-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <SectionLabel className="mb-4">{copy.requirements}</SectionLabel>
            <ol className="space-y-3">
              {mod.requirements[locale].map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                  <span className="font-mono text-xs tabular-nums text-white/35 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <a
          href={mod.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-black bg-orange-500 hover:bg-orange-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Github aria-hidden="true" className="w-4 h-4" />
          {copy.repo}
          <span className="hidden sm:inline font-mono normal-case tracking-normal text-black/60">
            {mod.repoLabel}
          </span>
        </a>
      </div>
    </article>
  )
}

export function ModsPageContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const [featured, ...rest] = gameMods

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
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-orange-500 mb-4">{copy.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            {copy.title}
          </h1>
          <p className="text-white/70 leading-relaxed">{copy.intro}</p>
        </header>

        <section className="mb-12 sm:mb-16">
          <SectionLabel color="#f97316" className="mb-5">
            {copy.featured}
          </SectionLabel>
          <ModCard mod={featured} locale={locale} copy={copy} />
        </section>

        {rest.length > 0 && (
          <section className="mb-12 sm:mb-16 space-y-10">
            {rest.map((mod) => (
              <ModCard key={mod.id} mod={mod} locale={locale} copy={copy} />
            ))}
          </section>
        )}

        <aside className="relative mb-12 sm:mb-16 max-w-3xl border border-orange-500/30 bg-orange-500/[0.06] p-5 sm:p-6">
          <CornerBrackets color="rgba(249,115,22,0.55)" size={10} inset={-5} />
          <p className="flex items-center gap-2.5 text-xs font-medium tracking-[0.2em] uppercase text-orange-500 mb-2.5">
            <ShieldAlert aria-hidden="true" className="w-4 h-4 shrink-0" />
            {copy.noticeTitle}
          </p>
          <p className="text-sm text-white/70 leading-relaxed">{copy.noticeBody}</p>
        </aside>

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
