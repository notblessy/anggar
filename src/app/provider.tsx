"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const path = usePathname();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {path !== "/auth" ? (
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <main className="w-full flex justify-center overflow-y-auto">
              <div className="w-full flex flex-col items-center mx-auto py-6 px-4">
                <div className="flex justify-between mb-4 w-full">
                  <SidebarTrigger
                    className="p-1 w-10 h-10 border border-border bg-background dark:bg-background rounded-md"
                    size="lg"
                  />
                  <ModeToggle />
                </div>
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      ) : (
        <div className="flex h-screen w-full">{children}</div>
      )}
    </ThemeProvider>
  );
}
