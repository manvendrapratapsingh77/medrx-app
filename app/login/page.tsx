"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Beaker } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md glass">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Beaker className="text-accent" size={32} />
          <h1 className="text-2xl font-bold">AasaMedChem</h1>
        </div>
        <h2 className="text-xl mb-6 text-center">Login to your account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted">Email</label>
            <input
              type="email"
              className="input"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted">Password</label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign In
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-muted">
          Don't have an account?{" "}
          <Link href="/register" className="text-accent hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
