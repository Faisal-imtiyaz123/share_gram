import  { ObjectId } from "mongodb";

export interface messageUsers {
    _id :ObjectId
    messageUsersDetails :messageUsersDetails[]

}

export interface messageUsersDetails{
    _id :string
    username :string
    profilePhoto :string
    name :string
}
export interface Message{
    _id :string
    message :string
    senderId :string
    receiverId :string
    sent :boolean
    time:{
        day :string
        time :string
        year :string
    }
}