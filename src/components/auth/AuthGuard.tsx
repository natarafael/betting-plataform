import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user); // Add this to check user state
  const location = useLocation();

  console.log("Auth State:", {
    isAuthenticated,
    hasToken: !!token,
    hasUser: !!user,
    location: location.pathname,
  });

  if (!isAuthenticated || !token) {
    // Store the attempted location
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};
