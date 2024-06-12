
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DbThread } from "@/lib/types/threadTypes";



export default function DisplayThreadModal({title,description}:{title:string,description:string}) {

  return (
  <Card className="w-[10rem] h-[20rem]">
  <CardHeader>
    <div className="flex justify-between">
    <CardTitle>{title}</CardTitle>
    </div>
  </CardHeader>
  <CardContent>
    <p>{description}</p>
  </CardContent>

</Card>

  )
}

