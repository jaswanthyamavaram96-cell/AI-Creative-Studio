import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../../lib/api.js'
import LoadingText from '../../components/LoadingText.jsx'

const STYLES = ['Photorealistic', 'Cartoon', 'Cyberpunk', 'Watercolor']

export default function PosterGen() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState(STYLES[0])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onGenerate(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { data } = await api.post('/api/posters', { prompt, style })
      setItems(prev => [data, ...prev])
      setPrompt('')
    } catch (e) {
      setError(e?.response?.data?.error || 'Failed to generate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Poster Generator</h2>
      <p className="text-neutral-300">Transform text prompts into stunning posters.</p>
      <form onSubmit={onGenerate} className="glass rounded-xl p-4 mt-4 grid sm:grid-cols-6 gap-3">
        <input className="sm:col-span-3 rounded-lg bg-black/40 border border-white/10 p-3" placeholder="Describe your poster..." value={prompt} onChange={e=>setPrompt(e.target.value)} required />
        <select className="sm:col-span-2 rounded-lg bg-black/40 border border-white/10 p-3" value={style} onChange={e=>setStyle(e.target.value)}>
          {STYLES.map(s=> <option key={s}>{s}</option>)}
        </select>
        <button className="btn-primary sm:col-span-1" disabled={loading}>{loading ? <LoadingText text="🎨 Creating your masterpiece…" /> : 'Generate'}</button>
      </form>
      {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((it, idx) => (
          <motion.div key={idx} className="glass rounded-xl overflow-hidden" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
            <img src={it.outputUrl} alt="Poster" className="w-full h-48 object-cover" />
            <div className="p-3 text-xs text-neutral-300 truncate">{it.prompt}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

