"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface AdminSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function AdminSearchBar({ value, onChange, placeholder = "Search..." }: AdminSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="mb-6 relative">
      <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500 pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-20 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
      />
      <div className="absolute right-3 top-2.5 flex items-center gap-1 pointer-events-none">
        <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono bg-slate-700/70 border border-slate-600/50 text-slate-300 px-1.5 py-0.5 rounded shadow-sm">
          Ctrl+K
        </kbd>
      </div>
    </div>
  );
}
