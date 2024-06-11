"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteThread } from "@/lib/actions/threadActions/deleteThread"
import { threadId } from "@/lib/types/threadTypes"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function DeleteThreadButton({threadId}:{threadId:threadId}) {

  async function handleDeleteThread(){
    
    const deleteThreadPromise = new Promise<void>(async (resolve, reject) => {
      try{
        await deleteThread(threadId)
        resolve()

      }catch(err){
        reject(err)
      }

    })
    toast.promise(deleteThreadPromise, {
      loading: 'Deleting Thread',
      success: "Thread Deleted",
      error: 'Error Deleting Thread', 
    });
  
  }
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
    <Button variant="ghost" >
            <Trash2 height={20} width={20}/>
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          thread from your account.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteThread}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

