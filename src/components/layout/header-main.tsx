import { HeaderSearchbar } from "@/components/layout/header-searchbar"
import { HeaderLogo } from "@/components/layout/header-logo"
import { ThemeToggle } from "@/components/theme-toggle"

export const HeaderMain = () => {
  return (
    <div className="min-h-16 px-6 flex justify-between items-center shadow-xs">
      <HeaderLogo />
      <HeaderSearchbar />
      <ThemeToggle />
    </div>
  )
}
