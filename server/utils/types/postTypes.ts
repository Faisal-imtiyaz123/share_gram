import { ObjectId } from "mongodb";

export type DbPost = Post & {_id:ObjectId}

export interface Post{
    photo:string[],
    comments:ObjectId[],
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