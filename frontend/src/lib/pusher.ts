import Pusher from "pusher"
import PusherClient from "pusher-js"
export const pusher = new Pusher({
    appId: process.env. NEXT_PUBLIC_PUSHER_APP_ID!,
    key:  process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    useTLS: true,
  });

export const pusherClient = new PusherClient( process.env.NEXT_PUBLIC_PUSHER_KEY!,{
  cluster:process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
})
// NEXT_PUBLIC_PUSHER_APP_ID = "1722427"
// NEXT_PUBLIC_PUSHER_KEY = "7a81232e8743d8b34617"
// NEXT_PUBLIC_PUSHER_SECRET = "0711b2f698ec1c2931f8"
// NEXT_PUBLIC_PUSHER_CLUSTER = "ap2"