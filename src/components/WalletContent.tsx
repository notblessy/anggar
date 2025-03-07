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
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Edit2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useWallets, Wallet } from "@/lib/hooks/useWallets";

import moment from "moment";
import { CreateWallet } from "./dialog/CreateWallet";
import { UpdateWallet } from "./dialog/UpdateWallet";
import { Confirmation } from "./dialog/Confirmation";
import { set } from "date-fns";

export function WalletContent() {
  const { data: wallets, onAdd, onQuery, delete: deleteWallet } = useWallets();

  const [search, setSearch] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet>({
    id: "",
    name: "",
    balance: 0,
    created_at: "",
  });

  const handleCreateWallet = (newBudget: any) => {
    onAdd(newBudget);
    setIsCreateDialogOpen(false);
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
              onChange={(e) => {
                setSearch(e.target.value);
                onQuery({
                  keyword: e.target.value,
                });
              }}
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
                <TableHead className="font-semibold">Date Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wallets?.records?.length > 0 ? (
                wallets?.records.map((wallet) => (
                  <TableRow
                    key={wallet.id}
                    className="border-b border-border dark:border-border"
                  >
                    <TableCell className="font-medium">{wallet.id}</TableCell>
                    <TableCell>{wallet.name}</TableCell>
                    <TableCell>{`Rp${new Intl.NumberFormat("id-ID").format(
                      wallet.balance
                    )}`}</TableCell>
                    <TableCell>
                      {moment(wallet.created_at).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell className="flex flex-row gap-2">
                      <Button
                        onClick={() => {
                          setSelectedWallet(wallet);
                          setIsUpdateDialogOpen(true);
                        }}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedWallet(wallet);
                          setIsDeleteDialogOpen(true);
                        }}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end items-center space-x-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onQuery({ page: +wallets?.page_summary?.page - 1 })}
            disabled={wallets?.page_summary?.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {/* Page {currentPage} of {totalPages} */}
            Page {wallets?.page_summary?.page} of{" "}
            {Math.ceil(
              wallets?.page_summary?.total / wallets?.page_summary?.size
            )}
          </span>
          <Button
            variant="outline"
            onClick={() => onQuery({ page: +wallets?.page_summary?.page + 1 })}
            disabled={!wallets?.page_summary?.has_next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <UpdateWallet
          data={selectedWallet}
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
        />

        <CreateWallet
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onAdd={handleCreateWallet}
        />

        <Confirmation
          isOpen={isDeleteDialogOpen}
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            deleteWallet.onDelete(selectedWallet.id);
            setIsDeleteDialogOpen(false);
          }}
          title="Delete Wallet"
          message="Are you sure you want to delete this wallet?"
        />
      </div>
    </>
  );
}
