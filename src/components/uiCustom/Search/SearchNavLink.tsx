"use client"

import { useSearchStore } from "@/lib/Zustand-store/SearchStore"
import { useRefContext } from "@/lib/hooks/useContext"
import { useSearchNavLinkRef } from "@/lib/hooks/useSearchNavLinkRef"
import { Search } from "lucide-react"
import { useEffect } from "react"



export default function SearchNavLink() {
const context = useRefContext()

const {toggle} = useSearchStore(state=>state)
function handleClick(){
  toggle()
}
if(!context) return null

  return (
  
        <div  ref={context.searchNavLinkRef} onClick={handleClick}
          className="flex gap-4 items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer" >
           <Search/>
          <div className="text-[16px] text-center hidden md:block">Search</div>
        </div>
        
  )
}

