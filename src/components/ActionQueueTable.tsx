import type { CoffeeChatRequest } from '../lib/types'
import { formatDate } from '../lib/utils'
import { PriorityBadge, StatusBadge } from './ui/StatusBadge'

interface ActionQueueTableProps {
  requests: CoffeeChatRequest[]
}

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const avatarColors = [
  'from-[#3B6FF5] to-[#6D4AFF]',
  'from-[#8B5CF6] to-[#A78BFA]',
  'from-[#F97316] to-[#FB923C]',
  'from-[#22C55E] to-[#4ADE80]',
  'from-[#EC4899] to-[#F472B6]',
]

export function ActionQueueTable({ requests }: ActionQueueTableProps) {
  return (
    <div className="card-surface overflow-hidden">
      <div className="border-b border-[var(--color-border-subtle)] bg-gradient-to-r from-[#F8FAFF] to-transparent px-5 py-4 dark:from-[#1a1a24]">
        <h3 className="text-base font-semibold text-[var(--color-primary)]">
          Action needed
        </h3>
        <p className="mt-0.5 text-sm text-[var(--color-secondary)]">
          {requests.length} requests requiring manager attention
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-border-subtle)]/50 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
              <th className="px-5 py-3.5">Priority</th>
              <th className="px-5 py-3.5">Prospect</th>
              <th className="px-5 py-3.5">Type</th>
              <th className="px-5 py-3.5">Assigned to</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Action</th>
              <th className="px-5 py-3.5">Due</th>
              <th className="px-5 py-3.5">Owner</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((row, i) => (
              <tr
                key={row.id}
                className="border-b border-[var(--color-border-subtle)] transition-colors last:border-0 hover:bg-[#F8FAFF] dark:hover:bg-[#1f1f2c]"
              >
                <td className="px-5 py-4">
                  <PriorityBadge priority={row.priority} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} text-xs font-bold text-white shadow-sm`}
                    >
                      {initials(row.prospectName)}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-primary)]">
                        {row.prospectName}
                      </p>
                      <p className="text-xs text-[var(--color-muted)]">
                        {row.id} · {formatDate(row.addedDate)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-[var(--color-secondary)]">
                  {row.requestType}
                </td>
                <td className="px-5 py-4 text-[var(--color-secondary)]">
                  {row.assignedAmbassador ?? (
                    <span className="italic text-[var(--color-muted)]">Unassigned</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-5 py-4 font-medium text-[var(--color-primary)]">
                  {row.actionNeeded}
                </td>
                <td className="px-5 py-4 tabular-nums text-[var(--color-secondary)]">
                  {row.dueDate ? formatDate(row.dueDate) : '—'}
                </td>
                <td className="px-5 py-4 text-[var(--color-secondary)]">
                  {row.responsibleManager}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
