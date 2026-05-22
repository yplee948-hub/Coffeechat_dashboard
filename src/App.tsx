import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { TrackerProvider } from './context/TrackerContext'
import { ThemeProvider } from './lib/theme'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { OperationsPage } from './pages/OperationsPage'

export default function App() {
  return (
    <ThemeProvider>
      <TrackerProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<OperationsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TrackerProvider>
    </ThemeProvider>
  )
}
