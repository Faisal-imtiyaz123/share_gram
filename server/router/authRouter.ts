import { connectToDatabase } from '../db';
import * as z from "zod"
import { comparePassword, generateAuthToken, generateUserTemplate, hashPassword} from '../utils/authUtils';
import { publicProcedure, router } from '../trpc';
import {ObjectId} from "mongodb"
import { TRPCError } from '@trpc/server';
import { DbUser} from '../utils/types/userTypes';


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
       throw new TRPCError({
        code:"NOT_FOUND",
        message:"Invalid username or password"
       })
      }
      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        throw new TRPCError({
          code:"UNAUTHORIZED",
          message:"Invalid username or password"
        })
      }
      const token = generateAuthToken(user._id)
      // setAuthTokenCookie(opts.ctx.res, token);
      return {
        message: 'Login successful',
        token
      };
    
    }),
    signUp:publicProcedure.input(z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(1, "Password is required"),
        confirmPassword: z.string().min(1, "Confirm Password is required"),
      }))
      .mutation(async ({ input }) => {
        const { username, password } = input;
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
        throw new TRPCError({
            code:"BAD_REQUEST",
            message:"username is taken"
        })
       }

    // Hash the password securely before storing it
    const hashedPassword = await hashPassword(password);

    const userTemplate  = generateUserTemplate()
    await usersCollection.insertOne({...userTemplate,username:username,password:hashedPassword});

    return { message: 'Signup successful' };
      }),
    currentUser:publicProcedure.output((user)=>{
       return user as {user:DbUser}
    }).
    query(async (opts)=>{
        const db = await connectToDatabase()
        if(!opts.ctx.user) throw new TRPCError({code:"UNAUTHORIZED",message:"User not authenticated"})
        const usersCollection = db.collection('users')
        const user:DbUser = await usersCollection.findOne({ _id: new ObjectId(opts.ctx.user.data) })
        if(!user){
           throw new TRPCError({
            code:"NOT_FOUND",
            message:"User not found. Please signg up"
           })
      }
      return {
        user
      }
    }),
})