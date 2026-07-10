'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { heroProjects } from '@/app/portfolioData'

type ActiveColorValue = {
  activeColor: string
  setActiveColor: (color: string) => void
}

const DEFAULT_COLOR = heroProjects[0]?.color ?? '#f97316'

const ActiveColorContext = createContext<ActiveColorValue>({
  activeColor: DEFAULT_COLOR,
  setActiveColor: () => undefined,
})

/**
 * Cor de destaque do slide ativo do hero. Vive num contexto próprio para que
 * a troca de slide (a cada 8,5s) re-renderize apenas os consumidores
 * (Header, AboutSection, glow) e não a página inteira.
 */
export function ActiveColorProvider({ children }: { children: ReactNode }) {
  const [activeColor, setActiveColor] = useState(DEFAULT_COLOR)
  const value = useMemo(() => ({ activeColor, setActiveColor }), [activeColor])
  return <ActiveColorContext.Provider value={value}>{children}</ActiveColorContext.Provider>
}

export function useActiveColor() {
  return useContext(ActiveColorContext)
}
