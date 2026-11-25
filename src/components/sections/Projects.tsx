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
  const frame = 'pointer-events-none absolute inset-0 h-full w-full'

  if (id === 'wfims') {
    return (
      <svg className={frame} viewBox="0 0 340 280" fill="none" aria-hidden>
        <circle cx="54" cy="214" r="14" stroke="white" strokeWidth="2" opacity="0.55" />
        <circle cx="118" cy="164" r="14" stroke="white" strokeWidth="2" opacity="0.7" />
        <circle cx="182" cy="214" r="14" stroke="white" strokeWidth="2" opacity="0.55" />
        <path d="M66 204 L106 174 M130 174 L170 204" stroke="white" strokeWidth="2" opacity="0.45" />
        <path d="M246 52 v36 M268 64 v24 M290 42 v46" stroke="white" strokeWidth="7" strokeLinecap="round" opacity="0.4" />
      </svg>
    )
  }

  if (id === 'velune') {
    return (
      <svg className={frame} viewBox="0 0 340 280" fill="none" aria-hidden>
        <path d="M62 58 c8 10 8 18 0 28 c-8-10-8-18 0-28 Z" fill="white" opacity="0.28" transform="rotate(-20 62 72)" />
        <path d="M286 196 c10 12 10 22 0 34 c-10-12-10-22 0-34 Z" fill="white" opacity="0.34" transform="rotate(24 286 213)" />
        <path d="M48 168 c14-8 28-8 36 2 c8 10-4 22-18 24 c-14-2-26-14-18-26 Z" fill="white" opacity="0.22" />
        <circle cx="300" cy="58" r="3" fill="white" opacity="0.7" />
        <circle cx="78" cy="236" r="2.5" fill="white" opacity="0.65" />
        <circle cx="250" cy="86" r="2" fill="white" opacity="0.55" />
      </svg>
    )
  }

  if (id === 'railway-reservation') {
    return (
      <svg className={frame} viewBox="0 0 340 280" fill="none" aria-hidden>
        <path d="M-20 196 C70 150 150 236 360 168" stroke="white" strokeWidth="3" opacity="0.55" />
        <path d="M-20 222 C70 176 150 262 360 194" stroke="white" strokeWidth="3" opacity="0.55" />
        <path d="M36 188 v42 M92 176 v46 M148 184 v48 M204 176 v46 M260 168 v44 M316 162 v42" stroke="white" strokeWidth="3" opacity="0.4" />
        <circle cx="292" cy="58" r="18" stroke="white" strokeWidth="3" opacity="0.45" />
        <circle cx="292" cy="58" r="6" fill="white" opacity="0.45" />
      </svg>
    )
  }

  if (id === 'drowsiness-detection') {
    return (
      <svg className={frame} viewBox="0 0 340 280" fill="none" aria-hidden>
        <path d="M214 78 C238 52 274 52 298 78 C274 104 238 104 214 78 Z" stroke="white" strokeWidth="3" opacity="0.6" />
        <circle cx="256" cy="78" r="10" fill="white" opacity="0.45" />
        <circle cx="62" cy="210" r="18" stroke="white" strokeWidth="2" opacity="0.35" />
        <circle cx="62" cy="210" r="32" stroke="white" strokeWidth="2" opacity="0.22" />
        <path d="M286 196 l10 18 h-20 Z" stroke="white" strokeWidth="2" opacity="0.45" />
      </svg>
    )
  }

  if (id === 'cipherlink') {
    return (
      <svg className={frame} viewBox="0 0 340 280" fill="none" aria-hidden>
        <rect x="36" y="168" width="78" height="48" rx="16" stroke="white" strokeWidth="2.5" opacity="0.55" />
        <path d="M52 216 l-8 14" stroke="white" strokeWidth="2.5" opacity="0.55" />
        <rect x="232" y="40" width="72" height="44" rx="16" stroke="white" strokeWidth="2.5" opacity="0.5" />
        <circle cx="300" cy="214" r="28" stroke="white" strokeWidth="2" strokeDasharray="4 6" opacity="0.45" />
        <rect x="290" y="208" width="20" height="16" rx="3" stroke="white" strokeWidth="2" opacity="0.6" />
        <path d="M294 208 v-6 a6 6 0 0 1 12 0 v6" stroke="white" strokeWidth="2" opacity="0.6" />
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
                  'group glass overflow-hidden rounded-[28px] transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10',
                  project.liveUrl && 'cursor-pointer',
                )}
              >
                <div className="grid lg:grid-cols-[minmax(260px,340px)_1fr]">
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
