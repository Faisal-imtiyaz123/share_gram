import { Message } from "@/lib/types/messageTypes";
import { useEffect, useRef, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function MessageItem({messageObj}:{messageObj:Message}) {
  const [showOptions,setShowOptions] = useState<boolean>(false)
  const [ellipsisClicked,setEllipsisClicked] = useState<boolean>(false)
  const [clicked, setClicked] = useState<boolean>(false)
  const elementRef = useRef(null);
  const clickRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mutation = trpc.message.deleteMessage.useMutation()

  useEffect(() => {
    if (elementRef.current) {
      const { clientWidth, clientHeight } = elementRef.current;
      setDimensions({ width: clientWidth, height: clientHeight });
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event:any) => {
      if (clickRef.current && !clickRef.current.contains(event.target)) {
        setClicked(false);
      }
  };
  const handleDeleteMessage = ()=>{
    mutation.mutate({messageId:messageObj._id.toString()})
    setEllipsisClicked(false);
   
  }
  return (
      <div onClick={()=>setClicked(true)} ref={clickRef} onMouseEnter={()=>{
        setShowOptions(true)
      }}  onMouseLeave={()=>setShowOptions(false)} className={`flex `}>
      <div  onMouseLeave={()=>{
        setShowOptions(false)
      }} onMouseEnter={()=>{
        setShowOptions(true)
      }} className={`${messageObj.sent?"ml-auto":""}  `} >
      <div className="flex relative items-center ">
      { (showOptions  || ellipsisClicked && clicked) && <EllipsisVertical size={16}  onClick={()=>setEllipsisClicked(!ellipsisClicked)}/> }
       <div>
       {(ellipsisClicked && clicked) && <div style={{right:`${dimensions.width+16}px`,top:`-${dimensions.height+4}px`}} onClick={handleDeleteMessage} className="absolute cursor-pointer hover:bg-gray-50 z-10 bg-white p-4 text-red-600  rounded-lg shadow-lg">Delete</div>}
       </div>
       <span ref={elementRef}  className={` p-2 px-4 rounded-2xl bg-blue-400 text-white `}>
      {messageObj.message}
        </span>
      </div>
      </div>
      </div>
  )
}
