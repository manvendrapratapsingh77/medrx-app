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
      case "ADMIN": return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "SELLER": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      default: return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="pb-6 border-b border-glass">
        <h2 className="text-2xl font-bold text-white tracking-wide">User Management</h2>
        <p className="text-text-secondary text-sm mt-1">Oversee registered Buyers, Sellers, and Laboratory Admins.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="card glass p-0 overflow-hidden border border-white/5 rounded-2xl bg-white/[0.01] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-white/[0.02] text-[9px] text-text-secondary uppercase tracking-widest border-b border-glass font-extrabold">
                  <th className="px-6 py-4">User Info</th>
                  <th className="px-6 py-4">Role Classification</th>
                  <th className="px-6 py-4">Registration Date</th>
                  <th className="px-6 py-4">Account Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: any) => (
                  <tr key={u.id} className="border-b border-glass/30 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary shadow-sm font-bold text-sm">
                          {u.email[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-sm text-white truncate">{u.email.split('@')[0]}</span>
                          <span className="text-[10px] text-text-secondary flex items-center gap-1.5 mt-0.5 truncate">
                            <Mail size={10} className="text-text-secondary" /> {u.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider border ${getRoleBadge(u.role)}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-text-secondary font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-text-secondary" />
                        {new Date(u.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-emerald-400 flex items-center gap-1.5 text-xs font-semibold">
                        <Shield size={13} className="text-emerald-400" /> Active License
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
