'use client';

import React, { useState } from 'react';
import { 
  Truck, ShieldCheck, MapPin, Clock, Thermometer, 
  Droplets, Phone, Download, CheckCircle2, AlertTriangle, ArrowRight, Search 
} from 'lucide-react';

export default function PublicCargoTrackingPage() {
  const [trackingQuery, setTrackingQuery] = useState('LGF-MM-2026-9921');
  const [trackingData, setTrackingData] = useState({
    trackingNumber: 'LGF-MM-2026-9921',
    carrier: 'Logixa Flow Global Freight',
    origin: 'Yangon Port (MITT Terminal)',
    destination: 'Mandalay Logistics Hub',
    status: 'IN_TRANSIT',
    progressPercent: 68,
    eta: 'Tomorrow, 16:30 MMT',
    currentLocation: 'Naypyitaw Central Expressway Interchange',
    tamperSealVerified: true,
    tempCelsius: 4.2,
    humidityPercent: 54,
    driver: {
      name: 'Ko Min Thant',
      vehiclePlate: 'YGN-9B/4812 (Container Hauler)',
      phone: '+959-798-112233',
    },
    milestones: [
      { step: 'Manifest Clearance & Seal Verification', location: 'Yangon Port MITT Gate 4', time: 'Nov 22, 06:00', done: true },
      { step: 'Highway Weigh-In & Departure', location: 'Bago Toll Plaza', time: 'Nov 22, 09:40', done: true },
      { step: 'Central Corridor Waypoint Inspection', location: 'Naypyitaw Checkpoint', time: 'Nov 22, 13:20', done: true },
      { step: 'Final Delivery & Unloading Inspection', location: 'Mandalay Logistics Hub', time: 'Nov 23, 16:30 (ETA)', done: false },
    ]
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingQuery.trim()) return;
    setTrackingData((prev) => ({
      ...prev,
      trackingNumber: trackingQuery.trim().toUpperCase(),
    }));
  };

  return (
    <div className="min-h-screen bg-[#060A12] text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="border-b border-slate-800/80 bg-[#090E1A]/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">LOGIXA FLOW</span>
            <span className="text-[10px] text-cyan-400 ml-2 font-mono uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              Live Fleet Telemetry
            </span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={trackingQuery}
            onChange={(e) => setTrackingQuery(e.target.value)}
            placeholder="Enter Tracking ID..."
            className="bg-[#050810] border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </form>
      </header>

      {/* Main Tracking Dashboard */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6">
        {/* Status Card */}
        <div className="bg-[#0A0F1E] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/70 pb-5">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Consignment ID</span>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold font-mono text-cyan-300">{trackingData.trackingNumber}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  In Transit
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Estimated Arrival (ETA)</span>
              <div className="text-base font-bold text-white flex items-center sm:justify-end gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{trackingData.eta}</span>
              </div>
            </div>
          </div>

          {/* Route Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#050812] border border-slate-800/60 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Origin Terminal</span>
              <span className="text-sm font-semibold text-slate-200">{trackingData.origin}</span>
            </div>
            <div className="p-4 bg-[#050812] border border-slate-800/60 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Destination Hub</span>
              <span className="text-sm font-semibold text-slate-200">{trackingData.destination}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Current Progress: <strong className="text-white">{trackingData.currentLocation}</strong></span>
              <span className="text-cyan-400 font-mono font-bold">{trackingData.progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${trackingData.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Telemetry Sensor Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#050812] border border-slate-800/60 rounded-xl">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-[11px]">Cargo Temp</span>
              </div>
              <span className="text-sm font-bold font-mono text-white">{trackingData.tempCelsius} deg C</span>
            </div>
            <div className="p-3 bg-[#050812] border border-slate-800/60 rounded-xl">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px]">Humidity</span>
              </div>
              <span className="text-sm font-bold font-mono text-white">{trackingData.humidityPercent}% RH</span>
            </div>
            <div className="p-3 bg-[#050812] border border-slate-800/60 rounded-xl">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px]">Bolt Seal</span>
              </div>
              <span className="text-sm font-bold text-emerald-400">100% Intact</span>
            </div>
            <div className="p-3 bg-[#050812] border border-slate-800/60 rounded-xl">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[11px]">Driver Dispatch</span>
              </div>
              <span className="text-xs font-semibold text-slate-200">{trackingData.driver.name}</span>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="bg-[#0A0F1E] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Transit Journey Milestones
          </h2>

          <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {trackingData.milestones.map((m, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                  m.done 
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' 
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 bg-[#050812] border border-slate-800/50 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-white">{m.step}</div>
                    <div className="text-[11px] text-slate-400">{m.location}</div>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 sm:text-right">{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
            <span className="text-xs text-slate-400">Need authenticated delivery proof for customs?</span>
            <button className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all">
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download Bill of Lading (PDF)</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
