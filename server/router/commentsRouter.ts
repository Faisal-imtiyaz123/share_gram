import { connectToDatabase } from '../db';
import * as z from "zod"
import { publicProcedure, router } from '../trpc';
import {ObjectId} from "mongodb"
import { TRPCError } from '@trpc/server';
import { Comment } from '../utils/types/commentTypes';
import { getTodaysDate } from '../utils/miscellaneous';

interface FetchPostComment{
        _id:  ObjectId,
        postId: ObjectId,
        createdAt: string,
        comment:string,
        authorId: ObjectId,
        likes: number,
        updatedAt: string,
        userDetails: {
          _id: ObjectId,
          username: string,
          profilePicture:string
        }
}

export const commentsRouter = router({
    fetchPostComments: publicProcedure.input(z.object({
        postId:z.string().min(1,{message:"postId is required"})
    })).output((postComments)=>{
        return postComments as (FetchPostComment[] | [])
    })
    .query(async (opts)=>{
        const db = await connectToDatabase()
        const comments = db.collection("comments")
        const postComments = await comments.aggregate([
            {
              $match: { postId: new ObjectId(opts.input.postId) }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'authorId',
                foreignField: '_id',
                as: 'userDetails'
              }
            },
            {
              $unwind: '$userDetails'
            },
            {
              $project: {
                _id: 1,
                postId: 1,
                authorId: 1,
                createdAt: 1,
                comment:1,
                likes: 1,
                updatedAt: 1,
                'userDetails.username': 1,
                'userDetails.profilePicture': 1
              }
            }
          ]).toArray();
        console.log(postComments)
        return postComments;
       
    }),
    createComment: publicProcedure.input(z.object({
        postId:z.string().min(1,{message:"postId is required"}),
        comment:z.string().min(1,{message:"comment is required"}),
        authorId:z.string().min(1,{message:"userId is required"}),
    })).mutation(async (opts)=>{
        const db = await connectToDatabase()
        const comments = db.collection("comments")
        const {postId,comment,authorId} = opts.input
        const posts = db.collection("posts")
        const newComment:Comment ={
            postId:new ObjectId(postId),
            comment,
            authorId:new ObjectId(authorId),
            likes:0,
            createdAt: getTodaysDate(),
            updatedAt: getTodaysDate(),
            replies: []
        }
        const result = await comments.insertOne(newComment);

  if (result.insertedId) {
    await posts.updateOne(
      { _id: new ObjectId(postId) },
      { $push: { comments: result.insertedId } }
    );
  } else {
    throw new TRPCError({
      code:"BAD_REQUEST",
      message: "Error creating comment",
    });
  }
    }),
    deleteComment: publicProcedure.input(z.object({
      commentId: z.string().min(1, {message:"commentId is required"}),
      postId: z.string().min(1, {message:"postId is required"})
    })).mutation(async (opts)=>{
      const {commentId,postId} = opts.input
      const db = await connectToDatabase()
      const comments = db.collection("comments")
      const posts = db.collection("posts")
      const result = await comments.deleteOne({_id:new ObjectId(commentId)})
      console.log(result)
      if(result.deletedCount){
        await posts.updateOne(
          { _id: new ObjectId(postId) },
          { $pull: { comments: new ObjectId(commentId) } }
        )}else{
          throw new TRPCError({
            code:"BAD_REQUEST",
            message: "Error deleting comment",
          });
        }
  })
    
})