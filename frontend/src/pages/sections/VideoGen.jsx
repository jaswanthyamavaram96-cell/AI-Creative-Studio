import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../../lib/api.js'
import LoadingText from '../../components/LoadingText.jsx'

const STYLES = ['Cinematic', 'Cartoon', 'Vaporwave']

export default function VideoGen() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState(STYLES[0])
  const [duration, setDuration] = useState(5)
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onGenerate(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { data } = await api.post('/api/videos', { prompt, style, duration })
      setVideo(data)
    } catch (e) {
      setError(e?.response?.data?.error || 'Failed to generate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Video Generator</h2>
      <p className="text-neutral-300">Create short videos from your ideas.</p>
      <form onSubmit={onGenerate} className="glass rounded-xl p-4 mt-4 grid sm:grid-cols-6 gap-3">
        <input className="sm:col-span-3 rounded-lg bg-black/40 border border-white/10 p-3" placeholder="Describe your video..." value={prompt} onChange={e=>setPrompt(e.target.value)} required />
        <select className="sm:col-span-2 rounded-lg bg-black/40 border border-white/10 p-3" value={style} onChange={e=>setStyle(e.target.value)}>
          {STYLES.map(s=> <option key={s}>{s}</option>)}
        </select>
        <input className="sm:col-span-1 rounded-lg bg-black/40 border border-white/10 p-3" type="number" min={3} max={30} value={duration} onChange={e=>setDuration(Number(e.target.value))} />
        <button className="btn-primary sm:col-span-6 md:col-span-1" disabled={loading}>{loading ? <LoadingText text="🎬 Rendering your video…" /> : 'Generate'}</button>
      </form>
      {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
      {video && (
        <motion.div className="glass rounded-xl mt-6 p-4" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
          <video src={video.outputUrl} controls className="w-full rounded-lg" />
          <div className="mt-2 flex gap-2">
            <a href={video.outputUrl} download className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm">Download</a>
          </div>
        </motion.div>
      )}
    </div>
  )
}

