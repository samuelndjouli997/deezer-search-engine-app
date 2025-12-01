import { DefaultLayout } from "@/components/layout/default-layout"
import { TrackTable } from "@/components/table/track/track-table"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <DefaultLayout>
      <TrackTable />
    </DefaultLayout>
  )
}
