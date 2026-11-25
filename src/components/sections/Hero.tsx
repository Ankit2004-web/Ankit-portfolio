import { motion } from 'framer-motion'
import { FolderOpen, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/SocialIcons'
import { ResumeButton } from '@/components/common/ResumeButton'
import { siteConfig, rotatingTitles, socialLinks } from '@/data/site'
import { projects } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/common/MagneticButton'
import { TypingAnimation } from '@/components/common/TypingAnimation'
import { scrollToSection } from '@/lib/utils'

function workTitle(title: string) {
  const wrapped = title.match(/\(([^)]+)\)\s*$/)
  if (wrapped) return wrapped[1]
  return title.split('—')[0].trim()
}

export function Hero() {
  return (
    <section id="home" className="relative section-padding pt-28 pb-8">
      <div className="container-custom w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary"
            >
              IT Associate Trainee, Newmark
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
            >
              <span className="text-gradient">{siteConfig.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 min-h-10 text-2xl font-semibold text-foreground/80 sm:text-3xl"
            >
              <TypingAnimation words={rotatingTitles} className="text-gradient" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-muted"
            >
              {siteConfig.location.split(',')[0]} · {projects.length} shipped projects
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton className="w-full sm:w-auto">
                <ResumeButton size="lg" className="w-full" />
              </MagneticButton>
              <MagneticButton className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => scrollToSection('projects')}
                >
                  <FolderOpen className="w-4 h-4" />
                  View Projects
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/15 p-3 text-muted transition-colors hover:border-primary hover:text-primary"
                  aria-label={link.label}
                >
                  {link.icon === 'github' && <GithubIcon className="w-5 h-5" />}
                  {link.icon === 'linkedin' && <LinkedinIcon className="w-5 h-5" />}
                  {link.icon === 'mail' && <Mail className="w-5 h-5" />}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="border border-white/10 bg-surface"
          >
            <div className="flex items-baseline justify-between border-b border-white/10 px-5 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Selected work</p>
              <p className="font-mono text-[11px] text-muted">{String(projects.length).padStart(2, '0')}</p>
            </div>
            <ol>
              {projects.map((project, index) => (
                <li key={project.id} className="border-b border-white/10 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => scrollToSection('projects')}
                    className="flex w-full items-baseline gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5"
                  >
                    <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl font-medium leading-tight">{workTitle(project.title)}</span>
                      <span className="mt-1 block truncate text-sm text-muted">{project.techStack.slice(0, 3).join(' · ')}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
