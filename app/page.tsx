import Link from "next/link";
import { ArrowRight, FlaskConical, ClipboardList, ShieldCheck, Database, Zap, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Navbar */}
      <header className="h-20 border-b border-glass backdrop-blur-md sticky top-0 z-50 flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <FlaskConical size={20} className="animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              AasaMedChem
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-text-secondary hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="btn btn-primary px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              Create Account
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
        <div className="max-w-4xl space-y-8 mt-12 md:mt-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <Zap size={12} className="text-primary" /> MedRx Core 2.0 Released
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none">
            Precision Inventory <br />
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent italic">
              Redefined.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            The next-generation medicinal chemistry management system. 
            Automated unit conversions, role-based controls, and seamless quotation workflows.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/login" className="btn btn-primary px-8 py-4 h-14 rounded-xl flex items-center gap-2 text-base font-bold shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all">
              Launch Console <ArrowRight size={18} />
            </Link>
            <Link href="/register" className="btn bg-white/5 border border-white/10 px-8 py-4 h-14 rounded-xl text-base font-bold text-white hover:bg-white/10 transition-colors">
              Create Account
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-28 mb-16 max-w-6xl w-full px-4">
          <div className="card glass p-8 text-left space-y-4 border border-glass hover:border-primary/30 transition-all duration-300 group hover:translate-y-[-4px]">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <FlaskConical size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Smart Conversions</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Automatic precision handling for Weights (kg/g) and Volumes (L/mL).</p>
          </div>

          <div className="card glass p-8 text-left space-y-4 border border-glass hover:border-primary/30 transition-all duration-300 group hover:translate-y-[-4px]">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <ClipboardList size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Dynamic Quotations</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Request and manage quotations with live price previews in INR.</p>
          </div>

          <div className="card glass p-8 text-left space-y-4 border border-glass hover:border-primary/30 transition-all duration-300 group hover:translate-y-[-4px]">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-white">Role-Based Access</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Dedicated dashboards for Admins, Sellers, and Buyers with authorization.</p>
          </div>
        </div>
      </main>

      <footer className="p-8 text-center text-text-secondary text-xs border-t border-glass backdrop-blur-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">AasaMedChem</span>
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Lab Suite</span>
          </div>
          <p>© 2026 MedRx Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
