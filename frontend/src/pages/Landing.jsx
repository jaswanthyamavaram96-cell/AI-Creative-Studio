import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Landing() {
  return (
    <div className="min-h-dvh flex items-center">
      <div className="container-responsive">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-sm text-fuchsia-300/80">AI Creative Studio</span>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-fuchsia-400 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              Create Posters, Videos & Songs with AI.
            </h1>
            <p className="mt-4 text-neutral-300 max-w-xl">
              Turn your ideas into stunning visuals, captivating videos, and original songs in seconds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary">Get Started</Link>
              <Link to="/login" className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition">Sign In</Link>
            </div>
          </motion.div>
          <motion.div className="glass rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-indigo-500/30" />
              <div className="aspect-square rounded-xl bg-gradient-to-br from-indigo-500/30 to-pink-500/30" />
              <div className="aspect-square rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-500/30" />
              <div className="col-span-3 aspect-video rounded-xl bg-black/40 flex items-center justify-center text-neutral-300">
                Preview your creations instantly
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

