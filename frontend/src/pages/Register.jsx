import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../lib/api.js'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Register() {
  const navigate = useNavigate()
  const { setToken, setUser } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password })
      setToken(data.token); setUser(data.user)
      navigate('/app')
    } catch (e) {
      setError(e?.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center">
      <div className="container-responsive">
        <div className="max-w-md mx-auto glass rounded-2xl p-6">
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold">Create your account</motion.h2>
          <p className="text-neutral-300 mt-1">Start generating with AI</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input className="w-full rounded-lg bg-black/40 border border-white/10 p-3" value={name} onChange={e=>setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input className="w-full rounded-lg bg-black/40 border border-white/10 p-3" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input className="w-full rounded-lg bg-black/40 border border-white/10 p-3" type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button className="btn-primary w-full" disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
          <p className="text-sm text-neutral-400 mt-4">Have an account? <Link to="/login" className="underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

