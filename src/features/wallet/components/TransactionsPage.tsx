import { useState } from "react";
import { useTransactions } from "@/lib/api/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { formatCurrency } from "@/lib/utils";
import { TRANSACTION_TYPE } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";

// Define status options with proper mapping to API values
const TRANSACTION_OPTIONS = [
  { value: "all", label: "All Transactions" },
  { value: "bet", label: "Bets" },
  { value: "win", label: "Wins" },
  { value: "cancel", label: "Refunds" },
] as const;

const TYPE_DISPLAY_MAP = {
  bet: {
    label: "Bet",
    className: "text-yellow-500 font-medium",
  },
  win: {
    label: "Win",
    className: "text-green-500 font-medium",
  },
  cancel: {
    label: "Refund",
    className: "text-blue-500 font-medium",
  },
} as const;

const getTransactionTypeDisplay = (type: string) => {
  // Add a console.log to check the incoming type
  console.log("Transaction type before processing:", type);

  switch (type.toLowerCase()) {
    case "bet":
      return <span className="text-yellow-500 font-medium">Bet</span>;
    case "win":
      return <span className="text-green-500 font-medium">Win</span>;
    case "cancel":
    case "refund":
      return <span className="text-blue-500 font-medium">Refund</span>;
    default:
      console.warn(`Unknown transaction type: ${type}`);
      return <span className="text-gray-500">Unknown</span>;
  }
};

const ITEMS_PER_PAGE = 10;

const TransactionsPage = () => {
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("all");
  const queryClient = useQueryClient();

  // Map the UI type to API type
  const getApiType = (uiType: string) => {
    const option = TRANSACTION_OPTIONS.find((opt) => opt.value === uiType);
    console.log("Mapping UI type to API type:", {
      uiType,
      apiValue: option?.apiValue,
    });
    return option?.apiValue;
  };

  const apiType = selectedType === "all" ? undefined : selectedType;

  // Get transactions with server-side filtering
  const { data, isLoading, isError } = useTransactions(
    page,
    ITEMS_PER_PAGE,
    apiType
  );

  console.log("Current transaction data:", {
    selectedType,
    apiType,
    dataLength: data?.data?.length,
    firstTransaction: data?.data?.[0],
  });

  const handleTypeChange = (newType: string) => {
    console.log("Type changing to:", newType);
    console.log("API type will be:", newType === "all" ? undefined : newType);

    queryClient.removeQueries(["transactions"]);
    setSelectedType(newType);
    setPage(1);
  };

  const isDebit = (type: string) => type.toLowerCase() === "bet";

  const getTransactionTypeDisplay = (type: string) => {
    const displayConfig = TYPE_DISPLAY_MAP[type.toLowerCase()];
    if (!displayConfig) {
      console.warn(`Unknown transaction type: ${type}`);
      return <span className="text-gray-500">Unknown</span>;
    }
    return (
      <span className={displayConfig.className}>{displayConfig.label}</span>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">My Transactions</CardTitle>
        <CardDescription>View your transaction history</CardDescription>

        <div className="mt-4 flex justify-between items-center">
          <Select value={selectedType} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type">
                {
                  TRANSACTION_OPTIONS.find((opt) => opt.value === selectedType)
                    ?.label
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {TRANSACTION_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <LoadingSpinner className="h-8 w-8" />
          </div>
        ) : isError ? (
          <div className="text-center text-destructive">
            Failed to load transactions. Please try again.
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {getTransactionTypeDisplay(transaction.type)}
                      </TableCell>
                      <TableCell
                        className={`text-right ${
                          isDebit(transaction.type)
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {isDebit(transaction.type) ? "-" : "+"}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </TableCell>
                    </TableRow>
                  ))}
                  {(data?.data.length ?? 0) === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <button
                className="px-4 py-2 text-sm rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
              >
                Previous
              </button>
              <span className="text-sm">
                Page {page} of {Math.ceil((data?.total ?? 0) / ITEMS_PER_PAGE)}
              </span>
              <button
                className="px-4 py-2 text-sm rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setPage((p) => p + 1)}
                disabled={
                  !data?.total ||
                  page >= Math.ceil(data.total / ITEMS_PER_PAGE) ||
                  isLoading
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsPage;
