import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { trpc } from "./lib/trpc";
import { httpBatchLink } from "@trpc/client";
import { getAuthCookie } from "./lib/actions/auth/auth.actions";
import ProtectedRoute from "./components/customAuth/ProtectedRoute";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./routes/Home";
import { LoginForm } from "./components/customAuth/LoginForm";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SignUpForm from "./components/customAuth/SignUpForm";
import AccountProfile from "./components/forms/AccountProfile";
import {Toaster} from "react-hot-toast"
import MessagingSideBar from "./components/uiCustom/Messaging/MessagingSideBar";
// export function SignOut(){
//   const navigate = useNavigate()
//   useEffect(()=>{
//     if(!localStorage.getItem('auth'))  navigate('/login')
//   },[navigate])


//   return(
//     <div>

//     </div>
//   )

// }



export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
          // You can pass any HTTP headers you wish here
          headers: async (opts) => {
            const {path} = opts.opList[0]
            console.log(path)
            if(path == "auth.login") return {
              auth:"pass"
            }
            return {
              authorization: getAuthCookie()
            };
          },
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
            <Toaster/>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                  <Home />
              }
            >
              <Route path="/profile" element={<AccountProfile/>}/>
              <Route path="/message" element={<MessagingSideBar/>}>
                {/* <Route path="/:id" /> */}
              </Route>
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            {/* <Route path="/signout" element={<SignOut/>} /> */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

