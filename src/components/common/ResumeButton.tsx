import { Download, FileDown } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { useResumeAvailability, downloadResume } from '@/hooks/useResume'
import { cn } from '@/lib/utils'

interface ResumeButtonProps extends ButtonProps {
  label?: string
  icon?: 'download' | 'file'
}

export function ResumeButton({
  label = 'Download Resume',
  icon = 'download',
  className,
  size,
  variant = 'default',
  ...props
}: ResumeButtonProps) {
  const available = useResumeAvailability()
  const Icon = icon === 'file' ? FileDown : Download

  if (!available) {
    return (
      <Button
        size={size}
        variant="outline"
        className={cn('opacity-60 cursor-not-allowed', className)}
        disabled
        title="Resume will be available soon"
        {...props}
      >
        <Icon className="w-4 h-4" />
        {label}
      </Button>
    )
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={downloadResume}
      {...props}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  )
}
