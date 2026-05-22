import { Calendar, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/theme'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--color-accent-blue)]">
          MSTI Program
        </p>
        <h1 className="text-[28px] font-bold tracking-tight text-[var(--color-primary)]">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3.5 py-2.5 text-sm text-[var(--color-secondary)] shadow-[var(--shadow-card)] transition-colors hover:border-[var(--color-accent-blue)]/30 dark:shadow-none"
        >
          <Calendar className="h-4 w-4 text-[var(--color-accent-blue)]" strokeWidth={1.75} />
          <span>Nov 2024 — May 2026</span>
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-secondary)] shadow-[var(--shadow-card)] transition-colors hover:text-[var(--color-primary)] dark:shadow-none"
        >
          {theme === 'light' ? (
            <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          ) : (
            <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
          )}
        </button>
        <div className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] py-2 pl-2 pr-3.5 shadow-[var(--shadow-card)] dark:shadow-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#3B6FF5] to-[#8B5CF6] text-xs font-bold text-white">
            YL
          </div>
          <div className="text-left">
            <span className="block text-sm font-semibold text-[var(--color-primary)]">
              Youngpyung Lee
            </span>
            <span className="block text-[10px] text-[var(--color-secondary)]">
              Program Manager
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
