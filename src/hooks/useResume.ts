import { useEffect, useState } from 'react'
import { siteConfig } from '@/data/site'

export function useResumeAvailability() {
  const [available, setAvailable] = useState<boolean>(siteConfig.resumeAvailable)

  useEffect(() => {
    if (siteConfig.resumeAvailable) {
      setAvailable(true)
      return
    }

    fetch(siteConfig.resumeUrl, { method: 'HEAD' })
      .then((res) => setAvailable(res.ok))
      .catch(() => setAvailable(false))
  }, [])

  return available
}

export function downloadResume() {
  window.open(siteConfig.resumeUrl, '_blank', 'noopener,noreferrer')
}
