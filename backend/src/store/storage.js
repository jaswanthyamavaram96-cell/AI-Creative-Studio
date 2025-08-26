import bcrypt from 'bcryptjs'

export const isMemoryDb = String(process.env.USE_MEMORY_DB || 'false').toLowerCase() === 'true' || !process.env.MONGO_URI

const users = []
const creations = []

function generateId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now()}`
}

export const userStore = {
  async findByEmail(email) {
    return users.find(u => u.email === email) || null
  },
  async create({ email, password, name = '' }) {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = { _id: generateId('usr'), email, passwordHash, name }
    users.push(user)
    return user
  },
  async comparePassword(user, password) {
    return bcrypt.compare(password, user.passwordHash)
  }
}

export const creationStore = {
  async create({ userId, type, prompt, options = {}, outputUrl, thumbnailUrl, meta = {} }) {
    const doc = { _id: generateId('cr'), userId, type, prompt, options, outputUrl, thumbnailUrl, meta, createdAt: new Date().toISOString() }
    creations.unshift(doc)
    return doc
  },
  async listByUser(userId) {
    return creations.filter(c => c.userId === userId)
  },
  async deleteById(userId, id) {
    const idx = creations.findIndex(c => c._id === id && c.userId === userId)
    if (idx >= 0) { creations.splice(idx, 1); return true }
    return false
  }
}

