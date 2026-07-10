'use client'

import { useEffect, useRef, useState } from 'react'

type LazyVideoProps = {
  src: string
  poster?: string
  className?: string
  'aria-label'?: string
  'aria-hidden'?: boolean
  /** Distância do viewport em que o download/play começa. */
  rootMargin?: string
}

/**
 * Vídeo de fundo/demonstração que só é baixado quando se aproxima do
 * viewport: até lá renderiza apenas o poster (preload="none"). Também
 * pausa quando sai da tela para poupar CPU/bateria.
 */
export function LazyVideo({
  src,
  poster,
  className,
  rootMargin = '300px',
  ...aria
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setActivated(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            if (activated) videoRef.current?.pause()
            continue
          }
          setActivated(true)
          videoRef.current?.play().catch(() => undefined)
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, activated])

  return (
    <video
      ref={videoRef}
      {...aria}
      src={activated ? src : undefined}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      disablePictureInPicture
      className={className}
    />
  )
}
