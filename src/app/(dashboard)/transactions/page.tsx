"use client";

import { TransactionHistoryContent } from "@/components/TransactionHistoryContent";
import { useAuth } from "@/lib/context/auth";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TransactionPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user]);

  return (
    <div className="container flex justify-center">
      <TransactionHistoryContent />
    </div>
  );
}
