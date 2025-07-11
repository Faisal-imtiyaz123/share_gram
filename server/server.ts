import { TRPCError, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import {authRouter} from './router/authRouter'
import cors from "cors"
import { verifyJwt } from './utils/authUtils';
import { userRouter } from './router/userRouter';
import { messageRouter } from './router/messageRouter';
import { postRouter } from './router/postRouter';
import { commentsRouter } from './router/commentsRouter';

const createContext = async (opts: trpcExpress.CreateExpressContextOptions)=> {
  if(opts.req.headers.auth === "pass"){
    return{
      req:opts.req,
      res:opts.res,
    }
  }
  async function getUserFromHeader() {
    if (opts.req.headers.authorization) {
      const user = await verifyJwt(opts.req.headers.authorization.split(' ')[1]);
      if(!user) throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to do this',
     });
      return user;
    }
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to do this',
   });
  }
  const user = await getUserFromHeader();
  return {
    user,
    req:opts.req,
    res:opts.res,
  };
  
}; // no context
export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();
const router = t.router

const appRouter = router({
  auth:authRouter,
  user:userRouter,
  message:messageRouter,
  posts:postRouter,
  comments:commentsRouter
});
export type AppRouter  = typeof appRouter
const app = express();
app.use(cors())
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(3000,() => {
  console.log("Server running on port 3000")
});