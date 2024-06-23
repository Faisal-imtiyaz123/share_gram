import { useNavigate } from "react-router-dom"
import { trpc } from "../trpc"
import {toast} from "react-hot-toast"

export default function useCurrentUser(){
    const navigate = useNavigate()
    const currentUserQuery = trpc.auth.currentUser.useQuery()
    if(currentUserQuery.isError){
        toast.error('user not found, redirecting to login')
        navigate('/login')
    }
    return currentUserQuery
}