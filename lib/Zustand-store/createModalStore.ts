import {create } from "zustand"

interface CreateModalState{
    isModalOpen:boolean,
    toggleModal:()=>void
}

export const useCreateModal= create<CreateModalState>()((set)=>({
    isModalOpen : false ,
    toggleModal:()=>set((state)=>({isModalOpen:!state.isModalOpen}))
}))