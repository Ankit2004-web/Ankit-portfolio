import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TypingAnimationProps {
  words: readonly string[]
  className?: string
}

export function TypingAnimation({ words, className }: TypingAnimationProps) {
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[index]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
          if (displayText.length === currentWord.length) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setDisplayText(currentWord.slice(0, displayText.length - 1))
          if (displayText.length === 0) {
            setIsDeleting(false)
            setIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? 50 : 80,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, index, words])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
      />
    </span>
  )
}
