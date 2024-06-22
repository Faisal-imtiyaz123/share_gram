import { connectToDatabase } from '../db';
import * as z from "zod"
import { publicProcedure, router } from '../trpc';
import {ObjectId} from "mongodb"
import { getTime } from '../utils/messageUtils';
import { DbPost, Post } from '../utils/types/postTypes';
import { TRPCError } from '@trpc/server';
import { removeId } from '../utils/removeId';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const now = new Date();
const dayNum= now.getDay()
const day = days[dayNum]

export const postRouter = router({
    fetchPosts:publicProcedure.input(z.object({
        authorId:z.string().min(1,{message:"Author ID is required"}),
    })).output((data)=>{
        return data as DbPost[]
    })
    .query(async (opts)=>{
        const {authorId} = opts.input
        const db = await connectToDatabase()
        const postCollection = await db.collection('posts')
        const posts = postCollection.find({authorId:new ObjectId(authorId)}).toArray()
        return posts

    }),
    createPost:publicProcedure.input(z.object({
        photo:z.string().array().min(1,{message:"Atleast one image is required"}),
        text:z.string()
    })).mutation(async (opts)=>{
        const {photo,text} = opts.input
        const db = await connectToDatabase()
        const postCollection = await db.collection('posts')
        const users = db.collection('users')
        const newPost:Post = {
            authorId:new ObjectId(opts.ctx.user?.data),
            photo,
            text:text || "",
            time:{
                day:day,
                time:getTime(),
                year:now.getFullYear().toString()
            },
            comments:[],
            likes:0,
            usersThatLiked:[]
        }
        const insertedPost = await postCollection.insertOne(newPost)
        await users.updateOne(
            { _id: new ObjectId(opts.ctx.user?.data) }, // Match user by ID
            { $push: { posts: insertedPost.insertedId } } // Add the post ID to the user's posts array
          );
    
    }),
    updateLikes:publicProcedure.input(z.object({
        increase:z.boolean(),
        postId:z.string().min(1,{message:"Post ID is required"})
    })).mutation(async (opts)=>{
        const db = await connectToDatabase()
        const postCollection = await db.collection('posts')
        const post = await postCollection.findOne({ _id: new ObjectId(opts.input.postId) })
        if (!post) {
            throw new TRPCError({
                code:'NOT_FOUND',
                message:"Post not found"
            });
        }
        const postTrimmed = removeId<Post>(post)
        const updatedPost:Post = {
            ...postTrimmed,
            likes:opts.input.increase ? postTrimmed.likes+1 : postTrimmed.likes>0? postTrimmed.likes-1:postTrimmed.likes,
            usersThatLiked:updateUsersThatLiked(postTrimmed.usersThatLiked,opts.input.increase,new ObjectId(opts.ctx.user?.data)),
        }
        const result = await postCollection.updateOne(
            { _id: new ObjectId(opts.input.postId) },
            { $set: updatedPost }
        );
        if (result.modifiedCount === 0) {
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message:"Failed to update likes, try again"
            });
        }
        // pusher.trigger('posts', 'updateLikes', opts.input.increase);
    }),
    deletePost:publicProcedure.input(z.object({
        postId:z.string().min(1,{message:"Post ID is required"}),
    })).mutation(async (opts)=>{
        const db = await connectToDatabase()
        const postCollection = await db.collection('posts')
        const users = db.collection('users')
        const post = await postCollection.findOne({ _id: new ObjectId(opts.input.postId) })
        if (!post) {
            throw new TRPCError({
                code:'NOT_FOUND',
                message:"Post not found"
            });
        }
        const result = await postCollection.deleteOne({ _id: new ObjectId(opts.input.postId) })
        if (result.deletedCount === 0) {
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message:"Failed to delete post, try again"
            });
        }
        await users.updateOne(
            { _id: new ObjectId(opts.ctx.user?.data) },
            { $pull: { posts: new ObjectId(opts.input.postId) } }
        );
    }),
    })
    // fetchPostLikes:publicProcedure.input(z.object({
    //     increase:z.boolean(),
    //     postId:z.string().min(1,{message:"Post ID is required"})
    // })).query((opts)=>{

        
    // })

function updateUsersThatLiked(usersThatLiked:ObjectId[], increase:boolean, userId:ObjectId) {
    if (increase) {
      return [...usersThatLiked, new ObjectId(userId)]; // Add user ID if increasing likes
    } else {
      // Optionally, remove user ID if decreasing likes (implement logic here)
      return usersThatLiked.filter((userId)=>userId!==userId) // Or return filtered array (implement logic)
    }
  }