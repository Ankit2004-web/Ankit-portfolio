import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (!isDesktop) return

    let frame = 0
    let x = 0
    let y = 0

    const paint = () => {
      frame = 0
      glowRef.current?.style.setProperty(
        'background',
        `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.06), transparent 40%)`,
      )
    }

    const handleMouseMove = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      if (!frame) frame = requestAnimationFrame(paint)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return <div ref={glowRef} className="fixed inset-0 pointer-events-none z-0" />
}

export function CustomCursor() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [hovering, setHovering] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 })
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 })
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 })

  useEffect(() => {
    if (!isDesktop) return

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isDesktop, mouseX, mouseY])

  useEffect(() => {
    if (!isDesktop) return

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      setHovering(
        !!target.closest('a, button, [role="button"], input, textarea, select, label'),
      )
    }

    document.addEventListener('mouseover', handleMouseOver)
    return () => document.removeEventListener('mouseover', handleMouseOver)
  }, [isDesktop])

  useEffect(() => {
    if (isDesktop) {
      document.body.style.cursor = 'none'
    } else {
      document.body.style.cursor = 'auto'
    }
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary/80 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: -8, translateY: -8 }}
        animate={{ scale: hovering ? 2.5 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/30 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: -16, translateY: -16 }}
        animate={{ scale: hovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      />
    </>
  )
}
