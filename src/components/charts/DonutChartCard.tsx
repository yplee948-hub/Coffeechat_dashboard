import { Cell, Pie, PieChart } from 'recharts'
import { Card } from '../ui/Card'

interface Segment {
  name: string
  value: number
  color: string
}

interface DonutChartCardProps {
  title: string
  centerLabel: string
  centerValue: string | number
  data: Segment[]
}

export function DonutChartCard({
  title,
  centerLabel,
  centerValue,
  data,
}: DonutChartCardProps) {
  return (
    <Card title={title} className="min-h-[220px]">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <PieChart width={140} height={140}>
            <Pie
              data={data}
              cx={70}
              cy={70}
              innerRadius={42}
              outerRadius={62}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-[var(--color-secondary)]">
              {centerLabel}
            </span>
            <span className="text-lg font-bold text-[var(--color-primary)]">
              {centerValue}
            </span>
          </div>
        </div>
        <ul className="flex flex-col gap-2 text-sm">
          {data.map((d) => (
            <li key={d.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: d.color }}
              />
              <span className="text-[var(--color-secondary)]">{d.name}</span>
              <span className="ml-auto font-medium text-[var(--color-primary)]">
                {d.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
