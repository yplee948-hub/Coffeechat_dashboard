import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '../ui/Card'

interface LineChartCardProps {
  title: string
  data: { week: string; count: number }[]
}

export function LineChartCard({ title, data }: LineChartCardProps) {
  return (
    <Card title={title} className="min-h-[300px]">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="purpleFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--color-border)"
          />
          <XAxis
            dataKey="week"
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
            contentStyle={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8B5CF6"
            strokeWidth={2.5}
            fill="url(#purpleFill)"
            dot={{ fill: '#8B5CF6', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#6D4AFF' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
