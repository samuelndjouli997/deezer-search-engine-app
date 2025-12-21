import { FilterFn } from "@tanstack/react-table"

export const fuzzyFilter: FilterFn<string> = (row, columnId, value) => {
  const itemValue = row.getValue(columnId)

  if (itemValue == null) return false

  const itemStr = String(itemValue).toLowerCase()
  const searchStr = String(value).toLowerCase()

  return itemStr.includes(searchStr)
}

export const randomizeItems = <T>(arr: T[]) => {
  const result = [...arr]

  for (let i = result.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))

    ;[result[i], result[randomIndex]] = [result[randomIndex], result[i]]
  }

  return result
}
