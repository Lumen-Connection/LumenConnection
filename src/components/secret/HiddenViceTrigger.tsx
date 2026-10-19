import { VICE_SECRET_PATH } from '@/data/secret-vice'

/**
 * Palmeira quase invisível. Quem inspeciona o DOM ou passa o mouse
 * devagar no rodapé descobre o caminho para /vice.
 */
export function HiddenViceTrigger({
  variant = 'footer',
}: {
  variant?: 'footer' | 'page'
}) {
  const size = variant === 'page' ? 'h-5 w-5' : 'h-3.5 w-3.5'
  const idle =
    variant === 'page'
      ? 'opacity-[0.10] text-white/80'
      : 'opacity-[0.16] text-white/70'

  return (
    <a
      href={VICE_SECRET_PATH}
      title="1986"
      aria-label="1986"
      data-year="1986"
      className={`group/vice inline-flex items-center justify-center ${size} ${idle} hover:opacity-100 hover:text-[#ff4ad8] focus-visible:opacity-100 focus-visible:text-[#ff4ad8] transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4ad8]/70 rounded-sm`}
    >
      <PalmIcon className="h-full w-full drop-shadow-[0_0_0_transparent] group-hover/vice:drop-shadow-[0_0_8px_#ff4ad8] group-focus-visible/vice:drop-shadow-[0_0_8px_#ff4ad8] transition-[filter] duration-500" />
    </a>
  )
}

function PalmIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.7 22h-1.4v-9.2c2.1.15 4.3-.15 6.2-1.05-1.55 1.2-3.55 1.9-6.2 2.05 1.7 0 4.05-.45 5.85-1.55-1.7 1.55-3.85 2.35-5.85 2.5 1.35.15 3.2-.1 4.7-.85-1.55 1.25-3.15 1.85-4.7 1.95z" />
      <path d="M11.3 22h1.4v-9.2c-2.1.15-4.3-.15-6.2-1.05 1.55 1.2 3.55 1.9 6.2 2.05-1.7 0-4.05-.45-5.85-1.55 1.7 1.55 3.85 2.35 5.85 2.5-1.35.15-3.2-.1-4.7-.85 1.55 1.25 3.15 1.85 4.7 1.95z" />
      <path d="M11.2 8.2c.25-2.4 1.55-4.4.8-6.35 1.55 1.35 1.7 3.55 1.35 5.55 1.85-1.7 3.9-2.35 5.55-1.85-1.7 1.15-3.15 1.55-4.55 1.7 1.9-.15 3.65.2 5.15 1.15-2.05.05-3.7-.2-5.15-.55.15 1.05.05 2.15-.15 3.15H11.2z" />
      <path d="M12.8 8.2c-.25-2.4-1.55-4.4-.8-6.35-1.55 1.35-1.7 3.55-1.35 5.55-1.85-1.7-3.9-2.35-5.55-1.85 1.7 1.15 3.15 1.55 4.55 1.7-1.9-.15-3.65.2-5.15 1.15 2.05.05 3.7-.2 5.15-.55-.15 1.05-.05 2.15.15 3.15h2.15z" />
      <path d="M11.35 12.6h1.3V22h-1.3z" />
    </svg>
  )
}
