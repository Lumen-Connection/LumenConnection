'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { RadioTrack } from '@/data/gta-vi-radio'

type YTPlayer = {
  playVideo: () => void
  pauseVideo: () => void
  loadVideoById: (id: string) => void
  cueVideoById: (id: string) => void
  getCurrentTime: () => number
  getDuration: () => number
  destroy: () => void
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: {
          videoId: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: () => void
            onStateChange?: (e: { data: number }) => void
            onError?: () => void
          }
        },
      ) => YTPlayer
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve()
  return new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      resolve()
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      document.body.appendChild(script)
    }
  })
}

/** Vinheta curta entre faixas, como a troca de bloco de uma rádio. */
function playStationSting() {
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  if (!AudioCtx) return
  const ctx = new AudioCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const now = ctx.currentTime
  osc.type = 'sine'
  osc.frequency.setValueAtTime(392, now)
  osc.frequency.linearRampToValueAtTime(523.25, now + 0.14)
  osc.frequency.linearRampToValueAtTime(329.63, now + 0.32)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.07, now + 0.03)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.55)
  osc.onended = () => void ctx.close()
}

export type LeonidaRadio = ReturnType<typeof useLeonidaRadio>

/** Sem PLAYING depois disso, o YouTube provavelmente travou numa verificação. */
const STALL_MS = 6000

/**
 * Player do YouTube que toca a playlist do painel. O iframe vive no
 * retrovisor; o resto do painel só chama estes controles.
 */
export function useLeonidaRadio(tracks: readonly RadioTrack[]) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [stalled, setStalled] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const hostRef = useRef<HTMLDivElement>(null)
  /** Só recebe o player depois do onReady — antes disso ele não tem métodos. */
  const playerRef = useRef<YTPlayer | null>(null)
  const indexRef = useRef(0)
  const skipsRef = useRef(0)
  const pendingPlayRef = useRef(false)
  const stingTimer = useRef<number | null>(null)
  const stallTimer = useRef<number | null>(null)

  const clearStall = useCallback(() => {
    if (stallTimer.current) window.clearTimeout(stallTimer.current)
    stallTimer.current = null
    setStalled(false)
  }, [])

  const watchStall = useCallback(() => {
    if (stallTimer.current) window.clearTimeout(stallTimer.current)
    stallTimer.current = window.setTimeout(() => {
      stallTimer.current = null
      setStalled(true)
    }, STALL_MS)
  }, [])

  const goTo = useCallback(
    (nextIndex: number, autoplay: boolean) => {
      if (stingTimer.current) {
        window.clearTimeout(stingTimer.current)
        stingTimer.current = null
      }
      const wrapped = (nextIndex + tracks.length) % tracks.length
      indexRef.current = wrapped
      setIndex(wrapped)
      setCurrentTime(0)
      setDuration(0)
      if (autoplay) watchStall()
      const player = playerRef.current
      if (!player) {
        pendingPlayRef.current = autoplay
        return
      }
      if (autoplay) player.loadVideoById(tracks[wrapped].youtubeId)
      else player.cueVideoById(tracks[wrapped].youtubeId)
    },
    [tracks, watchStall],
  )

  const goToRef = useRef(goTo)
  useEffect(() => {
    goToRef.current = goTo
  }, [goTo])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let cancelled = false
    let player: YTPlayer | null = null

    void loadYouTubeApi().then(() => {
      if (cancelled || !window.YT) return
      // O YouTube troca o elemento por um iframe: entregamos um nó só dele,
      // fora do controle do React, para remontagens não quebrarem o player.
      const mount = document.createElement('div')
      host.appendChild(mount)
      player = new window.YT.Player(mount, {
        videoId: tracks[indexRef.current].youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (cancelled || !player) return
            playerRef.current = player
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false
              player.loadVideoById(tracks[indexRef.current].youtubeId)
            }
          },
          onStateChange: (event) => {
            const state = window.YT?.PlayerState
            if (!state) return
            if (event.data === state.PLAYING) {
              skipsRef.current = 0
              clearStall()
              setPlaying(true)
            }
            if (event.data === state.PAUSED) setPlaying(false)
            if (event.data === state.ENDED) {
              playStationSting()
              stingTimer.current = window.setTimeout(() => {
                stingTimer.current = null
                goToRef.current(indexRef.current + 1, true)
              }, 1200)
            }
          },
          onError: () => {
            // Uma faixa bloqueada pula para a próxima. Duas seguidas indicam que
            // o YouTube barrou o player inteiro (ex.: verificação anti-bot, erro 150).
            if (skipsRef.current >= 1) {
              if (stallTimer.current) window.clearTimeout(stallTimer.current)
              stallTimer.current = null
              setPlaying(false)
              setStalled(true)
              return
            }
            skipsRef.current += 1
            goToRef.current(indexRef.current + 1, true)
          },
        },
      })
    })

    return () => {
      cancelled = true
      if (stingTimer.current) window.clearTimeout(stingTimer.current)
      if (stallTimer.current) window.clearTimeout(stallTimer.current)
      player?.destroy()
      playerRef.current = null
      host.replaceChildren()
    }
  }, [tracks, clearStall])

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      const player = playerRef.current
      if (!player) return
      try {
        setCurrentTime(player.getCurrentTime() || 0)
        setDuration(player.getDuration() || 0)
      } catch {
        /* API ainda aquecendo */
      }
    }, 400)
    return () => window.clearInterval(id)
  }, [playing])

  const toggle = useCallback(() => {
    const player = playerRef.current
    if (playing) {
      player?.pauseVideo()
      return
    }
    skipsRef.current = 0
    watchStall()
    if (player) player.playVideo()
    else pendingPlayRef.current = true
  }, [playing, watchStall])

  const pause = useCallback(() => {
    pendingPlayRef.current = false
    clearStall()
    playerRef.current?.pauseVideo()
  }, [clearStall])

  return {
    hostRef,
    tracks,
    index,
    track: tracks[index],
    playing,
    /** O play não engatou — o retrovisor abre para a pessoa resolver no YouTube. */
    stalled,
    dismissStall: clearStall,
    currentTime,
    duration,
    progress: duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0,
    toggle,
    pause,
    play: (i: number) => {
      skipsRef.current = 0
      goTo(i, true)
    },
    next: () => {
      skipsRef.current = 0
      goTo(indexRef.current + 1, playing)
    },
    prev: () => {
      skipsRef.current = 0
      goTo(indexRef.current - 1, playing)
    },
  }
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
