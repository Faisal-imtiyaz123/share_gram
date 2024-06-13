import { LoginForm } from "@/components/customAuth/LoginForm";
import SignUpForm from "@/components/customAuth/SignUpForm";
import { CreateModal } from "@/components/uiCustom/Modals/CreateModal";
import LeftSideBar from "@/components/uiCustom/Navigation/LeftSideBar";
import NotificationSlider from "@/components/uiCustom/Notifications/NotificationSlider";
import SearchBar from "@/components/uiCustom/Search/searchBar";
import { getAuthCookie } from "@/lib/actions/auth/auth.actions";
import { RefProvider } from "@/lib/hooks/useContext";
import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";


export default function Home() {
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
    <>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
       <RefProvider>
        <div className="flex">
        <LeftSideBar /> 
        <SearchBar/>
        <NotificationSlider/>
        <LoginForm/>
        </div>
        {/* <CreateModal/> */}
      </RefProvider> 
      </QueryClientProvider>
    </trpc.Provider>
    </>
  )
}
