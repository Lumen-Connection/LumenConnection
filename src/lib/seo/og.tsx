import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

/** Todas as imagens OG do site têm o mesmo tamanho (padrão 1.91:1 do Open Graph). */
export const OG_SIZE = { width: 1200, height: 630 } as const
export const OG_CONTENT_TYPE = 'image/png'

const BG = '#0a0a0a'
const ORANGE = '#f97316'

/**
 * Assets lidos do disco (public/og), copiados para o output pelo script de build.
 * Cacheados em promessas de módulo para não reler a cada request.
 */
const asset = (name: string) => readFile(join(process.cwd(), 'public', 'og', name))
let fontRegular: Promise<Buffer> | undefined
let fontBold: Promise<Buffer> | undefined
let lockup: Promise<Buffer> | undefined

function lockupDataUri(buf: Buffer): string {
  return `data:image/png;base64,${buf.toString('base64')}`
}

export type OgFields = {
  /** Rótulo curto acima do título (caixa alta, laranja). */
  eyebrow: string
  /** Título principal da página. */
  title: string
  /** Linha de apoio opcional. */
  subtitle?: string
}

/**
 * Gera a imagem de preview (Open Graph) de uma página no visual da Lumen
 * Connection: fundo escuro, lockup branco no topo e o assunto da página em
 * destaque — inspirado no cartão minimalista de logo centralizado da SpaceX,
 * mas com o assunto de cada página escrito no próprio cartão.
 */
export async function renderOgImage({ eyebrow, title, subtitle }: OgFields): Promise<ImageResponse> {
  fontRegular ??= asset('geist-regular.ttf')
  fontBold ??= asset('geist-bold.ttf')
  lockup ??= asset('lockup-white.png')
  const [regular, bold, lockupBuf] = await Promise.all([fontRegular, fontBold, lockup])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: BG,
          backgroundImage: `radial-gradient(1000px 700px at 100% -10%, rgba(249,115,22,0.20), rgba(249,115,22,0) 55%), radial-gradient(900px 600px at -10% 120%, rgba(249,115,22,0.10), rgba(249,115,22,0) 60%)`,
          fontFamily: 'Geist',
          position: 'relative',
        }}
      >
        {/* Losango de marca, ecoando o símbolo da Lumen, esmaecido à direita */}
        <div
          style={{
            position: 'absolute',
            top: 150,
            right: -120,
            width: 360,
            height: 360,
            border: `2px solid rgba(255,255,255,0.06)`,
            transform: 'rotate(45deg)',
          }}
        />

        {/* Colchetes de canto, como no site */}
        <Bracket style={{ top: 40, left: 40, borderTop: true, borderLeft: true }} />
        <Bracket style={{ top: 40, right: 40, borderTop: true, borderRight: true }} />
        <Bracket style={{ bottom: 40, left: 40, borderBottom: true, borderLeft: true }} />
        <Bracket style={{ bottom: 40, right: 40, borderBottom: true, borderRight: true }} />

        <img
          src={lockupDataUri(lockupBuf)}
          width={430}
          height={Math.round((430 * 104) / 960)}
          alt=""
          style={{ objectFit: 'contain' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: ORANGE,
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 700,
              color: '#ffffff',
              marginTop: 18,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: 'flex',
                fontSize: 30,
                lineHeight: 1.3,
                color: 'rgba(255,255,255,0.68)',
                marginTop: 22,
                maxWidth: 900,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 74,
            right: 72,
            fontSize: 22,
            letterSpacing: 2,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          lumenconnection.com.br
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Geist', data: regular, weight: 400, style: 'normal' },
        { name: 'Geist', data: bold, weight: 700, style: 'normal' },
      ],
    },
  )
}

/** Colchete de canto absoluto (uma quina), no estilo do componente CornerBrackets do site. */
function Bracket({
  style,
}: {
  style: {
    top?: number
    bottom?: number
    left?: number
    right?: number
    borderTop?: boolean
    borderBottom?: boolean
    borderLeft?: boolean
    borderRight?: boolean
  }
}) {
  const line = `2px solid ${ORANGE}`
  const { borderTop, borderBottom, borderLeft, borderRight, ...pos } = style
  return (
    <div
      style={{
        position: 'absolute',
        width: 26,
        height: 26,
        ...pos,
        ...(borderTop ? { borderTop: line } : {}),
        ...(borderBottom ? { borderBottom: line } : {}),
        ...(borderLeft ? { borderLeft: line } : {}),
        ...(borderRight ? { borderRight: line } : {}),
      }}
    />
  )
}
