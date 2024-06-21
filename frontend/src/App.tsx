import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "./lib/trpc";
import {  httpBatchLink } from "@trpc/client";
import { getAuthCookie } from "./lib/actions/auth/auth.actions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Index";
import { LoginForm } from "./components/customAuth/LoginForm";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SignUpForm from "./components/customAuth/SignUpForm";
import AccountProfile from "./components/forms/ProfileForm";
import  {Toaster} from "react-hot-toast"
import Message_id from "./routes/Message_id";
import MessageRoute from "./routes/MessageRoute";
import MyProfilePage from "./routes/MyProfile";
import HomePage from "./routes/HomePage";
import { globalErrorHandler } from "./lib/globalErrorHandler";
import ProfilePage from "./routes/ProfilePage";

// 




export default function App() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (err) => {
        globalErrorHandler(err)
      }
    }),
    mutationCache: new MutationCache({
      onError: (err) => {
       globalErrorHandler(err)
      },
    })
  });
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
          // You can pass any HTTP headers you wish here
          headers:(opts) => {
            const {path} = opts.opList[0]
            if(path == "auth.login" || path=="auth.signUp") return {
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
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <Toaster/>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                  <Home />
              }
            >  
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/my-profile" element={<MyProfilePage/>}/>
              <Route path="/profile" element={<AccountProfile/>}/>
              <Route path="/message" element={<MessageRoute/>}>
                <Route path="/message/:id" element={<Message_id/>} />
              </Route>
              <Route path="/home/profile/:userId" element={<ProfilePage/>}/>
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

