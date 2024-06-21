import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment:String,
    replies:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}],
    postId:{type:mongoose.Schema.Types.ObjectId,ref:'Thread'},
    authorId: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    likes:{type:Number,default:0},
    usersLiked:[{type:mongoose.Schema.Types.ObjectId}],
})

const Comment = mongoose.models.Comment || mongoose.model("Comment",commentSchema)
export default Comment; 