import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  className?: string
}

const sizes = {
  xs: { mark: 'h-7', word: 'text-sm' },
  sm: { mark: 'h-9', word: 'text-sm' },
  md: { mark: 'h-11', word: 'text-base' },
  lg: { mark: 'h-14', word: 'text-lg' },
}

export function Logo({ size = 'md', showWordmark = false, className }: LogoProps) {
  const config = sizes[size]

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src={profile.site.logo}
        alt={`${profile.site.name} logo`}
        className={cn('w-auto object-contain shrink-0', config.mark)}
        draggable={false}
        width={120}
        height={48}
      />
      {showWordmark && (
        <span
          className={cn(
            'text-muted font-medium tracking-tight hidden sm:inline',
            config.word,
          )}
        >
          .dev
        </span>
      )}
    </span>
  )
}
