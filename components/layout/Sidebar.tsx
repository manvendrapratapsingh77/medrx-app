"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Package, ShoppingCart, Users, Settings, BarChart2, UserCheck, UserX } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Role = 'ADMIN' | 'SELLER' | 'BUYER';

const navItems: Record<Role, NavItem[]> = {
  ADMIN: [
    { label: 'Dashboard', href: '/dashboard', icon: <BarChart2 size={18} /> },
    { label: 'Inventory', href: '/inventory', icon: <Package size={18} /> },
    { label: 'Orders', href: '/orders', icon: <ShoppingCart size={18} /> },
    { label: 'Suppliers', href: '/suppliers', icon: <Users size={18} /> },
    { label: 'Settings', href: '/settings', icon: <Settings size={18} /> },
  ],
  SELLER: [
    { label: 'Dashboard', href: '/dashboard', icon: <BarChart2 size={18} /> },
    { label: 'My Products', href: '/inventory', icon: <Package size={18} /> },
    { label: 'Orders', href: '/orders', icon: <ShoppingCart size={18} /> },
    { label: 'Profile', href: '/profile', icon: <UserCheck size={18} /> },
  ],
  BUYER: [
    { label: 'Dashboard', href: '/dashboard', icon: <BarChart2 size={18} /> },
    { label: 'Catalog', href: '/catalog', icon: <Package size={18} /> },
    { label: 'My Orders', href: '/orders', icon: <ShoppingCart size={18} /> },
    { label: 'Profile', href: '/profile', icon: <UserX size={18} /> },
  ],
};

interface SidebarProps {
  role: Role;
  /**
   * Callback to close the drawer on mobile. If not provided, the drawer stays open.
   */
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle mobile toggle
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden flex items-center p-2 bg-white shadow-md">
        <button
          type="button"
          onClick={toggleDrawer}
          className="p-2 rounded-md text-primary hover:bg-primary-light transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className="ml-2 text-lg font-semibold text-primary">MedRx</span>
      </div>

      {/* Sidebar container */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl rounded-r-xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:shadow-none lg:rounded-none
        `}
        aria-label="Sidebar navigation"
      >
        {/* Header inside sidebar */}
        <div className="hidden lg:flex items-center justify-center h-16 border-b border-border">
          <h1 className="text-2xl font-bold text-primary">MedRx</h1>
        </div>
        <nav className="mt-4 flex flex-col gap-1 px-2">
          {navItems[role].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 py-2 px-3 rounded-lg text-primary hover:bg-primary-light hover:text-primary-dark transition-colors"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
