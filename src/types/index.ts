export interface User {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

export interface Bet {
  id: string;
  createdAt: string;
  amount: number;
  winAmount: number;
  status: string;
}

export interface Transaction {
  id: string;
  createdAt: string;
  amount: number;
  type: number;
}
