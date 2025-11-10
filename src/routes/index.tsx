import { HeaderMain } from "@/components/layout/header-main"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="min-h-screen">
      <HeaderMain />
    </div>
  )
}
