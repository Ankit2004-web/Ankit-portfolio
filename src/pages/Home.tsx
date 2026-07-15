import { lazy, Suspense } from 'react'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'

const Projects = lazy(() =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects })),
)
const Experience = lazy(() =>
  import('@/components/sections/Experience').then((m) => ({ default: m.Experience })),
)
const Education = lazy(() =>
  import('@/components/sections/Education').then((m) => ({ default: m.Education })),
)
const GitHubSection = lazy(() =>
  import('@/components/sections/GitHub').then((m) => ({ default: m.GitHubSection })),
)
const Achievements = lazy(() =>
  import('@/components/sections/Achievements').then((m) => ({ default: m.Achievements })),
)
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact })),
)

function SectionFallback() {
  return <div className="section-padding" aria-hidden="true" />
}

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Suspense fallback={<SectionFallback />}>
        <Projects />
        <Experience />
        <Education />
        <GitHubSection />
        <Achievements />
        <Contact />
      </Suspense>
    </>
  )
}
