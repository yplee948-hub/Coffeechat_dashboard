import type { RequestStatus } from '../../lib/types'
import { cn } from '../../lib/utils'

const statusStyles: Record<RequestStatus, string> = {
  'New Request':
    'bg-[#EEF2FF] text-[#3B6FF5] dark:bg-[#1e293b] dark:text-[#93b4ff]',
  Assigned:
    'bg-[#FEF3C7] text-[#B45309] dark:bg-[#422006] dark:text-[#FCD34D]',
  'Intro Email Sent':
    'bg-[#E0E7FF] text-[#4338CA] dark:bg-[#312e81] dark:text-[#A5B4FC]',
  'Feedback Due':
    'bg-[#FEF3C7] text-[#B45309] dark:bg-[#422006] dark:text-[#FCD34D]',
  'Feedback Sent':
    'bg-[#EDE9FE] text-[#7C3AED] dark:bg-[#2e1065] dark:text-[#C4B5FD]',
  Completed:
    'bg-[#DCFCE7] text-[#15803D] dark:bg-[#052e16] dark:text-[#86EFAC]',
  'Closed / No Response':
    'bg-[#F1F5F9] text-[#64748B] dark:bg-[#1e293b] dark:text-[#94A3B8]',
  Overdue:
    'bg-[#FEE2E2] text-[#DC2626] dark:bg-[#450a0a] dark:text-[#FCA5A5]',
}

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-lg px-2.5 py-1 text-xs font-medium',
        statusStyles[status],
      )}
    >
      {status}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: string }) {
  const styles =
    priority === 'High'
      ? 'bg-[#FEE2E2] text-[#DC2626] dark:bg-[#450a0a] dark:text-[#FCA5A5]'
      : priority === 'Medium'
        ? 'bg-[#FEF3C7] text-[#B45309] dark:bg-[#422006] dark:text-[#FCD34D]'
        : 'bg-[#F1F5F9] text-[#64748B] dark:bg-[#1e293b] dark:text-[#94A3B8]'

  return (
    <span className={cn('inline-flex rounded-lg px-2.5 py-1 text-xs font-medium', styles)}>
      {priority}
    </span>
  )
}
