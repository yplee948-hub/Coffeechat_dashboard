import { Header } from '../components/layout/Header'
import { DemoBanner } from '../components/DemoBanner'
import { DashboardSkeleton } from '../components/DashboardSkeleton'
import { BarChartCard } from '../components/charts/BarChartCard'
import { DonutChartCard } from '../components/charts/DonutChartCard'
import { LineChartCard } from '../components/charts/LineChartCard'
import { Card } from '../components/ui/Card'
import { useTracker } from '../context/TrackerContext'

const STATUS_COLORS = [
  '#22C55E',
  '#3B6FF5',
  '#F59E0B',
  '#8B5CF6',
  '#EF4444',
  '#F97316',
]

export function AnalyticsPage() {
  const { data, loading } = useTracker()

  return (
    <>
      <Header title="Program Analytics" />
      <DemoBanner />

      {loading || !data ? (
        <DashboardSkeleton />
      ) : (
        <>
          <section className="animate-fade-up mb-5 grid gap-4 lg:grid-cols-2">
            <BarChartCard
              title="Requests over time"
              data={data.requestsOverTime}
            />
            <LineChartCard
              title="Weekly request activity"
              data={data.weeklyActivity}
            />
          </section>

          <section className="animate-fade-up-delay-1 mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <DonutChartCard
              title="Request type"
              centerLabel="Total"
              centerValue={data.kpiSummary.totalRequests}
              data={data.requestTypeBreakdown}
            />
            <DonutChartCard
              title="Contact method"
              centerLabel="Total"
              centerValue={data.kpiSummary.totalRequests}
              data={data.contactMethodBreakdown}
            />
            <DonutChartCard
              title="Status breakdown"
              centerLabel="Active"
              centerValue={data.kpiSummary.totalRequests - data.kpiSummary.completed}
              data={data.statusBreakdown.map((s, i) => ({
                ...s,
                color: STATUS_COLORS[i % STATUS_COLORS.length],
              }))}
            />
          </section>

          <section className="animate-fade-up-delay-2 grid gap-4 md:grid-cols-2">
            <Card title="Average time to intro email">
              <p className="text-4xl font-bold tracking-tight text-[var(--color-primary)]">
                {data.avgDaysToIntroEmail}
                <span className="ml-2 text-lg font-normal text-[var(--color-secondary)]">
                  business days
                </span>
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#3B6FF5] to-[#8B5CF6]"
                  style={{ width: '90%' }}
                />
              </div>
              <p className="mt-2 text-sm text-[var(--color-secondary)]">
                90% SLA target · currently meeting goal
              </p>
            </Card>
            <Card title="Feedback completion rate">
              <p className="text-4xl font-bold tracking-tight text-[var(--color-primary)]">
                {data.feedbackMetrics.completionRate}%
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#22C55E] to-[#4ADE80]"
                  style={{ width: `${data.feedbackMetrics.completionRate}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-[var(--color-secondary)]">
                {data.kpiSummary.completed} of {data.kpiSummary.totalRequests}{' '}
                requests completed with feedback
              </p>
            </Card>
          </section>
        </>
      )}
    </>
  )
}
