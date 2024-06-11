"use client"
import { createContext, useContext, useRef } from "react"

interface ContextType{
    searchNavLinkRef : React.RefObject<HTMLDivElement>,
    notificationNavLinkRef : React.RefObject<HTMLDivElement>,
    searchIconRef:React.RefObject<any>,
    notificationIconRef:React.RefObject<any>,

}
const Context = createContext<ContextType| undefined>(undefined)

export function RefProvider({children}:{children:React.ReactNode}){
    const searchNavLinkRef = useRef<HTMLDivElement>(null)
    const notificationNavLinkRef = useRef<HTMLDivElement>(null)
    const searchIconRef = useRef<any>(null)
    const notificationIconRef = useRef<any>(null)

  

    return(
        <Context.Provider value={{searchNavLinkRef,notificationNavLinkRef,searchIconRef,notificationIconRef}}>
            {children}
        </Context.Provider>

    )

}

export function useRefContext(){
    const context =  useContext(Context)
    return(
        context
    )
}