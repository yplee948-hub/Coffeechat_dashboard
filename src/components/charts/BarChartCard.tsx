import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '../ui/Card'

interface BarChartCardProps {
  title: string
  data: { month: string; requests: number }[]
}

export function BarChartCard({ title, data }: BarChartCardProps) {
  const max = Math.max(...data.map((d) => d.requests), 1)

  return (
    <Card title={title} className="min-h-[300px]">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--color-border)"
          />
          <XAxis
            dataKey="month"
            tick={{ fill: 'var(--color-secondary)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--color-secondary)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'var(--color-border-subtle)', opacity: 0.5 }}
            contentStyle={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
              boxShadow: 'var(--shadow-card)',
            }}
          />
          <Bar dataKey="requests" radius={[8, 8, 0, 0]} maxBarSize={40}>
            {data.map((entry) => (
              <Cell
                key={entry.month}
                fill={
                  entry.requests >= max * 0.85
                    ? 'var(--color-accent-blue)'
                    : 'var(--color-accent-blue-light)'
                }
                fillOpacity={entry.requests >= max * 0.85 ? 1 : 0.55}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
