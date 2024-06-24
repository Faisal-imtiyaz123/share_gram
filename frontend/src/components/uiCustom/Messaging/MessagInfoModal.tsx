import useHandleClickOutside, { ClickOutsideRef } from "@/lib/hooks/useHanldeClickOutside"
import { trpc } from "@/lib/trpc"
import { Dispatch, SetStateAction } from "react"

interface Props{
    setShowModal:Dispatch<SetStateAction<boolean>>,
    showModal:boolean,
    userId:string,
}

export default function MessageInfoModal(props:Props) {
 const {setShowModal,showModal,userId} = props
 const utils = trpc.useUtils()
 const mutation = trpc.message.deleteChat.useMutation({
        onSuccess:()=>{
            utils.message.fetchMessageUsers.invalidate()     
        }
 })
 const modalRef:ClickOutsideRef<HTMLDivElement> = useHandleClickOutside({showModal,setShowModal})
  const handleDeleteChat =()=>{
    mutation.mutate({userId:userId})

  }
  return (
    <div className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-black z-[1000] bg-opacity-50 flex justify-center items-center ">
        <div ref={modalRef} className="bg-white mt-[-10rem] flex flex-col  p-1 rounded-lg ">
           <button onClick={handleDeleteChat}  className=" px-[6rem]  rounded-lg p-4  hover:bg-red-400 hover:text-white">
            Delete Chat
           </button>
        </div>

    </div>
  )
}
