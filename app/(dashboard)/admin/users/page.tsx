"use client";

import { useState, useEffect } from "react";
import { Users, User, Shield, Loader2, Mail, Calendar } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN": return "bg-red-500/10 text-red-500";
      case "SELLER": return "bg-blue-500/10 text-blue-500";
      default: return "bg-green-500/10 text-green-500";
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-muted text-sm">Oversee all registered Buyers, Sellers, and Admins.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-accent" size={32} />
        </div>
      ) : (
        <div className="card glass p-0 overflow-hidden border-glass">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-glass text-[10px] text-muted uppercase tracking-widest border-b border-glass">
                <th className="px-6 py-4 font-bold">User</th>
                <th className="px-6 py-4 font-bold">Role</th>
                <th className="px-6 py-4 font-bold">Joined</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u.id} className="border-b border-glass/50 hover:bg-glass/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                        <User size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{u.email}</span>
                        <span className="text-[10px] text-muted flex items-center gap-1">
                          <Mail size={10} /> {u.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getRoleBadge(u.role)}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(u.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-500 flex items-center gap-1 text-xs">
                      <Shield size={12} /> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
