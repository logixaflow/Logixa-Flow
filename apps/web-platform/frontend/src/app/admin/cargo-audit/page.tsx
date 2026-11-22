'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, Compass, Truck, Camera, Check, AlertTriangle, 
  Fuel, DollarSign, Leaf, MapPin, ArrowRight, RefreshCw, FileText
} from 'lucide-react';

interface DefectItem {
  type: string;
  severity: 'LOW' | 'MODERATE' | 'CRITICAL';
  area: number;
  description: string;
}

interface RouteItem {
  id: string;
  name: string;
  strategy: 'FUEL_EFFICIENT' | 'FASTEST' | 'WEATHER_SAFE';
  distanceKm: number;
  hours: number;
  fuelLiters: number;
  tollCostUsd: number;
  co2Kg: number;
}

export default function CargoAuditAdminPage() {
  const [activeTab, setActiveTab] = useState<'inspection' | 'routes'>('inspection');

  // Inspection State
  const [trackingId, setTrackingId] = useState('LGF-MM-2026-9921');
  const [tamperSeal, setTamperSeal] = useState(false);
  const [incidentNotes, setIncidentNotes] = useState('Lateral surface dent and heavy forklift abrasion on lower tier pallet.');
  const [inspectionDone, setInspectionDone] = useState(true);
  const [integrityScore, setIntegrityScore] = useState(74.5);
  const [lossPercent, setLossPercent] = useState(24.0);
  const [claimRecommended, setClaimRecommended] = useState(true);
  const [estimatedDamageUsd, setEstimatedDamageUsd] = useState(6000.0);
  const [defects, setDefects] = useState<DefectItem[]>([
    {
      type: 'SURFACE_DENT',
      severity: 'MODERATE',
      area: 350.0,
      description: 'Lateral impact dent on side corrugation from forklift tines.'
    },
    {
      type: 'PUNCTURE_CRUSH',
      severity: 'CRITICAL',
      area: 1200.0,
      description: 'Heavy structural crush on lower tier pallet with carton deformation.'
    }
  ]);

  // Route Optimizer State
  const [origin, setOrigin] = useState('Yangon Port (MITT)');
  const [destination, setDestination] = useState('Mandalay Logistics Hub');
  const [vehicle, setVehicle] = useState('container_hauler');
  const [routes, setRoutes] = useState<RouteItem[]>([
    {
      id: 'ROUTE-FUEL-01',
      name: 'Expressway Green Corridor',
      strategy: 'FUEL_EFFICIENT',
      distanceKm: 635.0,
      hours: 9.5,
      fuelLiters: 221.7,
      tollCostUsd: 38.0,
      co2Kg: 594.2,
    },
    {
      id: 'ROUTE-FAST-02',
      name: 'Direct Express Priority Bypass',
      strategy: 'FASTEST',
      distanceKm: 620.0,
      hours: 8.2,
      fuelLiters: 264.3,
      tollCostUsd: 52.0,
      co2Kg: 708.3,
    },
    {
      id: 'ROUTE-SAFE-03',
      name: 'Elevated Terrain Storm-Safe Path',
      strategy: 'WEATHER_SAFE',
      distanceKm: 665.0,
      hours: 10.4,
      fuelLiters: 247.9,
      tollCostUsd: 28.0,
      co2Kg: 664.4,
    }
  ]);

  const handleRunInspection = () => {
    setInspectionDone(true);
    if (tamperSeal) {
      setIntegrityScore(58.0);
      setLossPercent(40.5);
      setEstimatedDamageUsd(10125.0);
      setDefects((prev) => [
        {
          type: 'SEAL_TAMPER',
          severity: 'CRITICAL',
          area: 45.0,
          description: 'Bolt seal severed or barcode mismatch detected.'
        },
        ...prev
      ]);
    } else {
      setIntegrityScore(74.5);
      setLossPercent(24.0);
      setEstimatedDamageUsd(6000.0);
    }
  };

  return (
    <div className="space-y-6 text-slate-100 p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold tracking-tight text-white">Cargo Intelligence & Fleet Routing</h1>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              CV Inspection & Fuel AI
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Computer vision transit damage comparison, defect severity assessment, and multi-modal route optimization.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('inspection')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'inspection'
                ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Damage Inspection
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'routes'
                ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Route & Fuel Optimizer
          </button>
        </div>
      </div>

      {/* TAB 1: CV DAMAGE INSPECTION */}
      {activeTab === 'inspection' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form & Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-4 bg-[#0A0F1E] border border-slate-800 p-5 rounded-2xl shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-400" />
              Inspection Input & Tamper Detection
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Tracking Number</label>
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full bg-[#050812] border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Incident Report / Surveyor Notes</label>
                <textarea
                  rows={3}
                  value={incidentNotes}
                  onChange={(e) => setIncidentNotes(e.target.value)}
                  className="w-full bg-[#050812] border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="sealTamper"
                  checked={tamperSeal}
                  onChange={(e) => setTamperSeal(e.target.checked)}
                  className="rounded border-slate-800 bg-[#050812] text-cyan-600 focus:ring-0"
                />
                <label htmlFor="sealTamper" className="text-slate-300 font-medium cursor-pointer">
                  Flag Security Bolt Seal Tampered
                </label>
              </div>

              <button
                onClick={handleRunInspection}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-600/30"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Run CV Damage Audit</span>
              </button>
            </div>
          </div>

          {/* Results Audit Card (7 cols) */}
          <div className="lg:col-span-7 space-y-4 bg-[#0A0F1E] border border-slate-800 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Automated Insurance Claim Pack
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                claimRecommended 
                  ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30' 
                  : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
              }`}>
                {claimRecommended ? 'Insurance Claim Recommended' : 'Clean Bill of Health'}
              </span>
            </div>

            {/* Scores Overview */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-[#050812] p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Post-Transit Score</span>
                <span className="text-base font-bold text-cyan-300 font-mono">{integrityScore}%</span>
              </div>
              <div className="bg-[#050812] p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Integrity Loss</span>
                <span className="text-base font-bold text-rose-400 font-mono">-{lossPercent}%</span>
              </div>
              <div className="bg-[#050812] p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Est. Claim Damage</span>
                <span className="text-base font-bold text-white font-mono">${estimatedDamageUsd.toLocaleString()}</span>
              </div>
            </div>

            {/* Detected Defects List */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Detected Defect Entities
              </span>
              <div className="space-y-2">
                {defects.map((d, i) => (
                  <div key={i} className="p-3 bg-[#050812] border border-slate-800/80 rounded-xl flex items-start justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{d.type}</span>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-semibold ${
                          d.severity === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {d.severity}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{d.description}</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                      {d.area} cm2
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export Cryptographic Claim Pack</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI ROUTE & FUEL OPTIMIZER */}
      {activeTab === 'routes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {routes.map((r) => (
              <div 
                key={r.id}
                className={`p-5 rounded-2xl border transition-all ${
                  r.strategy === 'FUEL_EFFICIENT'
                    ? 'bg-[#0A0F1E] border-cyan-500/50 ring-1 ring-cyan-500/30'
                    : 'bg-[#0A0F1E] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {r.strategy}
                  </span>
                  {r.strategy === 'FUEL_EFFICIENT' && (
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Recommended
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-sm mb-3">{r.name}</h3>

                <div className="space-y-2 text-xs text-slate-400 mb-4">
                  <div className="flex justify-between">
                    <span>Total Distance:</span>
                    <strong className="text-slate-200 font-mono">{r.distanceKm} km</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <strong className="text-slate-200 font-mono">{r.hours} hrs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Diesel Consumption:</span>
                    <strong className="text-cyan-300 font-mono">{r.fuelLiters} L</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tollway Fees:</span>
                    <strong className="text-slate-200 font-mono">${r.tollCostUsd}</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Leaf className="w-3 h-3" />
                      CO2 Footprint:
                    </span>
                    <strong className="text-emerald-300 font-mono">{r.co2Kg} kg</strong>
                  </div>
                </div>

                <button className="w-full py-2 bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 font-semibold rounded-xl text-xs transition-all">
                  Select & Dispatch Itinerary
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
