import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/Auth";
import { SignIn } from "./pages/auth/SignIn";
import { AppLayout } from "./pages/_layouts/App";
import { Dashboard } from "./pages/app/dashboard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />

      </Route>
      <Route path="/" element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);