import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetDemo({btnName}) {
  return (
    <Sheet>
      <SheetTrigger asChild >
        <Button>{btnName}</Button>
      </SheetTrigger>
      <SheetContent className="w-[900px] mx-w-[940px]">
        <SheetHeader>
          <SheetTitle>Claim Allowances</SheetTitle>
          <SheetDescription>
            Claim or check status of your allowances
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          
        </div>
        <SheetFooter>
          <SheetClose asChild>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
