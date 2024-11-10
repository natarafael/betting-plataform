import { Card, CardContent } from "@/components/ui/card";
import { useBalance } from "@/hooks/useBalance";

export const Balance = () => {
  const { formattedBalance } = useBalance();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-2xl font-bold">{formattedBalance}</div>
        <div className="text-sm text-muted-foreground">Available Balance</div>
      </CardContent>
    </Card>
  );
};
