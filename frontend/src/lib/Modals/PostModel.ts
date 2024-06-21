import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    authorId:{type:String,required:true},
    post:[
        {type:String}
    ],
    comments:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
        },
        
    ]
})


const Post = mongoose.models.Post || mongoose.model("Post",postSchema)
export default Post