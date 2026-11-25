import { motion } from 'framer-motion'
import { ExternalLink, Users, TrainFront, Eye, Lock, Globe, LockKeyhole, Gift } from 'lucide-react'
import { GithubIcon } from '@/components/common/SocialIcons'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import { siteConfig } from '@/data/site'
import { useGitHub } from '@/hooks/useGitHub'
import { useInView } from '@/hooks/useInView'
import { resolveProjectRepoUrl } from '@/lib/github'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/components/animations/variants'

const iconMap = {
  users: Users,
  train: TrainFront,
  eye: Eye,
  lock: Lock,
  gift: Gift,
  globe: Globe,
}

type Project = (typeof projects)[number]

function ProjectMark({ project }: { project: Project }) {
  const Icon = iconMap[project.icon] || Globe
  const logo = 'logo' in project ? project.logo : undefined

  return (
    <div
      className={cn(
        'relative flex items-center justify-center shadow-2xl ring-1 ring-white/30',
        logo ? 'h-32 w-32 rounded-full bg-white p-3.5' : 'h-28 w-28 rounded-3xl bg-white/15 backdrop-blur-md',
      )}
    >
      {logo ? (
        <img
          src={logo}
          alt={`${project.title} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <Icon className="h-12 w-12 text-white" />
      )}
    </div>
  )
}

function ProjectBackdrop({ id }: { id: Project['id'] }) {
  const frame =
    'pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(circle_at_50%_46%,transparent_16%,black_46%)]'

  if (id === 'wfims') {
    return (
      <svg className={frame} viewBox="0 0 340 280" fill="none" aria-hidden>
        <rect x="214" y="28" width="104" height="72" rx="14" fill="white" opacity="0.12" />
        <rect x="214" y="28" width="104" height="72" rx="14" stroke="white" strokeWidth="1.5" opacity="0.45" />
        <path d="M230 72 v-16 M248 72 v-28 M266 72 v-10 M284 72 v-22 M302 72 v-18" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
        <circle cx="42" cy="58" r="16" fill="white" opacity="0.2" />
        <circle cx="78" cy="40" r="11" fill="white" opacity="0.28" />
        <circle cx="104" cy="68" r="13" fill="white" opacity="0.16" />
        <path d="M56 52 L68 44 M88 46 L94 58" stroke="white" strokeWidth="2" opacity="0.55" />
        <rect x="22" y="188" width="86" height="58" rx="12" fill="white" opacity="0.1" />
        <path d="M36 224 h58 M36 210 h40" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
        <circle cx="292" cy="214" r="22" stroke="white" strokeWidth="2" opacity="0.4" />
        <path d="M292 202 v14 l8 6" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
      </svg>
    )
  }

  if (id === 'velune') {
    return (
      <svg className={frame} viewBox="0 0 340 280" fill="none" aria-hidden>
        <path d="M250 176 h56 v40 a8 8 0 0 1-8 8 h-40 a8 8 0 0 1-8-8 v-40 Z" fill="white" opacity="0.16" />
        <path d="M250 176 h56" stroke="white" strokeWidth="8" opacity="0.35" />
        <path d="M278 160 c0-16 16-22 16-8 c0-14 16-8 16 8" stroke="white" strokeWidth="3" opacity="0.7" />
        <path d="M48 46 c12 16 12 28 0 42 c-12-14-12-26 0-42 Z" fill="white" opacity="0.35" transform="rotate(-28 48 67)" />
        <path d="M96 34 c9 12 9 20 0 30 c-9-10-9-18 0-30 Z" fill="white" opacity="0.22" transform="rotate(18 96 49)" />
        <path d="M300 46 c10 14 10 24 0 36 c-10-12-10-22 0-36 Z" fill="white" opacity="0.3" transform="rotate(30 300 64)" />
        <path d="M36 150 c18-12 34-8 42 6 c8 14-6 28-22 28 c-16 0-32-12-20-34 Z" fill="white" opacity="0.2" />
        <path d="M70 214 c8-14 24-16 32-2 c6 12-8 24-16 24 c-10 0-22-8-16-22 Z" fill="white" opacity="0.28" />
        <circle cx="214" cy="48" r="2.5" fill="white" />
        <circle cx="132" cy="236" r="2" fill="white" opacity="0.8" />
        <circle cx="318" cy="132" r="2" fill="white" opacity="0.7" />
        <path d="M24 230 q40-28 70-8" stroke="white" strokeWidth="2" opacity="0.35" />
      </svg>
    )
  }

  if (id === 'railway-reservation') {
    return (
      <svg className={frame} viewBox="0 0 340 280" fill="none" aria-hidden>
        <path d="M20 250 L160 150 L160 168 L36 262 Z" fill="white" opacity="0.12" />
        <path d="M320 250 L180 150 L180 168 L304 262 Z" fill="white" opacity="0.12" />
        <path d="M28 246 L156 156 M44 258 L164 164" stroke="white" strokeWidth="2" opacity="0.55" />
        <path d="M312 246 L184 156 M296 258 L176 164" stroke="white" strokeWidth="2" opacity="0.55" />
        <path d="M70 230 l18-16 M96 214 l16-14 M122 198 l14-12" stroke="white" strokeWidth="3" opacity="0.4" />
        <path d="M270 230 l-18-16 M244 214 l-16-14 M218 198 l-14-12" stroke="white" strokeWidth="3" opacity="0.4" />
        <rect x="228" y="36" width="86" height="36" rx="8" fill="white" opacity="0.16" />
        <rect x="214" y="58" width="28" height="22" rx="4" fill="white" opacity="0.22" />
        <circle cx="248" cy="84" r="8" stroke="white" strokeWidth="3" opacity="0.6" />
        <circle cx="296" cy="84" r="8" stroke="white" strokeWidth="3" opacity="0.6" />
        <path d="M250 36 c8-16 22-16 30 0" stroke="white" strokeWidth="2" opacity="0.45" />
        <circle cx="46" cy="58" r="5" fill="white" opacity="0.35" />
        <circle cx="64" cy="44" r="8" fill="white" opacity="0.2" />
      </svg>
    )
  }

  if (id === 'drowsiness-detection') {
    return (
      <svg className={frame} viewBox="0 0 340 280" fill="none" aria-hidden>
        <path d="M18 92 C58 48 118 48 156 92 C118 132 58 132 18 92 Z" fill="white" opacity="0.1" />
        <path d="M22 92 C60 56 114 56 152 92 C114 124 60 124 22 92 Z" stroke="white" strokeWidth="3" opacity="0.65" />
        <path d="M28 86 l-8-14 M48 70 l-4-16 M74 62 v-16 M100 70 l4-16 M124 88 l10-12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        <circle cx="86" cy="92" r="16" fill="white" opacity="0.28" />
        <circle cx="90" cy="90" r="6" fill="white" opacity="0.75" />
        <path d="M210 196 q24-18 48 0 M210 214 q24-18 48 0 M210 232 q24-18 48 0" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
        <path d="M262 40 l14 24 h-28 Z" fill="white" opacity="0.16" />
        <path d="M262 40 l14 24 h-28 Z" stroke="white" strokeWidth="2" opacity="0.6" />
        <path d="M262 52 v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 220 h90" stroke="white" strokeWidth="3" strokeDasharray="10 8" opacity="0.4" />
        <path d="M24 236 h70" stroke="white" strokeWidth="3" strokeDasharray="10 8" opacity="0.28" />
      </svg>
    )
  }

  if (id === 'cipherlink') {
    return (
      <svg className={frame} viewBox="0 0 340 280" fill="none" aria-hidden>
        <rect x="18" y="36" width="96" height="58" rx="18" fill="white" opacity="0.14" />
        <circle cx="46" cy="65" r="4" fill="white" opacity="0.7" />
        <circle cx="66" cy="65" r="4" fill="white" opacity="0.5" />
        <circle cx="86" cy="65" r="4" fill="white" opacity="0.3" />
        <path d="M34 94 l-10 14" stroke="white" strokeWidth="3" opacity="0.4" />
        <rect x="220" y="168" width="102" height="52" rx="18" fill="white" opacity="0.12" />
        <path d="M242 194 h58" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <path d="M308 220 l12 12" stroke="white" strokeWidth="3" opacity="0.35" />
        <circle cx="292" cy="58" r="34" stroke="white" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.4" />
        <circle cx="292" cy="58" r="22" stroke="white" strokeWidth="1.5" opacity="0.3" />
        <rect x="282" y="52" width="20" height="16" rx="3" fill="white" opacity="0.2" />
        <path d="M286 52 v-7 a6 6 0 0 1 12 0 v7" stroke="white" strokeWidth="2" opacity="0.75" />
        <path d="M28 214 h8 M44 214 h4 M58 214 h10 M78 214 h6" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <path d="M36 232 h14 M60 232 h6 M76 232 h12" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.28" />
      </svg>
    )
  }

  return null
}

function ProjectLinks({ project, repoUrl }: { project: Project; repoUrl: string | null }) {
  return (
    <div className="flex flex-wrap gap-2.5" onClick={(event) => event.stopPropagation()}>
      {project.isPrivate ? (
        <Button variant="outline" size="sm" disabled title="Private repository">
          <LockKeyhole className="h-4 w-4" />
          Private
        </Button>
      ) : repoUrl ? (
        <Button variant="outline" size="sm" asChild>
          <a href={repoUrl} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </Button>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </Button>
      )}
      {project.liveUrl && (
        <Button size="sm" asChild>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        </Button>
      )}
    </div>
  )
}

function openLive(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function Projects() {
  const { ref, isInView } = useInView({ rootMargin: '200px' })
  const { data: githubData } = useGitHub(isInView)
  const repos = githubData?.recentRepos ?? []
  const repoUrlFor = (project: Project) =>
    project.isPrivate
      ? null
      : ('githubUrl' in project && project.githubUrl) ||
        resolveProjectRepoUrl(project, repos) ||
        siteConfig.github

  return (
    <section id="projects" ref={ref} className="section-padding relative scroll-mt-24 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container-custom relative">
        <SectionHeading
          label="Projects"
          title="Featured Work"
          description="Enterprise applications, product work, and academic projects showcasing full stack development skills."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {projects.map((project, index) => {
            const repoUrl = repoUrlFor(project)
            return (
              <motion.article
                key={project.id}
                variants={staggerItem}
                role={project.liveUrl ? 'link' : undefined}
                tabIndex={project.liveUrl ? 0 : undefined}
                onClick={project.liveUrl ? () => openLive(project.liveUrl!) : undefined}
                onKeyDown={
                  project.liveUrl
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          openLive(project.liveUrl!)
                        }
                      }
                    : undefined
                }
                className={cn(
                  'group relative glass overflow-hidden rounded-[28px] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15',
                  project.featured && 'shadow-lg shadow-primary/10 ring-1 ring-primary/35',
                  project.liveUrl && 'cursor-pointer',
                )}
              >
                <div className="grid lg:grid-cols-[minmax(260px,340px)_1fr]">
                  {project.featured && (
                    <div className="absolute inset-x-0 top-0 z-20 h-1 bg-linear-to-r from-primary via-secondary to-accent" />
                  )}
                  <div className={cn('relative min-h-64 overflow-hidden bg-linear-to-br', project.gradient)}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_42%)]" />
                    <div className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-black/20 blur-2xl" />
                    <ProjectBackdrop id={project.id} />
                    {project.featured && (
                      <div className="absolute left-5 top-5 z-10">
                        <span className="rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ProjectMark project={project} />
                    </div>
                  </div>

                  <div className="flex flex-col p-6 md:p-8 lg:p-10">
                    <p className="font-mono text-xs tracking-[0.22em] text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                    <div className="mt-6 lg:mt-auto lg:pt-8">
                      <ProjectLinks project={project} repoUrl={repoUrl} />
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
