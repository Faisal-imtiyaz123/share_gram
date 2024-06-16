
import LeftSideBar from "@/components/uiCustom/Home/LeftSideBar";
import NotificationSlider from "@/components/uiCustom/Notifications/NotificationSlider";
import SearchBar from "@/components/uiCustom/Search/searchBar";
import { RefProvider } from "@/lib/hooks/useContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CreateModal } from "@/components/uiCustom/Modals/CreateModal";

export default function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('auth')) return navigate('/login')
  },[navigate])

  return (
    <>
       <RefProvider>
         <div className="flex  h-[100vh] ">
        <div className="flex flex-col ">
        <LeftSideBar /> 
        <SearchBar/>
        <NotificationSlider/>
        <CreateModal/>
         </div>
        <div className="flex-1">
        <Outlet/>
        </div>
          </div>
      </RefProvider> 
    </>
  )
}
