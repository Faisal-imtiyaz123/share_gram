
import { useSearchStore } from "@/lib/Zustand-store/SearchStore";
import useRefContext from "@/lib/hooks/useContext";
import { useEffect, useRef, useState} from "react";
import SearchedUserList from "./SearchedUserList";
import { trpc } from "@/lib/trpc";
import { DbUser } from "@/lib/types/userTypes";

const getMatchScore = (text: string, user: DbUser): number => {
  const lowerText = text.toLowerCase();
  const lowerUsername = user.username.toLowerCase();
  const lowerName = user.name.toLowerCase();

  if (lowerUsername === lowerText || lowerName === lowerText) return 0;

  const usernameIndex = lowerUsername.indexOf(lowerText);
  const nameIndex = lowerName.indexOf(lowerText);

  if (usernameIndex !== -1 && nameIndex !== -1) {
    return Math.min(usernameIndex, nameIndex);
  } else if (usernameIndex !== -1) {
    return usernameIndex;
  } else if (nameIndex !== -1) {
    return nameIndex;
  }

  return Infinity;
};
export default function SearchBar() {
  const {data:currentUser} = trpc.auth.currentUser.useQuery()
  const [searchText] = useState<string>("")
  const {data:users} = trpc.user.fetchUsers.useQuery()
  const matchingUsers = users
  ?.filter(user => {
    const lowerText = searchText.toLowerCase();
    return user.username.toLowerCase().includes(lowerText) || user.name.toLowerCase().includes(lowerText);
  }).
  filter((user)=> user._id.toString() !== currentUser?.user._id.toString())
  // @ts-expect-error it's fine
  .sort((a, b) => getMatchScore(searchText, a) - getMatchScore(searchText, b));
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
      className={` ${isOpen?"fixed":'hidden'}  
      ${ isOpen ? " w-[25rem] animate-slideOut" : opened?'animate-slideIn':''} h-screen left-[5rem] shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1),10px_0_6px_-2px_rgba(0,0,0,0.05)] rounded-xl border-r z-10 bg-white`}
       >
      {matchingUsers && searchText && <SearchedUserList matchingUsers={matchingUsers as unknown as DbUser[]} />}
    </div>
  );
}
