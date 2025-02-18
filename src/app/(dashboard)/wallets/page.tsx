"use client";

import { WalletContent } from "@/components/WalletContent";
import { useAuth } from "@/lib/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WalletPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user]);

  return (
    <div className="container flex justify-center">
      <WalletContent />
    </div>
  );
}
