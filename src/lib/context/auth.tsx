"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import useSWR, { mutate } from "swr";
import api from "@/lib/api";

import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

type UserType = {
  id: number;
  email: string;
  name: string;
  picture: string;
  role: string;
};

interface AuthContextType {
  loading: boolean;
  user: UserType | null;
  onAuthenticateGoogle: (data: any) => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

import { ReactNode } from "react";
import { useToast } from "./toast";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const toast = useToast();

  const [cookies, setCookie, removeCookie] = useCookies();

  const [accessToken, setAccessToken] = useState(cookies.accessToken || "");

  const {
    data: user,
    error,
    isLoading,
    isValidating,
  } = useSWR(() => (accessToken ? "/v1/users/profile" : ""));

  useEffect(() => {
    if (cookies.accessToken) {
      setAccessToken(cookies.accessToken);
    }
  }, [cookies]);

  const [loading, setLoading] = useState(false);

  const onAuthenticateGoogle = useCallback(
    async (data: any) => {
      setLoading(true);
      try {
        const { data: res } = await api.post("/v1/auth/login/google", data);

        if (res.data && res.message === "success") {
          var expiredAt = new Date();
          expiredAt.setMonth(expiredAt.getMonth() + 1);

          setAccessToken(res.data.token);
          setCookie("accessToken", res.data.token, {
            path: "/",
            expires: expiredAt,
          });

          setTimeout(() => {
            mutate("/v1/users/profile");
            router.push("/");
          }, 500);
        } else if (res.success && !res.data) {
          toast.showToast(res.message, "error");
        } else {
          toast.showToast("Something went wrong", "error");
        }
      } catch (error) {
        toast.showToast("Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    },
    [router, setCookie, toast]
  );

  const onLogout = () => {
    setAccessToken("");
    removeCookie("accessToken", { path: "/" });
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        loading: isLoading || isValidating || loading,
        user,
        onAuthenticateGoogle,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
