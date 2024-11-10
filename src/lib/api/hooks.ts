import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { authApi, bettingApi, walletApi } from "./endpoints";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth";
import { ApiError, LoginResponse } from "@/types/api";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "@/schemas/auth";

export const useLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginFormData) =>
      authApi.login(data.email, data.password),
    onSuccess: (data: LoginResponse) => {
      const { accessToken, ...user } = data;
      localStorage.setItem("token", accessToken);
      login(user, accessToken);
      navigate("/");
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

export const useBets = (page: number, limit: number, status?: number) => {
  return useQuery({
    queryKey: ["bets", page, limit, status],
    queryFn: () => bettingApi.getBets({ page, limit, status }),
  });
};

export const useTransactions = (page: number, limit: number, type?: number) => {
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
