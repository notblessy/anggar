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
import { useScopes, Scope } from "@/lib/hooks/useScopes";
import { SubmitHandler, useForm } from "react-hook-form";

interface UpdateScopeProps {
  data: Scope;
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateScope({ data, isOpen, onClose }: UpdateScopeProps) {
  const { edit, delete: deleteScope } = useScopes();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Scope>({
    defaultValues: {
      id: data.id,
      name: data.name,
      created_at: data.created_at,
    },
  });

  const onSubmit: SubmitHandler<Scope> = (data) => {
    edit.onEdit({
      id: data.id,
      name: data.name,
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
        created_at: data.created_at,
      });
    }
  }, [data, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Update New Scope
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
