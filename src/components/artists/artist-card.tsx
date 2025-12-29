import { Artist } from "@/graphql/graphql"
import { Link } from "@tanstack/react-router"

type Props = { artist: Artist }

export const ArtistCard = ({ artist }: Props) => (
  <div className="flex flex-col space-y-2 justify-center items-center mb-4 lg:mb-0">
    <div className="w-40 h-40 lg:w-52 lg:h-52 object-cover">
      <img
        className="rounded-full"
        src={artist.picture_xl ?? "/user-placeholder.png"}
        alt={artist.name}
      />
    </div>
    <Link to={artist.link ?? "https://deezer.com"} target="_blank">
      <span className="text-base font-semibold hover:underline">
        {artist.name}
      </span>
    </Link>
  </div>
)
