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
import { SubmitHandler, useForm } from "react-hook-form";
import { Scope, useScopes } from "@/lib/hooks/useScopes";

interface CreateScopeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateScope({ isOpen, onClose }: CreateScopeDialogProps) {
  const { onAdd } = useScopes();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Scope>();

  const onSubmit: SubmitHandler<Scope> = (data) => {
    onAdd({
      name: data.name,
    });

    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Scope</DialogTitle>
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
          <DialogFooter className="flex flex-col pt-8">
            <Button
              type="submit"
              className="flex-1 bg-primary text-foreground hover:bg-secondary dark:bg-primary-darker dark:text-foreground dark:hover:bg-secondary mb-6"
            >
              Add Scope
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
