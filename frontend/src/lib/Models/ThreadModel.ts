import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}],
    authorId:{type:mongoose.Schema.Types.ObjectId,required:true},
    image:{type:String},
    createdAt:{type:Date,default:Date.now()},
    likes:{type:Number},
})



const Thread = mongoose.models.Thread || mongoose.model("Thread",threadSchema);
export default Thread;