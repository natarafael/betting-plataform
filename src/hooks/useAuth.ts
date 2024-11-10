import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated, logout: clearAuth } = useAuthStore();

  const logout = useCallback(() => {
    clearAuth();
    navigate("/login");
  }, [clearAuth, navigate]);

  return {
    user,
    token,
    isAuthenticated,
    logout,
  };
};
