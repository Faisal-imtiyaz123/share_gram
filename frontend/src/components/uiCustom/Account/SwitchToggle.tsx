"use client"

import { togglePrivate } from "@/lib/actions/account/makePrivate"
import { useState } from "react"

export default function SwitchToggle({isPrivate}:{isPrivate:boolean}) {
  const [privateAcc,setPrivateAcc] = useState<boolean>(isPrivate)
  async function handleAccountPrivacy(){
    setPrivateAcc(!privateAcc)
    await togglePrivate(!privateAcc)

  }
  return (
    <button onClick={handleAccountPrivacy} className={`w-[3rem] h-[1.5rem] flex items-center ${!privateAcc?"justify-start bg-gray-300":"justify-end  bg-blue-500"} p-1 rounded-xl`}>
        <div className=" w-[1.2rem] h-[1.2rem] rounded-full bg-white">
        </div>

    </button>
  )
}
