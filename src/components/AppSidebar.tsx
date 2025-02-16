import { Home, DollarSign, Wallet, CreditCard, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  { title: "Dashboard", icon: Home, href: "/" },
  { title: "Budget", icon: DollarSign, href: "/budget" },
  { title: "Wallet", icon: Wallet, href: "/wallet" },
  { title: "Expenses", icon: CreditCard, href: "/expenses" },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-100 dark:bg-gray-900">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 dark:text-gray-400">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-2"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <Link
                    href="/api/auth/logout"
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
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
