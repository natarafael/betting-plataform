import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { authApi, bettingApi, walletApi } from "./endpoints";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth";
import { ApiError, LoginResponse } from "@/types/api";
import { useLocation, useNavigate } from "react-router-dom";
import type { LoginFormData } from "@/schemas/auth";
import { formatCurrency } from "../utils";

export const useLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginFormData) =>
      authApi.login(data.email, data.password),
    onSuccess: (data: LoginResponse) => {
      const { accessToken, ...user } = data;

      // Make sure we're setting both the token and user
      localStorage.setItem("token", accessToken);
      login(user, accessToken);

      // Navigate to the stored location or default to home
      const from = (location.state as any)?.from || "/";
      navigate(from, { replace: true });
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    },
  });
};

export const useRegister = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onMutate: () => {
      toast({
        title: "Creating account...",
        description: "Please wait while we set up your account.",
      });
    },
    onSuccess: () => {
      toast({
        title: "Registration successful",
        description: "Please log in with your credentials",
      });
      navigate("/login");
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
      });
    },
    onSettled: () => {},
  });
};

export const useBets = (page: number, limit: number, status?: string) => {
  return useQuery({
    queryKey: ["bets", page, limit, status],
    queryFn: () => bettingApi.getBets({ page, limit, status }),
    // Add staleTime and refetch options
    staleTime: 0, // Consider the data stale immediately
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};

export const useTransactions = (page: number, limit: number, type?: string) => {
  return useQuery({
    queryKey: ["transactions", page, limit, type],
    queryFn: () => walletApi.getTransactions({ page, limit, type }),
  });
};

export const usePlaceBet = (queryClient: QueryClient) => {
  const { toast } = useToast();
  const updateBalance = useAuthStore((state) => state.updateBalance);

  return useMutation({
    mutationFn: bettingApi.placeBet,
    onSuccess: (data) => {
      updateBalance(data.balance);
      queryClient.invalidateQueries({ queryKey: ["bets"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        title: "Bet placed successfully",
        description:
          data.winAmount > 0 ? `You won ${data.winAmount}!` : "Good luck!",
      });
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Failed to place bet",
        description: error.message,
      });
    },
  });
};

export const useCancelBet = (queryClient: QueryClient) => {
  const { toast } = useToast();
  const updateBalance = useAuthStore((state) => state.updateBalance);

  return useMutation({
    mutationFn: (betId: string) => bettingApi.cancelBet(betId),
    onSuccess: (data) => {
      // Update local balance
      updateBalance(data.balance);

      // Invalidate and refetch bets and transactions
      queryClient.invalidateQueries({ queryKey: ["bets"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast({
        title: "Bet cancelled successfully",
        description: `Updated balance: ${formatCurrency(data.balance)}`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Failed to cancel bet",
        description:
          error.message || "An error occurred while cancelling the bet",
      });
    },
  });
};
