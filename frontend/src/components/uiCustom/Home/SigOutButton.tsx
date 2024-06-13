import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SignOutButton() {
  const navigate = useNavigate()
  const handleSignOut = ()=>{
  localStorage.removeItem('auth')
  navigate("/login")
  }

  return (
    <Button className="mb-2" onClick={handleSignOut}>
        SignOut
    </Button>
  )
}
