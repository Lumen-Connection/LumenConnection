import { m, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Play } from 'lucide-react'
import { LazyVideo } from '@/components/media/LazyVideo'
import { CornerBrackets, SectionLabel } from '@/components/ui/corner-brackets'
import { useTranslation } from '@/lib/i18n/LocaleContext'

const VideoModal = dynamic(
  () => import('@/components/VideoModal').then((mod) => mod.VideoModal),
  { ssr: false },
)

const INTRO_VIDEO = '/videos/projects/lumen-intro-alt2.webm'
const INTRO_POSTER = '/videos/posters/lumen-intro-alt2.webp'
const INTRO_TITLE = 'Intro Lumen Connection'

/**
 * Faixa entre o portfólio e o CTA com a intro da marca: fica depois dos cases
 * e projetos para não competir com eles. Toca sem som em loop; o botão abre a
 * versão com som.
 */
export function SecondBanner() {
  const { t } = useTranslation()
  const [showVideo, setShowVideo] = useState(false)
  const banner2Ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress: banner2ScrollProgress } = useScroll({ target: banner2Ref, offset: ['start start', 'end start'] })
  const banner2Dimming = useTransform(banner2ScrollProgress, [0, 0.6], [0, 1])
  const banner2BlurAmount = useTransform(banner2ScrollProgress, [0, 0.5], [0, 16])
  const banner2Blur = useMotionTemplate`blur(${banner2BlurAmount}px)`

  return (
    <section id="banner-2" ref={banner2Ref} aria-labelledby="banner-2-heading" className="relative h-screen overflow-hidden bg-black">
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <m.div className="absolute inset-0 scale-110" style={{ filter: banner2Blur }}>
          {/* No mobile o vídeo fica numa faixa 16:9 com bordas esfumadas: em tela
              retrato o cover cortaria o logotipo */}
          <LazyVideo
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full aspect-video object-cover [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] md:inset-0 md:translate-y-0 md:h-full md:aspect-auto md:[mask-image:none]"
            src={INTRO_VIDEO}
            poster={INTRO_POSTER}
          />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 via-transparent to-[#000000]" />
      </div>
      <m.div className="absolute inset-0 bg-[#000000] z-[1]" style={{ opacity: banner2Dimming }} />
      <div className="relative z-10 h-full w-full flex flex-col justify-end items-center px-5 sm:px-6 pb-14 sm:pb-20">
        <m.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel color="#f97316" className="mb-3">{t('banner2.eyebrow')}</SectionLabel>
          <h2 id="banner-2-heading" className="text-lg sm:text-xl font-semibold tracking-tight text-white mb-1.5">
            {INTRO_TITLE}
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mb-5">{t('banner2.caption')}</p>
          <m.button
            type="button"
            onClick={() => setShowVideo(true)}
            className="relative inline-flex items-center gap-2 px-5 py-2.5 border border-white/25 bg-black/40 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            whileTap={{ scale: 0.97 }}
            aria-haspopup="dialog"
          >
            <CornerBrackets />
            <Play aria-hidden="true" className="w-3.5 h-3.5 fill-current" />
            {t('banner2.watch')}
          </m.button>
        </m.div>
      </div>
      {showVideo && (
        <VideoModal
          src={INTRO_VIDEO}
          poster={INTRO_POSTER}
          title={INTRO_TITLE}
          onClose={() => setShowVideo(false)}
        />
      )}
    </section>
  )
}
