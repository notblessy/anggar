"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CreateExpenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (expense: {
    name: string;
    balance: number;
  }) => void;
}

export function CreateWallet({
  isOpen,
  onClose,
  onAdd,
}: CreateExpenseDialogProps) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({
      name,
      balance: Number.parseFloat(balance),
    });
    onClose();
    // Reset form
    setName("");
    setBalance("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Wallet
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-50 dark:bg-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
              className="bg-gray-50 dark:bg-gray-700"
            />
          </div>
          <DialogFooter className="flex flex-col pt-8">
            <Button
              type="submit"
              className="flex-1 bg-primary text-foreground hover:bg-secondary dark:bg-primary-darker dark:text-foreground dark:hover:bg-secondary mb-6"
            >
              Add Wallet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}