export const truncateStr = (
  text: string | null | undefined,
  maxLength: number = 30
) => {
  if (!text) return "-"
  if (text.length <= maxLength) return text

  return text.slice(0, maxLength) + "..."
}
