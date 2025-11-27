import { HeaderSearchbar } from "@/components/layout/header-searchbar"
import { ModeToggle } from "@/components/mode-toggle"

export const HeaderMain = () => {
  return (
    <div className="min-h-16 px-6 gap-x-4 flex justify-between items-center shadow-xs dark:shadow-zinc-800">
      <img
        src="/deezer-logo.svg"
        className="content-[url(/deezer-mobile-logo.svg)] md:content-[url(/deezer-logo.svg)] md:dark:content-[url(/deezer-white-logo.svg)] size-full h-auto w-8 md:w-32"
        alt="Deezer Logo"
      />
      <HeaderSearchbar />
      <ModeToggle />
    </div>
  )
}
