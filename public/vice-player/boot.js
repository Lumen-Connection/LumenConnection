const BASE = '/vice-player/'

const LEGACY_SCRIPT_SOURCES = [
  `${BASE}GamepadEmulator.js`,
  `${BASE}idbfs.js`,
  `${BASE}game.js`,
]

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        resolve()
        return
      }
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener(
        'error',
        () => reject(new Error(`Failed to load script: ${src}`)),
        { once: true },
      )
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = false
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true'
        resolve()
      },
      { once: true },
    )
    script.addEventListener(
      'error',
      () => reject(new Error(`Failed to load script: ${src}`)),
      { once: true },
    )
    document.body.appendChild(script)
  })
}

async function loadLegacyScripts() {
  for (const src of LEGACY_SCRIPT_SOURCES) {
    await loadScript(src)
  }
}

async function checkReady() {
  try {
    const root = await navigator.storage.getDirectory()

    let markerFile
    try {
      const fh = await root.getFileHandle('_game_ready')
      markerFile = await fh.getFile()
    } catch {
      return "OPFS marker '_game_ready' not found"
    }

    const version = await markerFile.text()
    if (version !== 'v4') {
      return `OPFS marker version mismatch: got "${version}", expected "v4"`
    }

    const requiredFiles = [
      ['vcbr', 'vc-sky-en-v6.data', 100 * 1024 * 1024],
      ['vcbr', 'vc-sky-en-v6.wasm', 0],
      ['vcsky', 'sha256sums.txt', 0],
    ]

    for (const [directoryName, fileName, minSize] of requiredFiles) {
      let dir
      try {
        dir = await root.getDirectoryHandle(directoryName)
      } catch {
        return `OPFS directory not found: ${directoryName}/`
      }
      let fh
      try {
        fh = await dir.getFileHandle(fileName)
      } catch {
        return `OPFS file not found: ${directoryName}/${fileName}`
      }
      if (minSize > 0) {
        const f = await fh.getFile()
        if (f.size < minSize) {
          return `OPFS file too small: ${directoryName}/${fileName} is ${(f.size / 1024 / 1024).toFixed(1)} MB, need > ${minSize / 1024 / 1024} MB`
        }
      }
    }

    return null
  } catch (err) {
    return `checkReady error: ${err.message}`
  }
}

async function verifyGameServing() {
  const requiredUrls = [
    '/vcbr/vc-sky-en-v6.data',
    '/vcbr/vc-sky-en-v6.wasm',
    '/vcsky/sha256sums.txt',
  ]

  try {
    for (const url of requiredUrls) {
      let response
      try {
        response = await fetch(url, { method: 'HEAD', cache: 'no-store' })
      } catch (err) {
        return `fetch failed for ${url}: ${err.message}`
      }
      if (!response.ok) {
        return `SW served ${response.status} for ${url}`
      }
    }
    return null
  } catch (err) {
    return `verifyGameServing error: ${err.message}`
  }
}

async function waitForGameReady(retries = 6, delayMs = 400) {
  let lastReason = 'unknown'
  for (let attempt = 0; attempt < retries; attempt++) {
    const opfsReason = await checkReady()
    if (opfsReason !== null) {
      lastReason = opfsReason
    } else {
      const servingReason = await verifyGameServing()
      if (servingReason !== null) {
        lastReason = servingReason
      } else {
        return { ready: true, reason: null }
      }
    }
    if (attempt < retries - 1) {
      await new Promise((resolve) => window.setTimeout(resolve, delayMs))
    }
  }
  return { ready: false, reason: lastReason }
}

async function resetGameData() {
  try {
    const root = await navigator.storage.getDirectory()
    for (const name of ['vcbr', 'vcsky', '_game_ready']) {
      try {
        await root.removeEntry(name, { recursive: true })
      } catch {
        /* entry may not exist */
      }
    }
  } catch (err) {
    console.warn('[reset] OPFS clear failed:', err)
  }

  try {
    const dbs = await indexedDB.databases()
    await Promise.all(
      dbs.map(
        (db) =>
          new Promise((resolve) => {
            const req = indexedDB.deleteDatabase(db.name)
            req.onsuccess = resolve
            req.onerror = resolve
            req.onblocked = resolve
          }),
      ),
    )
  } catch (err) {
    console.warn('[reset] IndexedDB clear failed:', err)
  }
}

async function ensureLumenServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker API missing')
  }
  await navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' })
  await navigator.serviceWorker.ready
  if (!navigator.serviceWorker.controller) {
    window.location.reload()
    return false
  }
  return true
}

