import { ArtistGrid } from "@/components/artists/artist-grid"

export const Welcome = () => (
  <div className="size-full flex flex-col space-y-10 justify-center">
    <h1 className="hero-title">
      Deezer search engine <span className="text-purple-600">💜</span>
    </h1>
    <p className="hero-subtitle">
      Search tracks, albums, artists and much more
    </p>
    <section className="flex flex-col space-y-10">
      <ArtistGrid />
    </section>
  </div>
)
