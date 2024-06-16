import MessagingSideBar from "@/components/uiCustom/Messaging/MessagingSideBar";
import { Outlet } from "react-router-dom";


export default function MessageRoute() {
  return (
    <>
    <div className="flex">
    <MessagingSideBar/>
    <Outlet/>
    </div>
    </>
  )
}
