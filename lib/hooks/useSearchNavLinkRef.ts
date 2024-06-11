import { useRef } from "react";

export function  useSearchNavLinkRef(){
    const searchNavLinkRef = useRef<HTMLDivElement>(null)
    return searchNavLinkRef
}