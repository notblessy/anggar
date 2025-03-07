import { useCallback, useState } from "react";
import { useAuth } from "../context/auth";
import { useToast } from "../context/toast";
import { ApiResponse, PaginatedResponse } from "@/lib/types";

import useSWR, { mutate } from "swr";
import api from "@/lib/api";

export interface Transaction {
  id: string;
  wallet_id: number;
  category: string;
  transaction_type: string;
  description: string;
  spent_at: string;
  amount: number;
  created_at: string;
}

interface QueryParams {
  page?: number;
  size?: number;
  sort?: string;
  keyword?: string;
}

export const useTransactions = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sort, setSort] = useState<string>("-created_at");
  const [keyword, setKeyword] = useState<string>("");

  const pathKey = `v1/transactions${
    user ? `?page=${page}&size=${size}&sort=${sort}&keyword=${keyword}` : ""
  }`;
  const { data, error, isValidating } =
    useSWR<ApiResponse<PaginatedResponse<Transaction>>>(pathKey);

  const onAdd = useCallback(
    async (transactionData: Partial<Transaction>) => {
      setLoading(true);
      try {
        const { data: res } = await api.post<ApiResponse<null>>(
          "v1/transactions",
          transactionData
        );

        if (res.success) {
          mutate(pathKey);
          toast.showToast("Success add transaction", "success");
        } else {
          toast.showToast("Something went wrong", "error");
        }
      } catch (error) {
        toast.showToast("Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    },
    [pathKey, toast]
  );

  const onQuery = useCallback((props: QueryParams) => {
    if (props.page !== undefined) setPage(props.page);
    if (props.size !== undefined) setSize(props.size);
    if (props.sort !== undefined) setSort(props.sort);
    if (props.keyword !== undefined) setKeyword(props.keyword);
  }, []);

  const onEdit = useCallback(
    async (transaction: Transaction) => {
      setEditLoading(true);
      try {
        const { data: res } = await api.put<ApiResponse<null>>(
          `v1/transactions/${transaction.id}`,
          transaction
        );

        if (res.success) {
          mutate(pathKey);
          toast.showToast("Success update transaction", "success");
        } else {
          toast.showToast("Something went wrong", "error");
        }
      } catch (error) {
        toast.showToast("Something went wrong", "error");
      } finally {
        setEditLoading(false);
      }
    },
    [pathKey, toast]
  );

  const onDelete = useCallback(
    async (id: string) => {
      setDeleteLoading(true);
      try {
        const { data: res } = await api.delete<ApiResponse<null>>(
          `v1/transactions/${id}`
        );

        if (res.success) {
          mutate(pathKey);
          toast.showToast("Success delete transaction", "success");
        } else {
          toast.showToast("Something went wrong", "error");
        }
      } catch (error) {
        toast.showToast("Something went wrong", "error");
      } finally {
        setDeleteLoading(false);
      }
    },
    [pathKey, toast]
  );

  return {
    data: data?.data as
      | PaginatedResponse<Transaction>
      | {
          records: [];
          page_summary: { has_next: false; page: 1; size: 5; total: 0 };
        },
    onQuery,
    onAdd,
    delete: {
      onDelete,
      loading: deleteLoading,
    },
    edit: {
      onEdit,
      loading: editLoading,
    },
    loading: loading || (!error && !data) || isValidating,
  };
};
