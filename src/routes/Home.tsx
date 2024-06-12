import { CreateModal } from "@/components/uiCustom/Modals/CreateModal";
import LeftSideBar from "@/components/uiCustom/Navigation/LeftSideBar";
import NotificationSlider from "@/components/uiCustom/Notifications/NotificationSlider";
import SearchBar from "@/components/uiCustom/Search/searchBar";
import { RefProvider } from "@/lib/hooks/useContext";


export default function Home() {
  return (
    <>
        <RefProvider>
        <LeftSideBar  />
        {/* <SearchBar/> */}
        <NotificationSlider/>
        <CreateModal/>
      </RefProvider>
    </>
  )
}
