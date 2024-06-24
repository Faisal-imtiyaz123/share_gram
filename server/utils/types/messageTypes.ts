import { ObjectId } from "mongodb"

export interface Message{
    senderId: ObjectId
    receiverId: ObjectId
    message:string
    time:{
        day:string,
        time:string,
        year:string
    }
}

export interface messageUsers {
    _id :ObjectId
    messageUsersDetails :messageUserDetails[]

}

export interface messageUserDetails{
    _id :ObjectId
    username :string
    profilePhoto :string
    name :string
}