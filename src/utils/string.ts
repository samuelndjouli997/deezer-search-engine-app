export const truncateStr = (text: string, maxLength: number = 30) => {
  if (!text) return "-"
  if (text.length <= maxLength) return text

  return text.slice(0, maxLength) + "..."
}

export const discogsBiographyCodeToHTML = (biography: string) => {
  return biography
    .replace(/\[a=([^\]]+)\]/g, "<strong>$1</strong>")
    .replace(
      /\[a(\d+)\]/g,
      '<a href="https://www.discogs.com/artist/$1" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline font-semibold">view artist</a>'
    )
    .replace(/\[b=([^\]]+)\]/g, "<strong>$1</strong>")
    .replace(/\[l=([^\]]+)\]/g, "<em>$1</em>")
    .replace(
      /\[url=([^\]]+)\]([^\[]+)\[\/url\]/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-purple-600 underline font-semibold">$2</a>'
    )
    .replace(/\r\n\r\n/g, '</p><p class="mt-2">')
    .replace(/\r\n/g, " ")
}
