import { NavLink } from 'react-router-dom'
import { BarChart3, Coffee, LayoutDashboard } from 'lucide-react'
import { cn } from '../../lib/utils'

const navItems = [
  { to: '/', label: 'Operations', icon: LayoutDashboard },
  { to: '/analytics', label: 'Program Analytics', icon: BarChart3 },
]

export function Sidebar() {
  return (
    <aside className="flex w-[260px] shrink-0 flex-col rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-sidebar)] p-4 shadow-[var(--shadow-card)] dark:border-[var(--color-border)]">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B6FF5] via-[#6D4AFF] to-[#F97316] shadow-lg shadow-blue-500/25">
          <Coffee className="h-5 w-5 text-white" strokeWidth={2} />
        </div>
        <div>
          <span className="block text-sm font-bold text-[var(--color-primary)]">
            MSTI
          </span>
          <span className="block text-[11px] text-[var(--color-secondary)]">
            Coffee Chat Ops
          </span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-[var(--color-nav-active)] text-[var(--color-nav-active-text)] shadow-sm'
                  : 'text-[var(--color-secondary)] hover:bg-[var(--color-border-subtle)] hover:text-[var(--color-primary)]',
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] p-4 dark:from-[#1e293b] dark:to-[#2e1065]/40">
        <p className="text-xs font-semibold text-[var(--color-primary)]">
          Coffee chat program
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--color-secondary)]">
          Track requests, assignments, and follow-ups in one place.
        </p>
      </div>
    </aside>
  )
}
