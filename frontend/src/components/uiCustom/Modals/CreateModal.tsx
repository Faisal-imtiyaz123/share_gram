import { useCreateModal } from "@/lib/Zustand-store/createModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import ImageSlider from "../Create/ImageSlider";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios"
import toast from "react-hot-toast";
import { trpc } from "@/lib/trpc";

const filesSchema = z.object({
  files: z.string().nonempty(),
});

export function CreateModal() {
  const utils = trpc.useUtils()
  const mutation = trpc.posts.createPost.useMutation({
    onError: ()=>{
      toast.error('error occured, try again')
    },
    onSuccess:()=>{
      toast.success("Post created successfully")
      utils.posts.fetchPosts.invalidate()
    }
    
  })
  const [urls,setUrls ] = useState<string[]>([])
  const { isModalOpen, toggleModal } = useCreateModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const [previews,setPreviews] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null)
 
  
  const form = useForm({
    resolver: zodResolver(filesSchema),
    defaultValues: {
      files: "",
    },
  });

  useEffect(() => {
    function handleOutSideClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleModal();
        setPreviews([])
      }
    }
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [toggleModal]);

  
  async function handleFiles(e:any){
    const files:File[]= Array.from(e.target.files);
    setFiles(files)
    if(!files) return 
    Promise.all(
    files.map((file)=>{
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result?.toString() as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      
    })
    ).then((urlArray)=>{
      setPreviews(urlArray as string[] )
      
    })
  

    // Promise.all(
    //   files.map((file) => {
    //     return new Promise<string>((resolve) => {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         const result = reader.result as ArrayBuffer; // Explicitly cast to ArrayBuffer
    //         const base64String = btoa(
    //           new Uint8Array(result).reduce(
    //             (data, byte) => data + String.fromCharCode(byte),
    //             ''
    //           )
    //         );
    //         resolve(`data:${file.type};base64,${base64String}`);
    //       };
    //       reader.readAsArrayBuffer(file);
    //     });
    //   })
    // ).then((imagesArray) => {
    //   setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
    // });
  }

  // async function onSubmit(values:z.infer<typeof filesSchema>){
    
  //   // await createPost({post:})

    
  // }
  async function handlePost(){
  
    const uploadImages = files.map(image => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'xzsnd6c8'); // Replace with your upload preset
      formData.append('cloud_name', 'dywebzylz'); // Replace with your cloud name

      return axios.post(
        `https://api.cloudinary.com/v1_1/dywebzylz/image/upload`, // Replace with your cloud name
        formData
      ).then(response => {
        setUrls(prevUrls => [...prevUrls, response.data.secure_url]);
        
      }).catch(error => {
        console.error('Error uploading the image:', error);
      });
    });
    // toast.promise(Promise.all(uploadImages),{
    //   loading:"Creating post",
    //   success:"Post created successfully",
    //   error:"Failed to create post"
    // });
    toast.loading("Creating post")
    await Promise.all(uploadImages);
    toast.dismiss()
    mutation.mutate({text:"",photo:urls})
  }
  return (
    isModalOpen && (
      <div className="w-screen h-screen bg-black z-50 bg-opacity-50 fixed flex items-center justify-center ">
        <div
          ref={modalRef}
          className=" bg-white w-[30rem] z-30 h-[35rem] rounded-xl flex flex-col "
        >
          <div className="text-center border-b border-b-gray-300 p-2">
            {previews.length>0?<div  className="w-full flex font-semibold text-blue-500 justify-end p-2">
            <button onClick={handlePost}>Post</button>
              </div>
              :"Create Post"}
          </div>
         
<div className="flex flex-1 flex-col">
    <div className="basis-[90%]">
         {previews.length>1?  
          <ImageSlider previews={previews} />
        :
        <img src={previews[0]} />
        }
    </div>

          <div>
            <Form  {...form}>
              <form >
                <FormField
                  control={form.control}
                  name="files"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel>
                        </FormLabel>
                        <FormControl>
                          <Input
                           ref={inputRef}
                            onChange={(e)=>handleFiles(e)}
                            type="file"
                            accept="image/*, video/*"
                            placeholder="shadcn"
                            className="cursor-pointer hidden"
                            multiple
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
               { !previews.length? <div className="flex justify-center">

              <Button onClick={(e)=>{
                  e.preventDefault()
                  inputRef.current && inputRef.current.click()}} className="mx-auto">Choose files from your computer</Button>
                </div>:""}
               
              </form>
            </Form>
         
          </div>

</div>
          
        </div>
      </div>
    )
  );
}
