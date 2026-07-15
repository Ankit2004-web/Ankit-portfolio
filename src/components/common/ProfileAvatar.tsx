import { useState } from 'react'
import { profile } from '@/data/profile'
import { InitialsAvatar } from '@/components/common/InitialsAvatar'
import { cn } from '@/lib/utils'

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'w-20 h-20',
  md: 'w-32 h-32',
  lg: 'w-48 h-48 md:w-56 md:h-56',
}

export function ProfileAvatar({ size = 'md', className }: ProfileAvatarProps) {
  const [imageError, setImageError] = useState(false)
  const imageSrc = profile.site.profileImage

  if (!imageSrc || imageError) {
    return <InitialsAvatar size={size} className={className} />
  }

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden ring-4 ring-white/10 shadow-xl shadow-primary/20',
        sizes[size],
        className,
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/10 to-accent/20 z-10 pointer-events-none mix-blend-multiply opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <img
        src={imageSrc}
        alt={`${profile.site.name} — professional headshot`}
        className="w-full h-full object-cover object-top bg-white"
        loading="lazy"
        onError={() => setImageError(true)}
      />
    </div>
  )
}
