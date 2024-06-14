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
