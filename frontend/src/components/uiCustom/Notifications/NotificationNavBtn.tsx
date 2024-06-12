"use client"
import { useNotificationSliderStore } from "@/lib/Zustand-store/NotificationStore";
import { useRefContext } from "@/lib/hooks/useContext";
import { Heart } from "lucide-react";
import { useContext } from "react";

export default function NotificationNavBtn() {
  const context = useRefContext()
  const {toggle} = useNotificationSliderStore()
  function handleClick(){
    toggle()

  }
  return (
 
        <div ref={context?.notificationNavLinkRef} onClick={handleClick}
          className="flex gap-4 items-center p-3 hover:bg-gray-100 rounded-lg" >
          <Heart/>
          <div className="text-[16px] text-center hidden md:block">Notifications</div>
        </div>
      
  )
}
