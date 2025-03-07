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
import { useScopes, Scope } from "@/lib/hooks/useScopes";

import moment from "moment";
import { CreateScope } from "./dialog/CreateScope";
import { UpdateScope } from "./dialog/UpdateScope";
import { Confirmation } from "./dialog/Confirmation";

export function ScopeContent() {
  const { data: scopes, onQuery, delete: deleteScope } = useScopes();

  const [search, setSearch] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState<Scope>({
    id: "",
    name: "",
    created_at: "",
  });

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-5">Scopes</h1>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              placeholder="Search scopes..."
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
            Add Scope
          </Button>
        </div>

        <div className="bg-background-white dark:bg-background-white rounded-lg border border-border dark:border-border">
          <Table className="rounded-lg">
            <TableHeader className="bg-background-lighter dark:bg-background-lighter rounded-t-lg">
              <TableRow className="bg-background-lighter dark:bg-background-lighter border-b border-border dark:border-border">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Date Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scopes?.records?.length > 0 ? (
                scopes?.records.map((scope) => (
                  <TableRow
                    key={scope.id}
                    className="border-b border-border dark:border-border"
                  >
                    <TableCell className="font-medium">{scope.id}</TableCell>
                    <TableCell>{scope.name}</TableCell>
                    <TableCell>
                      {moment(scope.created_at).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell className="flex flex-row gap-2">
                      <Button
                        onClick={() => {
                          setSelectedScope(scope);
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
                          setSelectedScope(scope);
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
            onClick={() => onQuery({ page: +scopes?.page_summary?.page - 1 })}
            disabled={scopes?.page_summary?.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {/* Page {currentPage} of {totalPages} */}
            Page {scopes?.page_summary?.page} of{" "}
            {Math.ceil(
              scopes?.page_summary?.total / scopes?.page_summary?.size
            )}
          </span>
          <Button
            variant="outline"
            onClick={() => onQuery({ page: +scopes?.page_summary?.page + 1 })}
            disabled={!scopes?.page_summary?.has_next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <UpdateScope
          data={selectedScope}
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
        />

        <CreateScope
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
        />

        <Confirmation
          isOpen={isDeleteDialogOpen}
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            deleteScope.onDelete(selectedScope.id);
            setIsDeleteDialogOpen(false);
          }}
          title="Delete Scope"
          message="Are you sure you want to delete this scope?"
        />
      </div>
    </>
  );
}
