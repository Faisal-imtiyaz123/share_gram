import { connectToDatabase } from '../db';
import * as z from "zod"
import { comparePassword, generateAuthToken, hashPassword, setAuthTokenCookie } from '../utils/authUtils';
import { TRPCError, initTRPC} from '@trpc/server';
import { publicProcedure, router } from '../trpc';
import {ObjectId} from "mongodb"


export const authRouter = router({
    login: publicProcedure.input(z.object({
      username: z.string().min(1, "Username is required"),
      password: z.string().min(1, "Password is required"),
    }))
    .mutation(async (opts) => {
      const { username, password } = opts.input;
      const db = await connectToDatabase()
      const usersCollection = db.collection('users')
      const user = await usersCollection.findOne({ username})
      if(!user){
        return {
            message:"Invalid username or password",
            token:""
        }
      }
      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        return {
            message:"Invalid username or password",
            token:""
        }
      }
      const token = generateAuthToken(user._id)
      // setAuthTokenCookie(opts.ctx.res, token);
      if(user){
        return {
            message:"success",
            token,
        }
      }else{
        return {
            message:"Invalid username or password",
            token:""
        }
      }
    
    }),
    signUp:publicProcedure.input(z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(1, "Password is required"),
      }))
      .mutation(async ({ input }) => {
        const { username, password } = input;
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
        return { message: 'Username already exists' };
       }

    // Hash the password securely before storing it
    const hashedPassword = await hashPassword(password);

    const newUser = { username, password: hashedPassword };
    await usersCollection.insertOne(newUser);

    return { message: 'Signup successful' };
      }),
    currentUser:publicProcedure.query(async (opts)=>{
      try{

        const db = await connectToDatabase()
        if(!opts.ctx.user) return {
          message:"User not found. Please login again",
          user:null
        }
        const usersCollection = db.collection('users')
        const user = await usersCollection.findOne({ _id: new ObjectId(opts.ctx.user.data) })
        if(user){
            return {
                message:"success",
                user,
            }
        }
      }catch(err:any){
        return {
            message:err.message,
            user:null
        }
      }
    }),
})