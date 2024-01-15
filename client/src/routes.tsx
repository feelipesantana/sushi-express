import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/Auth";
import { SignIn } from "./pages/auth/SignIn";
import { AppLayout } from "./pages/_layouts/App";
import { Dashboard } from "./pages/app/dashboard";
import { SignUp } from "./pages/auth/SignUp";
import { NotFound } from "./pages/404";
import { Orders } from "./pages/app/orders";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },


    ],
  },
])