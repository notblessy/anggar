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

// Dummy data for expenses
const dummyExpenses = [
  {
    id: 1,
    icon: "🛒",
    date: "2023-06-01",
    description: "Groceries",
    amount: 150.0,
    category: "Food",
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    icon: "⚡",
    date: "2023-06-05",
    description: "Electric Bill",
    amount: 80.0,
    category: "Utilities",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 3,
    icon: "🎬",
    date: "2023-06-10",
    description: "Movie Tickets",
    amount: 30.0,
    category: "Entertainment",
    paymentMethod: "Cash",
  },
  {
    id: 4,
    icon: "🏠",
    date: "2023-07-01",
    description: "Rent",
    amount: 1200.0,
    category: "Housing",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 5,
    icon: "⛽",
    date: "2023-07-15",
    description: "Gas",
    amount: 40.0,
    category: "Transportation",
    paymentMethod: "Credit Card",
  },
];

export function ExpensesContent() {
  const [expenses, setExpenses] = useState(dummyExpenses);
  const [search, setSearch] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredExpenses = expenses.filter((expense) => {
    return (
      expense.description.toLowerCase().includes(search.toLowerCase()) ||
      expense.category.toLowerCase().includes(search.toLowerCase()) ||
      expense.paymentMethod.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleCreateExpense = (newExpense) => {
    setExpenses([
      ...expenses,
      { id: expenses.length + 1, icon: "💰", ...newExpense },
    ]);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search expenses..."
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
            Add Expense
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 dark:border-gray-700">
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Payment Method</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow
                  key={expense.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{expense.icon}</span>
                      {expense.description}
                    </div>
                  </TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.paymentMethod}</TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{expense.date}</TableCell>
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
          onCreateExpense={handleCreateExpense}
        />
      </div>
    </>
  );
}
