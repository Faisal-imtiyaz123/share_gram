import {create } from "zustand"

interface PostStoreState{
    isOpen:boolean,
    toggle:()=>void
}

export const postStore = create<PostStoreState>()((set)=>({
    isOpen:false,
    toggle:()=> set((state)=>({isOpen:!state.isOpen}))
}))