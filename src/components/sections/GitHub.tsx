import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, Loader2, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/common/SocialIcons'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Counter } from '@/components/common/Counter'
import { siteConfig } from '@/data/site'
import { useGitHub } from '@/hooks/useGitHub'
import { useInView } from '@/hooks/useInView'
import { staggerContainer, staggerItem } from '@/components/animations/variants'

const GitHubContributionsChart = lazy(() =>
  import('@/components/sections/GitHubContributionsChart').then((m) => ({
    default: m.GitHubContributionsChart,
  })),
)

const levelColors = [
  'bg-white/5',
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/60',
  'bg-primary/90',
]

function ContributionGraph({
  weeks,
  username,
}: {
  weeks: Array<Array<{ count: number; level: number }>>
  username: string
}) {
  if (!weeks.length) {
    return (
      <div className="space-y-4">
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt={`${username} GitHub contribution chart`}
          className="w-full max-w-3xl mx-auto rounded-lg"
          loading="lazy"
        />
        <p className="text-xs text-muted text-center">
          Live chart from GitHub.{' '}
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            View full profile
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-[3px] min-w-max">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                title={`${day.count} contributions`}
                className={`w-[11px] h-[11px] rounded-sm ${levelColors[Math.min(day.level, 4)]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function GitHubSection() {
  const { ref, isInView } = useInView({ rootMargin: '240px' })
  const { data, loading, error } = useGitHub(isInView)

  const displayRepos = data?.pinnedRepos.length ? data.pinnedRepos : (data?.recentRepos ?? [])

  return (
    <section id="github" ref={ref} className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="GitHub"
          title="Open Source Activity"
          description="Live activity from my GitHub profile."
        />

        {!isInView && (
          <div className="glass rounded-2xl p-8 text-center text-muted text-sm">
            Scroll to load GitHub activity
          </div>
        )}

        {isInView && loading && (
          <div className="flex items-center justify-center py-16 text-muted gap-3">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading GitHub data...
          </div>
        )}

        {isInView && error && !loading && (
          <div className="glass rounded-2xl p-8 text-center text-muted">
            <p className="mb-4">Unable to load GitHub data right now.</p>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <GithubIcon className="w-4 h-4" />
              Visit {siteConfig.githubUsername} on GitHub
            </a>
          </div>
        )}

        {isInView && data && !loading && (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <motion.div variants={staggerItem} className="lg:col-span-2 glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <GithubIcon className="w-5 h-5" />
                    Contribution Activity
                  </h3>
                  <span className="text-sm text-muted">
                    {data.totalContributions > 0 ? (
                      <>
                        <Counter end={data.totalContributions} /> contributions in the last year
                      </>
                    ) : (
                      'Last 12 months'
                    )}
                  </span>
                </div>
                <ContributionGraph weeks={data.contributionWeeks} username={data.username} />
              </motion.div>

              <motion.div variants={staggerItem} className="space-y-4">
                {[
                  { label: 'Repositories', value: data.publicRepos },
                  { label: 'Followers', value: data.followers },
                  { label: 'Following', value: data.following },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-gradient">
                      <Counter end={stat.value} />
                    </p>
                    <p className="text-sm text-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-6 mt-6"
            >
              <motion.div variants={staggerItem} className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">
                  {data.pinnedRepos.length > 0 ? 'Pinned Repositories' : 'Recent Repositories'}
                </h3>
                <div className="space-y-3">
                  {displayRepos.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <div className="min-w-0 flex-1 pr-4">
                        <p className="font-medium group-hover:text-primary transition-colors truncate">
                          {repo.name}
                        </p>
                        <p className="text-xs text-muted">{repo.language ?? 'Unknown'}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted shrink-0">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          {repo.forks}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
                >
                  View all repositories
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>

              <motion.div variants={staggerItem} className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Monthly Contributions</h3>
                {data.monthlyContributions.length > 0 ? (
                  <Suspense fallback={<div className="h-[220px] rounded-lg bg-white/5 animate-pulse" />}>
                    <GitHubContributionsChart data={data.monthlyContributions} />
                  </Suspense>
                ) : data.totalContributions > 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-4xl font-bold text-gradient mb-2">
                      <Counter end={data.totalContributions} />
                    </p>
                    <p className="text-sm text-muted">total contributions this year</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted py-16 text-center">
                    Monthly breakdown unavailable via API.{' '}
                    <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      View full activity on GitHub
                    </a>
                  </p>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
