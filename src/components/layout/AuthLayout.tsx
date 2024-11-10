import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const AuthLayout = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Logo Area */}
        <div className="w-full max-w-md mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {isRegisterPage ? "Create your account" : "Welcome"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isRegisterPage
              ? "Sign up to start betting"
              : "Sign in to access your account"}
          </p>
        </div>

        {/* Main Content - Login/Register Form */}
        <div className="w-full max-w-md">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Betting Platform. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
