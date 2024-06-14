import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  image: {
    type: String,
    default:""
  },
  bio: {
    type: String,
    default: "",
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
//   communities: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Community",
//     },
//   ],
//   followers:[
//     {
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'User',
//   }
// ],
// following:[{
//   type:mongoose.Schema.Types.ObjectId,
//     ref:'User',
// }],
// messagedUsers:[{
//   type:mongoose.Schema.Types.ObjectId,
//   ref:'User'
// }],
// requestedUsers:[{
//   type:mongoose.Schema.Types.ObjectId,
//   ref:'User'
// }],
// requestingUsers:[
//   {
//   type:mongoose.Schema.Types.ObjectId,
//   ref:'User'
//   }
// ],
// blockedUsers:[{
//   type:mongoose.Schema.Types.ObjectId,
//   ref:'User'
// }],
// mutedAccounts:[{
//   type:mongoose.Schema.Types.ObjectId,
//   ref:'User'
// }],
privateAccount:{type:Boolean, default:false},
posts:[
  {type:mongoose.Schema.Types.ObjectId},
]

});
const User =  mongoose.model("User", userSchema);


export default User;
