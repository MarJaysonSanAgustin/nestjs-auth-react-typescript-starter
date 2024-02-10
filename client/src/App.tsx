import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage, {
  action as loginAction,
} from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import DashboardLayout from "./features/dashboard/pages/DashboardLayout";
import DefaultPage from "./pages/DefaultPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DefaultPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
