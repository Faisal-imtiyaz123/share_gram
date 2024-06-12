import { CreateModal } from "@/components/uiCustom/Modals/CreateModal";
import LeftSideBar from "@/components/uiCustom/Navigation/LeftSideBar";
import NotificationSlider from "@/components/uiCustom/Notifications/NotificationSlider";
import SearchBar from "@/components/uiCustom/Search/searchBar";
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
          // async headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
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
        </div>
        {/* <CreateModal/> */}
      </RefProvider> 
      </QueryClientProvider>
    </trpc.Provider>
    </>
  )
}
