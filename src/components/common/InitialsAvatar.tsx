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
      className={`flex items-center justify-center bg-primary font-display font-medium text-background ${sizes[size]} ${className}`}
      aria-label={`${profile.site.name} avatar`}
    >
      {profile.site.initials}
    </div>
  )
}
