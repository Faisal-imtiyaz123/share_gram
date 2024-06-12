"use client"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export default function Modal({children}:{children:React.ReactNode}) {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    function handleClickOutside(e:MouseEvent){
        if(modalRef.current && !modalRef.current.contains(e.target as Node))
        router.back()


    }
    document.addEventListener('mousedown',handleClickOutside)
    return ()=>{
        document.removeEventListener('mousedown',handleClickOutside)
    }

  },[router])
  return (
    <div  className="bg-black h-screen w-screen flex fixed z-50 items-center justify-center bg-opacity-50">
    <div ref={modalRef}>
     {children}
    </div>
    </div>
  )
}
