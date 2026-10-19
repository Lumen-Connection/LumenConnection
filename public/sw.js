// Lumen Connection - Service Worker
// Strategy: stale-while-revalidate for static assets, network-first for navigation,
// cache-first for images/fonts. Offline fallback for navigation.

const VERSION = 'v3'
const STATIC_CACHE = `lc-static-${VERSION}`
const RUNTIME_CACHE = `lc-runtime-${VERSION}`
const IMAGE_CACHE = `lc-images-${VERSION}`

const PRECACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
  '/LC - Logos/Lumen Connection white logo.webp',
  '/LC - Logos/Lumen Connection white fonte.webp',
  '/images/hero/lumen-bg.webp',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => undefined))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![STATIC_CACHE, RUNTIME_CACHE, IMAGE_CACHE].includes(k))
          .map((k) => caches.delete(k)),
      ),
    ).then(() => self.clients.claim()),
  )
})

const isNavigation = (req) => req.mode === 'navigate'
const isImage = (req) => req.destination === 'image'
const isStaticAsset = (req) =>
  ['style', 'script', 'font', 'manifest'].includes(req.destination)

async function networkFirstNavigation(req) {
  try {
    const fresh = await fetch(req)
    const cache = await caches.open(RUNTIME_CACHE)
    cache.put(req, fresh.clone())
    return fresh
  } catch {
    const cache = await caches.open(RUNTIME_CACHE)
    const cached = await cache.match(req)
    if (cached) return cached
    const fallback = await caches.match('/')
    if (fallback) return fallback
    return new Response('Offline', { status: 503, statusText: 'Offline' })
  }
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(req)
  if (cached) {
    // refresh in background
    fetch(req)
      .then((res) => {
        if (res && res.status === 200) cache.put(req, res.clone())
      })
      .catch(() => undefined)
    return cached
  }
  const res = await fetch(req)
  if (res && res.status === 200) cache.put(req, res.clone())
  return res
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(req)
  const networkPromise = fetch(req)
    .then((res) => {
      if (res && res.status === 200) cache.put(req, res.clone())
      return res
    })
    .catch(() => cached)
  return cached || networkPromise
}

const VICE_OPFS_MARKER = '_game_ready'
const VICE_CONTENT_TYPES = new Map([
  ['.wasm', 'application/wasm'],
  ['.js', 'application/javascript'],
  ['.json', 'application/json'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.wav', 'audio/wav'],
  ['.mp3', 'audio/mpeg'],
  ['.ogg', 'audio/ogg'],
  ['.dat', 'application/octet-stream'],
  ['.dff', 'application/octet-stream'],
  ['.txd', 'application/octet-stream'],
  ['.img', 'application/octet-stream'],
  ['.raw', 'application/octet-stream'],
  ['.bin', 'application/octet-stream'],
])

function viceContentType(filename) {
  const lower = filename.toLowerCase()
  if (lower.endsWith('.wasm.br')) return 'application/wasm'
  if (lower.endsWith('.js.br')) return 'application/javascript'
  for (const [ext, type] of VICE_CONTENT_TYPES) {
    if (lower.endsWith(ext)) return type
  }
  return 'application/octet-stream'
}

function viceHeaders(filename, size) {
  const headers = new Headers()
  headers.set('Content-Type', viceContentType(filename))
  headers.set('Content-Length', String(size))
  headers.set('Accept-Ranges', 'bytes')
  if (filename.toLowerCase().endsWith('.br')) {
    headers.set('Content-Encoding', 'br')
  }
  return headers
}

function parseByteRange(rangeHeader, size) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader || '')
  if (!match) return null
  let start = match[1] === '' ? null : Number(match[1])
  let end = match[2] === '' ? null : Number(match[2])
  if (start === null && end === null) return null
  if (start === null) {
    start = Math.max(0, size - end)
    end = size - 1
  } else if (end === null || end >= size) {
    end = size - 1
  }
  if (start > end || start < 0 || end >= size) return null
  return { start, end }
}

async function serveViceFromOPFS(request, pathname) {
  try {
    const root = await navigator.storage.getDirectory()
    const parts = pathname.replace(/^\//, '').split('/').map(decodeURIComponent)
    let dir = root
    for (let i = 0; i < parts.length - 1; i++) {
      dir = await dir.getDirectoryHandle(parts[i])
    }
    const filename = parts[parts.length - 1]
    const fileHandle = await dir.getFileHandle(filename)
    const file = await fileHandle.getFile()
    const headers = viceHeaders(filename, file.size)

    if (request.method === 'HEAD') {
      return new Response(null, { status: 200, headers })
    }

    const range = parseByteRange(request.headers.get('Range'), file.size)
    if (range) {
      headers.set('Content-Range', `bytes ${range.start}-${range.end}/${file.size}`)
      headers.set('Content-Length', String(range.end - range.start + 1))
      return new Response(file.slice(range.start, range.end + 1), {
        status: 206,
        headers,
      })
    }

    return new Response(file, { status: 200, headers })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  if (
    (url.pathname.startsWith('/vcsky/') || url.pathname.startsWith('/vcbr/')) &&
    (req.method === 'GET' || req.method === 'HEAD')
  ) {
    event.respondWith(serveViceFromOPFS(req, url.pathname))
    return
  }

  if (req.method !== 'GET') return

  if (isNavigation(req)) {
    event.respondWith(networkFirstNavigation(req))
    return
  }

  if (isImage(req)) {
    event.respondWith(cacheFirst(req, IMAGE_CACHE))
    return
  }

  if (isStaticAsset(req) || url.pathname.startsWith('/_next/static/')) {
    event.respondWith(staleWhileRevalidate(req, STATIC_CACHE))
    return
  }
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
  if (event.data && event.data.type === 'IS_READY') {
    event.waitUntil(
      (async () => {
        let ready = false
        try {
          const root = await navigator.storage.getDirectory()
          await root.getFileHandle(VICE_OPFS_MARKER)
          ready = true
        } catch {
          ready = false
        }
        const port = event.ports && event.ports[0]
        if (port) port.postMessage({ type: 'IS_READY', ready })
      })(),
    )
  }
})
