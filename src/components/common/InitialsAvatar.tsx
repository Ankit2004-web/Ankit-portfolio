import { profile } from '@/data/profile'

interface InitialsAvatarProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'w-20 h-20 text-2xl',
  md: 'w-32 h-32 text-4xl',
  lg: 'w-40 h-40 text-5xl',
}

export function InitialsAvatar({ size = 'md', className = '' }: InitialsAvatarProps) {
  return (
    <div
      className={`rounded-full bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20 ring-4 ring-white/10 ${sizes[size]} ${className}`}
      aria-label={`${profile.site.name} avatar`}
    >
      {profile.site.initials}
    </div>
  )
}
