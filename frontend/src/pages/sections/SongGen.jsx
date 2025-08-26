import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../../lib/api.js'
import LoadingText from '../../components/LoadingText.jsx'

const GENRES = ['Pop', 'Rock', 'Hip-Hop', 'Lo-fi']

export default function SongGen() {
  const [title, setTitle] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [genre, setGenre] = useState(GENRES[0])
  const [song, setSong] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onGenerate(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { data } = await api.post('/api/songs', { title, lyrics, genre })
      setSong(data)
    } catch (e) {
      setError(e?.response?.data?.error || 'Failed to generate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Song Generator</h2>
      <p className="text-neutral-300">Compose songs with optional lyrics and genres.</p>
      <form onSubmit={onGenerate} className="glass rounded-xl p-4 mt-4 grid sm:grid-cols-6 gap-3">
        <input className="sm:col-span-2 rounded-lg bg-black/40 border border-white/10 p-3" placeholder="Song title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <select className="sm:col-span-2 rounded-lg bg-black/40 border border-white/10 p-3" value={genre} onChange={e=>setGenre(e.target.value)}>
          {GENRES.map(s=> <option key={s}>{s}</option>)}
        </select>
        <button className="btn-primary sm:col-span-2" disabled={loading}>{loading ? <LoadingText text="🎵 Mixing your track…" /> : 'Generate'}</button>
        <textarea className="sm:col-span-6 rounded-lg bg-black/40 border border-white/10 p-3 min-h-32" placeholder="Optional lyrics..." value={lyrics} onChange={e=>setLyrics(e.target.value)} />
      </form>
      {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
      {song && (
        <motion.div className="glass rounded-xl mt-6 p-4" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
          <audio src={song.outputUrl} controls className="w-full" />
          {song.meta?.lyrics && <pre className="mt-3 whitespace-pre-wrap text-sm text-neutral-300">{song.meta.lyrics}</pre>}
        </motion.div>
      )}
    </div>
  )
}

