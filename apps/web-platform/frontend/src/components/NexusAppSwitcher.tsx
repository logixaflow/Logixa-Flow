"use client";

import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

interface AppInfo {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  icon: string;
  color: string;
}

const NEXUS_APPS: AppInfo[] = [
  {
    id: "narrativ",
    name: "Narrativ Forge",
    subtitle: "Anime & Video Production Studio",
    url: "http://localhost:3000",
    icon: "🎬",
    color: "#38bdf8",
  },
  {
    id: "auracraft",
    name: "AuraCraft Studio",
    subtitle: "3D Persona & VTuber Live Stage",
    url: "http://localhost:5180",
    icon: "🎭",
    color: "#a855f7",
  },
  {
    id: "doka",
    name: "Doka AI DMS",
    subtitle: "Document Management & OCR",
    url: "http://localhost:5173",
    icon: "📑",
    color: "#10b981",
  },
  {
    id: "logixa",
    name: "Logixa Flow",
    subtitle: "B2B Logistics & Fleet Operations",
    url: "http://localhost:3002",
    icon: "🚚",
    color: "#f59e0b",
  },
  {
    id: "cognix",
    name: "Cognix Nexus",
    subtitle: "Second Brain & Knowledge Graph",
    url: "http://localhost:3001",
    icon: "🧠",
    color: "#ec4899",
  },
  {
    id: "alittleworld",
    name: "A Little World",
    subtitle: "Couple Capsule & Travel Memories",
    url: "http://localhost:3004",
    icon: "💖",
    color: "#f43f5e",
  },
];

export function NexusAppSwitcher({ currentAppId = "logixa" }: { currentAppId?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
          isOpen
            ? "bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
            : "bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-slate-300 hover:text-white"
        }`}
        title="Nexus Suite App Switcher / App များ ကူးပြောင်းရန်"
      >
        <LayoutGrid className="h-4 w-4 text-amber-400" />
        <span className="hidden sm:inline">Nexus Suite</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-950/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 px-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold text-white tracking-wide">The Nexus Suite</span>
            </div>
            <span className="text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
              6 Apps
            </span>
          </div>

          <div className="mb-2.5 p-2 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-xs font-bold text-amber-300 flex-shrink-0">
              T
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-slate-200 truncate">Thuwon Admin</div>
              <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-amber-400 flex-shrink-0" />
                <span>thuwon417@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {NEXUS_APPS.map((app) => {
              const isCurrent = app.id === currentAppId;
              return (
                <a
                  key={app.id}
                  href={app.url}
                  target={isCurrent ? "_self" : "_blank"}
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                    isCurrent
                      ? "bg-amber-500/15 border border-amber-500/40 text-amber-200"
                      : "hover:bg-slate-800/50 border border-transparent hover:border-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base flex-shrink-0">{app.icon}</span>
                    <div className="truncate">
                      <div className="text-xs font-semibold flex items-center gap-1.5">
                        <span>{app.name}</span>
                        {isCurrent && (
                          <span className="text-[9px] bg-amber-500/30 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">{app.subtitle}</div>
                    </div>
                  </div>
                  {!isCurrent && <ExternalLink className="h-3.5 w-3.5 text-slate-500 flex-shrink-0 ml-2" />}
                </a>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-center text-slate-500">
            Unified Supabase Auth · SSO
          </div>
        </div>
      )}
    </div>
  );
}
