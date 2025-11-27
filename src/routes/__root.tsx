import {
  HeadContent,
  Scripts,
  createRootRouteWithContext
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools"

import appCss from "../styles.css?url"

import type { QueryClient } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { themeScript } from "@/constants/scripts"

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start Starter" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootDocument
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          {children}
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right"
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />
            },
            TanStackQueryDevtools
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
