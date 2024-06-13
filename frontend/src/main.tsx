import React from 'react'
import ReactDOM from 'react-dom/client'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import "./globals.css"
// import { LoginForm } from './components/customAuth/LoginForm';
import App from './App';
// import Home from './routes/Home';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//     children:[
//       {
//         path:'/home',
//         element:<Home/>,
//       },
//       {
//         path:"/login",
//         element: <LoginForm/>
//       }
//     ]
//   },
  
// ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <App/>
  </React.StrictMode>,
)
