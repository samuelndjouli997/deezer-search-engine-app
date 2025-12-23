import { ChevronDown } from "lucide-react"
import { useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { TrackTableSkeleton } from "@/components/table/track/track-table.skeleton"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { fuzzyFilter } from "@/utils/filter"

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export const TrackTable = <TData, TValue>({
  columns,
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}: Props<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const { scrollRef, sentinelRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    filterFns: { fuzzy: fuzzyFilter },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <>
      <div className="mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-md border ml-auto">
              Filters <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        ref={scrollRef}
        className="rounded-md border overflow-auto max-h-[70vh]"
      >
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 z-10 bg-background border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {isFetchingNextPage && (
                  <TrackTableSkeleton
                    columnCount={columns.length}
                    rowCount={6}
                  />
                )}
                <TableRow ref={sentinelRef}>
                  <TableCell
                    colSpan={columns.length}
                    className="h-20 text-center"
                  >
                    {!hasNextPage && (
                      <span className="text-sm text-muted-foreground">
                        No more results!
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex items-center justify-center py-4 text-sm text-muted-foreground">
                    No results 💜
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