async function initSetupFlow() {
  const overlay = document.getElementById('setup-overlay')
  const fileInput = document.getElementById('game-file-input')
  const progress = document.getElementById('setup-progress')
  const progressBar = document.getElementById('setup-progress-bar')
  const progressLabel = document.getElementById('setup-progress-label')
  const progressPercent = document.getElementById('setup-progress-percent')
  const errorBox = document.getElementById('setup-error')
  const storageStatus = document.getElementById('storage-status')
  const selectedFileName = document.getElementById('selected-file-name')
  const clickToPlayButton = document.getElementById('click-to-play-button')
  const resetBtn = document.getElementById('reset-game-btn')

  if (
    !overlay ||
    !fileInput ||
    !progress ||
    !progressBar ||
    !progressLabel ||
    !progressPercent ||
    !errorBox ||
    !storageStatus ||
    !selectedFileName ||
    !clickToPlayButton
  ) {
    return
  }

  const showError = (message) => {
    errorBox.style.display = 'block'
    errorBox.textContent = message
  }

  const setStorageStatus = (message, state) => {
    storageStatus.textContent = message
    storageStatus.dataset.state = state
  }

  const setPlayAvailability = (enabled) => {
    window.__gtaGameReady = enabled
    clickToPlayButton.disabled = !enabled
    clickToPlayButton.classList.toggle('disabled', !enabled)
    if (resetBtn) resetBtn.classList.toggle('hidden', !enabled)
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      if (
        !confirm(
          'Isso apaga o progresso salvo e os arquivos importados neste navegador. Você vai precisar importar o game.tar.gz de novo. Continuar?',
        )
      ) {
        return
      }
      resetBtn.disabled = true
      resetBtn.textContent = 'Resetting…'
      await resetGameData()
      setStorageStatus('Import required', 'missing')
      setPlayAvailability(false)
      progress.style.display = 'none'
      errorBox.style.display = 'none'
      selectedFileName.textContent = 'Nenhum arquivo'
      fileInput.value = ''
      resetBtn.disabled = false
      resetBtn.textContent = 'Reset game data'
    })
  }

  const runImport = async (file) => {
    errorBox.style.display = 'none'
    document.querySelectorAll('.setup-actions-panel').forEach((element) => (element.style.opacity = '0.5'))
    progress.style.display = 'block'
    progressLabel.textContent = 'Reading file…'
    progressPercent.textContent = '0%'
    progressBar.style.width = '0%'
    setPlayAvailability(false)

    const worker = new Worker(`${BASE}extract-worker.js`)
    worker.onerror = (error) => {
      showError(`Worker error: ${error.message}`)
      document.querySelectorAll('.setup-actions-panel').forEach((element) => (element.style.opacity = '1'))
    }
    worker.postMessage({ file })
    worker.onmessage = async (event) => {
      const message = event.data
      if (message.type === 'progress') {
        progressBar.style.width = `${message.pct}%`
        progressPercent.textContent = `${message.pct}%`
        const labels = {
          reading: 'Lendo o arquivo…',
          decompressing: 'Descompactando…',
          extracting: `Extraindo… ${message.done || 0} / ${message.total || ''}`,
        }
        progressLabel.textContent = labels[message.phase] || 'Working…'
        return
      }

      if (message.type === 'done') {
        progressBar.style.width = '100%'
        progressPercent.textContent = '100%'
        progressLabel.textContent = 'Import complete. Verifying files…'
        const { ready: isReady, reason } = await waitForGameReady()
        setStorageStatus(isReady ? 'Ready to play' : 'Import required', isReady ? 'ready' : 'missing')
        setPlayAvailability(isReady)
        progressLabel.textContent = isReady
          ? 'Pronto. Pode jogar.'
          : `Verification failed: ${reason}`
        document.querySelectorAll('.setup-actions-panel').forEach((element) => (element.style.opacity = '1'))
        worker.terminate()
        return
      }

      if (message.type === 'error') {
        errorBox.style.display = 'block'
        errorBox.textContent = `Error: ${message.message}`
        document.querySelectorAll('.setup-actions-panel').forEach((element) => (element.style.opacity = '1'))
        worker.terminate()
      }
    }
  }

  setPlayAvailability(false)

  if (!('serviceWorker' in navigator) || !('storage' in navigator && navigator.storage.getDirectory)) {
    showError(
      'Seu navegador não tem OPFS / Service Worker. Use Chrome, Edge, Firefox 111+ ou Safari 16.4+.',
    )
    return
  }

  try {
    const controlling = await ensureLumenServiceWorker()
    if (!controlling) return
  } catch (error) {
    showError(`Service Worker error: ${error.message}`)
    return
  }

  const { ready, reason } = await waitForGameReady(2, 150)
  if (ready) {
    setStorageStatus('Ready to play', 'ready')
    setPlayAvailability(true)
    progress.style.display = 'none'
    return
  }

  setStorageStatus(reason ? `Import required (${reason})` : 'Import required', 'missing')

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0]
    if (!file) {
      selectedFileName.textContent = 'Nenhum arquivo'
      return
    }
    selectedFileName.textContent = file.name
    if (!/\.tar\.gz$|\.gz$/i.test(file.name)) {
      showError('Selecione o arquivo game.tar.gz da sua cópia.')
      return
    }
    await runImport(file)
  })
}

function initCanvasBindings() {
  const canvas = document.getElementById('canvas')
  if (!canvas) return
  canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault()
  })
}

function checkBrowserCompatibility() {
  const missing = []
  if (!('serviceWorker' in navigator)) missing.push('Service Workers')
  if (!('storage' in navigator) || !('getDirectory' in navigator.storage)) missing.push('OPFS')
  if (typeof WebAssembly === 'undefined') missing.push('WebAssembly')
  if (typeof Worker === 'undefined') missing.push('Web Workers')
  return missing
}

function initOrientationLock() {
  const observer = new MutationObserver(() => {
    if (document.body.classList.contains('gameIsStarted')) {
      observer.disconnect()
      screen.orientation?.lock('landscape').catch(() => {})
    }
  })
  observer.observe(document.body, { attributeFilter: ['class'] })
}

async function boot() {
  initCanvasBindings()
  initOrientationLock()

  const missing = checkBrowserCompatibility()
  if (missing.length > 0) {
    const storageStatus = document.getElementById('storage-status')
    const errorBox = document.getElementById('setup-error')
    if (storageStatus) {
      storageStatus.textContent = 'Browser not supported'
      storageStatus.dataset.state = 'error'
    }
    if (errorBox) {
      errorBox.style.display = 'block'
      errorBox.textContent = `Faltam APIs: ${missing.join(', ')}. Use Chrome 110+, Firefox 111+ ou Safari 16.4+.`
    }
    return
  }

  await initSetupFlow()
  await loadLegacyScripts()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    void boot()
  })
} else {
  void boot()
}
