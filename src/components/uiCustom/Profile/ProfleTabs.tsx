
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Thread from "@/components/uiCustom/Threads/ThreadCard";
import { DbThread } from "@/lib/types/threadTypes";

export default function ProfleTabs({threads}:{threads:DbThread[]|undefined}) {
  return (
    <Tabs defaultValue="threads" className="w-[400px]">
    <TabsList className="flex">
      <TabsTrigger value="threads">Threads</TabsTrigger>
      <TabsTrigger value="replies">Replies</TabsTrigger>
      <TabsTrigger value="reposts">Reposts</TabsTrigger>
    </TabsList>
    <TabsContent value="threads">
     <div className="h-screen">
      {threads?.map((thread) =><Thread thread={thread} key={thread.title}/>)}
     </div>
    </TabsContent>
    <TabsContent value="replies">
     These are my threadsdd
    </TabsContent>
    <TabsContent value="reposts">
     These are my threadsddddd
    </TabsContent>
    

   </Tabs>

  )
}
