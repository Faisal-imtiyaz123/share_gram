import mongoose from "mongoose";

export function stringToMongoId(string:string){
    return new mongoose.Types.ObjectId(string)


}