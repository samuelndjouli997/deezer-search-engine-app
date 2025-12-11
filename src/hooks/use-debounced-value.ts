import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

export const useDebouncedValue = () => {
  const navigate = useNavigate()
  const search = useSearch({ from: "/" })

  const [inputValue, setInputValue] = useState(search.query ?? "")

  const [debouncedValue] = useDebounce(inputValue, 600)

  useEffect(() => {
    navigate({
      to: "/",
      search: {
        query: debouncedValue,
        index: 0,
        limit: 10
      },
      replace: true
    })
  }, [debouncedValue, navigate])

  useEffect(() => {
    if (search.query !== inputValue) {
      setInputValue(search.query ?? "")
    }
  }, [search.query])

  return {
    inputValue,
    setInputValue,
    isDebouncing: inputValue !== debouncedValue
  }
}
