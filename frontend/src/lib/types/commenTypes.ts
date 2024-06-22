

export interface CommentType{
    comment: string
}
export interface DbComment{
    _id:string,
    comment:string,
    authorId:string,
    threadId:string,
}
export interface CommentObject{
    comment:string
    _id:string,
    likes:number
}

export type commentId = string