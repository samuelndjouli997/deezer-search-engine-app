import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { columns } from "@/components/table/track/track-columns"
import { useSearchTrack } from "@/hooks/use-search-tracks"

export const TrackTable = () => {
  const { data: tracks, isLoading, error } = useSearchTrack()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!tracks) return <div>Search for tracks...</div>

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id} className="w-[100px]">
                {column.id}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((track) => (
            <TableRow key={track.title}>
              <TableCell className="font-medium">{track.title}</TableCell>
              <TableCell className="font-medium">{track.artist.name}</TableCell>
              <TableCell>{track.album.title}</TableCell>
              <TableCell>{track.duration}</TableCell>
              <TableCell>{track.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
