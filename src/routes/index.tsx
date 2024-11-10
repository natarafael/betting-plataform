import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { Suspense } from "react";
import { AuthLoading } from "@/components/auth/AuthLoading";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // Add other protected routes here
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<AuthLoading />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<AuthLoading />}>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
]);
