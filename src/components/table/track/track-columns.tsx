import { ColumnDef } from "@tanstack/react-table"
import { Track } from "@/types/Track"

export const columns: ColumnDef<Track>[] = [
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span>{row.original.title}</span>
  },
  {
    id: "artist",
    accessorKey: "artist",
    header: "Artist",
    cell: ({ row }) => <span>{row.original.artist.name}</span>
  },
  {
    id: "album",
    accessorKey: "album",
    header: "Album",
    cell: ({ row }) => <span>{row.original.album.title}</span>
  },
  {
    id: "duration",
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <span>{row.original.duration}</span>
  },
  {
    id: "rank",
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => <span>{row.original.rank}</span>
  }
]
