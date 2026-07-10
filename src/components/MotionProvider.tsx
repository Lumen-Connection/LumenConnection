'use client'

import { LazyMotion } from 'framer-motion'

const loadFeatures = () =>
  import('@/lib/motion-features').then((mod) => mod.default)

/**
 * Provê as features de animação do framer-motion via LazyMotion: os
 * componentes `m.*` renderizam de imediato (estado inicial estático) e o
 * motor de animação (domAnimation) chega num chunk assíncrono, fora do
 * caminho crítico. `strict` garante que ninguém importe `motion.*` completo.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
