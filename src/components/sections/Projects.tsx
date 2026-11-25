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
