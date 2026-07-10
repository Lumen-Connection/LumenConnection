import { m, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { useRef } from 'react'
import { LazyVideo } from '@/components/media/LazyVideo'

export function SecondBanner() {
  const banner2Ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress: banner2ScrollProgress } = useScroll({ target: banner2Ref, offset: ['start start', 'end start'] })
  const banner2Dimming = useTransform(banner2ScrollProgress, [0, 0.6], [0, 1])
  const banner2BlurAmount = useTransform(banner2ScrollProgress, [0, 0.5], [0, 16])
  const banner2Blur = useMotionTemplate`blur(${banner2BlurAmount}px)`

  return (
    <section id="banner-2" ref={banner2Ref} aria-hidden="true" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <m.div className="absolute inset-0 scale-110" style={{ filter: banner2Blur }}>
          <LazyVideo
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/banners/ferrari-comercial-trailer.webm"
            poster="/videos/posters/ferrari-comercial-trailer.webp"
          />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/50 to-[#000000]" />
      </div>
      <m.div className="absolute inset-0 bg-[#000000] z-[1]" style={{ opacity: banner2Dimming }} />
    </section>
  )
}

