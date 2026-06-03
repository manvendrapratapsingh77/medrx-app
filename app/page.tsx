import Link from "next/link";
import { ArrowRight, FlaskConical, ClipboardList, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-glass text-accent text-xs font-bold uppercase tracking-widest">
            MedRx Core
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Precision Inventory <br />
            <span className="text-accent italic">Redefined.</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            The next-generation medicinal chemistry management system. 
            Automated unit conversions, role-based controls, and seamless quotation workflows.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/login" className="btn btn-primary px-8 py-6 rounded-2xl flex items-center gap-2 text-lg shadow-gold">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link href="/register" className="btn bg-glass border-glass px-8 py-6 rounded-2xl text-lg hover:bg-glass/50">
              Create Account
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl w-full">
          <div className="card glass p-8 text-left space-y-4 hover:border-accent/30 transition-all group">
            <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <FlaskConical size={24} />
            </div>
            <h3 className="text-xl font-bold">Smart Conversions</h3>
            <p className="text-muted text-sm">Automatic precision handling for Weights (kg/g) and Volumes (L/mL).</p>
          </div>

          <div className="card glass p-8 text-left space-y-4 hover:border-accent/30 transition-all group">
            <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <ClipboardList size={24} />
            </div>
            <h3 className="text-xl font-bold">Dynamic Quotations</h3>
            <p className="text-muted text-sm">Request and manage quotations with live price previews in INR.</p>
          </div>

          <div className="card glass p-8 text-left space-y-4 hover:border-accent/30 transition-all group">
            <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold">Role-Based Access</h3>
            <p className="text-muted text-sm">Dedicated dashboards for Admins, Sellers, and Buyers.</p>
          </div>
        </div>
      </main>

      <footer className="p-8 text-center text-muted text-xs border-t border-glass">
        © 2026 MedRx Management System. All rights reserved.
      </footer>
    </div>
  );
}
