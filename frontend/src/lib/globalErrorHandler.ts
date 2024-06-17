import toast from "react-hot-toast"

const handleClientErros =(err:Error)=>{

    if(err.message === "jwt malformed"){
       toast.error("No token found, redirecting to login")
       setTimeout(()=>{
           window.location.href="/login"
       },1000)
   }
   if(err.message === "Failed to fetch"){
     toast.error("Error occured, please try again later")
   }
}

export const globalErrorHandler = (err:Error)=>{
    if(err.name === "TRPCClientError"){
        handleClientErros(err)
    }
   
}
