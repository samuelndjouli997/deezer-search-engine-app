import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { SearchTrackQueryQuery } from "@/graphql/graphql"
import { truncateStr } from "@/utils/string"
import { formatSecondsToTime } from "@/utils/number"

export type TrackFromQuery = SearchTrackQueryQuery["searchTrack"][number]

export const columns: ColumnDef<TrackFromQuery>[] = [
  {
    id: "title",
    accessorKey: "title",
    header: ({ column }) => (
      <button
        className="flex gap-1 items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        {column.getIsSorted() === "asc" ? (
          <ArrowUp size={16} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown size={16} />
        ) : (
          <ArrowUpDown size={16} />
        )}
      </button>
    ),
    cell: ({ row }) => {
      const { title, album, artist } = row.original

      return (
        <div className="flex max-w-40 items-center space-x-2">
          <img
            src={album.cover ?? ""}
            className="w-10 h-10 rounded-md"
            alt={`${album.title} par ${artist.name}`}
          />
          <p className="font-semibold">{truncateStr(title, 40)}</p>
          {row.original.explicit_lyrics && (
            <span className="text-[10px] bg-gray-600 text-white/60 px-1 rounded">
              E
            </span>
          )}
        </div>
      )
    },
    enableSorting: true
  },
  {
    id: "artist",
    accessorKey: "artist",
    header: ({ column }) => (
      <button
        className="flex gap-1 items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Artist
        {column.getIsSorted() === "asc" ? (
          <ArrowUp size={16} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown size={16} />
        ) : (
          <ArrowUpDown size={16} />
        )}
      </button>
    ),
    cell: ({ row }) => <span>{truncateStr(row.original.artist.name, 35)}</span>,
    enableSorting: true
  },
  {
    id: "album",
    accessorKey: "album",
    header: ({ column }) => (
      <button
        className="flex gap-1 items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Album
        {column.getIsSorted() === "asc" ? (
          <ArrowUp size={16} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown size={16} />
        ) : (
          <ArrowUpDown size={16} />
        )}
      </button>
    ),
    cell: ({ row }) => (
      <span className="max-w-34 block">
        {truncateStr(row.original.album.title, 40)}
      </span>
    ),
    enableSorting: true
  },
  {
    id: "duration",
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <span>{formatSecondsToTime(row.original.duration)}</span>
    ),
    enableSorting: true
  },
  {
    id: "rank",
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => <span>{row.original.rank}</span>,
    enableSorting: true
  }
]
