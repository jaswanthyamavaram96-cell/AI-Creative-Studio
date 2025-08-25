import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../lib/api.js'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const { setToken, setUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      setToken(data.token); setUser(data.user)
      navigate('/app')
    } catch (e) {
      setError(e?.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center">
      <div className="container-responsive">
        <div className="max-w-md mx-auto glass rounded-2xl p-6">
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold">Welcome back</motion.h2>
          <p className="text-neutral-300 mt-1">Sign in to continue creating</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input className="w-full rounded-lg bg-black/40 border border-white/10 p-3" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input className="w-full rounded-lg bg-black/40 border border-white/10 p-3" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className="text-sm text-neutral-400 mt-4">No account? <Link to="/register" className="underline">Create one</Link></p>
        </div>
      </div>
    </div>
  )
}

