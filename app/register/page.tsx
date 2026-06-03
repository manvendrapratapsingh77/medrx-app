"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Beaker } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "BUYER",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground relative overflow-hidden p-4">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="card w-full max-w-md glass border border-glass p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Beaker size={20} className="animate-pulse" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            AasaMedChem
          </h1>
        </div>
        <h2 className="text-lg font-bold text-center text-white mb-6">Create Lab Account</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              className="input bg-white/5 border border-glass hover:border-primary/20 focus:border-primary text-sm px-4 py-3 rounded-xl transition-all"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Password</label>
            <input
              type="password"
              className="input bg-white/5 border border-glass hover:border-primary/20 focus:border-primary text-sm px-4 py-3 rounded-xl transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Select Lab Role</label>
            <select
              className="input bg-white/5 border border-glass hover:border-primary/20 focus:border-primary text-sm px-4 py-3 rounded-xl transition-all text-white"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="BUYER" className="bg-[#0d1324] text-white">Buyer (Request Quotes)</option>
              <option value="SELLER" className="bg-[#0d1324] text-white">Seller (Manage Catalog)</option>
              <option value="ADMIN" className="bg-[#0d1324] text-white">Admin (System Overseer)</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-xs text-center font-medium mt-1">{error}</p>}
          <button type="submit" className="btn btn-primary w-full py-3 h-12 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] mt-2" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        
        <p className="text-xs text-center mt-6 text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-semibold transition-all">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
