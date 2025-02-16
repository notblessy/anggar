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
import { dummyBudgets } from "@/lib/dummy";

export function BudgetContent() {
  const [budgets, setBudgets] = useState(dummyBudgets);
  const [search, setSearch] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredBudgets = budgets.filter((budget) => {
    return (
      budget.name.toLowerCase().includes(search.toLowerCase()) ||
      budget.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleCreateBudget = (newBudget: any) => {
    setBudgets([
      ...budgets,
      { id: budgets.length + 1, icon: "💰", ...newBudget },
    ]);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-5">Budgets</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search budgets..."
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
                <TableHead className="font-semibold">Limit</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBudgets.map((budget) => (
                <TableRow
                  key={budget.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <TableCell className="font-medium">{budget.id}</TableCell>
                  <TableCell>{budget.name}</TableCell>
                  <TableCell>{budget.limit}</TableCell>
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
          onCreateExpense={handleCreateBudget}
        />
      </div>
    </>
  );
}
