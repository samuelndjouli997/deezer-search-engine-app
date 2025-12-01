import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { tracks } from "@/constants/data"
import { columns } from "@/components/table/track/track-columns"

export const TrackTable = () => {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead className="w-[100px]">{column.id}</TableHead>
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
