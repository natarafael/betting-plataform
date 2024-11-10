import { useAuthStore } from "@/stores/auth";
import { formatCurrency } from "@/lib/utils";

export const useBalance = () => {
  const user = useAuthStore((state) => state.user);
  const updateBalance = useAuthStore((state) => state.updateBalance);

  return {
    balance: user?.balance ?? 0,
    currency: user?.currency ?? "BRL",
    formattedBalance: formatCurrency(user?.balance ?? 0),
    updateBalance,
  };
};
