# MSTI Coffee Chat Operations Dashboard

A polished **demo** dashboard for the MSTI coffee chat program — inspired by modern SaaS analytics UI (light + dark themes). Uses realistic sample data only; no live connection to internal systems.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Live demo

- **Vercel:** [coffeechat-dashboard](https://coffeechat-dashboard-yplee948-hubs-projects.vercel.app)
- **Figma:** [Coffee Chat Dashboard - Operations](https://www.figma.com/design/bwToZ3mUO9Yyx7mKtJuiIE)

## Demo features

- **Operations** — KPI cards, action-needed queue, feedback follow-up, ambassador workload
- **Program Analytics** — trends, breakdowns, SLA-style metrics
- **Light / dark theme** toggle
- **Sample data** — fictional names and metrics for presentations

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Recharts · React Router

## Design

See [DESIGN.md](./DESIGN.md) for tokens and layout patterns.

## Note on production data

This build intentionally does **not** connect to SharePoint or real tracker files. For a production version with real data, that would be a separate deployment with appropriate access controls.
