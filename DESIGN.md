# MSTI Coffee Chat Dashboard — Design System

Inspired by the Business Analytics reference (light + dark SaaS dashboard).

## Layout

- **Sidebar (left):** 260px fixed width, rounded container, logo + nav + support CTA
- **Main:** Fluid content area with page title, date range, theme toggle, user profile
- **Grid:** KPI row (4 cols) → charts (2+2 or 3+1) → primary data table

## Typography

- **Font:** Inter (Google Fonts)
- **Page title:** 28px / semibold
- **KPI value:** 32px / bold
- **KPI label:** 13px / medium, muted
- **Table header:** 12px / medium, uppercase tracking
- **Body:** 14px / regular

## Spacing & shape

- **Card radius:** 16px (`rounded-2xl`)
- **Button / pill radius:** 12px (`rounded-xl`)
- **Nav active pill:** full rounded (`rounded-xl`)
- **Card padding:** 20–24px
- **Page padding:** 24–32px
- **Gap between cards:** 16–20px

## Color tokens

### Light theme

| Token | Hex | Usage |
|-------|-----|--------|
| `bg-page` | `#F4F6FA` | Page background |
| `bg-sidebar` | `#FFFFFF` | Sidebar surface |
| `bg-card` | `#FFFFFF` | Cards |
| `text-primary` | `#0F172A` | Headings, KPI numbers |
| `text-secondary` | `#64748B` | Labels, subtitles |
| `border` | `#E8ECF4` | Dividers |
| `accent-blue` | `#3B6FF5` | Primary actions, bar charts |
| `accent-purple` | `#8B5CF6` | Line charts, progress |
| `accent-green` | `#22C55E` | Positive trends, delivered |
| `accent-yellow` | `#F59E0B` | Processed / warning |
| `accent-red` | `#EF4444` | Negative trends, cancelled |
| `accent-orange` | `#F97316` | Donut segment |

### Dark theme

| Token | Hex | Usage |
|-------|-----|--------|
| `bg-page` | `#0E0E14` | Page background |
| `bg-sidebar` | `#14141C` | Sidebar |
| `bg-card` | `#1A1A24` | Cards |
| `text-primary` | `#F1F5F9` | Headings |
| `text-secondary` | `#94A3B8` | Labels |
| `border` | `#2A2A38` | Dividers |

### Status badges (both themes)

- **Delivered / Completed:** green tint background + green text
- **Processed / Assigned:** yellow tint
- **Cancelled / Overdue:** red tint
- **New:** blue tint

## Shadows (light only)

```css
box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 12px rgba(15, 23, 42, 0.04);
```

Dark theme: no shadow; use subtle border instead.

## Components

- **KpiCard:** label, large number, optional trend %, icon top-right
- **Card:** white/dark surface, rounded-2xl, optional shadow
- **DataTable:** avatar + name, columns, status pills
- **DonutChart / BarChart / LineChart:** Recharts with brand accent colors
- **ProgressRing:** radial metric (e.g. feedback completion %)

## Navigation (Coffee Chat)

1. **Operations** — daily workflow (KPIs, action queue, feedback, workload)
2. **Program Analytics** — trends, breakdowns, SLA metrics

## PRD mapping

| Reference UI | Coffee Chat use |
|--------------|-----------------|
| Orders / Approved KPIs | Total / New / Need Intro / Overdue |
| Donut charts | Request type, status breakdown |
| Bar chart | Requests over time |
| Line chart | Activity / SLA trend |
| Progress rings | Feedback completion, intro email SLA |
| Customer table | Action-needed queue |
