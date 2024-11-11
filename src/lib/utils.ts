import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BET_STATUS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const getBetStatus = (status: string | number) => {
  if (typeof status === "number") return status;

  // Map string status to numbers
  switch (status.toLowerCase()) {
    case "pending":
      return BET_STATUS.PENDING;
    case "win":
    case "won":
      return BET_STATUS.WON;
    case "lost":
    case "lose":
      return BET_STATUS.LOST;
    case "cancelled":
    case "canceled":
      return BET_STATUS.CANCELLED;
    default:
      return BET_STATUS.PENDING; // default case
  }
};
