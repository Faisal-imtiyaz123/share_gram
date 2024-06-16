
import {
  DropdownMenu,
  DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
  DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"


export function MessageDrawer() {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger  asChild>
      <EllipsisVertical/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Delete</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
