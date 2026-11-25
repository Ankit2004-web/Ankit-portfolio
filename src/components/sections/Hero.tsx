import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/SocialIcons'
import { siteConfig, rotatingTitles, socialLinks } from '@/data/site'
import { techBadges } from '@/data/skills'
import { TypingAnimation } from '@/components/common/TypingAnimation'
import { scrollToSection } from '@/lib/utils'

const codeLines: Array<Array<{ text: string; className: string }>> = [
  [
    { text: 'const ', className: 'text-secondary' },
    { text: 'developer', className: 'text-foreground' },
    { text: ' = {', className: 'text-muted' },
  ],
  [
    { text: 'name', className: 'text-primary' },
    { text: ': ', className: 'text-muted' },
    { text: '"Ankit Biswas"', className: 'text-accent' },
    { text: ',', className: 'text-muted' },
  ],
  [
    { text: 'role', className: 'text-primary' },
    { text: ': ', className: 'text-muted' },
    { text: '"Full Stack Developer"', className: 'text-accent' },
    { text: ',', className: 'text-muted' },
  ],
  [
    { text: 'stack', className: 'text-primary' },
    { text: ': ', className: 'text-muted' },
    { text: '["React", "Next.js", ".NET", "Python"]', className: 'text-accent' },
    { text: ',', className: 'text-muted' },
  ],
  [
    { text: 'company', className: 'text-primary' },
    { text: ': ', className: 'text-muted' },
    { text: '"Newmark"', className: 'text-accent' },
    { text: ',', className: 'text-muted' },
  ],
  [
    { text: 'location', className: 'text-primary' },
    { text: ': ', className: 'text-muted' },
    { text: '"Hyderabad, India"', className: 'text-accent' },
    { text: ',', className: 'text-muted' },
  ],
  [{ text: '};', className: 'text-foreground' }],
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
    <section id="home" className="relative flex min-h-screen items-center overflow-x-hidden section-padding pt-32">
      <div className="container-custom w-full min-w-0">
        <div className="grid w-full min-w-0 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="min-w-0"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-lg text-muted"
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
              className="mb-6 min-h-10 max-w-full text-2xl font-semibold text-foreground/80 sm:text-3xl"
            >
              <TypingAnimation words={rotatingTitles} className="text-gradient" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 max-w-full text-base leading-relaxed text-muted sm:text-lg"
            >
              {siteConfig.description}
            </motion.p>

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
            className="relative min-h-[420px] min-w-0 overflow-hidden px-2 py-8 sm:min-h-[460px] sm:overflow-visible sm:px-6"
          >
            <div className="relative z-10 mx-auto w-full max-w-lg rounded-2xl bg-linear-to-br from-primary via-secondary to-accent p-px shadow-2xl shadow-primary/25">
              <div className="overflow-hidden rounded-[15px] glass">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted ml-2 font-mono">developer.ts</span>
              </div>
              <div className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex"
                  >
                    <span className="w-6 select-none text-muted/40">{i + 1}</span>
                    <span className={`whitespace-nowrap ${i === 0 || i === codeLines.length - 1 ? '' : 'pl-6'}`}>
                      {line.map((part) => (
                        <span key={part.text} className={part.className}>
                          {part.text}
                        </span>
                      ))}
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
            </div>

            {techBadges.map((badge, i) => {
              const pos = badgePositions[i] ?? badgePositions[0]
              return (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.08, type: 'spring' }}
                  className="absolute hidden pointer-events-none lg:block"
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
