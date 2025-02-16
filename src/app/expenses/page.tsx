import { ExpensesContent } from "@/components/ExpenseContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expenses | Financial Tracker",
  description: "Manage your expenses",
};

export default function ExpensesPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold">Financial Tracker - Expenses</h1>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <ExpensesContent />
        </div>
      </div>
    </div>
  );
}
