import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Mail,
  Send,
  UserPlus,
} from 'lucide-react'
import { ActionQueueTable } from '../components/ActionQueueTable'
import { DashboardSkeleton } from '../components/DashboardSkeleton'
import { DemoBanner } from '../components/DemoBanner'
import { DonutChartCard } from '../components/charts/DonutChartCard'
import { ProgressRing } from '../components/charts/ProgressRing'
import { Header } from '../components/layout/Header'
import { KpiCard } from '../components/ui/KpiCard'
import { Card } from '../components/ui/Card'
import { useTracker } from '../context/TrackerContext'

export function OperationsPage() {
  const { data, loading } = useTracker()

  return (
    <>
      <Header title="Operations" />
      <DemoBanner />

      {loading || !data ? (
        <DashboardSkeleton />
      ) : (
        <>
          <section className="animate-fade-up mb-5 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
            <KpiCard
              label="Total requests"
              value={data.kpiSummary.totalRequests}
              icon={ClipboardList}
              trend={{ value: '12%', positive: true }}
            />
            <KpiCard
              label="New requests"
              value={data.kpiSummary.newRequests}
              icon={UserPlus}
              highlight="warning"
              trend={{ value: '3', positive: false }}
            />
            <KpiCard
              label="Need intro email"
              value={data.kpiSummary.needIntroEmail}
              icon={Send}
              highlight="warning"
            />
            <KpiCard
              label="Feedback due"
              value={data.kpiSummary.feedbackDue}
              icon={Mail}
              trend={{ value: '8%', positive: true }}
            />
            <KpiCard
              label="Overdue"
              value={data.kpiSummary.overdue}
              icon={AlertTriangle}
              highlight="danger"
              trend={{ value: '2', positive: false }}
            />
            <KpiCard
              label="Completed"
              value={data.kpiSummary.completed}
              icon={CheckCircle2}
              highlight="success"
              trend={{ value: '24%', positive: true }}
            />
          </section>

          <section className="animate-fade-up-delay-1 mb-5 grid gap-4 lg:grid-cols-3">
            <DonutChartCard
              title="Request type"
              centerLabel="Total"
              centerValue={data.kpiSummary.totalRequests}
              data={data.requestTypeBreakdown}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              <ProgressRing
                title="Intro email SLA"
                value={`${data.introEmailSlaPercent}%`}
                percent={data.introEmailSlaPercent}
                color="#8B5CF6"
                trend="On track"
              />
              <ProgressRing
                title="Feedback completion"
                value={`${data.feedbackMetrics.completionRate}%`}
                percent={data.feedbackMetrics.completionRate}
                color="#22C55E"
                trend="+5%"
              />
            </div>
          </section>

          <section className="animate-fade-up-delay-2 mb-5">
            <ActionQueueTable requests={data.actionQueue} />
          </section>

          <section className="animate-fade-up-delay-3 grid gap-4 lg:grid-cols-2">
            <Card title="Feedback follow-up">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)]/40 px-4 py-3.5">
                  <span className="text-[var(--color-secondary)]">Due today</span>
                  <span className="text-lg font-bold text-[var(--color-primary)]">
                    {data.feedbackMetrics.dueToday}
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-xl border border-[#FECACA]/80 bg-[#FEF2F2]/80 px-4 py-3.5 dark:border-[#450a0a] dark:bg-[#450a0a]/30">
                  <span className="text-[var(--color-secondary)]">Overdue</span>
                  <span className="text-lg font-bold text-[var(--color-accent-red)]">
                    {data.feedbackMetrics.overdue}
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)]/40 px-4 py-3.5">
                  <span className="text-[var(--color-secondary)]">
                    Sent, not received
                  </span>
                  <span className="text-lg font-bold text-[var(--color-primary)]">
                    {data.feedbackMetrics.sentNotReceived}
                  </span>
                </li>
              </ul>
            </Card>

            <Card title="Ambassador workload">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
                      <th className="pb-3">Ambassador</th>
                      <th className="pb-3 text-right">Active</th>
                      <th className="pb-3 text-right">Done</th>
                      <th className="pb-3 text-right">Pending</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.ambassadorWorkload.map((a, i) => (
                      <tr
                        key={a.name}
                        className="border-t border-[var(--color-border-subtle)]"
                      >
                        <td className="py-3 font-medium text-[var(--color-primary)]">
                          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#3B6FF5] dark:bg-[#1e293b] dark:text-[#93b4ff]">
                            {i + 1}
                          </span>
                          {a.name}
                        </td>
                        <td className="py-3 text-right font-medium text-[var(--color-primary)]">
                          {a.active}
                        </td>
                        <td className="py-3 text-right text-[var(--color-secondary)]">
                          {a.completed}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={
                              a.pendingFeedback > 2
                                ? 'font-semibold text-[var(--color-accent-red)]'
                                : 'text-[var(--color-secondary)]'
                            }
                          >
                            {a.pendingFeedback}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        </>
      )}
    </>
  )
}
