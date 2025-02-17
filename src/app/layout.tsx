import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anggar - Personal Finance Manager",
  description: 'A simple personal finance manager from "Anggaran"',
  icons: {
    icon: "/favicon.ico",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-background-lightest dark:bg-background-lightest"
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
