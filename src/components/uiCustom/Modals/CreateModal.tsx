import { useCreateModal } from "@/lib/Zustand-store/createModalStore";
import { useUploadThing } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
const filesSchema = z.object({
  files: z.string().nonempty(),
});

export function CreateModal() {
  const { isModalOpen, toggleModal } = useCreateModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews,setPreview] = useState<string[]>([]) 
  const inputRef = useRef<HTMLInputElement>(null)
  const {startUpload} = useUploadThing("media",{onUploadError:(err)=>console.log(`${err.message}`)})
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
        // setPreview([])
      }
    }
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [toggleModal]);

  async function handleFiles(e:ChangeEvent<HTMLInputElement>,fieldChange:(fieldValue:string)=>void){
    const selectedFiles = e.target.files
    if(!selectedFiles) return
    const filesArr:File[] = Array.from(selectedFiles)
    setFiles(filesArr)
    let promiseArr:Promise<string>[] =[]
    for(const file of filesArr){
    const fileReader = new FileReader()
    const promise = new Promise<string> ((resolve,reject)=>{
      fileReader.onload = ()=>{
        const fileUrl = fileReader.result?.toString()||""
        fieldChange(fileUrl)
        resolve(fileUrl)
  
      }
      fileReader.readAsDataURL(file)


    })
    promiseArr.push(promise)
    }
    const fileUrls = await Promise.all(promiseArr)
    setPreview(fileUrls)

  }

  async function onSubmit(values:z.infer<typeof filesSchema>){
    
    // await createPost({post:})

    
  }
  async function handlePost(){
    let post:string[]=[]
    for(const file of files){
      try{
        const fileArray:File[] = []
        fileArray.push(file)
        const uploadRes = await startUpload(fileArray)
        if(!uploadRes) throw new Error("Error uplaoding data:::")
        post.push(uploadRes[0].url)

      }catch(err:any){
        throw new Error(`Error Posting files:${err.message} `)
      }
    }

    await createPost(post)

  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
 

  return (
    isModalOpen && (
      <div className="w-screen h-screen bg-black  z-10 bg-opacity-50 fixed flex items-center justify-center ">
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
         

         {!previews.length? <div className="basis-[80%] relative ">Drag files from your Computer</div>:""}
          
          <ImageSlider previews={previews} />
          <div>
            <Form  {...form}>
              <form  onSubmit={form.handleSubmit(onSubmit)}>
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
                            onChange={(e)=>handleFiles(e,field.onChange)}
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
    )
  );
}
