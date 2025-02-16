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
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { CreateExpenseDialog } from "./dialog/CreateExpenseDialog";
import { dummyWallets } from "@/lib/dummy";

export function WalletContent() {
  const [wallets, setWallets] = useState(dummyWallets);
  const [search, setSearch] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredWallets = wallets.filter((wallet) => {
    return (
      wallet.name.toLowerCase().includes(search.toLowerCase()) ||
      wallet.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleCreateBudgets = (newBudget: any) => {
    setWallets([
      ...wallets,
      { id: wallets.length + 1, icon: "💰", ...newBudget },
    ]);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-5">Wallets</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search wallets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-[300px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Budget
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 dark:border-gray-700">
                <TableHead className="font-semibold">Id</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Balance</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWallets.map((wallet) => (
                <TableRow
                  key={wallet.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <TableCell className="font-medium">{wallet.id}</TableCell>
                  <TableCell>{wallet.name}</TableCell>
                  <TableCell>{wallet.balance}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <CreateExpenseDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onCreateExpense={handleCreateBudgets}
        />
      </div>
    </>
  );
}
