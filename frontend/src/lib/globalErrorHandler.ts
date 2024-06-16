import toast from "react-hot-toast"

export const globalErrorHandler = (err:Error)=>{
    if(err.message === "jwt malformed"){
        toast.error("No token found, redirecting to login")
        setTimeout(()=>{
            window.location.href="/login"
        },2000)
    }

}