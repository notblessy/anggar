import { LoginForm } from "@/components/LoginForm";
import { useToast } from "@/lib/context/toast";
import { useEffect } from "react";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background-lighter bg-center"
      style={{
        backgroundImage: `url('/bg.jpg')`,
      }}
    >
      <LoginForm />
    </div>
  );
}
