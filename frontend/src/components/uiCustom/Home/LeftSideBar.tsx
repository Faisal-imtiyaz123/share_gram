import { useNotificationSliderStore } from "@/lib/Zustand-store/NotificationStore"
import { useSearchStore } from "@/lib/Zustand-store/SearchStore"
import { useCreateModal } from "@/lib/Zustand-store/createModalStore"
import useRefContext from "@/lib/hooks/useContext"
import { Heart, Home, MessageCircle, PlusCircle, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { MoreDropDown } from "../More/MoreDialog"






export default function LeftSideBar() {
  const {isOpen:isSearchSliderOpen} = useSearchStore()
  const {isOpen:isNotificationSliderOpen} = useNotificationSliderStore()
  const isAnySliderOpen = (isSearchSliderOpen|| isNotificationSliderOpen)
  const navLinkClassname = `text-[16px] text-center ${isAnySliderOpen? "hidden":''} `
  const context = useRefContext()
  const {toggle:notificationToggle} = useNotificationSliderStore()
  const {toggle:searchToggle} = useSearchStore(state=>state)
  const {toggleModal,isModalOpen} = useCreateModal()

  
  function handleSearchClick(){
  searchToggle() 
 }
 function handleNotificationClick(){
   notificationToggle()

 }
  return (
    <div className={`flex flex-col h-screen border border-r pl-2 p-4 gap-2 w-[15rem] ${isAnySliderOpen?'w-[5rem]':''}`}>
      <h1 className="text-[20px] pl-2 text-gray-600 mb-4">Threads</h1>
      <div className="flex flex-col gap-3 justify-center ">
      <> 
        <Link
          to="/home"
          className="flex gap-4 items-center p-3 hover:bg-gray-100 rounded-lg" >
           <Home/>
          <div className={navLinkClassname}>Home</div>
        </Link>
        </>
        <>
        <div  ref={context?.searchNavLinkRef} onClick={handleSearchClick}
          className={`flex gap-4 items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer ${isSearchSliderOpen?'pl-2':''}`} >
         
            <div className={`${isSearchSliderOpen?'border border-gray-700 rounded-lg py-1 px-1':''}`}>

           <Search ref={context?.searchIconRef}/>
            </div>

          <div className={navLinkClassname}>Search</div>
        </div>
        </>
        <> 
        <div onClick={toggleModal}
          className="flex gap-4 items-center p-3 hover:bg-gray-100 rounded-lg" >
           <PlusCircle/>
          <div className={navLinkClassname}>Create</div>
        </div>
        </>
        <> 
        <Link 
          to="/message"
          className="flex gap-4 items-center p-3 hover:bg-gray-100 rounded-lg" >
           <MessageCircle/>
          <div className={navLinkClassname}>Messaging</div>
        </Link>
        </>
       <>
        <div ref={context?.notificationNavLinkRef} onClick={handleNotificationClick}
         className={`flex gap-4 items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer ${isNotificationSliderOpen?'pl-2':''}`}>
          <div className={`${isNotificationSliderOpen&& 'border border-gray-700 rounded-lg py-1 px-1'}`}>

          <Heart ref={context?.notificationIconRef}/>
          </div>
          <div className={navLinkClassname}>Notifications</div>
        </div>
       </>
        <Link
          to="/home/profile"
          className="flex gap-4 items-center p-3 hover:bg-gray-100 rounded-lg" >
          <image  href={``} height={24} width={24}/>
          <div className={navLinkClassname}>Profile</div>
        </Link>
      </div>
      {/* <MoreDropDown/> */}
    </div>
  );
}
