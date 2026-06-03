"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Users, 
  ChevronRight,
  Settings
} from "lucide-react";

interface NavigationProps {
  role: string;
}

export default function DashboardNavigation({ role }: NavigationProps) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  // Buyer navigation
  if (role === "BUYER" || role === "ADMIN") {
    links.push({ name: "Browse Catalog", href: "/products", icon: Package });
  }

  // Seller navigation
  if (role === "SELLER" || role === "ADMIN") {
    links.push({ name: "Manage Products", href: "/products/manage", icon: Settings });
  }

  links.push({ name: "Orders & Quotes", href: "/orders", icon: ClipboardList });

  if (role === "ADMIN") {
    links.push({ name: "Manage Users", href: "/admin/users", icon: Users });
  }

  return (
    <nav className="flex-1 flex flex-col gap-1.5">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
              isActive 
                ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-semibold" 
                : "text-text-secondary hover:bg-white/5 hover:text-text-primary border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon 
                size={20} 
                className={`transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                }`} 
              />
              <span className="text-sm">{link.name}</span>
            </div>
            <ChevronRight 
              size={14} 
              className={`transition-all duration-300 ${
                isActive 
                  ? "text-primary translate-x-0.5 opacity-100" 
                  : "text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
              }`} 
            />
          </Link>
        );
      })}
    </nav>
  );
}
