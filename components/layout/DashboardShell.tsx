"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

type Role = 'ADMIN' | 'SELLER' | 'BUYER';

interface DashboardShellProps {
  /**
   * Current user role – determines which sidebar navigation items are shown.
   */
  role: Role;
  /**
   * Page content rendered inside the main area.
   */
  children: React.ReactNode;
}

/**
 * Reusable layout component used by every page of the MedRx SaaS app.
 *
 * - Renders a responsive, role‑based sidebar.
 * - Renders a sticky top header with brand, search, notifications and profile menu.
 * - Provides a content area that is padded and scrollable.
 * - Uses the green/off‑white theme and smooth Tailwind transitions.
 */
export const DashboardShell: React.FC<DashboardShellProps> = ({ role, children }) => {
  // State to control the mobile drawer – we forward a close callback to Sidebar.
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-off-white font-sans">
      {/* Header */}
      <Header />

      {/* Main layout – on large screens the sidebar is static, on mobile it's a drawer */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar – we pass the role and onClose so it can hide itself on mobile */}
        <Sidebar role={role} onClose={handleDrawerClose} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
