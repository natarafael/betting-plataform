import { z } from "zod";

export const createBetSchema = (balance: number) =>
  z.object({
    amount: z
      .number()
      .min(1, "Minimum bet is 1")
      .max(balance, `Insufficient balance. Maximum is ${balance}`),
    selection: z.enum(["Giants", "Lakers"]),
  });

export type BetFormData = z.infer<ReturnType<typeof createBetSchema>>;
