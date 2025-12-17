import { FilterFn } from "@tanstack/react-table"

export const fuzzyFilter: FilterFn<string> = (row, columnId, value) => {
  const itemValue = row.getValue(columnId)

  if (itemValue == null) return false

  const itemStr = String(itemValue).toLowerCase()
  const searchStr = String(value).toLowerCase()

  return itemStr.includes(searchStr)
}
