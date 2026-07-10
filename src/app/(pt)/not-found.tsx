import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-xs font-medium tracking-[0.3em] uppercase text-orange-500">
        Erro 404
      </p>
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
        Página não encontrada
      </h1>
      <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium text-xs sm:text-sm tracking-wide hover:bg-white/90 transition-colors"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
