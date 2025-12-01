import { Track } from "@/types/Track"

export const tracks: Track[] = [
  {
    id: "track_1",
    title: "Midnight Echoes",
    artist: {
      id: "artist_1",
      picture: "https://picsum.photos/200?random=1",
      name: "Luna Rivers",
      biography: "Chanteuse alternative mêlant électro et pop atmosphérique."
    },
    album: {
      title: "Echoes of Dawn",
      cover: "https://picsum.photos/300?random=11"
    },
    duration: 214,
    rank: 1,
    explicit_lyrics: false,
    type: "track",
    preview: "https://www.example.com/audio/midnight-echoes.mp3"
  },
  {
    id: "track_2",
    title: "Neon Skyline",
    artist: {
      id: "artist_2",
      picture: "https://picsum.photos/200?random=2",
      name: "Skywave",
      biography: "Producteur électro inspiré par les années 80 et le synthwave."
    },
    album: {
      title: "City Lights",
      cover: "https://picsum.photos/300?random=12"
    },
    duration: 189,
    rank: 2,
    explicit_lyrics: false,
    type: "track",
    preview: "https://www.example.com/audio/neon-skyline.mp3"
  },
  {
    id: "track_3",
    title: "Burning Streets",
    artist: {
      id: "artist_3",
      picture: "https://picsum.photos/200?random=3",
      name: "Rogue Flame",
      biography: "Rappeur indépendant à l'univers sombre et cinématographique."
    },
    album: {
      title: "Flare Season",
      cover: "https://picsum.photos/300?random=13"
    },
    duration: 201,
    rank: 3,
    explicit_lyrics: true,
    type: "track",
    preview: "https://www.example.com/audio/burning-streets.mp3"
  },
  {
    id: "track_4",
    title: "Crystal Valley",
    artist: {
      id: "artist_4",
      picture: "https://picsum.photos/200?random=4",
      name: "Eden Nova",
      biography: "Artiste ambient connue pour ses paysages sonores immersifs."
    },
    album: {
      title: "Beyond the Horizon",
      cover: "https://picsum.photos/300?random=14"
    },
    duration: 256,
    rank: 4,
    explicit_lyrics: false,
    type: "track"
  },
  {
    id: "track_5",
    title: "Velvet Nights",
    artist: {
      id: "artist_5",
      picture: "https://picsum.photos/200?random=5",
      name: "Mira Soleil",
      biography: "Chanteuse R&B mêlant soul moderne et influences jazz."
    },
    album: {
      title: "Velvet Soul",
      cover: "https://picsum.photos/300?random=15"
    },
    duration: 233,
    rank: 5,
    explicit_lyrics: false,
    type: "track",
    preview: "https://www.example.com/audio/velvet-nights.mp3"
  }
]
