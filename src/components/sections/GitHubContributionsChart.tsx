import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

interface GitHubContributionsChartProps {
  data: { month: string; contributions: number }[]
}

export function GitHubContributionsChart({ data }: GitHubContributionsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: '#111827',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#fff',
          }}
        />
        <Bar dataKey="contributions" fill="#2563eb" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
