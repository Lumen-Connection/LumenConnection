import Image from 'next/image'
import { GTA_VI_REGIONS } from '@/data/gta-vi'
import type { Locale } from '@/lib/i18n/translations'
import type { Station } from '../dashboard/stations'
import { StationHeader } from './StationHeader'

const COPY = {
  pt: {
    title: 'Seis regiões, uma estrada só.',
    body: 'Leonida, segundo a Rockstar: da baía de Vice City às trilhas de Mount Kalaga. Todas as fotos são capturas oficiais do jogo.',
  },
  en: {
    title: 'Six regions, one long road.',
    body: 'Leonida, according to Rockstar: from Vice City’s bay to the Mount Kalaga trails. Every photo is an official in-game capture.',
  },
} as const

export function MapStation({ locale, station }: { locale: Locale; station: Station }) {
  const copy = COPY[locale]
  return (
    <div>
      <StationHeader locale={locale} station={station} title={copy.title} body={copy.body} />

      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GTA_VI_REGIONS.map((region, i) => (
          <li key={region.id} className="group relative aspect-[4/3] overflow-hidden border border-white/10 bg-black">
            <Image
              src={region.image}
              alt={region.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="font-mono text-[10px] text-[#5ce1ff]">0{i + 1}</p>
              <h3 className="font-[family-name:var(--font-vice-display)] text-3xl tracking-[0.1em] text-white">
                {region.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-white/70 leading-snug">{region.body[locale]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
