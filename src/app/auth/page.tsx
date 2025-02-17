import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/bg.jpg')`,
      }}
    >
      <LoginForm />
    </div>
  );
}
