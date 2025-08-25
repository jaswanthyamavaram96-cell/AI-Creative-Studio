import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import Creation from '../models/Creation.js'
import { isMemoryDb, creationStore } from '../store/storage.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  try {
    if (isMemoryDb) {
      const docs = await creationStore.listByUser(req.user?.id)
      return res.json(docs)
    }
    const docs = await Creation.find({ userId: req.user?.id }).sort({ createdAt: -1 }).limit(200)
    return res.json(docs)
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch creations' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    if (isMemoryDb) {
      const ok = await creationStore.deleteById(req.user?.id, req.params.id)
      if (!ok) return res.status(404).json({ error: 'Not found' })
      return res.json({ ok: true })
    }
    const removed = await Creation.findOneAndDelete({ _id: req.params.id, userId: req.user?.id })
    if (!removed) return res.status(404).json({ error: 'Not found' })
    return res.json({ ok: true })
  } catch (e) {
    return res.status(500).json({ error: 'Failed to delete' })
  }
})

export default router

