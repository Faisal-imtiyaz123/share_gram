import { RenderedMessageObj} from "@/lib/types/messageTypes";


export default function Message({messageObj}:{messageObj:RenderedMessageObj}) {
  return (
   

    <div className={`${messageObj.sent?' justify-end  ':'justify-start '} flex `}>
      <div className="p-2 px-4 mt-1 rounded-lg bg-blue-200 ">
      
      {messageObj.message}

  
      </div>
    </div>

  )
}
