import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async ()=>{
mongoose.set("strictQuery",true)
if(isConnected){
    console.log("DB already Connected")
    return;
}
try{
    await mongoose.connect(process.env.MONGO_URL!)
    isConnected=true;
    console.log("DB connected")

}catch(err){
    console.log(err)

}


}