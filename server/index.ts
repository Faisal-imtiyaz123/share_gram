import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { router } from './trpc';
 
const appRouter = router({
  // ...
});
 
// Export type router type signature,
// NOT the router itself.

const server = createHTTPServer({
  router:appRouter
})
server.listen(3000);
export type AppRouter = typeof appRouter;
