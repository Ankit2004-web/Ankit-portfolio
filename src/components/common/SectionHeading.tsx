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
      <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-3">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {description && <p className="text-muted text-base md:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  )
}
