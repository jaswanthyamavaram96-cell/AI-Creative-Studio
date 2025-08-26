import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import Creation from '../models/Creation.js'
import { isMemoryDb, creationStore } from '../store/storage.js'

const router = Router()

const MOCK_MODE = String(process.env.MOCK_MODE || 'true').toLowerCase() === 'true'

function buildPlaceholder(type) {
  const base = 'https://placehold.co/'
  const stamp = Date.now()
  if (type === 'poster') {
    return {
      outputUrl: `${base}1024x1024/png?text=AI+Poster+${stamp}`,
      thumbnailUrl: `${base}512x512/png?text=Poster`,
      meta: { provider: 'mock', createdAt: new Date().toISOString() },
    }
  }
  if (type === 'video') {
    // Public sample video
    return {
      outputUrl: `https://samplelib.com/lib/preview/mp4/sample-5s.mp4`,
      thumbnailUrl: `${base}640x360/png?text=Video`,
      meta: { provider: 'mock', duration: 5 },
    }
  }
  if (type === 'song') {
    return {
      outputUrl: `https://www.kozco.com/tech/piano2-CoolEdit.mp3`,
      thumbnailUrl: `${base}512x512/png?text=Song`,
      meta: { provider: 'mock', lyrics: 'Sample lyrics will go here...' },
    }
  }
  return { outputUrl: '', thumbnailUrl: '', meta: {} }
}

router.post('/posters', requireAuth, async (req, res) => {
  try {
    const { prompt, style } = req.body || {}
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' })
    let output = {}
    if (MOCK_MODE) {
      output = buildPlaceholder('poster')
    } else {
      // Integrate real provider later
      output = buildPlaceholder('poster')
    }
    const payload = { userId: req.user?.id, type: 'poster', prompt, options: { style }, ...output }
    const created = isMemoryDb ? await creationStore.create(payload) : await Creation.create(payload)
    return res.json(created)
  } catch (e) {
    return res.status(500).json({ error: 'Failed to generate poster' })
  }
})

router.post('/videos', requireAuth, async (req, res) => {
  try {
    const { prompt, duration, style } = req.body || {}
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' })
    let output = {}
    if (MOCK_MODE) {
      output = buildPlaceholder('video')
    } else {
      output = buildPlaceholder('video')
    }
    const payload = { userId: req.user?.id, type: 'video', prompt, options: { duration, style }, ...output }
    const created = isMemoryDb ? await creationStore.create(payload) : await Creation.create(payload)
    return res.json(created)
  } catch (e) {
    return res.status(500).json({ error: 'Failed to generate video' })
  }
})

router.post('/songs', requireAuth, async (req, res) => {
  try {
    const { title, lyrics, genre } = req.body || {}
    if (!title) return res.status(400).json({ error: 'Title is required' })
    let output = {}
    if (MOCK_MODE) {
      output = buildPlaceholder('song')
    } else {
      output = buildPlaceholder('song')
    }
    const payload = { userId: req.user?.id, type: 'song', prompt: title, options: { lyrics, genre }, ...output }
    const created = isMemoryDb ? await creationStore.create(payload) : await Creation.create(payload)
    return res.json(created)
  } catch (e) {
    return res.status(500).json({ error: 'Failed to generate song' })
  }
})

export default router

