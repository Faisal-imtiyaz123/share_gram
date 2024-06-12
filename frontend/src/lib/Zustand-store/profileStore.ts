import {create} from "zustand"
interface ProfileStoreState{
    isFollowersModalOpen:boolean,
    isFollowingModalOpen:boolean,
    isEditProfileModalOpen:boolean,
    toggleFollowersModal:()=>void,
    toggleFollowingModal:()=>void,
    toggleEditProfileModal:()=>void,
}
export const profileStore = create<ProfileStoreState>()((set)=>({
    isFollowersModalOpen:false,
    isFollowingModalOpen:false,
    isEditProfileModalOpen:false,
    toggleFollowersModal:()=> set((state)=>({isFollowersModalOpen:!state.isFollowersModalOpen})),
    toggleFollowingModal:()=> set((state)=>({isFollowingModalOpen:!state.isFollowingModalOpen})),
    toggleEditProfileModal:()=> set((state)=>({isEditProfileModalOpen:!state.isEditProfileModalOpen}))
}))