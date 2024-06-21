import { ObjectId } from "mongodb"

export interface Comment{
    postId: ObjectId
    authorId: ObjectId
    comment:string
    createdAt:string
    updatedAt:string
    likes:number
    replies:ObjectId[]

}
export type DbComment = Comment & {_id:ObjectId}
