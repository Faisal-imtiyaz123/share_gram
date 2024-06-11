import {create} from "zustand"

interface SearchSliderState{
    isOpen:boolean,
    opened:number,
    toggle:()=>void,
   

}

export const useSearchStore = create<SearchSliderState>()((set)=>({
    isOpen:false,
    opened:0,
    toggle: ()=> set((state)=>({isOpen : !state.isOpen,opened:state.opened+1})),
    
}))