import { useCallback, useEffect, useState } from 'react'
import type { DashboardData } from '../lib/computeMetrics'
import { demoDashboardData } from '../lib/demoData'

const DEMO_LOAD_MS = 450

export function useTrackerData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, DEMO_LOAD_MS))
    setData(demoDashboardData)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { data, loading, error: null, refresh }
}
