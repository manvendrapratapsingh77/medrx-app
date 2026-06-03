import { auth } from "@/auth";
import Link from "next/link";
import { ArrowRight, Package, ClipboardList, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user as any;
  const role = user?.role;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="glass p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden bg-white/[0.01]">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-primary/5 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex-1 relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-primary bg-clip-text text-transparent">
            Welcome back, {user?.email.split('@')[0]}
          </h2>
          <p className="text-text-secondary mt-2 text-sm leading-relaxed">
            You are logged in as <span className="text-primary font-semibold uppercase tracking-wider">{role}</span>. 
            Manage your medicinal chemistry inventory and order flows seamlessly.
          </p>
        </div>
        <div className="flex gap-4 relative z-10 w-full md:w-auto">
          <Link href="/products" className="btn btn-primary px-6 py-3 rounded-xl font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] w-full md:w-auto">
            Browse Catalog <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card glass border-l-4 border-primary p-6 hover:translate-y-[-4px] transition-all duration-300 rounded-2xl bg-white/[0.01] border-glass">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/10">
              <Package size={22} />
            </div>
            <span className="text-2xl font-black text-white">12</span>
          </div>
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">Active Products</h3>
          <p className="text-[10px] text-primary font-bold mt-1.5 uppercase tracking-widest">+2 Catalog additions this week</p>
        </div>

        <div className="card glass border-l-4 border-blue-500 p-6 hover:translate-y-[-4px] transition-all duration-300 rounded-2xl bg-white/[0.01] border-glass">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/10">
              <ClipboardList size={22} />
            </div>
            <span className="text-2xl font-black text-white">48</span>
          </div>
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">Pending Quotations</h3>
          <p className="text-[10px] text-blue-400 font-bold mt-1.5 uppercase tracking-widest">Ready for authorized confirmation</p>
        </div>

        <div className="card glass border-l-4 border-emerald-400 p-6 hover:translate-y-[-4px] transition-all duration-300 rounded-2xl bg-white/[0.01] border-glass">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/10">
              <TrendingUp size={22} />
            </div>
            <span className="text-2xl font-black text-white">₹2.4L</span>
          </div>
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">Monthly Volume</h3>
          <p className="text-[10px] text-emerald-400 font-bold mt-1.5 uppercase tracking-widest">+15% Growth margin</p>
        </div>
      </div>

      {/* Activity grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
        <div className="card glass p-6 border border-white/5 rounded-2xl bg-white/[0.01]">
          <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider pb-3 border-b border-glass">Recent Activity Log</h3>
          <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start pb-4 border-b border-glass/30 last:border-b-0 last:pb-0">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shadow-[0_0_8px_#10b981]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/95 truncate">New quotation received for Sodium Chloride</p>
                  <p className="text-[9px] text-text-secondary uppercase font-semibold tracking-wider mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass p-8 flex flex-col justify-center items-center text-center gap-5 border border-white/5 rounded-2xl bg-white/[0.01] relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[100px] h-[100px] bg-primary/5 blur-[35px] rounded-full pointer-events-none" />
          <h3 className="text-lg font-bold text-white">Need Technical Support?</h3>
          <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
            Our premium chemistry lab suite assistance is always available to help configure catalog stocks, dimensions, or quotations.
          </p>
          <button className="btn bg-white/5 border border-white/10 text-primary hover:bg-primary/10 hover:border-primary/20 px-6 py-2.5 rounded-xl text-xs font-bold transition-all mt-2">
            Contact Support Suite
          </button>
        </div>
      </div>
    </div>
  );
}
