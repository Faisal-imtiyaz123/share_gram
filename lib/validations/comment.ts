import {z} from "zod"

export const commentValidation = z.object({
    comment:z.string()
})