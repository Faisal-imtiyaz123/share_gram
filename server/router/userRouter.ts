import { connectToDatabase } from '../db';
import * as z from "zod"
import { comparePassword, generateAuthToken, hashPassword, setAuthTokenCookie } from '../utils/authUtils';
import { publicProcedure, router } from '../trpc';
import {ObjectId} from "mongodb"
import { TRPCError } from '@trpc/server';


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
        console.log(opts.ctx.user)
        if (!currentUser) {
            throw new   TRPCError({
                code:'NOT_FOUND',
                message:"User not found, login again"
            });
        }
        const updatedUser = {
            ...currentUser,
            name,
            bio,
            username,
            profilePicture,
        };
        console.log(currentUser)
       
        // Update the user in the database
        const result = await usersCollection.updateOne(
            { _id: new ObjectId(opts.ctx.user?.data) },
            { $set: updatedUser }
        );
        console.log(result)

        // if (result.modifiedCount === 0) {
        //     throw new TRPCError({
        //         code:"INTERNAL_SERVER_ERROR",
        //         message:"Failed to update user, try again"
        //     });
        // }
    }),
})