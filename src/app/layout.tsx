import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anggar - Personal Finance Manager",
  description: 'A simple personal finance manager from "Anggaran"',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <SidebarTrigger className="p-1 w-14 h-10" size="lg" />
              <main className="w-full flex justify-center overflow-y-auto">
                <div className="w-full flex flex-col items-center mx-auto py-6 px-4">
                  <div className="flex justify-end mb-4 w-full">
                    <ModeToggle />
                  </div>
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
