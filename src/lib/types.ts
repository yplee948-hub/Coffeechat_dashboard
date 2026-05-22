export type RequestType = 'Current Student' | 'Alumni' | 'Both'
export type ContactMethod = 'Email' | 'Zoom' | 'Phone' | 'In-person'
export type RequestStatus =
  | 'New Request'
  | 'Assigned'
  | 'Intro Email Sent'
  | 'Feedback Due'
  | 'Feedback Sent'
  | 'Completed'
  | 'Closed / No Response'
  | 'Overdue'

export type ActionNeeded =
  | 'Assign Ambassador'
  | 'Send Intro Email'
  | 'Send Feedback Form'
  | 'Follow Up on Feedback'
  | 'Review Overdue Request'
  | 'No Action Needed'

export type Priority = 'High' | 'Medium' | 'Low'

export interface CoffeeChatRequest {
  id: string
  addedDate: string
  prospectName: string
  email: string
  requestType: RequestType
  contactMethod: ContactMethod
  responsibleManager: string
  assignedAmbassador: string | null
  status: RequestStatus
  actionNeeded: ActionNeeded
  priority: Priority
  dueDate: string | null
}
