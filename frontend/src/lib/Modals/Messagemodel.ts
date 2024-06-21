import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message:{type:String,required:true},
    senderId:mongoose.Types.ObjectId,
    recieverId:mongoose.Types.ObjectId,
})

const Message = mongoose.models.Message || mongoose.model('Message',messageSchema)
export default Message 