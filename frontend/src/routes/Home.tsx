
import LeftSideBar from "@/components/uiCustom/Home/LeftSideBar";
import NotificationSlider from "@/components/uiCustom/Notifications/NotificationSlider";
import SearchBar from "@/components/uiCustom/Search/searchBar";
import { RefProvider } from "@/lib/hooks/useContext";
import SignOutButton from "@/components/uiCustom/Home/SigOutButton";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('auth')) return navigate('/login')
  },[navigate])

  return (
    <>
       <RefProvider>
        <div className="flex">
         <div className="flex flex-col h-[100vh]">
        <LeftSideBar /> 
        <SignOutButton/>
         </div>
        <SearchBar/>
        <NotificationSlider/>
        <Outlet/>
        </div>
        {/* <CreateModal/> */}
      </RefProvider> 
    </>
  )
}
