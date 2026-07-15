import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const finish = () => setLoading(false)

    if (document.readyState === 'complete') {
      finish()
      return
    }

    window.addEventListener('load', finish, { once: true })
    const timeout = window.setTimeout(finish, 500)

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="relative mb-6 mx-auto w-14 h-14">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="w-14 h-14 rounded-full border-2 border-white/10 border-t-primary"
              />
            </div>
            <p className="text-muted text-sm">Loading portfolio...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
