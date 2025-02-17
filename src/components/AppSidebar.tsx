"use client";

import { usePathname } from "next/navigation";

import { Home, DollarSign, Wallet, CreditCard, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: Home, href: "/" },
  { title: "Budgets", icon: DollarSign, href: "/budgets" },
  { title: "Wallets", icon: Wallet, href: "/wallets" },
  { title: "Transactions", icon: CreditCard, href: "/transactions" },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader>
        <div className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-200 dark:bg-gray-800 rounded-sm">
          <Image src="/anggar.png" width={24} height={24} alt="Anggar Logo" />
          <div className="text-lg font-semibold">Anggar Wealth</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "hover:bg-gray-200 dark:hover:bg-gray-800 py-5",
                      pathname === item.href &&
                        "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    )}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-2 px-4 py-2"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-gray-200 dark:hover:bg-gray-800 py-5"
                >
                  <Link
                    href="/api/auth/logout"
                    className="flex items-center space-x-2 px-4 py-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
