"use client"
import React from "react";
import Link from "next/link";
import { Search, Bell, User } from "lucide-react";
import { Button } from "../ui/button";
import Dropdown from "../ui/dropdown";

export const Header: React.FC = () => {
  const handleSelect = (option: string) => {
    if (option === "Sign out") {
      // Placeholder for sign‑out logic (e.g., call signOut from next‑auth)
      console.log("Signing out");
    }
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 bg-white shadow-sm border-b border-border">
      {/* Brand */}
      <Link href="/" className="text-2xl font-bold text-primary">
        MedRx
      </Link>

      {/* Search (hidden on small screens) */}
      <div className="flex-1 mx-4 hidden md:flex items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md border border-border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
        </div>
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary-light">
          <Bell size={20} />
        </Button>
        {/* Profile dropdown using custom component */}
        <Dropdown
          label="My Account"
          options={["Profile", "Settings", "Sign out"]}
          selected="My Account"
          onSelect={handleSelect}
        />
      </div>
    </header>
  );
};

export default Header;
