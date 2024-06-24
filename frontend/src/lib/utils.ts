import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function isBase64Image(data:string) {
  // Regular expression to check if data starts with a Base64 data URI prefix
  const base64Regex = /^data:image\/(png|gif|jpeg);base64,/;
  return base64Regex.test(data);
}

export const imgPublicId = (img:string)=>{
  if(!img) return ""
  const parts = img.split('/')
  return parts[7].split('.')[0]
}

export const getAuthCookie=()=>{
  const token = localStorage.getItem('auth')
  return `Bearer ${token}`
}

// export default async function ensure(fn:any){
//   try{
//     if(typeof fn == 'function'){
//       return fn()
//     }
//   }catch(e){
//     if(typeof fn !== 'function') throw new Error('Pass only a function to ensure decorator')
  

// }
// }