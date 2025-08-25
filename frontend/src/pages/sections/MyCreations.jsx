import { useEffect, useState } from 'react'
import api from '../../lib/api.js'

export default function MyCreations() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setError('')
    try {
      const { data } = await api.get('/api/creations')
      setItems(data)
    } catch (e) {
      setError(e?.response?.data?.error || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function remove(id) {
    try {
      await api.delete(`/api/creations/${id}`)
      setItems(items.filter(x => x._id !== id))
    } catch {}
  }

  if (loading) return <div>Loading…</div>
  if (error) return <div className="text-red-400">{error}</div>

  return (
    <div>
      <h2 className="text-xl font-semibold">My Creations</h2>
      <p className="text-neutral-300">Browse, download, and manage your generated content.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item._id} className="glass rounded-xl overflow-hidden">
            {item.type === 'poster' && <img src={item.thumbnailUrl || item.outputUrl} className="w-full h-48 object-cover" />}
            {item.type === 'video' && (
              <video src={item.outputUrl} className="w-full" controls />
            )}
            {item.type === 'song' && (
              <div className="p-3">
                <audio src={item.outputUrl} controls className="w-full" />
              </div>
            )}
            <div className="p-3 flex items-center justify-between text-sm">
              <div className="truncate">{item.type} • {new Date(item.createdAt).toLocaleString()}</div>
              <div className="flex gap-2">
                <a href={item.outputUrl} download className="px-2 py-1 rounded border border-white/10 hover:bg-white/5">Download</a>
                <button onClick={()=>remove(item._id)} className="px-2 py-1 rounded border border-white/10 hover:bg-white/5">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

