"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth";
import { useGoogleLogin } from "@react-oauth/google";

import Image from "next/image";

export function LoginForm() {
  const { onAuthenticateGoogle, loading } = useAuth();

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => {
      return onAuthenticateGoogle(tokenResponse);
    },
    onError: (tokenResponse) => console.error(tokenResponse),
  });

  return (
    <Card className="w-[400px] shadow-lg bg-background-lighter">
      <CardHeader className="pb-2">
        <div className="flex flex-col items-center space-y-2 mb-4">
          <div className="flex rounded-full bg-background-darker w-10 h-10 items-center">
            <Image src="/anggar.webp" alt="Anggar" width={38} height={38} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome to Anggar
          </h1>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="w-full text-foreground"
            onClick={() => login()}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-transparent"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
