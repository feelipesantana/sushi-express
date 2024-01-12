import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/Auth";
import { SignIn } from "./pages/auth/SignIn";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    )
  );