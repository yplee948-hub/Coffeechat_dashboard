import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface KpiCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  trend?: { value: string; positive: boolean; label?: string }
  highlight?: 'default' | 'warning' | 'danger' | 'success'
}

const iconBg: Record<NonNullable<KpiCardProps['highlight']>, string> = {
  default: 'bg-[#EEF2FF] text-[var(--color-accent-blue)] dark:bg-[#1e293b]',
  warning: 'bg-[#FEF3C7] text-[var(--color-accent-yellow)] dark:bg-[#422006]',
  danger: 'bg-[#FEE2E2] text-[var(--color-accent-red)] dark:bg-[#450a0a]',
  success: 'bg-[#DCFCE7] text-[var(--color-accent-green)] dark:bg-[#052e16]',
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  highlight = 'default',
}: KpiCardProps) {
  return (
    <div className="card-surface flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[var(--color-secondary)]">
          {label}
        </span>
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
            iconBg[highlight],
          )}
        >
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
        </div>
      </div>
      <span className="text-[34px] font-bold leading-none tracking-tight text-[var(--color-primary)]">
        {value}
      </span>
      {trend ? (
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'rounded-lg px-2 py-0.5 text-xs font-semibold',
              trend.positive
                ? 'bg-[#DCFCE7] text-[#15803D] dark:bg-[#052e16] dark:text-[#86EFAC]'
                : 'bg-[#FEE2E2] text-[#DC2626] dark:bg-[#450a0a] dark:text-[#FCA5A5]',
            )}
          >
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-[10px] text-[var(--color-secondary)] opacity-60">
            {trend.label ?? 'vs last month'}
          </span>
        </div>
      ) : (
        <div className="h-[22px]" />
      )}
    </div>
  )
}
