import { Sparkles } from 'lucide-react'

export function DemoBanner() {
  return (
    <div className="demo-banner mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
          <Sparkles className="h-4 w-4 text-white" strokeWidth={2} />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">Demo preview</p>
          <p className="text-xs text-white/75">
            Sample MSTI coffee chat data — not connected to production systems
          </p>
        </div>
      </div>
      <span className="rounded-lg bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/90">
        Internal use only
      </span>
    </div>
  )
}
