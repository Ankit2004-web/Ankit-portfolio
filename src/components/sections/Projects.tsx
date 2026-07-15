import { motion } from 'framer-motion'
import { ExternalLink, Users, TrainFront, Eye, Lock, Globe, LockKeyhole } from 'lucide-react'
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
  globe: Globe,
}

export function Projects() {
  const { ref, isInView } = useInView({ rootMargin: '200px' })
  const { data: githubData } = useGitHub(isInView)
  const repos = githubData?.recentRepos ?? []

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Projects"
          title="Featured Work"
          description="Enterprise applications and academic projects showcasing full stack development skills."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project) => {
            const Icon = iconMap[project.icon] || Globe
            const logo = 'logo' in project ? project.logo : undefined
            const repoUrl = project.isPrivate
              ? null
              : resolveProjectRepoUrl(project, repos) ?? siteConfig.github

            return (
              <motion.article
                key={project.id}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className={cn(
                  'group glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5',
                  project.featured && 'md:col-span-2',
                )}
              >
                <div
                  className={cn(
                    `relative bg-linear-to-br ${project.gradient} overflow-hidden`,
                    project.featured ? 'h-56 md:h-64' : 'h-48',
                  )}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-primary/90 text-white border-0 text-xs font-semibold">
                        Featured Project
                      </Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center px-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={cn(
                        'bg-white flex items-center justify-center shadow-lg ring-1 ring-white/20',
                        logo
                          ? cn(
                              'rounded-full overflow-hidden',
                              project.featured ? 'w-28 h-28 p-3' : 'w-24 h-24 p-2',
                            )
                          : cn(
                              'rounded-2xl bg-white/10 backdrop-blur-sm',
                              project.featured ? 'w-24 h-24' : 'w-20 h-20',
                            ),
                      )}
                    >
                      {logo ? (
                        <img
                          src={logo}
                          alt={`${project.title} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <Icon className={cn('text-white', project.featured ? 'w-12 h-12' : 'w-10 h-10')} />
                      )}
                    </motion.div>
                  </div>
                </div>

                <div className={cn('p-6', project.featured && 'md:p-8')}>
                  <h3
                    className={cn(
                      'font-bold mb-3 group-hover:text-primary transition-colors',
                      project.featured ? 'text-2xl md:text-3xl' : 'text-xl',
                    )}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={cn(
                      'text-muted leading-relaxed mb-4',
                      project.featured ? 'text-base line-clamp-4' : 'text-sm line-clamp-3',
                    )}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.isPrivate ? (
                      <Button variant="outline" size="sm" disabled title="Private repository">
                        <LockKeyhole className="w-4 h-4" />
                        Private Repository
                      </Button>
                    ) : repoUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="w-4 h-4" />
                          GitHub
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" asChild>
                        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="w-4 h-4" />
                          View on GitHub
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
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
