import {create} from "zustand"

interface ImageSliderState{
    activeImage:number,
    moveForward:()=>void,
    moveBackwards:()=>void
}
export const useImageSliderStore = create<ImageSliderState>()((set)=>({
    activeImage : 0,
    moveForward:()=>set((state)=>({activeImage:state.activeImage+1})),
    moveBackwards:()=>set(state=>({activeImage:state.activeImage-1})),
}))