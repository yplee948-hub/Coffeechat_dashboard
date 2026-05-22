import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  action?: ReactNode
}

export function Card({ children, className, title, action }: CardProps) {
  return (
    <div className={cn('card-surface p-5', className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && (
            <h3 className="text-sm font-semibold text-[var(--color-primary)]">
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
