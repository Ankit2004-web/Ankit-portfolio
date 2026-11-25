import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center mx-auto max-w-2xl',
        className,
      )}
    >
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">{label}</p>
      <h2 className="mb-4 font-display text-4xl font-medium tracking-tight md:text-5xl">{title}</h2>
      {description && <p className="text-muted text-base md:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  )
}
