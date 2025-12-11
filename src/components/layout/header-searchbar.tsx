import { Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebouncedValue } from "@/hooks/use-debounced-value"

export const HeaderSearchbar = () => {
  const { inputValue, setInputValue, isDebouncing } = useDebouncedValue()

  return (
    <div data-state={isDebouncing} className="relative lg:min-w-86">
      <Input
        value={inputValue}
        id="search"
        className="ps-9"
        placeholder="Search for songs..."
        type="search"
        onChange={(e) => setInputValue(e.currentTarget.value)}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center pl-3 text-muted-foreground/80 peer-disabled:opacity-50">
        {isDebouncing ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Search size={16} strokeWidth={2} />
        )}
      </div>
    </div>
  )
}
