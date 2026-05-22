import type { CoffeeChatRequest } from './types'

/** Sample data aligned with PRD tracker audit (106 rows, etc.) */
export const kpiSummary = {
  totalRequests: 106,
  newRequests: 11,
  needIntroEmail: 23,
  feedbackDue: 18,
  overdue: 7,
  completed: 42,
  introEmailsSent: 72,
  feedbackSentNotReceived: 5,
}

export const actionQueue: CoffeeChatRequest[] = [
  {
    id: 'CC-2024-089',
    addedDate: '2026-05-18',
    prospectName: 'Alex Chen',
    email: 'alex.chen@email.com',
    requestType: 'Current Student',
    contactMethod: 'Zoom',
    responsibleManager: 'Youngpyung Lee',
    assignedAmbassador: null,
    status: 'New Request',
    actionNeeded: 'Assign Ambassador',
    priority: 'High',
    dueDate: '2026-05-20',
  },
  {
    id: 'CC-2024-102',
    addedDate: '2026-05-17',
    prospectName: 'Jordan Kim',
    email: 'j.kim@email.com',
    requestType: 'Alumni',
    contactMethod: 'Email',
    responsibleManager: 'Kyle Martinez',
    assignedAmbassador: 'Sam Rivera (Alumni)',
    status: 'Assigned',
    actionNeeded: 'Send Intro Email',
    priority: 'High',
    dueDate: '2026-05-19',
  },
  {
    id: 'CC-2024-078',
    addedDate: '2026-05-10',
    prospectName: 'Taylor Brooks',
    email: 't.brooks@email.com',
    requestType: 'Both',
    contactMethod: 'Phone',
    responsibleManager: 'Youngpyung Lee',
    assignedAmbassador: 'Morgan Lee (Student)',
    status: 'Feedback Due',
    actionNeeded: 'Send Feedback Form',
    priority: 'Medium',
    dueDate: '2026-05-17',
  },
  {
    id: 'CC-2024-065',
    addedDate: '2026-04-28',
    prospectName: 'Casey Nguyen',
    email: 'casey.n@email.com',
    requestType: 'Current Student',
    contactMethod: 'In-person',
    responsibleManager: 'Kyle Martinez',
    assignedAmbassador: 'Jamie Park (Student)',
    status: 'Overdue',
    actionNeeded: 'Review Overdue Request',
    priority: 'High',
    dueDate: '2026-05-02',
  },
  {
    id: 'CC-2024-091',
    addedDate: '2026-05-05',
    prospectName: 'Riley Adams',
    email: 'r.adams@email.com',
    requestType: 'Alumni',
    contactMethod: 'Zoom',
    responsibleManager: 'Youngpyung Lee',
    assignedAmbassador: 'Chris Wu (Alumni)',
    status: 'Feedback Sent',
    actionNeeded: 'Follow Up on Feedback',
    priority: 'Medium',
    dueDate: '2026-05-12',
  },
]

export const requestsOverTime = [
  { month: 'Jan', requests: 8 },
  { month: 'Feb', requests: 12 },
  { month: 'Mar', requests: 15 },
  { month: 'Apr', requests: 18 },
  { month: 'May', requests: 22 },
  { month: 'Jun', requests: 14 },
]

export const requestTypeBreakdown = [
  { name: 'Current Student', value: 48, color: '#3B6FF5' },
  { name: 'Alumni', value: 35, color: '#8B5CF6' },
  { name: 'Both', value: 23, color: '#F97316' },
]

export const contactMethodBreakdown = [
  { name: 'Email', value: 42, color: '#3B6FF5' },
  { name: 'Zoom', value: 38, color: '#8B5CF6' },
  { name: 'Phone', value: 15, color: '#22C55E' },
  { name: 'In-person', value: 11, color: '#F59E0B' },
]

export const statusBreakdown = [
  { name: 'Completed', value: 42 },
  { name: 'Intro Email Sent', value: 28 },
  { name: 'Assigned', value: 15 },
  { name: 'New Request', value: 11 },
  { name: 'Overdue', value: 7 },
  { name: 'Feedback Due', value: 3 },
]

export const ambassadorWorkload = [
  { name: 'Morgan Lee', active: 8, completed: 12, pendingFeedback: 2 },
  { name: 'Sam Rivera', active: 6, completed: 15, pendingFeedback: 1 },
  { name: 'Jamie Park', active: 10, completed: 9, pendingFeedback: 3 },
  { name: 'Chris Wu', active: 5, completed: 11, pendingFeedback: 0 },
  { name: 'Alex Turner', active: 7, completed: 8, pendingFeedback: 2 },
]

export const feedbackMetrics = {
  completionRate: 0,
  dueToday: 4,
  overdue: 3,
  sentNotReceived: 5,
}
