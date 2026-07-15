import { motion } from 'framer-motion'
import { ArrowDown, FolderOpen, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/SocialIcons'
import { ResumeButton } from '@/components/common/ResumeButton'
import { siteConfig, rotatingTitles, socialLinks } from '@/data/site'
import { techBadges } from '@/data/skills'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/common/MagneticButton'
import { TypingAnimation } from '@/components/common/TypingAnimation'
import { scrollToSection } from '@/lib/utils'

const codeLines = [
  { indent: 0, content: 'const developer = {', color: 'text-foreground' },
  { indent: 1, content: 'name: "Ankit Biswas",', color: 'text-accent' },
  { indent: 1, content: 'role: "Full Stack Developer",', color: 'text-accent' },
  { indent: 1, content: 'stack: ["React", ".NET", "SQL Server"],', color: 'text-accent' },
  { indent: 1, content: 'passion: "Building scalable apps",', color: 'text-accent' },
  { indent: 1, content: 'location: "Hyderabad, India",', color: 'text-accent' },
  { indent: 0, content: '};', color: 'text-foreground' },
]

/** Fixed positions — each badge gets a unique slot to prevent overlap */
const badgePositions: Array<{
  top?: string
  bottom?: string
  left?: string
  right?: string
  zIndex: number
}> = [
  { top: '0%', left: '-4%', zIndex: 20 },        // React
  { top: '16%', left: '-10%', zIndex: 19 },     // Azure DevOps — slightly below & outside the box
  { top: '14%', right: '-4%', zIndex: 30 },     // TypeScript
  { top: '30%', left: '-8%', zIndex: 40 },      // C#
  { top: '44%', right: '6%', zIndex: 50 },      // .NET 8 — slightly inside the box
  { top: '60%', left: '-4%', zIndex: 60 },      // SQL Server
  { top: '74%', right: '-4%', zIndex: 70 },     // Node.js
]

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center section-padding pt-32">
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
              className="text-muted text-lg mb-4"
            >
              Hi, I&apos;m
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
              className="text-2xl sm:text-3xl font-semibold text-foreground/80 mb-6 h-10"
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
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <MagneticButton>
                <ResumeButton size="lg" />
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="outline"
                  size="lg"
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
                  className="p-3 rounded-xl glass glass-hover text-muted hover:text-primary transition-colors"
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
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative min-h-[420px] sm:min-h-[460px] px-2 sm:px-6 py-8 overflow-visible"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden glass glow-primary mx-auto max-w-lg">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted ml-2 font-mono">developer.ts</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex"
                  >
                    <span className="text-muted/40 w-6 select-none">{i + 1}</span>
                    <span style={{ paddingLeft: `${line.indent * 1.5}rem` }} className={line.color}>
                      {line.content}
                    </span>
                  </motion.div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-primary ml-14 mt-1"
                />
              </div>
            </div>

            {techBadges.map((badge, i) => {
              const pos = badgePositions[i] ?? badgePositions[0]
              return (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.08, type: 'spring' }}
                  className="absolute pointer-events-none"
                  style={{
                    top: pos.top,
                    bottom: pos.bottom,
                    left: pos.left,
                    right: pos.right,
                    zIndex: pos.zIndex,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.2,
                    }}
                    className="px-3 py-1.5 rounded-full glass border border-white/10 text-xs font-medium whitespace-nowrap shadow-lg shadow-black/20"
                  >
                    {badge}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection('about')}
            className="text-muted hover:text-foreground transition-colors"
            aria-label="Scroll to about"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
