import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import { cn } from "@/lib/utils";

import config from "../../config";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "bg-background-lightest dark:bg-background-lightest"
        )}
        suppressHydrationWarning
      >
        <Providers googleClientId={config.GOOGLE_CLIENT_ID || ""}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
