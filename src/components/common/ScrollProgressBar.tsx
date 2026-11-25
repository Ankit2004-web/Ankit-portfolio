import { useScrollProgress } from '@/hooks/useScrollProgress'
import { motion } from 'framer-motion'

export function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{ scaleX: progress / 100 }}
    >
      <div className="h-full w-full bg-linear-to-r from-primary via-secondary to-accent" />
    </motion.div>
  )
}
