import Link from "next/link"

const settingsRoutes:{name:string,route:string}[]=[
    {name:"Edit Profile",
    route:"/home/account/edit"
},
{
    name:"Account Privacy",
    route:"/home/account/privacy"
}
]

export default function AccountSettingsBar() {
  return (
    <div className="h-full  w-[15rem] border-r p-2  ">
        <div className="mt-[4rem] flex flex-col gap-3 bg-white">
        {settingsRoutes.map((route,index)=>(
            <Link className="hover:bg-gray-100 p-3 text-gray-800 rounded-md" href={route.route} key={index}>
               {route.name}
            </Link>
        ))}
        </div>
    </div>
  )
}
