"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useWallets, Wallet } from "@/lib/hooks/useWallets";
import { SubmitHandler, useForm } from "react-hook-form";

interface UpdateWalletProps {
  data: Wallet;
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateWallet({ data, isOpen, onClose }: UpdateWalletProps) {
  const { edit, delete: deleteWallet } = useWallets();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Wallet>({
    defaultValues: {
      id: data.id,
      name: data.name,
      balance: data.balance,
      created_at: data.created_at,
    },
  });

  const onSubmit: SubmitHandler<Wallet> = (data) => {
    edit.onEdit({
      id: data.id,
      name: data.name,
      balance: data.balance,
      created_at: data.created_at,
    });

    onClose();
    reset();
  };

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        name: data.name,
        balance: data.balance,
        created_at: data.created_at,
      });
    }
  }, [data, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Update New Wallet
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              required
              className="bg-gray-50 dark:bg-gray-700"
              {...register("name")}
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
              required
              className="bg-gray-50 dark:bg-gray-700"
              {...register("balance")}
            />
          </div>
          <DialogFooter className="flex flex-row justify-between pt-8">
            <Button
              type="submit"
              className="flex-1 bg-primary text-foreground hover:bg-secondary dark:bg-primary-darker dark:text-foreground dark:hover:bg-secondary mb-6"
            >
              Edit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
