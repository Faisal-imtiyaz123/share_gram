import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import {authRouter} from './router/authRouter'
import cors from "cors"
import { decryptPayload } from './utils/authUtils';

// created for each request
const createContext = async (opts: trpcExpress.CreateExpressContextOptions)=> {
  // async function getUserFromHeader() {
  //   if (req.headers.authorization) {
  //     const user = await decryptPayload(
  //       req.headers.authorization.split(' ')[1],
  //       process.env.SECRET as string
  //     );
  //     return user;
  //   }
  //   return null;
  // }
  // const user = await getUserFromHeader();
  // return {
  //   user,
  // };
  return {
    req:opts.req,
    res:opts.res,
  }
}; // no context
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();
const appRouter = t.router({
  // [...]
  auth:authRouter
});

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