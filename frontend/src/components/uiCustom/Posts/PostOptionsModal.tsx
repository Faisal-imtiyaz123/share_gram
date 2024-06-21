import useHandleClickOutside, { ClickOutsideRef } from "@/lib/hooks/useHanldeClickOutside";
import { trpc } from "@/lib/trpc";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface Props{
    setShowModal :Dispatch<SetStateAction<boolean>>,
    showModal:boolean,
    postId:string
}

export default function PostOptionsModal(props:Props) {
    const utils =trpc.useUtils()
    const mutation = trpc.posts.deletePost.useMutation({
        onMutate:()=>toast.loading('Deleting post'),
        onSuccess:()=>{
            toast.success('Post deleted successfully')
            utils.posts.fetchPosts.invalidate()
        }
    })
    const {setShowModal,showModal} = props
    const modalRef:ClickOutsideRef<HTMLDivElement> = useHandleClickOutside({setShowModal,showModal})
    const handleDeleteComment=()=>{
        mutation.mutate({
          postId:props.postId
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
