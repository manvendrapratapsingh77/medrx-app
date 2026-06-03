// components/ui/dropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps<T extends string> {
  label: string;
  options: T[];
  selected: T;
  onSelect: (value: T) => void;
}

export function Dropdown<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-full max-w-xs">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-green-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected || label}
        <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute left-0 z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <ul
            role="listbox"
            className="max-h-60 overflow-auto py-1 text-sm text-gray-700"
          >
            {options.map((opt) => (
              <li
                key={opt}
                role="option"
                onClick={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                className="cursor-pointer select-none p-2 hover:bg-green-50"
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Dropdown;
