import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Beaker, 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Users, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user as any;
  const role = user.role;

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
    { name: "Orders", href: "/orders", icon: ClipboardList },
  ];

  if (role === "ADMIN") {
    links.push({ name: "Users", href: "/admin/users", icon: Users });
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 glass border-r h-screen sticky top-0 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10">
          <Beaker className="text-accent" size={28} />
          <span className="font-bold text-lg">AasaMedChem</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-glass transition-colors group"
            >
              <div className="flex items-center gap-3">
                <link.icon size={20} className="text-muted group-hover:text-accent" />
                <span className="text-sm font-medium">{link.name}</span>
              </div>
              <ChevronRight size={14} className="text-muted opacity-0 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-glass">
          <div className="flex flex-col gap-4">
            <div className="px-3">
              <p className="text-xs text-muted">Signed in as</p>
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-[10px] text-accent font-bold uppercase mt-1 tracking-wider">
                {role}
              </p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 glass border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold capitalize">
            {role.toLowerCase()} Overview
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-xs">
              {user.email[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
