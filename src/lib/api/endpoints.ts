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
  getBets: async (params: {
    page: number;
    limit: number;
    status?: string;
    id?: string;
  }): Promise<PaginatedResponse<Bet>> => {
    // Clean up params - remove undefined values
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    );

    console.log("Sending request to API with cleaned params:", cleanParams);

    const response = await api.get<PaginatedResponse<Bet>>("/my-bets", {
      params: cleanParams,
    });

    console.log("API Response:", response.data);

    return response.data;
  },

  cancelBet: async (betId: string): Promise<BetResponse> => {
    const response = await api.delete<BetResponse>(`/my-bet/${betId}`);
    return response.data;
  },
};

// Wallet endpoints
export const walletApi = {
  getTransactions: async (params: {
    page: number;
    limit: number;
    type?: string;
    id?: string;
  }): Promise<PaginatedResponse<Transaction>> => {
    // Log the params being sent
    console.log("Sending transaction request with params:", params);

    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    );

    const response = await api.get<PaginatedResponse<Transaction>>(
      "/my-transactions",
      {
        params: cleanParams,
      }
    );

    console.log("Transaction response:", response.data);
    return response.data;
  },
};
