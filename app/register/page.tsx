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
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md glass">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Beaker className="text-accent" size={32} />
          <h1 className="text-2xl font-bold">AasaMedChem</h1>
        </div>
        <h2 className="text-xl mb-6 text-center">Create your account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted">Email</label>
            <input
              type="email"
              className="input"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted">Password</label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted">I am a...</label>
            <select
              className="input"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
