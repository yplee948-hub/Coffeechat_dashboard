import { createContext, useContext, type ReactNode } from 'react'
import { useTrackerData } from '../hooks/useTrackerData'
import type { DashboardData } from '../lib/computeMetrics'

interface TrackerContextValue {
  data: DashboardData | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const TrackerContext = createContext<TrackerContextValue | null>(null)

export function TrackerProvider({ children }: { children: ReactNode }) {
  const value = useTrackerData()
  return (
    <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
  )
}

export function useTracker() {
  const ctx = useContext(TrackerContext)
  if (!ctx) throw new Error('useTracker must be used within TrackerProvider')
  return ctx
}
