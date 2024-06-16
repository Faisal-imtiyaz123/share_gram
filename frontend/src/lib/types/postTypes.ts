
 export interface DbPost{
    photo: string[]
    comments:string[],
   _id:string,
    authorId:string,
    time:{
        day:string,
        time:string,
        year:string
    },
    text:string,
    likes:number,
    usersThatLiked:string[]
 }


