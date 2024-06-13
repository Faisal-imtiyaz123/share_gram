import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "./lib/trpc";
import { httpBatchLink } from "@trpc/client";
import { getAuthCookie } from "./lib/actions/auth/auth.actions";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./components/customAuth/ProtectedRoute";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
            Authorization: getAuthCookie(),
            };
          },
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
      <ProtectedRoute>
        <Outlet/>
      </ProtectedRoute>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
