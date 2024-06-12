import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    notification: {type:String,required:true},
    timestamp:{type:Date,default:Date.now()}

})

const Notification = mongoose.models.Notification || mongoose.model('Notification',notificationSchema)
export default Notification