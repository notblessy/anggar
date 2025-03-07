"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Transaction, useTransactions } from "@/lib/hooks/useTransactions";
import { categories } from "@/lib/utils";
import Chip from "../ui/chip";
import { useWalletOptions } from "@/lib/hooks/useWallets";

interface CreateTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTransaction({
  isOpen,
  onClose,
}: CreateTransactionDialogProps) {
  const { onAdd } = useTransactions();

  const { data: walletOptions, loading } = useWalletOptions();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<Transaction>();

  const onSubmit: SubmitHandler<Transaction> = (data) => {
    onAdd({
      ...data,
      wallet_id: +data.wallet_id,
      amount: Number(data.amount),
      spent_at: new Date(data.spent_at).toISOString(),
    });

    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Transaction
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Input
              id="description"
              placeholder="Description"
              required
              className="bg-gray-50 dark:bg-gray-700"
              {...register("description")}
            />
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Wallet
              </label>
              <Controller
                name="wallet_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    value={String(field.value)}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-gray-700">
                      <SelectValue placeholder="Select wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {walletOptions.map((cat, index) => (
                        <SelectItem key={`${cat.id}`} value={String(cat.id)}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-gray-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.categories.map((cat, index) => (
                        <SelectItem
                          key={`${cat.name + index}`}
                          value={cat.name}
                        >
                          <span className="flex-1"> {cat.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="paymentMethod" className="text-sm font-medium">
                Transaction Type
              </label>
              <Controller
                name="transaction_type"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-gray-700">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="expense" value="expense">
                        Expense
                      </SelectItem>
                      <SelectItem key="income" value="income">
                        Income
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="100000"
              step="0.01"
              required
              className="bg-gray-50 dark:bg-gray-700"
              {...register("amount")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">
              Spent At
            </label>
            <Input
              id="date"
              type="date"
              required
              className="bg-gray-50 dark:bg-gray-700"
              {...register("spent_at")}
            />
          </div>
          <DialogFooter className="flex flex-col pt-8">
            <Button
              type="submit"
              className="flex-1 bg-primary text-foreground hover:bg-secondary dark:bg-primary-darker dark:text-foreground dark:hover:bg-secondary mb-6"
            >
              Add Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
