import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import authRouter from './src/routes/auth.js'
import generatorsRouter from './src/routes/generators.js'
import creationsRouter from './src/routes/creations.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Basic middleware
app.use(cors({ origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : true }))
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))

// Serve static if needed later
app.use('/public', express.static(path.join(__dirname, 'public')))

// Health
app.get('/api/health', (_req, res) => {
  return res.json({ ok: true, service: 'ai-creative-studio-backend' })
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api', generatorsRouter)
app.use('/api/creations', creationsRouter)

const PORT = process.env.PORT || 4000

// Database connection with optional memory fallback
const USE_MEMORY_DB = String(process.env.USE_MEMORY_DB || 'false').toLowerCase() === 'true'

async function start() {
  try {
    if (!USE_MEMORY_DB) {
      const mongoUri = process.env.MONGO_URI
      if (!mongoUri) {
        console.warn('MONGO_URI not set. Starting with in-memory store. Set USE_MEMORY_DB=true to silence this warning.')
      } else {
        await mongoose.connect(mongoUri)
        console.log('Connected to MongoDB')
      }
    } else {
      console.log('Using in-memory data store')
    }
  } catch (err) {
    console.error('Failed to connect to MongoDB. Falling back to in-memory store.', err.message)
  }

  app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))
}

start()

