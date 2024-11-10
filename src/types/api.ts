export interface ApiError {
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface LoginResponse {
  id: string;
  name: string;
  balance: number;
  currency: string;
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
}

export interface BetResponse {
  transactionId: string;
  currency: string;
  balance: number;
  winAmount: number;
}

export interface User {
  id: string;
  name: string;
  balance: number;
  currency: string;
}
