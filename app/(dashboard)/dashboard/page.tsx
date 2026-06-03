import { auth } from "@/auth";
import Link from "next/link";
import { ArrowRight, Package, ClipboardList, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user as any;
  const role = user?.role;

  return (
    <div className="flex flex-col gap-8">
      <div className="glass p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
            Welcome back, {user?.email.split('@')[0]}
          </h2>
          <p className="text-muted mt-2">
            You are logged in as an <span className="text-accent font-semibold">{role}</span>. 
            Manage your inventory and orders seamlessly.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/products" className="btn btn-primary px-6">
            Go to Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card glass border-l-4 border-accent p-6 hover:translate-y-[-4px] transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <Package size={24} />
            </div>
            <span className="text-2xl font-bold">12</span>
          </div>
          <h3 className="font-semibold">Active Products</h3>
          <p className="text-xs text-muted mt-1">+2 from last week</p>
        </div>

        <div className="card glass border-l-4 border-blue-500 p-6 hover:translate-y-[-4px] transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <ClipboardList size={24} />
            </div>
            <span className="text-2xl font-bold">48</span>
          </div>
          <h3 className="font-semibold">Pending Quotations</h3>
          <p className="text-xs text-muted mt-1">Ready for confirmation</p>
        </div>

        <div className="card glass border-l-4 border-green-500 p-6 hover:translate-y-[-4px] transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
              <TrendingUp size={24} />
            </div>
            <span className="text-2xl font-bold">₹2.4L</span>
          </div>
          <h3 className="font-semibold">Monthly Volume</h3>
          <p className="text-xs text-muted mt-1">+15% growth</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div className="card glass p-8">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="h-2 w-2 rounded-full bg-accent mt-2 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                <div>
                  <p className="text-sm font-medium">New quotation received for Sodium Chloride</p>
                  <p className="text-[10px] text-muted uppercase mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass p-8 flex flex-col justify-center items-center text-center gap-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20">
          <h3 className="text-xl font-bold">Need Help?</h3>
          <p className="text-sm text-muted max-w-xs">
            Our premium support is always here to assist you with inventory management.
          </p>
          <button className="btn glass border-accent/20 text-accent hover:bg-accent/10">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
