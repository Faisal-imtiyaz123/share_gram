import {router,publicProcedure } from '../trpc'
import * as z from "zod"

export const authRouter = router({
    login: publicProcedure
    .input(z.object({
      username: z.string().min(1, "Username is required"),
      password: z.string().min(1, "Password is required"),
    }))
    .mutation(async ({ input }) => {
      const { username, password } = input;

      // Implement your login logic here
      // For example, check the username and password against your database

      // Mocking a successful login response
      if (username === 'testuser' && password === 'testpass') {
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'Invalid username or password' };
      }
    }),
})