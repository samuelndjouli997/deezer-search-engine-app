# Deezer Music Search Engine

A modern music search application that combines Deezer’s music catalog with enriched artist biographies from Discogs.

[![TanStack Start](https://img.shields.io/badge/TanStack%20Start-ff7f00?logo=tanstack&style=flat)](#) [![ReactJS](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=flat)](#) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)](#) [![GraphQL](https://img.shields.io/badge/GraphQl-E10098?logo=graphql&logoColor=white&style=flat)](#) [![Shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=flat)](#)

![Project Overview](/public/screenshots/project-overview.png)

## Table of contents

- [Overview](#overview)
- [What problem it solves](#what-problem-it-solves)
- [How it works](#how-it-works)
- [Key features](#key-features)
  - [Music search & Data display](#music-search-and-data-display)
  - [Artist discovery](#artist-biography-discovery)
  - [Performance optimizations](#performance-optimizations)
  - [Rate limiting and resiliency](#rate-limiting-and-resiliency)
  - [UI/UX](#uiux)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Important notes and attention points](#important-notes-and-attention-points)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [API keys](#api-keys)
  - [Environment variables](#environment-variables)
  - [Install](#install)
  - [Run](#run)
- [Scripts](#scripts)
- [Testing the API](#testing-the-api)

---

## Overview

This application provides a smooth music discovery experience by searching Deezer API's tracks, albums, or artists and enriching artist data with biographies from Discogs API.
Results are displayed in an interactive, sortable table with infinite scroll, and artist biographies are shown in a dedicated side panel.

## What problem it solves

Deezer is excellent for catalog search but does not always provide rich editorial content for artists. Discogs often includes detailed artist biographies and metadata.
This project merges both sources into one UI: fast search on Deezer, richer context from Discogs.

## How it works

1. The client queries a GraphQL endpoint.
2. GraphQL resolvers fetch data from Deezer (tracks, artists, albums).
3. For biography enrichment:
   - The server checks an in-memory cache (Map) keyed by normalized artist name.
   - On cache miss, the server calls the Discogs API, converts BBCode to HTML, sanitizes output, then caches the result.
4. The UI renders:
   - A sortable table for tracks (with infinite scroll).
   - A side panel for biography previews.

---

## Key features

### Music search and data display

![Search results table](/public/screenshots/search-table.png)

- Real-time search across Deezer’s catalog
- Infinite scroll for continuous browsing
- Track details: title, artist, album, duration, rank, explicit flag
- Sortable table with multiple columns (title, artist, album, duration, rank)
- Album cover previews inside table rows
- Skeleton loaders for improved perceived performance
- Responsive behavior for mobile and desktop

### Artist biography discovery

![Search results table](/public/screenshots/artist-biography.png)

- Random artist shuffle on the homepage
- Artist cards with images
- Biography preview in a side panel
- Discogs biographies are converted from BBCode to HTML
- Clickable links to Discogs profiles (when applicable)
- Sanitized HTML rendering to prevent XSS (DOMPurify)

### Performance optimizations

![Search results loader](/public/screenshots/search-table-loader.png)

- In-memory biography cache (Map-based)
  - Strongly reduces Discogs calls for repeated artists
  - Instant retrieval for cache hits
- Query caching via TanStack Query

### Rate limiting

![Rate limit error](/public/screenshots/rate-limit-error.png)

- Server-side rate limiting (sliding window)
- Visual countdown when the limit is reached
- Typed, source-specific error handling (Deezer, Discogs, GraphQL, Zod)

### UI/UX

- Dark mode support
- Smooth transitions and modern UI components (Radix + shadcn/ui)

---

## Tech stack

| Category      | Technology             | Usage                                       |
| ------------- | ---------------------- | ------------------------------------------- |
| Framework     | TanStack Start         | Full-stack React framework with SSR support |
| UI            | React 19               | UI rendering                                |
| Language      | TypeScript             | Type safety across client/server            |
| API Layer     | GraphQL                | Custom schema + resolvers                   |
| Data Fetching | TanStack Query         | Server-state caching, infinite queries      |
| Routing       | TanStack Router        | Type-safe routing with search params        |
| Deboucing     | TanStack Pacer         | Deboucing on search input                   |
| Styling       | Tailwind CSS           | Utility-first styling                       |
| UI Components | shadcn/ui + Radix UI   | Accessible component building blocks        |
| Icons         | lucide-react           | Icon set                                    |
| Validation    | Zod                    | Runtime schema validation for API responses |
| Security      | DOMPurify              | Sanitizing HTML from Discogs content        |
| Rate limiting | Sliding window limiter | Per-IP throttling on server                 |
| Cache         | In-memory Map          | Biography cache to reduce Discogs requests  |
| External APIs | Deezer API             | Tracks, albums, artists data                |
| External APIs | Discogs API            | Artist biographies and metadata             |

---

## Project structure

```txt
src/
├── components/
│   ├── artists/
│   ├── layout/
│   ├── table/
│   ├── ui/
│   └── error-component.tsx
├── hooks/
├── server/
│   ├── graphql/
│   ├── parsers/
│   └── services/
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   └── api/graphql.ts
├── utils/
│   ├── error/
│   ├── graphql.ts
│   ├── number.ts
│   ├── string.ts
│   └── rate-limit.ts
├── middlewares/
├── constants/
└── types/
```

## Important notes and attention points

### API rate limits

The app currently enforces a server-side rate limit of 50 requests per hour per IP.

Discogs has its own constraints and may be more restrictive than your server limit.

This matters because biography enrichment can generate additional calls compared to Deezer-only search.

## Getting started

### Prerequisites

- Node.js >= 18
- pnpm >= 8 (recommended)

### API keys

You need Discogs credentials:

1. Create an application in your Discogs developer settings
2. Retrieve your Consumer Key and Consumer Secret

### Environment variables

Create a `.env` file at the project root:

```env
VITE_DEEZER_API="deezer_api_here"
VITE_DISCOGS_API="discogs_api_here"
VITE_DISCOGS_API_KEY="your_consumer_key_here"
VITE_DISCOGS_API_SECRET="your_consumer_secret_here"
```

### Install

```bash
pnpm install
```

### Run

```bash
pnpm run dev
```

The app runs at:

```txt
http://localhost:3000
```

### Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Lint codebase

npx graphql-codegen --config codegen.ts  # Generate GraphQL types
```

## Testing the API

Use any GraphQL client (Postman, Insomnia, etc.):

- URL: `http://localhost:3000/api/graphql`
- Method: POST

Example of a query to add to the request:

```graphql
query {
  searchTrackWithBiography(query: "daft punk", limit: 5, index: 0) {
    title
    artist {
      name
      biography
    }
  }
}
```

**Enjoy!**
