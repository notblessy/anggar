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
    <Sidebar className="bg-background dark:bg-background border-r border-border dark:border-border">
      <SidebarHeader>
        <div className="flex items-center justify-center gap-3 px-4 py-3 border-b dark:border-border">
          <div className="w-10 h-10 bg-primary-lighter dark:bg-primary-lighter rounded-full flex items-center justify-center">
            <Image
              src="/anggar.webp"
              width={48}
              height={48}
              className="p-1"
              alt="Anggar Logo"
            />
          </div>
          <div className="text-sm font-semibold">ANGGAR DASHBOARD</div>
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
                      "hover:bg-primary-darker dark:hover:bg-primary-darker py-5",
                      pathname === item.href &&
                        "bg-primary-darker dark:bg-primary-darker text-accent-darkest dark:text-accent-darkest"
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
                  className="hover:bg-primary-darker dark:hover:bg-primary-darker py-5"
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
