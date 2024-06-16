import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import SignOutButton from "../Home/SigOutButton"
import { Menu } from "lucide-react"


export function MoreDropDown() {
  const navigate = useNavigate()
  return (
<DropdownMenu>
  <DropdownMenuTrigger>
    <Menu/>
    </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=>navigate('/login')}>
      <SignOutButton/>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  )
}
