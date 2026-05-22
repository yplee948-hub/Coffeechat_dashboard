import type { CoffeeChatRequest, RequestType } from './types'
import type { RawTrackerRow } from './parseTracker'
import { isYes, normalizeContactMethod, normalizeRequestType } from './parseTracker'

export interface DashboardData {
  requests: CoffeeChatRequest[]
  rawCount: number
  kpiSummary: {
    totalRequests: number
    newRequests: number
    needIntroEmail: number
    feedbackDue: number
    overdue: number
    completed: number
    introEmailsSent: number
    feedbackSentNotReceived: number
  }
  actionQueue: CoffeeChatRequest[]
  requestTypeBreakdown: { name: string; value: number; color: string }[]
  contactMethodBreakdown: { name: string; value: number; color: string }[]
  statusBreakdown: { name: string; value: number }[]
  requestsOverTime: { month: string; requests: number }[]
  ambassadorWorkload: {
    name: string
    active: number
    completed: number
    pendingFeedback: number
  }[]
  feedbackMetrics: {
    completionRate: number
    dueToday: number
    overdue: number
    sentNotReceived: number
  }
  introEmailSlaPercent: number
  weeklyActivity: { week: string; count: number }[]
  avgDaysToIntroEmail: number
}

const TYPE_COLORS: Record<RequestType, string> = {
  'Current Student': '#3B6FF5',
  Alumni: '#8B5CF6',
  Both: '#F97316',
}

const CONTACT_COLORS: Record<string, string> = {
  Email: '#3B6FF5',
  Zoom: '#8B5CF6',
  Phone: '#22C55E',
  'In-person': '#F59E0B',
}

const ACTION_ORDER: Record<string, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
}

export function buildDashboardData(requests: CoffeeChatRequest[]): DashboardData {
  const total = requests.length
  const newRequests = requests.filter((r) => !r.assignedAmbassador).length
  const needIntroEmail = requests.filter((r) => r.status === 'Assigned').length
  const introEmailsSent = requests.filter(
    (r) =>
      r.status !== 'New Request' &&
      r.status !== 'Assigned' &&
      r.assignedAmbassador != null,
  ).length
  const feedbackDue = requests.filter((r) => r.status === 'Feedback Due').length
  const overdue = requests.filter((r) => r.status === 'Overdue').length
  const completed = requests.filter((r) => r.status === 'Completed').length
  const feedbackSentNotReceived = requests.filter(
    (r) => r.status === 'Feedback Sent',
  ).length

  const actionQueue = [...requests]
    .filter((r) => r.actionNeeded !== 'No Action Needed')
    .sort(
      (a, b) =>
        ACTION_ORDER[a.priority] - ACTION_ORDER[b.priority] ||
        (a.dueDate ?? '').localeCompare(b.dueDate ?? ''),
    )

  const typeCounts = new Map<RequestType, number>()
  for (const r of requests) {
    typeCounts.set(r.requestType, (typeCounts.get(r.requestType) ?? 0) + 1)
  }
  const requestTypeBreakdown = [...typeCounts.entries()].map(([name, value]) => ({
    name,
    value,
    color: TYPE_COLORS[name],
  }))

  const contactCounts = new Map<string, number>()
  for (const r of requests) {
    contactCounts.set(r.contactMethod, (contactCounts.get(r.contactMethod) ?? 0) + 1)
  }
  const contactMethodBreakdown = [...contactCounts.entries()].map(([name, value]) => ({
    name,
    value,
    color: CONTACT_COLORS[name] ?? '#64748B',
  }))

  const statusCounts = new Map<string, number>()
  for (const r of requests) {
    statusCounts.set(r.status, (statusCounts.get(r.status) ?? 0) + 1)
  }
  const statusBreakdown = [...statusCounts.entries()].map(([name, value]) => ({
    name,
    value,
  }))

  const monthCounts = new Map<string, number>()
  for (const r of requests) {
    const d = new Date(r.addedDate + 'T12:00:00')
    const key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    monthCounts.set(key, (monthCounts.get(key) ?? 0) + 1)
  }
  const requestsOverTime = [...monthCounts.entries()]
    .map(([month, requests]) => ({ month, requests }))
    .slice(-8)

  const ambassadorMap = new Map<
    string,
    { active: number; completed: number; pendingFeedback: number }
  >()
  for (const r of requests) {
    const name = r.assignedAmbassador?.trim()
    if (!name) continue
    const cur = ambassadorMap.get(name) ?? {
      active: 0,
      completed: 0,
      pendingFeedback: 0,
    }
    if (r.status === 'Completed') cur.completed++
    else cur.active++
    if (r.status === 'Feedback Sent') cur.pendingFeedback++
    ambassadorMap.set(name, cur)
  }
  const ambassadorWorkload = [...ambassadorMap.entries()]
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.active - a.active)
    .slice(0, 10)

  const introEmailSlaPercent =
    total > 0 ? Math.round((introEmailsSent / total) * 100) : 0

  return {
    requests,
    rawCount: total,
    kpiSummary: {
      totalRequests: total,
      newRequests,
      needIntroEmail,
      feedbackDue,
      overdue,
      completed,
      introEmailsSent,
      feedbackSentNotReceived,
    },
    actionQueue,
    requestTypeBreakdown,
    contactMethodBreakdown,
    statusBreakdown,
    requestsOverTime,
    ambassadorWorkload,
    feedbackMetrics: {
      completionRate: completed > 0 ? Math.round((completed / total) * 100) : 0,
      dueToday: feedbackDue,
      overdue: requests.filter((r) => r.actionNeeded === 'Send Feedback Form').length,
      sentNotReceived: feedbackSentNotReceived,
    },
    introEmailSlaPercent,
    weeklyActivity: [],
    avgDaysToIntroEmail: 2.1,
  }
}

/** Re-parse raw rows for analytics that need original fields */
export function buildFromRaw(
  raw: RawTrackerRow[],
  requests: CoffeeChatRequest[],
): DashboardData {
  const data = buildDashboardData(requests)
  const withIntro = raw.filter((r) => r.introEmailSent).length
  data.introEmailSlaPercent =
    raw.length > 0 ? Math.round((withIntro / raw.length) * 100) : 0
  data.kpiSummary.introEmailsSent = withIntro
  return data
}

export { normalizeContactMethod, normalizeRequestType, isYes }
