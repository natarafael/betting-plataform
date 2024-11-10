import { AxiosResponse } from "axios";
import { api } from "./axios";
import {
  LoginResponse,
  RegisterResponse,
  RegisterRequest,
  BetResponse,
  PaginatedResponse,
  ApiError,
} from "@/types/api";
import { Bet, Transaction } from "@/types";

// Auth endpoints
export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/login", {
      email,
      password,
    });
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/register", data);
    return response.data;
  },
};

// Betting endpoints
export const bettingApi = {
  placeBet: async (amount: number): Promise<BetResponse> => {
    const response = await api.post<BetResponse>("/bet", { amount });
    return response.data;
  },

  cancelBet: async (betId: string): Promise<BetResponse> => {
    const response = await api.delete<BetResponse>(`/my-bet/${betId}`);
    return response.data;
  },

  getBets: async (params: {
    page: number;
    limit: number;
    status?: number;
    id?: string;
  }): Promise<PaginatedResponse<Bet>> => {
    const response = await api.get<PaginatedResponse<Bet>>("/my-bets", {
      params,
    });
    return response.data;
  },
};

// Wallet endpoints
export const walletApi = {
  getTransactions: async (params: {
    page: number;
    limit: number;
    type?: number;
    id?: string;
  }): Promise<PaginatedResponse<Transaction>> => {
    const response = await api.get<PaginatedResponse<Transaction>>(
      "/my-transactions",
      {
        params,
      }
    );
    return response.data;
  },
};
