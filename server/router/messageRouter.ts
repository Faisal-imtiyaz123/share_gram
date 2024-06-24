import { connectToDatabase } from '../db';
import * as z from "zod"
import { publicProcedure, router } from '../trpc';
import {ObjectId} from "mongodb"
import { DbMessage, Message, getTime } from '../utils/messageUtils';
import { pusher } from '../utils/pusher';
import { messageUsers } from '../utils/types/messageTypes';




const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const now = new Date();
const dayNum= now.getDay()
const day = days[dayNum]
export const messageRouter = router({
    sendMessage:publicProcedure.input(z.object({
        senderId: z.string().min(1, "senderId required"),
        recieverId: z.string().min(1, "recieverId is required"),
        message: z.string().min(1, "Message is required"),
      })).mutation(async (opts)=>{
        const db = await connectToDatabase()
        const {senderId,recieverId,message}= opts.input
        const senderDbId = new ObjectId(senderId)
        const recieverDbId = new ObjectId(recieverId)
        const messageCollection = db.collection('messages')
        const usersCollection = db.collection('users')
        const newMessage:Message={
            senderId:senderDbId,
            receiverId:recieverDbId,
            message,
            time:{
                day:day,
                time:getTime(),
                year:now.getFullYear().toString()
            }
        }
        const insertedMsg = await messageCollection.insertOne(newMessage);
        await usersCollection.updateOne(
          { _id: senderDbId },
          { $addToSet: { messageUsers: recieverDbId } }
      );
      await pusher.trigger(recieverId,'message',{
        senderId:senderDbId.toString(),
        receiverId:recieverDbId.toString,
        message:message,
        sent:opts.ctx.user?.data.toString()==senderId.toString()?true:false,
        _id:insertedMsg.insertedId.toString()
    })
  
      // Update the receiver's messageUsers field to include the sender's ID
      await usersCollection.updateOne(
          { _id: recieverDbId },
          { $addToSet: { messageUsers: senderDbId } }
      );

      }),
      fetchMessageUsers:publicProcedure.output((out)=>{
        return out as messageUsers[]
      }).
      query(async (opts)=>{
        const db = await connectToDatabase()
        const senderDbId = new ObjectId(opts.ctx.user?.data)
        const usersCollection = db.collection('users')
        const populatedUsers = await usersCollection.aggregate([
          {
            $match: { _id: senderDbId }
          },
          {
            $lookup: {
              from: 'users', // The collection to join with
              localField: 'messageUsers', // The field in the current collection
              foreignField: '_id', // The field in the joined collection
              as: 'messageUsersDetails' // The output array field
            }
          },
          {
            $project: {
              messageUsersDetails: {
                _id: 1,
                username: 1,
                profilePhoto: 1,
                name: 1
              }
            }
          }
        ]).toArray();
        return populatedUsers
  
        

      }),
      fetchMessages:publicProcedure.input(z.object({
        recieverId: z.string().min(1, "recieverId is required")
      }))
      .output((value)=>{
         return value as DbMessage[]
      })
      .query(async (opts)=>{
        const db = await connectToDatabase()
        const {recieverId} = opts.input
        const senderId = new ObjectId(opts.ctx.user?.data)
        const recieverDbId = new ObjectId(recieverId)
        const messageCollection = db.collection('messages')
        const messages = await messageCollection.find({
          $or: [
            { senderId: senderId, receiverId: recieverDbId },
            { senderId: recieverDbId, receiverId: senderId }
          ]
        }).toArray();
        return messages

      }),
      deleteMessage:publicProcedure.input(z.object({
        messageId:z.string().min(1,"messageId is required"),
      })).mutation(async (opts)=>{
        const db = await connectToDatabase()
        const {messageId} = opts.input
        const messageCollection = db.collection('messages')
        const messageToDelete = new ObjectId(messageId)
        await messageCollection.deleteOne({_id:messageToDelete})
        await pusher.trigger('messages','delete-message',{
          messageId : messageId
      })
      }),
      deleteChat: publicProcedure.input(z.object({
        userId:z.string().min(1,{message:"User ID is required"}),
      })).mutation(async(opts)=>{
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const currentUserId = new ObjectId(opts.ctx.user?.data)
        const userId = new ObjectId(opts.input.userId)
        await usersCollection.updateOne(
          { _id: currentUserId },
          { $pull: { messageUsers: userId } }
      );
      // const messagesCollection = db.collection('messages'); 
      // await messagesCollection.deleteMany({
      //   $or: [
      //     { senderId: currentUserId, receiverId: userId },
      //     { senderId: userId, receiverId: currentUserId },
      //   ],
      // });

      })
    
})