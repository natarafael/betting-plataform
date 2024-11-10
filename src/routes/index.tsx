import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { lazy, Suspense } from "react";
import { AuthLoading } from "@/components/auth/AuthLoading";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/HomePage";

const SimpleBetForm = lazy(
  () => import("@/features/betting/components/SimpleBetForm")
);

const MyBetsPage = lazy(
  () => import("@/features/betting/components/MyBetsPage")
);

const TransactionsPage = lazy(
  () => import("@/features/wallet/components/TransactionsPage")
);

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
      {
        path: "/bet",
        element: (
          <Suspense fallback={<AuthLoading />}>
            <div className="container max-w-4xl mx-auto py-6">
              <SimpleBetForm />
            </div>
          </Suspense>
        ),
      },
      {
        path: "/my-bets",
        element: (
          <Suspense fallback={<AuthLoading />}>
            <div className="container max-w-4xl mx-auto py-6">
              <MyBetsPage />
            </div>
          </Suspense>
        ),
      },
      {
        path: "/transactions",
        element: (
          <Suspense fallback={<AuthLoading />}>
            <div className="container max-w-4xl mx-auto py-6">
              <TransactionsPage />
            </div>
          </Suspense>
        ),
      },
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
