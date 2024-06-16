import { ObjectId } from "mongodb";

export type DbPost = Post & {_id:ObjectId}

export interface Post{
    photo:string[],
    comments:string[],
    authorId:ObjectId,
    time:{
        day:string,
        time:string,
        year:string
    },
    text:string,
    likes:number
    usersThatLiked:ObjectId[]
}