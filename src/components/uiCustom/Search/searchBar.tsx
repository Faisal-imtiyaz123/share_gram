"use client";

import { Input } from "@/components/ui/input";
import { searchUsers } from "@/lib/actions/userActions/searchUsers";
import { DbUser } from "@/lib/types/userTypes";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchedUserList from "./SearchedUserList";
import { fetchUserDbId } from "@/lib/actions/userActions/fetchUserDbId";
import { useSearchStore } from "@/lib/Zustand-store/SearchStore";
import { useRefContext } from "@/lib/hooks/useContext";


export default function SearchBar() {
  const [matchingUsers, setMatchingUsers] = useState<DbUser[]>([]);
  const { toggle, isOpen,opened } = useSearchStore((s) => s);
  const sheetRef = useRef<HTMLDivElement>(null)
  const context = useRefContext()
 
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node) && isOpen) {
        console.log(e.target !== context?.searchNavLinkRef.current)
        if( e.target !== context?.searchNavLinkRef.current  && e.target !== context?.searchIconRef.current )
        toggle();
      }

     
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, toggle,context?.searchNavLinkRef,context?.searchIconRef]);

  return (
    <div
      ref={sheetRef}
      className={` ${isOpen?'fixed':''} left-[5rem] h-screen border-r z-10 shadow-lg bg-white flex flex-col
       ${ isOpen ? " w-[25rem] animate-slideOut" : opened?'animate-slideIn':''}`}
       >
      {isOpen && 
        <>
          <div className="flex basis-[20%] flex-col justify-between bg-re p-6 pt-6 border-b">
           <label className="text-2xl font-semibold">Search</label>
           <Input
             onChange={async (e) => {
               const currentUserId = await fetchUserDbId();
               const users = (await searchUsers(
                 e.target.value,
                 currentUserId.toString()
               )) as DbUser[];
               setMatchingUsers(() => (e.target.value ? users : []));
             }}
           />
          </div>
           <SearchedUserList matchingUsers={matchingUsers} />
           </>
    }
    </div>
  );
}
