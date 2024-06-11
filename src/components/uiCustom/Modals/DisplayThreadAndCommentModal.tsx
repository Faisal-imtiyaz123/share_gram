"use client"

import { X } from "lucide-react"
import { useEffect, useRef} from "react"
import { usePathname, useRouter } from "next/navigation"


type setIsModalOpen=(isModalOpen:boolean)=>void

export default function DisplayPostAndCommentModal({children}:{children:React.ReactNode}) {
    const router = useRouter()

   
   

    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
     const handleClickOutside =(e:MouseEvent)=>{
         if(modalRef.current && !modalRef.current.contains(e.target as Node)) {
            router.push('/home')
        }
    }
      
        document.addEventListener('mousedown',handleClickOutside)
    
        return ()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }
     
    },[router])
  

//   if(!isMounted) return null
  return (
    <div >
    <div>
     
      <div 
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 custom-modal`}
      >
        <div ref={modalRef} className="bg-white p-6 h-[40rem] w-[60rem]">
          <span onClick={()=>router.push('/home')} className="absolute top-2 right-3 text-xl cursor-pointer">
           

           <X/>

          </span>
          <div className="flex">
           {children}
          </div> 
        </div>
      </div>

    </div>
    </div>
  )
}
