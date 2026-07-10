import { notFound } from 'next/navigation'

/**
 * Catch-all necessário porque, com múltiplos root layouts (route groups
 * (pt)/(en)), não existe layout raiz para o not-found global — URLs sem
 * rota correspondente caem aqui e renderizam o 404 do grupo (pt).
 */
export default function CatchAllNotFound() {
  notFound()
}
