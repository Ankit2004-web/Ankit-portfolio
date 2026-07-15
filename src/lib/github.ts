import { profile } from '@/data/profile'

export interface GitHubRepo {
  name: string
  url: string
  language: string | null
  stars: number
  forks: number
  description: string | null
  isPrivate: boolean
}

export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface GitHubProfileData {
  username: string
  name: string | null
  bio: string | null
  avatarUrl: string
  publicRepos: number
  followers: number
  following: number
  totalContributions: number
  contributionWeeks: ContributionDay[][]
  pinnedRepos: GitHubRepo[]
  recentRepos: GitHubRepo[]
  monthlyContributions: { month: string; contributions: number }[]
}

const GITHUB_GRAPHQL = 'https://api.github.com/graphql'

const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      name
      bio
      avatarUrl
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            isPrivate
            stargazerCount
            forkCount
            primaryLanguage { name }
          }
        }
      }
      repositories(first: 10, orderBy: { field: UPDATED_AT, direction: DESC }, ownerAffiliations: OWNER) {
        nodes {
          name
          description
          url
          isPrivate
          stargazerCount
          forkCount
          primaryLanguage { name }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

interface GraphQLRepo {
  name: string
  description: string | null
  url: string
  isPrivate: boolean
  stargazerCount: number
  forkCount: number
  primaryLanguage: { name: string } | null
}

interface GitHubUserResponse {
  name: string | null
  bio: string | null
  avatar_url: string
  public_repos: number
  followers: number
  following: number
}

interface PublicContributionsResponse {
  total?: { lastYear?: number }
  contributions?: Array<{ date: string; count: number; level: number }>
}

function mapRepo(repo: GraphQLRepo): GitHubRepo {
  return {
    name: repo.name,
    url: repo.url,
    language: repo.primaryLanguage?.name ?? null,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    description: repo.description,
    isPrivate: repo.isPrivate,
  }
}

function contributionsToWeeks(contributions: ContributionDay[]): ContributionDay[][] {
  if (!contributions.length) return []

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date))
  const firstDate = new Date(`${sorted[0].date}T00:00:00`)
  const leadingDays = firstDate.getDay()

  const padded: ContributionDay[] = Array.from({ length: leadingDays }, () => ({
    date: '',
    count: 0,
    level: 0,
  }))
  padded.push(...sorted)

  const weeks: ContributionDay[][] = []
  for (let index = 0; index < padded.length; index += 7) {
    weeks.push(padded.slice(index, index + 7))
  }

  return weeks
}

function buildMonthlyContributions(weeks: ContributionDay[][]): { month: string; contributions: number }[] {
  const monthMap = new Map<string, number>()
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  for (const week of weeks) {
    for (const day of week) {
      if (!day.date || day.count === 0) continue
      const date = new Date(`${day.date}T00:00:00`)
      const key = `${date.getFullYear()}-${date.getMonth()}`
      monthMap.set(key, (monthMap.get(key) ?? 0) + day.count)
    }
  }

  const sorted = [...monthMap.entries()].sort(([a], [b]) => a.localeCompare(b))
  const recent = sorted.slice(-12)

  return recent.map(([key, contributions]) => {
    const month = Number(key.split('-')[1])
    return { month: monthNames[month], contributions }
  })
}

async function fetchUserProfile(username: string): Promise<GitHubUserResponse> {
  const response = await fetch(`https://api.github.com/users/${username}`)
  if (!response.ok) throw new Error('Failed to fetch GitHub user')
  return response.json() as Promise<GitHubUserResponse>
}

async function fetchReposRest(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
  )
  if (!response.ok) throw new Error('Failed to fetch GitHub repositories')
  const repos = (await response.json()) as Array<{
    name: string
    html_url: string
    language: string | null
    stargazers_count: number
    forks_count: number
    description: string | null
    private: boolean
  }>

  return repos.map((repo) => ({
    name: repo.name,
    url: repo.html_url,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    description: repo.description,
    isPrivate: repo.private,
  }))
}

async function fetchContributionsPublic(username: string): Promise<{
  total: number
  weeks: ContributionDay[][]
} | null> {
  const endpoints = [
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    `https://github-contributions-api.deno.dev/v4/${encodeURIComponent(username)}?y=last`,
  ]

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint)
      if (!response.ok) continue

      const data = (await response.json()) as PublicContributionsResponse
      const contributions: ContributionDay[] = (data.contributions ?? []).map((day) => ({
        date: day.date,
        count: day.count,
        level: day.level,
      }))

      if (!contributions.length) continue

      const weeks = contributionsToWeeks(contributions)
      const total =
        data.total?.lastYear ?? contributions.reduce((sum, day) => sum + day.count, 0)

      return { total, weeks }
    } catch {
      continue
    }
  }

  return null
}

