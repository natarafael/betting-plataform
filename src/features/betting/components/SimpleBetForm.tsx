import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePlaceBet } from "@/lib/api/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useBalance } from "@/hooks/useBalance";
import { Wallet } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { createBetSchema, type BetFormData } from "@/schemas/betting";

const SimpleBetForm = () => {
  const { balance, formattedBalance } = useBalance();
  const queryClient = useQueryClient();
  const { mutate: placeBet, isPending } = usePlaceBet(queryClient);

  const betSchema = createBetSchema(balance);

  const form = useForm<BetFormData>({
    resolver: zodResolver(betSchema),
    defaultValues: {
      amount: 0,
      selection: "Giants",
    },
  });

  const amount = form.watch("amount");

  const potentialWin = amount ? formatCurrency(amount * 2) : "-";

  const amountError = form.formState.errors.amount;
  const isInsufficientBalance = amount > balance;

  const onSubmit = (data: BetFormData) => {
    placeBet(data.amount);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="border-b bg-card">
        <CardTitle className="flex items-center justify-between">
          <span>Place Your Bet</span>
          <div className="flex items-center gap-2 text-sm font-normal">
            <Wallet className="h-4 w-4" />
            <span>{formattedBalance}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-lg font-semibold">Select Team</Label>
              <span className="text-sm text-muted-foreground">Odds: 2.00</span>
            </div>

            <RadioGroup
              defaultValue="Giants"
              onValueChange={(value) =>
                form.setValue("selection", value as "Giants" | "Lakers")
              }
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <RadioGroupItem
                  value="Giants"
                  id="giants"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="giants"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="font-semibold">Giants</span>
                  <span className="text-sm text-muted-foreground">Home</span>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem
                  value="Lakers"
                  id="lakers"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="lakers"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="font-semibold">Lakers</span>
                  <span className="text-sm text-muted-foreground">Away</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="amount" className="text-lg font-semibold">
                Bet Amount
              </Label>
              <span className="text-sm text-muted-foreground">
                Min: 1 | Max: {formattedBalance}
              </span>
            </div>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                min={1}
                max={balance}
                placeholder="Enter amount"
                onChange={(e) =>
                  form.setValue("amount", Number(e.target.value))
                }
                className={cn(
                  "pr-16",
                  isInsufficientBalance &&
                    "border-destructive focus-visible:ring-destructive"
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                onClick={() => form.setValue("amount", balance)}
              >
                MAX
              </Button>
            </div>
            {amountError && (
              <p className="text-sm text-destructive">{amountError.message}</p>
            )}
          </div>

          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Potential Win</span>
              <span className="font-medium">{potentialWin}</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full font-semibold"
            size="lg"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner className="h-4 w-4" />
                Placing Bet...
              </div>
            ) : (
              "Place Bet"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SimpleBetForm;
