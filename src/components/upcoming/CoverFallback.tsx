/**
 * Capa de reserva para projetos ainda sem identidade visual: um losango da
 * marca centralizado sobre um leve gradiente. Preenche o container (que já
 * define fundo e overflow), então basta posicioná-la em cima.
 */
export function CoverFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.06] to-transparent">
      <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className="w-2/5 h-2/5">
        <rect
          x="28"
          y="28"
          width="44"
          height="44"
          transform="rotate(45 50 50)"
          stroke="#f97316"
          strokeWidth="3"
        />
      </svg>
    </div>
  )
}
