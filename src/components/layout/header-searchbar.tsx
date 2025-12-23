import { useState } from "react"
import { useDebouncer } from "@tanstack/react-pacer"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export const HeaderSearchbar = () => {
  const navigate = useNavigate()
  const search = useSearch({ from: "/" })

  const [inputValue, setInputValue] = useState<string>(search.query ?? "")

  const searchDebouncer = useDebouncer(
    (query: string) => {
      navigate({
        to: "/",
        search: { query: query || undefined },
        replace: true
      })
    },
    { wait: 800 },
    (state) => ({ isPending: state.isPending })
  )

  const handleChange = (value: string) => {
    setInputValue(value)
    searchDebouncer.maybeExecute(value)
  }

  const { isPending } = searchDebouncer.state

  return (
    <div className="relative lg:min-w-86">
      <Input
        value={inputValue}
        id="search"
        className="ps-9"
        placeholder="Search for songs..."
        type="search"
        onChange={(e) => handleChange(e.currentTarget.value)}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center pl-3 text-muted-foreground/80 peer-disabled:opacity-50">
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Search size={16} strokeWidth={2} />
        )}
      </div>
    </div>
  )
}
