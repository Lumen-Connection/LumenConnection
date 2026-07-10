'use client'

import { CornerBrackets } from '@/components/ui/corner-brackets'
import { openCookieSettings } from '@/lib/cookie-consent'

export function OpenCookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="relative inline-flex items-center px-5 py-3 text-xs font-medium tracking-[0.15em] uppercase text-white/90 border border-white/15 bg-black/45 hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
    >
      <CornerBrackets />
      {label}
    </button>
  )
}
