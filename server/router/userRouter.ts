import { connectToDatabase } from '../db';
import * as z from "zod"
import { comparePassword, generateAuthToken, generateUserTemplate, hashPassword, setAuthTokenCookie } from '../utils/authUtils';
import { publicProcedure, router } from '../trpc';
import {ObjectId} from "mongodb"
import { TRPCError } from '@trpc/server';
import { DbUser, User } from '../utils/types/userTypes';
import { removeId } from '../utils/removeId';


export const userRouter = router({
    createProfileDetails:publicProcedure.input(z.object({
        name: z.string().min(3, "Name is required"),
        bio: z.string().min(20, "Bio is required"),
        username: z.string().min(3, "Username is required"),
        profilePicture: z.string().min(1, "Profile picture is required")
      }))
      .mutation(async (opts) => {
        const { name, bio, username, profilePicture } = opts.input;
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const currentUser = await usersCollection.findOne({ _id: new ObjectId(opts.ctx.user?.data) })
        if (!currentUser) {
            throw new   TRPCError({
                code:'NOT_FOUND',
                message:"User not found, login again"
            });
        }
        const currentUserTrimmed = removeId<User>(currentUser)
        const userTemplate = generateUserTemplate()
        const updatedUser:User = {
            ...userTemplate,
            ...currentUserTrimmed,
            name,
            bio,
            appUsername:username,
            profilePicture,
        };
       
        // Update the user in the database
        const result = await usersCollection.updateOne(
            { _id: new ObjectId(opts.ctx.user?.data) },
            { $set: updatedUser }
        );

        if (result.modifiedCount === 0) {
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message:"Failed to update user, try again"
            });
        }
    }),
    fetchUser:publicProcedure.input(z.object({
        userId:z.string().min(1,{message:"UserId is required" }),
    })).output((value)=>{
        return value as DbUser
    })
    .query(async (opts)=>{
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const user = await usersCollection.findOne({ _id: new ObjectId(opts.input.userId) })
        if (!user) {
            throw new TRPCError({
                code:"NOT_FOUND",
                message:"User not found"
            });
        }
        return user

        }),
    fetchUsers:publicProcedure.output((out)=>{
        return out as DbUser[]

    })
    .query(async ()=>{
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const users = await usersCollection.find().toArray()
        return users
    })

})