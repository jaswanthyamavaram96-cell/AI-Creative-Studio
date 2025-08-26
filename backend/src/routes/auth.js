import { Router } from 'express'
import User from '../models/User.js'
import { signToken } from '../middleware/auth.js'
import { isMemoryDb, userStore } from '../store/storage.js'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    if (isMemoryDb) {
      const existingMem = await userStore.findByEmail(email)
      if (existingMem) return res.status(409).json({ error: 'Email already registered' })
      const userMem = await userStore.create({ email, password, name })
      const tokenMem = signToken(userMem)
      return res.json({ token: tokenMem, user: { id: userMem._id, email: userMem.email, name: userMem.name } })
    }

    const existing = await User.findOne({ email }).catch(() => null)
    if (existing) return res.status(409).json({ error: 'Email already registered' })

    const passwordHash = await User.hashPassword(password)
    const user = await User.create({ email, passwordHash, name: name || '' })
    const token = signToken(user)
    return res.json({ token, user: { id: user._id, email: user.email, name: user.name } })
  } catch (e) {
    return res.status(500).json({ error: 'Registration failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
    if (isMemoryDb) {
      const userMem = await userStore.findByEmail(email)
      if (!userMem) return res.status(401).json({ error: 'Invalid credentials' })
      const okMem = await userStore.comparePassword(userMem, password)
      if (!okMem) return res.status(401).json({ error: 'Invalid credentials' })
      const tokenMem = signToken(userMem)
      return res.json({ token: tokenMem, user: { id: userMem._id, email: userMem.email, name: userMem.name } })
    }
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await user.comparePassword(password)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    const token = signToken(user)
    return res.json({ token, user: { id: user._id, email: user.email, name: user.name } })
  } catch (e) {
    return res.status(500).json({ error: 'Login failed' })
  }
})

export default router

