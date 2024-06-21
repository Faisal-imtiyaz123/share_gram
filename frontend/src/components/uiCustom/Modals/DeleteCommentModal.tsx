import useHandleClickOutside, { ClickOutsideRef } from "@/lib/hooks/useHanldeClickOutside";
import { trpc } from "@/lib/trpc";
import { Dispatch, SetStateAction } from "react";

interface Props{
    setShowModal :Dispatch<SetStateAction<boolean>>,
    showModal:boolean,
    commentId:string,
    postId:string
}

export default function DeleteCommentModal(props:Props) {
    const utils =trpc.useUtils()
    const mutation = trpc.comments.deleteComment.useMutation({
        onSuccess:()=>{
            utils.comments.fetchPostComments.invalidate()
        }
    })
    const {setShowModal,showModal,commentId,postId} = props
    const modalRef:ClickOutsideRef<HTMLDivElement> = useHandleClickOutside({setShowModal,showModal})
    // const modalRef = useRef<HTMLDivElement>(null)
    // useEffect(() => {
    //     const handleClickOutside = (e:MouseEvent)=>{
    //         if(modalRef.current && !modalRef.current.contains(e.target as Node)){
    //           setShowModal(false)
    //         }
        
    //       }
    //     if (showModal) {
    //       document.addEventListener('mousedown', handleClickOutside);
    //     } else {
    //       document.removeEventListener('mousedown', handleClickOutside);
    //     }
    
    //     return () => {
    //       document.removeEventListener('mousedown', handleClickOutside);
    //     };
    //   }, [setShowModal,showModal]);

    const handleDeleteComment=()=>{
        mutation.mutate({
            commentId,
            postId
        })

    }
  return (
    <div  className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-black z-[1000] bg-opacity-50 flex justify-center items-center">
        <div ref={modalRef} className="bg-white flex flex-col  p-1 rounded-lg ">
           <button onClick={handleDeleteComment}  className=" px-[6rem] rounded-lg p-4 hover:bg-red-400 hover:text-white">
            Delete
           </button>
        </div>

    </div>
  )
}
