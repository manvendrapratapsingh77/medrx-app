import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Beaker } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";
import DashboardNavigation from "@/components/layout/DashboardNavigation";

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

  return (
    <div className="flex min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-66 glass border-r border-glass h-screen sticky top-0 flex flex-col p-6 z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Beaker size={22} className="animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base leading-tight tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              AasaMedChem
            </span>
            <span className="text-[10px] text-primary/70 font-semibold uppercase tracking-widest leading-none mt-0.5">
              LAB SUITE
            </span>
          </div>
        </div>

        {/* Client Navigation */}
        <DashboardNavigation role={role} />

        <div className="pt-6 mt-6 border-t border-glass">
          <div className="flex flex-col gap-4">
            <div className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Signed in as</p>
              <p className="text-sm font-medium truncate mt-0.5 text-text-primary">{user.email}</p>
              <span className="inline-block text-[9px] bg-primary/15 text-primary border border-primary/20 font-extrabold uppercase px-2 py-0.5 rounded-md mt-2 tracking-widest">
                {role}
              </span>
            </div>
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <header className="h-16 glass border-b border-glass flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-base font-bold tracking-wide uppercase text-primary/80">
            {role.toLowerCase()} PANEL
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-xs font-semibold">{user.email.split('@')[0]}</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest">{role}</span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {user.email[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
