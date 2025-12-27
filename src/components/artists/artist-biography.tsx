import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"

type Props = {
  name: string
  biography: string
  picture: string
}

export const ArtistBiography = ({ name, biography, picture }: Props) => (
  <Sheet>
    <SheetTrigger asChild>
      <span className="underline cursor-pointer">{name}</span>
    </SheetTrigger>
    <SheetContent className="px-6">
      <SheetHeader className="px-0 pb-0">
        <SheetTitle className="text-lg">{name} biography</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-4">
        <img src={picture} alt={name} className="size-24 rounded-full" />
        <p>{biography}</p>
      </div>
    </SheetContent>
  </Sheet>
)
