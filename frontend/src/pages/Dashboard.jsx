import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import PosterGen from './sections/PosterGen.jsx'
import VideoGen from './sections/VideoGen.jsx'
import SongGen from './sections/SongGen.jsx'
import MyCreations from './sections/MyCreations.jsx'

export default function Dashboard() {
  const { setToken, setUser, user } = useAuth()
  const navigate = useNavigate()
  function logout() { setToken(''); setUser(null); navigate('/') }

  return (
    <div className="min-h-dvh">
      <header className="border-b border-white/10">
        <div className="container-responsive flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
            <span className="font-semibold">AI Creative Studio</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-neutral-300">{user?.name || user?.email}</span>
            <button onClick={logout} className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Logout</button>
          </div>
        </div>
      </header>
      <div className="container-responsive grid lg:grid-cols-5 gap-6 py-6">
        <aside className="lg:col-span-1 glass rounded-xl p-4 h-max sticky top-4">
          <nav className="flex lg:flex-col gap-2">
            <NavLink to="/app/posters" className={({isActive})=>`px-3 py-2 rounded-lg ${isActive?'bg-white/10':'hover:bg-white/5'}`}>Poster Generator</NavLink>
            <NavLink to="/app/videos" className={({isActive})=>`px-3 py-2 rounded-lg ${isActive?'bg-white/10':'hover:bg-white/5'}`}>Video Generator</NavLink>
            <NavLink to="/app/songs" className={({isActive})=>`px-3 py-2 rounded-lg ${isActive?'bg-white/10':'hover:bg-white/5'}`}>Song Generator</NavLink>
            <NavLink to="/app/creations" className={({isActive})=>`px-3 py-2 rounded-lg ${isActive?'bg-white/10':'hover:bg-white/5'}`}>My Creations</NavLink>
          </nav>
        </aside>
        <main className="lg:col-span-4 space-y-6">
          <Routes>
            <Route path="posters" element={<PosterGen />} />
            <Route path="videos" element={<VideoGen />} />
            <Route path="songs" element={<SongGen />} />
            <Route path="creations" element={<MyCreations />} />
            <Route path="*" element={<PosterGen />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

