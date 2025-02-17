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
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              placeholder="Search wallets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-[300px] text-primary-foreground bg-background-white dark:bg-background-white border-border dark:border-border"
            />
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary text-foreground hover:bg-secondary dark:bg-primary-darker dark:text-foreground dark:hover:bg-secondary mb-6"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Wallet
          </Button>
        </div>

        <div className="bg-background-white dark:bg-background-white rounded-lg border border-border dark:border-border">
          <Table className="rounded-lg">
            <TableHeader className="bg-background-lighter dark:bg-background-lighter rounded-t-lg">
              <TableRow className="bg-background-lighter dark:bg-background-lighter border-b border-border dark:border-border">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Balance</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWallets.map((wallet) => (
                <TableRow
                  key={wallet.id}
                  className="border-b border-border dark:border-border"
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
