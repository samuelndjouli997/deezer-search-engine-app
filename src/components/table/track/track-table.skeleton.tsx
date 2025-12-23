import { Skeleton } from "@/components/ui/skeleton"
import { TableRow, TableCell } from "@/components/ui/table"

type Props = {
  columnCount: number
  rowCount?: number
}

export const TrackTableSkeleton = ({ columnCount, rowCount = 6 }: Props) => (
  <>
    {Array.from({ length: rowCount }).map((_, i) => (
      <TableRow key={i}>
        <TableCell colSpan={columnCount}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      </TableRow>
    ))}
  </>
)
