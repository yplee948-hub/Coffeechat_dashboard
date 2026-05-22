export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card-surface h-[108px] p-5">
            <div className="mb-3 h-3 w-20 rounded bg-[var(--color-border)]" />
            <div className="h-8 w-16 rounded bg-[var(--color-border)]" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card-surface h-[220px]" />
        <div className="card-surface h-[220px] lg:col-span-2" />
      </div>
      <div className="card-surface h-[320px]" />
    </div>
  )
}
