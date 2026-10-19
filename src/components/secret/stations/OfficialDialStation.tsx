import { ArrowUpRight } from 'lucide-react'
import { GTA_VI_NEWSWIRE, GTA_VI_OFFICIAL_STATIONS } from '@/data/gta-vi'
import type { Locale } from '@/lib/i18n/translations'
import type { Station } from '../dashboard/stations'
import { StationHeader } from './StationHeader'

const COPY = {
  pt: {
    title: 'O que vai sair do rádio do Jason e da Lucia.',
    body: 'Seis estações reveladas pela Rockstar em 8 de outubro. Pela primeira vez na série, rádio e podcasts tocam também a pé, no fone. O resto do dial chega com o jogo.',
    preset: 'Preset',
    hosts: 'No microfone',
    soon: 'Mais estações no lançamento',
    source: 'Ler na Newswire',
  },
  en: {
    title: 'What will play on Jason and Lucia’s radio.',
    body: 'Six stations revealed by Rockstar on October 8. For the first time in the series, radio and podcasts also play on foot, through earbuds. The rest of the dial arrives with the game.',
    preset: 'Preset',
    hosts: 'On the mic',
    soon: 'More stations at launch',
    source: 'Read on the Newswire',
  },
} as const

const RADIO_POST = GTA_VI_NEWSWIRE.find((item) => item.date === '2026-10-08')

export function OfficialDialStation({ locale, station }: { locale: Locale; station: Station }) {
  const copy = COPY[locale]
  return (
    <div>
      <StationHeader locale={locale} station={station} title={copy.title} body={copy.body} />

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {GTA_VI_OFFICIAL_STATIONS.map((item, i) => (
          <li key={item.name} className="vice-lcd relative p-5">
            <p className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/40">
              <span>
                {copy.preset} {i + 1}
              </span>
              <span className="text-[#ff4ad8]">{item.genre[locale]}</span>
            </p>
            <p className="mt-3 font-[family-name:var(--font-vice-lcd)] text-3xl leading-none text-[#5ce1ff] vice-lcd-glow uppercase">
              {item.name}
            </p>
            <p className="mt-4 text-[10px] tracking-[0.22em] uppercase text-white/35">{copy.hosts}</p>
            <p className="mt-1 text-sm text-white/80">{item.hosts}</p>
          </li>
        ))}
        <li className="flex items-center justify-center border border-dashed border-white/15 p-5 text-center text-[11px] tracking-[0.22em] uppercase text-white/35">
          {copy.soon}
        </li>
      </ul>

      {RADIO_POST && (
        <a
          href={RADIO_POST.url}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-[#ffb4e6] hover:text-white"
        >
          {copy.source}
          <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  )
}
