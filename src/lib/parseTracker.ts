import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import type {
  ActionNeeded,
  CoffeeChatRequest,
  ContactMethod,
  Priority,
  RequestStatus,
  RequestType,
} from './types'

export interface RawTrackerRow {
  addedDate: string
  prospectName: string
  email: string
  phone: string
  requestType: RequestType
  contactMethod: ContactMethod
  responsibleManager: string
  assignedAmbassador: string | null
  introEmailSent: boolean
  introEmailSentDate: string | null
  feedbackFormSent: boolean
  feedbackReceived: boolean
  notes: string
}

function clean(val: unknown): string {
  if (val == null) return ''
  return String(val).replace(/\s+/g, ' ').trim()
}

function pick(row: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const found = Object.entries(row).find(
      ([k]) => k.trim().toLowerCase() === key.toLowerCase(),
    )
    if (found) return clean(found[1])
  }
  for (const key of keys) {
    const found = Object.entries(row).find(([k]) =>
      k.toLowerCase().includes(key.toLowerCase()),
    )
    if (found) return clean(found[1])
  }
  return ''
}

function parseDate(raw: string): string | null {
  const v = clean(raw)
  if (!v || v === '0' || v.startsWith('1/0/1900')) return null
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return null
  return d.toISOString().slice(0, 10)
}

export function normalizeRequestType(raw: string): RequestType {
  const v = raw.toLowerCase()
  if (v.includes('current') && v.includes('alumni')) return 'Both'
  if (v.includes('alumni')) return 'Alumni'
  if (v.includes('student')) return 'Current Student'
  return 'Both'
}

export function normalizeContactMethod(raw: string): ContactMethod {
  const v = raw.toLowerCase()
  if (v.includes('zoom')) return 'Zoom'
  if (v.includes('phone')) return 'Phone'
  if (v.includes('in-person') || v.includes('in person') || v.includes('gix'))
    return 'In-person'
  return 'Email'
}

export function isYes(raw: string): boolean {
  const v = raw.toLowerCase().trim()
  return v === 'v' || v === 'yes' || v === 'y' || v === 'true'
}

function rowsFromSheet(rows: Record<string, unknown>[]): RawTrackerRow[] {
  const parsed: RawTrackerRow[] = []

  for (const row of rows) {
    const prospectName = pick(row, 'name (first, last)', 'name')
    const addedDate = parseDate(pick(row, 'added time', 'added date'))
    if (!prospectName || !addedDate) continue

    const assigned = pick(
      row,
      'assigned alumni/student',
      'assigned ambassador',
      'assigned alumni',
    )
    const emailSentRaw = pick(row, 'email sent', 'intro email sent')
    const extra = Object.values(row)
      .map((v) => clean(v))
      .filter((v) => v && !['v', 'yes', 'no'].includes(v.toLowerCase()))
    const notes = extra.find((v) =>
      /handled|mid-career|\:\)|note/i.test(v),
    )

    parsed.push({
      addedDate,
      prospectName,
      email: pick(row, 'email'),
      phone: pick(row, 'phone'),
      requestType: normalizeRequestType(
        pick(row, 'who do you want to connect with?', 'request type'),
      ),
      contactMethod: normalizeContactMethod(
        pick(row, 'preferred contact method', 'contact method'),
      ),
      responsibleManager: pick(row, 'responsible ambassador', 'responsible manager'),
      assignedAmbassador: assigned || null,
      introEmailSent: isYes(emailSentRaw),
      introEmailSentDate: null,
      feedbackFormSent: false,
      feedbackReceived: false,
      notes: notes ?? '',
    })
  }

  return parsed
}

export function parseCsv(text: string): RawTrackerRow[] {
  const result = Papa.parse<Record<string, unknown>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  })
  return rowsFromSheet(result.data)
}

export function parseXlsx(buffer: ArrayBuffer): RawTrackerRow[] {
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: true })
  const sheetName =
    workbook.SheetNames.find((n) =>
      /operations|tracker|requests/i.test(n),
    ) ?? workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
  })
  return rowsFromSheet(json)
}

function daysBetween(from: string, to: Date = new Date()): number {
  const a = new Date(from + 'T12:00:00')
  const b = new Date(to.toISOString().slice(0, 10) + 'T12:00:00')
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

export function computeStatus(row: RawTrackerRow): RequestStatus {
  if (!row.assignedAmbassador) return 'New Request'
  if (!row.introEmailSent) return 'Assigned'
  if (row.feedbackReceived) return 'Completed'
  if (row.feedbackFormSent && !row.feedbackReceived) return 'Feedback Sent'
  if (row.introEmailSentDate) {
    const days = daysBetween(row.introEmailSentDate)
    if (days >= 7 && !row.feedbackFormSent) return 'Feedback Due'
  }
  if (row.introEmailSent) return 'Intro Email Sent'
  return 'Assigned'
}

export function computeActionNeeded(
  row: RawTrackerRow,
  status: RequestStatus,
): ActionNeeded {
  if (status === 'Completed') return 'No Action Needed'
  if (!row.assignedAmbassador) return 'Assign Ambassador'
  if (!row.introEmailSent) return 'Send Intro Email'
  if (
    row.introEmailSentDate &&
    daysBetween(row.introEmailSentDate) >= 7 &&
    !row.feedbackFormSent
  ) {
    return 'Send Feedback Form'
  }
  if (row.feedbackFormSent && !row.feedbackReceived) {
    return 'Follow Up on Feedback'
  }
  if (status === 'Overdue') return 'Review Overdue Request'
  if (!row.introEmailSent && row.assignedAmbassador) return 'Send Intro Email'
  return 'No Action Needed'
}

export function computePriority(
  _row: RawTrackerRow,
  status: RequestStatus,
  action: ActionNeeded,
): Priority {
  if (status === 'Overdue' || action === 'Review Overdue Request') return 'High'
  if (action === 'Assign Ambassador' || action === 'Send Intro Email')
    return 'High'
  if (action === 'Send Feedback Form') return 'Medium'
  return 'Low'
}

export function isOverdue(row: RawTrackerRow, status: RequestStatus): boolean {
  if (status === 'Completed') return false
  const days = daysBetween(row.addedDate)
  if (!row.assignedAmbassador && days > 2) return true
  if (row.assignedAmbassador && !row.introEmailSent && days > 2) return true
  return false
}

export function toCoffeeChatRequest(
  row: RawTrackerRow,
  index: number,
): CoffeeChatRequest {
  let status = computeStatus(row)
  if (isOverdue(row, status) && status !== 'Completed') status = 'Overdue'
  const actionNeeded = computeActionNeeded(row, status)
  const priority = computePriority(row, status, actionNeeded)

  let dueDate: string | null = null
  if (actionNeeded === 'Assign Ambassador' || actionNeeded === 'Send Intro Email') {
    const d = new Date(row.addedDate + 'T12:00:00')
    d.setDate(d.getDate() + 2)
    dueDate = d.toISOString().slice(0, 10)
  }

  return {
    id: `CC-${row.addedDate.replace(/-/g, '')}-${String(index + 1).padStart(3, '0')}`,
    addedDate: row.addedDate,
    prospectName: row.prospectName,
    email: row.email,
    requestType: row.requestType,
    contactMethod: row.contactMethod,
    responsibleManager: row.responsibleManager || 'Unassigned',
    assignedAmbassador: row.assignedAmbassador,
    status,
    actionNeeded,
    priority,
    dueDate,
  }
}

export function transformRows(raw: RawTrackerRow[]): CoffeeChatRequest[] {
  return raw.map(toCoffeeChatRequest)
}
