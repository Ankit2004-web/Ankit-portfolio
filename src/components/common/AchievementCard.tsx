import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, ImageIcon } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { getAchievementImageUrl } from '@/data/achievements'
import type { Achievement } from '@/data/profile'
import { cn } from '@/lib/utils'

interface AchievementCardProps {
  achievement: Achievement
  config: {
    icon: React.ComponentType<{ className?: string }>
    color: string
    bg: string
    label: string
  }
}

export function AchievementCard({ achievement, config }: AchievementCardProps) {
  const [open, setOpen] = useState(false)
  const Icon = config.icon
  const image = achievement.image

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ y: -4, scale: 1.02 }}
        onClick={() => setOpen(true)}
        className={cn(
          'glass rounded-2xl p-6 group hover:border-primary/20 transition-all duration-300 text-left w-full h-full',
          'flex flex-col cursor-pointer hover:shadow-lg hover:shadow-primary/5',
        )}
        aria-label={`View certificate for ${achievement.title}`}
      >
        <div
          className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
        >
          <Icon className={`w-6 h-6 ${config.color}`} />
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted uppercase tracking-wider">
            {config.label}
          </span>
          <span className="text-xs text-muted">{achievement.date}</span>
        </div>
        <h3 className="font-semibold mb-2 min-h-14 line-clamp-2 group-hover:text-primary transition-colors">
          {achievement.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-4 min-h-[4.5rem] line-clamp-3 flex-1">
          {achievement.description}
        </p>
        {image && (
          <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video bg-white/5 mt-auto shrink-0 w-full">
            <img
              src={getAchievementImageUrl(image)}
              alt={achievement.title}
              className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white">
                <Eye className="w-3.5 h-3.5" />
                View Certificate
              </span>
            </div>
          </div>
        )}
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 pr-8">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                <ImageIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-primary uppercase tracking-wider mb-1">
                  {config.label} · {achievement.date}
                </p>
                <h3 className="text-xl font-bold">{achievement.title}</h3>
                <p className="text-sm text-muted mt-1">{achievement.description}</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <img
                src={getAchievementImageUrl(image)}
                alt={`${achievement.title} certificate`}
                className="w-full h-auto object-contain max-h-[70vh] mx-auto"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
