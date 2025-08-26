import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.substring(7) : null
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const secret = process.env.JWT_SECRET || 'dev_secret_replace_me'
    const payload = jwt.verify(token, secret)
    req.user = { id: payload.sub, email: payload.email }
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export function signToken(user) {
  const secret = process.env.JWT_SECRET || 'dev_secret_replace_me'
  const payload = { sub: String(user._id || user.id), email: user.email }
  const opts = { expiresIn: '7d' }
  return jwt.sign(payload, secret, opts)
}

