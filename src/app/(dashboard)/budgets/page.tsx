"use client";

import { BudgetContent } from "@/components/BudgetContent";
import { useAuth } from "@/lib/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BudgetPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user]);

  return (
    <div className="container flex justify-center">
      <BudgetContent />
    </div>
  );
}
