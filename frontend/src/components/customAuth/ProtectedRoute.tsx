import { trpc } from "@/lib/trpc"
import { useNavigate } from "react-router-dom"

export default function ProtectedRoute({children}:{children:React.ReactNode}) {
 const naviagate = useNavigate()
 const {isError} = trpc.auth.currentUser.useQuery()
 if(isError) naviagate('/login')
  
  return (
    <div>
        {children}
    </div>
  )
}
