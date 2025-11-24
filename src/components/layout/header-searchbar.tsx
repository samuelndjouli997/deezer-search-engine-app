import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const HeaderSearchbar = () => {
  return (
    <div className="relative lg:min-w-86">
      <Input
        id="search"
        className="ps-9"
        placeholder="Search for songs..."
        type="search"
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center pl-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <Search size={16} strokeWidth={2} />
      </div>
    </div>
  )
}
