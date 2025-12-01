import { HeaderMain } from "@/components/layout/header-main"
import { TrackTable } from "@/components/table/track/track-table"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="min-h-screen">
      <HeaderMain />
      <main className="mx-auto max-w-screen-2xl px-5 lg:px-10 py-10">
        <TrackTable />
      </main>
    </div>
  )
}
