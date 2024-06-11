import {create} from "zustand"

interface NotificationSliderState{
    isOpen:boolean,
    opened:number,
    toggle:()=>void,
   

}

export const useNotificationSliderStore = create<NotificationSliderState>()((set)=>({
    isOpen:false,
    opened:0,
    toggle: ()=> set((state)=>({isOpen : !state.isOpen,opened:state.opened+1})),
    
}))