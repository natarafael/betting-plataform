import { useEffect, useState } from "react";
import { useBets, useCancelBet } from "@/lib/api/hooks";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { formatCurrency } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { BET_STATUS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 10;

const STATUS_OPTIONS = [
  { value: "all", label: "All Bets", apiValue: undefined },
  { value: "pending", label: "Pending", apiValue: "pending" },
  { value: "win", label: "Won", apiValue: "win" },
  { value: "lost", label: "Lost", apiValue: "lost" },
  { value: "canceled", label: "Cancelled", apiValue: "canceled" },
] as const;

const MyBetsPage = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("all");
  const queryClient = useQueryClient();
  const { t } = useTranslation("betting");

  const getApiStatus = (uiStatus: string) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === uiStatus);
    return option?.apiValue;
  };

  // Convert status for API
  const apiStatus = status === "all" ? undefined : getApiStatus(status);

  const { data, isLoading, isError } = useBets(page, ITEMS_PER_PAGE, apiStatus);
  console.log("Current filter:", {
    page,
    limit: ITEMS_PER_PAGE,
    status: apiStatus,
  });

  const cancelBetMutation = useCancelBet(queryClient);

  const handleCancelBet = (betId: string) => {
    cancelBetMutation.mutate(betId);
  };

  const handleStatusChange = (newStatus: string) => {
    console.log("Status changing to:", newStatus);
    console.log("API status value:", getApiStatus(newStatus));

    // Clear existing queries before changing filter
    queryClient.removeQueries(["bets"]);

    setStatus(newStatus);
    setPage(1);
  };

  useEffect(() => {
    if (data) {
      console.log("Current data:", {
        status: apiStatus,
        totalItems: data.total,
        items: data.data.length,
      });
    }
  }, [data, apiStatus]);

  const canCancelBet = (status: string | number) => {
    const normalizedStatus =
      typeof status === "string" ? status.toLowerCase() : status;

    return (
      normalizedStatus === "pending" ||
      normalizedStatus === BET_STATUS.PENDING ||
      normalizedStatus === "won" ||
      normalizedStatus === "win" ||
      normalizedStatus === BET_STATUS.WON ||
      normalizedStatus === "lost" ||
      normalizedStatus === BET_STATUS.LOST
    );
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getBetStatusText = (status: string | number) => {
    // Normalize the status to lowercase for consistent comparison
    const normalizedStatus =
      typeof status === "string" ? status.toLowerCase() : status;

    switch (normalizedStatus) {
      case "pending":
      case BET_STATUS.PENDING:
        return <span className="text-yellow-500 font-medium">Pending</span>;
      case "win":
      case "won":
      case BET_STATUS.WON:
        return <span className="text-green-500 font-medium">Won</span>;
      case "lost":
      case "lose":
      case BET_STATUS.LOST:
        return <span className="text-red-500 font-medium">Lost</span>;
      case "cancelled":
      case "canceled":
      case BET_STATUS.CANCELLED:
        return <span className="text-gray-500 font-medium">Cancelled</span>;
      default:
        return <span>Unknown</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {t("betList.title")}
        </CardTitle>
        <CardDescription>{t("betList.description")}</CardDescription>

        <div className="mt-4 flex justify-between items-center">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status">
                {STATUS_OPTIONS.find((opt) => opt.value === status)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
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
            Failed to load bets. Please try again.
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Win Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((bet) => (
                    <TableRow key={bet.id}>
                      <TableCell>{formatDate(bet.createdAt)}</TableCell>
                      <TableCell>{formatCurrency(bet.amount)}</TableCell>
                      <TableCell>{formatCurrency(bet.winAmount)}</TableCell>
                      <TableCell>{getBetStatusText(bet.status)}</TableCell>
                      <TableCell>
                        {canCancelBet(bet.status) && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                disabled={cancelBetMutation.isPending}
                              >
                                {cancelBetMutation.isPending &&
                                cancelBetMutation.variables === bet.id ? (
                                  <div className="flex items-center gap-2">
                                    <LoadingSpinner className="h-4 w-4" />
                                    Cancelling...
                                  </div>
                                ) : (
                                  "Cancel"
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Bet</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel this bet?
                                  Amount {formatCurrency(bet.amount)} will be
                                  returned to your balance.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  No, keep it
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleCancelBet(bet.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Yes, cancel bet
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {page} of {Math.ceil((data?.total ?? 0) / ITEMS_PER_PAGE)}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={
                  isLoading ||
                  !data?.total ||
                  page >= Math.ceil(data.total / ITEMS_PER_PAGE)
                }
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MyBetsPage;