async function fetchGraphQLProfile(
  username: string,
  token: string,
): Promise<GitHubProfileData | null> {
  try {
    const [userStats, graphResponse] = await Promise.all([
      fetchUserProfile(username),
      fetch(GITHUB_GRAPHQL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: CONTRIBUTIONS_QUERY,
          variables: { username },
        }),
      }),
    ])

    if (!graphResponse.ok) return null

    const graphData = await graphResponse.json()
    const user = graphData?.data?.user
    if (!user) return null

    const weeks: ContributionDay[][] = user.contributionsCollection.contributionCalendar.weeks.map(
      (week: {
        contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: number }>
      }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: day.contributionLevel,
        })),
    )

    const pinnedRepos = (user.pinnedItems?.nodes ?? []).filter(Boolean).map(mapRepo)
    const recentRepos = (user.repositories?.nodes ?? [])
      .filter((repo: GraphQLRepo) => !repo.isPrivate)
      .map(mapRepo)

    return {
      username,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      publicRepos: userStats.public_repos,
      followers: userStats.followers,
      following: userStats.following,
      totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
      contributionWeeks: weeks,
      pinnedRepos,
      recentRepos: pinnedRepos.length > 0 ? pinnedRepos : recentRepos.slice(0, 6),
      monthlyContributions: buildMonthlyContributions(weeks),
    }
  } catch {
    return null
  }
}

async function fetchGitHubProfileInternal(): Promise<GitHubProfileData> {
  const username = profile.site.githubUsername
  const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined

  if (token) {
    const graphQLProfile = await fetchGraphQLProfile(username, token)
    if (graphQLProfile) return graphQLProfile
  }

  const [userProfile, repos, contributions] = await Promise.all([
    fetchUserProfile(username),
    fetchReposRest(username),
    fetchContributionsPublic(username),
  ])

  const publicRepos = repos.filter((repo) => !repo.isPrivate)
  const weeks = contributions?.weeks ?? []

  return {
    username,
    name: userProfile.name ?? profile.site.name,
    bio: userProfile.bio,
    avatarUrl: userProfile.avatar_url,
    publicRepos: userProfile.public_repos,
    followers: userProfile.followers,
    following: userProfile.following,
    totalContributions: contributions?.total ?? 0,
    contributionWeeks: weeks,
    pinnedRepos: publicRepos.slice(0, 6),
    recentRepos: publicRepos.slice(0, 6),
    monthlyContributions: buildMonthlyContributions(weeks),
  }
}

const CACHE_KEY = 'github-profile-cache-v2'
const CACHE_TTL_MS = 15 * 60 * 1000

let inflightRequest: Promise<GitHubProfileData> | null = null

function readCachedProfile(): GitHubProfileData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { savedAt, data } = JSON.parse(raw) as { savedAt: number; data: GitHubProfileData }
    if (Date.now() - savedAt > CACHE_TTL_MS) return null
    if (!data.contributionWeeks?.length) return null
    return data
  } catch {
    return null
  }
}

function writeCachedProfile(data: GitHubProfileData) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // Ignore storage quota errors
  }
}

export async function fetchGitHubProfile(): Promise<GitHubProfileData> {
  const cached = readCachedProfile()
  if (cached) return cached

  if (inflightRequest) return inflightRequest

  inflightRequest = fetchGitHubProfileInternal()
    .then((data) => {
      writeCachedProfile(data)
      return data
    })
    .finally(() => {
      inflightRequest = null
    })

  return inflightRequest
}

export function resolveProjectRepoUrl(
  project: (typeof profile.projects)[number],
  repos: GitHubRepo[],
): string | null {
  if (project.isPrivate) return null

  if (project.githubRepoSlug) {
    const match = repos.find((r) => r.name === project.githubRepoSlug)
    if (match) return match.url
  }

  const keywords = 'repoSearchKeywords' in project ? project.repoSearchKeywords : []
  if (keywords?.length) {
    const match = repos.find((repo) =>
      keywords.some((keyword) => repo.name.toLowerCase().includes(keyword.toLowerCase())),
    )
    if (match) return match.url
  }

  return null
}
