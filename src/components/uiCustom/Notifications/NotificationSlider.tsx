import { useNotificationSliderStore } from "@/lib/Zustand-store/NotificationStore";
import useRefContext from "@/lib/hooks/useContext";
import { useEffect, useRef } from "react";



export default function NotificationSlider() {
  const { toggle, isOpen,opened } = useNotificationSliderStore((s) => s);
  const sheetRef = useRef<HTMLDivElement>(null)
  const context = useRefContext()
 
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node) && isOpen) {
        if(e.target !== context?.notificationNavLinkRef.current && e.target!== context?.notificationIconRef.current)
        toggle();
      }

     
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, toggle,context?.notificationNavLinkRef,context?.notificationIconRef]);

  return (
    <div
      ref={sheetRef}
      className={` ${isOpen?"fixed":''} left-[5rem] h-screen bg-gray-100 
       ${ isOpen ? " w-[25rem] animate-slideOut" : opened?'animate-slideIn':''} shadow-lg border-r z-10 bg-white`}
    >
      {isOpen && 
    

         <div className="flex p-4 relative left-0">
           <label>Notifications</label>
        
         </div>
       
    }

    </div>
  );
}
