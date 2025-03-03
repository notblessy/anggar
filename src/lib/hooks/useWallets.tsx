import { useCallback, useState } from "react";
import { useAuth } from "../context/auth";
import { useToast } from "../context/toast";
import { ApiResponse, PaginatedResponse } from "@/lib/types";

import useSWR, { mutate } from "swr";
import api from "@/lib/api";


interface Wallet {
  id: string;
  name: string;
  balance: number;
  created_at: string;
}

interface QueryParams {
  page?: number;
  size?: number;
  sort?: string;
  keyword?: string;
}

export const useWallets = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sort, setSort] = useState<string>("-created_at");
  const [keyword, setKeyword] = useState<string>("");

  const pathKey = `v1/wallets${user ? `?page=${page}&size=${size}&sort=${sort}&keyword=${keyword}` : ""}`;
  const { data, error, isValidating } = useSWR<ApiResponse<PaginatedResponse<Wallet>>>(pathKey);

  const onAdd = useCallback(
    async (walletData: Partial<Wallet>) => {
      setLoading(true);
      try {
        const { data: res } = await api.post<ApiResponse<null>>("v1/wallets", walletData);

        if (res.success) {
          mutate(pathKey);
          toast.showToast("Success add wallet", "success");
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
    async (wallet: Wallet) => {
      setEditLoading(true);
      try {
        const { data: res } = await api.put<ApiResponse<null>>(`v1/wallets/${wallet.id}`, wallet);

        if (res.success) {
          mutate(pathKey);
          toast.showToast("Success update wallet", "success");
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
        const { data: res } = await api.delete<ApiResponse<null>>(`v1/wallets/${id}`);

        if (res.success) {
          mutate(pathKey);
          toast.showToast("Success delete wallet", "success");
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
    data: data?.data ?? { records: [] },
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
