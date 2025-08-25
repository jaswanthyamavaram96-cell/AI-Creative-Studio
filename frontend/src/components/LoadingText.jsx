import { motion } from 'framer-motion'

export default function LoadingText({ text = 'Loading…' }) {
  return (
    <motion.span
      className="inline-flex items-center gap-2 text-neutral-300"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ repeat: Infinity, duration: 1.6 }}
    >
      {text}
    </motion.span>
  )
}

