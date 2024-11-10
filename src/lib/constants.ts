export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const BET_STATUS = {
  PENDING: 0,
  WON: 1,
  LOST: 2,
  CANCELLED: 3,
} as const;

export const TRANSACTION_TYPE = {
  BET: 0,
  WIN: 1,
  REFUND: 2,
} as const;
