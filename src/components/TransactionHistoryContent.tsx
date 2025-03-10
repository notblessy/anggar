"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Edit2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTransactions, Transaction } from "@/lib/hooks/useTransactions";

import moment from "moment";
import { CreateTransaction } from "./dialog/CreateTransaction";
// import { UpdateTransaction } from "./dialog/UpdateTransaction";
import { Confirmation } from "./dialog/Confirmation";

export function TransactionHistoryContent() {
  const {
    data: transactions,
    onAdd,
    onQuery,
    delete: deleteTransaction,
  } = useTransactions();

  const [search, setSearch] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>({
    id: "",
    wallet_id: 0,
    category: "",
    transaction_type: "",
    description: "",
    spent_at: "",
    amount: 0,
    created_at: "",
  });

  const handleCreateTransaction = (newBudget: any) => {
    onAdd(newBudget);
    setIsCreateDialogOpen(false);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-5">Transactions</h1>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                onQuery({
                  keyword: e.target.value,
                });
              }}
              className="pl-10 w-[300px] text-primary-foreground bg-background-white dark:bg-background-white border-border dark:border-border"
            />
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary text-foreground hover:bg-secondary dark:bg-primary-darker dark:text-foreground dark:hover:bg-secondary mb-6"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        <div className="bg-background-white dark:bg-background-white rounded-lg border border-border dark:border-border">
          <Table className="rounded-lg">
            <TableHeader className="bg-background-lighter dark:bg-background-lighter rounded-t-lg">
              <TableRow className="bg-background-lighter dark:bg-background-lighter border-b border-border dark:border-border">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Spent At</TableHead>
                <TableHead className="font-semibold">Date Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.records?.length > 0 ? (
                transactions?.records.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="border-b border-border dark:border-border"
                  >
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.transaction_type}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{`Rp${new Intl.NumberFormat("id-ID").format(
                      transaction.amount
                    )}`}</TableCell>
                    <TableCell>
                      {moment(transaction.spent_at).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(transaction.created_at).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell className="flex flex-row gap-2">
                      <Button
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setIsUpdateDialogOpen(true);
                        }}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setIsDeleteDialogOpen(true);
                        }}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end items-center space-x-2 mt-4">
          <Button
            variant="outline"
            onClick={() =>
              onQuery({ page: +transactions?.page_summary?.page - 1 })
            }
            disabled={transactions?.page_summary?.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {/* Page {currentPage} of {totalPages} */}
            Page {transactions?.page_summary?.page || 0} of{" "}
            {Math.ceil(
              transactions?.page_summary?.total /
                transactions?.page_summary?.size || 0
            )}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              onQuery({ page: +transactions?.page_summary?.page + 1 })
            }
            disabled={!transactions?.page_summary?.has_next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* <UpdateTransaction
          data={selectedTransaction}
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
        /> */}

        <CreateTransaction
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
        />

        <Confirmation
          isOpen={isDeleteDialogOpen}
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            deleteTransaction.onDelete(selectedTransaction.id);
            setIsDeleteDialogOpen(false);
          }}
          title="Delete Transaction"
          message="Are you sure you want to delete this transaction?"
        />
      </div>
    </>
  );
}
