"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="btn btn-primary w-full flex items-center justify-center gap-2 bg-red-950/30 hover:bg-red-950/50 text-red-500 border border-red-500/20"
    >
      <LogOut size={18} />
      <span>Sign Out</span>
    </button>
  );
}
