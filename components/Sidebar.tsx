// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { Home, Users, Box, ShoppingCart, Settings } from "lucide-react";

type Role = "admin" | "seller" | "buyer";

interface SidebarProps {
  role: Role;
}

const navigation = {
  admin: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Products", href: "/products", icon: Box },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ],
  seller: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Inventory", href: "/inventory", icon: Box },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Settings", href: "/settings", icon: Settings },
  ],
  buyer: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Shop", href: "/shop", icon: ShoppingCart },
    { name: "Profile", href: "/profile", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ],
};

export default function Sidebar({ role }: SidebarProps) {
  const links = navigation[role] ?? navigation["buyer"];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 overflow-y-auto border-r border-gray-200 bg-white lg:block transition-transform duration-300 ease-in-out">
      <nav className="mt-10 space-y-2">
        {links.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center rounded-md px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
