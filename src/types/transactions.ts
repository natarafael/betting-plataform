export enum TransactionType {
  BET = 0,
  WIN = 1,
  REFUND = 2,
}

export interface Transaction {
  id: string;
  createdAt: string;
  amount: number;
  type: TransactionType;
}

export interface TransactionResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
}

export const normalizeTransactionType = (type: string): TransactionType => {
  switch (type.toLowerCase()) {
    case "bet":
      return TransactionType.BET;
    case "win":
      return TransactionType.WIN;
    case "cancel":
    case "refund":
      return TransactionType.REFUND;
    default:
      console.warn(`Unknown transaction type: ${type}`);
      return TransactionType.BET;
  }
};
