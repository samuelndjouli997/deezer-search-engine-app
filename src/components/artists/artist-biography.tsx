import DOMPurify from "dompurify"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { discogsBiographyCodeToHTML } from "@/utils/string"

type Props = {
  name: string
  biography: string
  picture: string
}

export const ArtistBiography = ({ name, biography, picture }: Props) => {
  const htmlBiography = DOMPurify.sanitize(
    discogsBiographyCodeToHTML(biography),
    { ADD_ATTR: ["target", "rel"] }
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="underline cursor-pointer">{name}</span>
      </SheetTrigger>
      <SheetContent className="px-6 overflow-y-scroll pb-6">
        <SheetHeader className="px-0 pb-0">
          <SheetTitle className="text-lg">{name} biography</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <img src={picture} alt={name} className="size-24 rounded-full" />
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlBiography }}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
