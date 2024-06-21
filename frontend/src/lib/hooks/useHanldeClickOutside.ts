import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface Props{
    setShowModal :Dispatch<SetStateAction<boolean>>,
    showModal:boolean,
}
export interface ClickOutsideRef<T extends HTMLElement> extends React.MutableRefObject<T | null> {} // Interface for type safety

export default function useHandleClickOutside<T extends HTMLElement>(props:Props){
    const {setShowModal,showModal} = props
    const modalRef = useRef<T|null>(null)
    useEffect(() => {
        const handleClickOutside = (e:MouseEvent)=>{
            if(modalRef.current && !modalRef.current.contains(e.target as Node)){
              setShowModal(false)
            }
        
          }
        if (showModal) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [setShowModal,showModal]);
    return modalRef
}