import { useEffect, useState } from 'react'
import { fetchGitHubProfile, type GitHubProfileData } from '@/lib/github'

export function useGitHub(enabled = true) {
  const [data, setData] = useState<GitHubProfileData | null>(null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    fetchGitHubProfile()
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [enabled])

  return { data, loading, error }
}
