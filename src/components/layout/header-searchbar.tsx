import { Search } from "lucide-react"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { Input } from "@/components/ui/input"

export const HeaderSearchbar = () => {
  const navigate = useNavigate()

  const search = useSearch({ from: "/" })

  const handleSearch = (value: string) => {
    navigate({
      to: "/",
      search: {
        query: value,
        index: 0,
        limit: 10
      }
    })
  }

  return (
    <div className="relative lg:min-w-86">
      <Input
        defaultValue={search.query ?? ""}
        id="search"
        className="ps-9"
        placeholder="Search for songs..."
        type="search"
        onChange={(e) => handleSearch(e.currentTarget.value)}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center pl-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <Search size={16} strokeWidth={2} />
      </div>
    </div>
  )
}
