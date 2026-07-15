import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { BackToTop } from '@/components/layout/BackToTop'
import { ScrollProgressBar } from '@/components/common/ScrollProgressBar'
import { AuroraBackground } from '@/components/common/AuroraBackground'
import { MouseGlow, CustomCursor } from '@/components/common/MouseEffects'
import { HomePage } from '@/pages/Home'

const CommandPalette = lazy(() =>
  import('@/components/layout/CommandPalette').then((m) => ({ default: m.CommandPalette })),
)

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
)

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function DeferredCommandPalette() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const preload = () =>
      import('@/components/layout/CommandPalette').then(() => setReady(true))

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preload)
      return () => window.cancelIdleCallback(id)
    }

    const timeout = setTimeout(preload, 1200)
    return () => clearTimeout(timeout)
  }, [])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <CommandPalette />
    </Suspense>
  )
}

export default function App() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgressBar />
      <AuroraBackground />
      <MouseGlow />
      <CustomCursor />
      <Navbar />
      <DeferredCommandPalette />
      <main className="relative z-10">
        <Suspense fallback={null}>
          <AppRoutes />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
