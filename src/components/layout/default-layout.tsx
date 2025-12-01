import React from "react"
import { HeaderMain } from "@/components/layout/header-main"

type Props = { children: React.ReactNode }

export const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <HeaderMain />
      <main className="mx-auto max-w-screen-2xl px-5 lg:px-10 py-10">
        {children}
      </main>
    </div>
  )
}
