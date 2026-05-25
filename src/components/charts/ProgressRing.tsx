import { Cell, Pie, PieChart } from 'recharts'
import { Card } from '../ui/Card'

interface ProgressRingProps {
  title: string
  value: string
  percent: number
  color: string
  trend?: string
}

export function ProgressRing({
  title,
  value,
  percent,
  color,
  trend,
}: ProgressRingProps) {
  const data = [
    { value: percent },
    { value: 100 - percent },
  ]

  return (
    <Card title={title} className="flex flex-col">
      <div className="flex flex-col items-center">
        <span className="mb-3 text-2xl font-bold text-[var(--color-primary)]">
          {value}
        </span>
        <div className="relative" style={{ width: 112, height: 112 }}>
          <PieChart width={112} height={112}>
            <Pie
              data={data}
              cx={56}
              cy={56}
              startAngle={90}
              endAngle={-270}
              innerRadius={36}
              outerRadius={48}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="var(--color-border-subtle)" />
            </Pie>
          </PieChart>
          {trend && (
            <span
              className="absolute inset-0 flex items-center justify-center text-xs font-semibold"
              style={{ color }}
            >
              {trend}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}
