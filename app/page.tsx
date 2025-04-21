import { Suspense } from "react"
import Dashboard from "@/components/dashboard"
import LoadingDashboard from "@/components/loading-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Suspense fallback={<LoadingDashboard />}>
        <Dashboard />
      </Suspense>
    </main>
  )
}
