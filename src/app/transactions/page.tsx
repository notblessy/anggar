import { TransactionHistoryContent } from "@/components/TransactionHistoryContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
  description: "View your expenses or income transactions.",
};

export default function TransactionPage() {
  return (
    <div className="container flex justify-center">
      <TransactionHistoryContent />
    </div>
  );
}
