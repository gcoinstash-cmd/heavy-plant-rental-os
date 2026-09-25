import React, { useState } from 'react';
import { 
  Truck, Shield, Award, ArrowRight, Calendar, DollarSign, Lock, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Terminal, Server,
  AlertCircle, Check, Phone, Plane, Thermometer, Compass, Fuel, Gauge,
  Activity, Radio, Wrench, Sliders, X, FileText, MapPin, HardHat
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface Machine {
  id: string;
  serial: string;
  model: string;
  category: string;
  weight: string;
  hours: number;
  fuel: number;
  hydraulics: string;
  location: string;
  status: 'READY' | 'ON RENT' | 'INSPECTION' | 'IN TRANSIT';
  dayRate: number;
  weekRate: number;
  specs: {
    engine: string;
    capacity: string;
    flow: string;
    telematics: string;
  };
  img: string;
}

const MACHINES: Machine[] = [
  {
    id: "CAT-336-01",
    serial: "CAT0336HDK8821",
    model: "CAT 336 Next-Gen Hydraulic Excavator",
    category: "Heavy Earthmoving",
    weight: "36.2 Metric Tons",
    hours: 1420,
    fuel: 94,
    hydraulics: "3,850 PSI (Optimal)",
    location: "Yard Bay 02 — Main Staging",
    status: "READY",
    dayRate: 1850,
    weekRate: 6400,
    specs: {
      engine: "Cat C9.3B Tier 4 Final (314 HP)",
      capacity: "2.4 yd³ Severe-Duty Rock Bucket",
      flow: "148 gpm High-Flow Auxiliary",
      telematics: "Product Link 4G Satellite Active"
    },
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec"
  },
  {
    id: "CAT-D8T-04",
    serial: "CAT0D8TXB9014",
    model: "CAT D8T Heavy Track Bulldozer",
    category: "Dozer & Grading",
    weight: "39.8 Metric Tons",
    hours: 2180,
    fuel: 78,
    hydraulics: "3,400 PSI (Optimal)",
    location: "Metro Rail Corridor Jobsite #4",
    status: "ON RENT",
    dayRate: 2400,
    weekRate: 8200,
    specs: {
      engine: "Cat C15 ACERT (394 HP)",
      capacity: "11.3 yd³ Semi-Universal Blade",
      flow: "64 gpm Automated Blade Assist",
      telematics: "Trimble 3D GPS Grade Control"
    },
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd"
  },
  {
    id: "MAN-1840-02",
    serial: "MAN01840EA3319",
    model: "Manitou MT 1840 Easy Telehandler",
    category: "Material Handling",
    weight: "11.8 Metric Tons",
    hours: 890,
    fuel: 88,
    hydraulics: "3,900 PSI (Optimal)",
    location: "Yard Bay 07 — Ready Line",
    status: "READY",
    dayRate: 950,
    weekRate: 3200,
    specs: {
      engine: "Deutz 3.6L Tier 4 (100 HP)",
      capacity: "18m Reach / 4,000 kg Payload",
      flow: "45 gpm Load Sensing Hydrostatic",
      telematics: "Omnicall Telehandler Sensor Mesh"
    },
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12"
  },
  {
    id: "VOL-L250-01",
    serial: "VOL0L250HE7712",
    model: "Volvo L250H Heavy Wheel Loader",
    category: "Quarry & Loading",
    weight: "35.0 Metric Tons",
    hours: 3410,
    fuel: 42,
    hydraulics: "3,100 PSI (Service Due)",
    location: "Bay 01 — Maintenance & Dyno",
    status: "INSPECTION",
    dayRate: 2100,
    weekRate: 7200,
    specs: {
      engine: "Volvo D13J Tier 4F (395 HP)",
      capacity: "6.7 yd³ Rehandling Spade-Nose Bucket",
      flow: "135 gpm Electro-Hydraulic Servo",
      telematics: "CareTrack Satellite Telematics"
    },
    img: "https://images.unsplash.com/photo-1580901068594-822831bc7754"
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedMachine, setSelectedMachine] = useState<Machine>(MACHINES[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rentalDays, setRentalDays] = useState(7);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const filtered = MACHINES.filter(m => 
    selectedCategory === 'ALL' || m.status === selectedCategory
  );

  const handleInspect = (m: Machine) => {
    setSelectedMachine(m);
    setIsDrawerOpen(true);
    setDispatchSuccess(false);
  };

  const calculateEstimate = (m: Machine, days: number) => {
    if (days >= 7) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      return (weeks * m.weekRate) + (remainingDays * m.dayRate);
    }
    return days * m.dayRate;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Telemetry Header */}
      <header className="border-b border-zinc-800 bg-[#0D0E12] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-black tracking-widest text-amber-500 flex items-center gap-2 text-base">
            <HardHat size={18} /> VULCAN YARD OPS // HEAVY PLANT & EARTHMOVING FLEET
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 font-semibold uppercase text-xs">ARCHETYPE A: DENSE OPERATIONAL CONSOLE</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-300">
            <Radio size={14} className="text-emerald-400 animate-ping" />
            <span>4G TELEMATICS: <strong className="text-emerald-400">100% SATELLITE LOCK</strong></span>
          </div>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-lg text-xs font-mono font-bold transition-all"
          >
            [ ADMIN DISPATCH PASS ]
          </button>
        </div>
      </header>

      {/* Main Console Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Utility Rail */}
        <aside className="w-64 border-r border-zinc-800 bg-[#0E1015] p-5 hidden md:flex flex-col justify-between shrink-0 font-mono text-sm">
          <div className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Yard Telemetry</div>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                  <div className="text-zinc-400">Total Asset Value</div>
                  <div className="text-lg font-black text-amber-400">$3.85M FLEET</div>
                </div>
                <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                  <div className="text-zinc-400">Fleet Utilization</div>
                  <div className="text-lg font-black text-emerald-400">84.2% DEPLOYED</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Status Filters</div>
              <div className="space-y-1">
                {[
                  { id: 'ALL', label: 'All Machines', count: MACHINES.length },
                  { id: 'READY', label: 'Ready in Yard', count: MACHINES.filter(m => m.status === 'READY').length },
                  { id: 'ON RENT', label: 'On Jobsite', count: MACHINES.filter(m => m.status === 'ON RENT').length },
                  { id: 'INSPECTION', label: 'Service / Recert', count: MACHINES.filter(m => m.status === 'INSPECTION').length }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedCategory(filter.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                      selectedCategory === filter.id 
                        ? 'bg-amber-500 text-black' 
                        : 'text-zinc-300 hover:bg-zinc-800/60'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className="text-[11px] font-mono opacity-80">{filter.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 text-[11px] text-zinc-500">
            <div>DOT Lowboy Dispatch: Active</div>
            <div>OSHA Reg: 1926.1400 Certified</div>
          </div>
        </aside>

        {/* Center Live Triage Board */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Truck className="text-amber-500" /> Yard Fleet Triage & Mobilization Deck
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Select equipment to inspect machine telemetry, load charts, and initiate immediate jobsite transport.
              </p>
            </div>
            <div className="text-xs font-mono px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300">
              Showing {filtered.length} Machines
            </div>
          </div>

          {/* Machine Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map(machine => (
              <div 
                key={machine.id}
                onClick={() => handleInspect(machine)}
                className={`p-5 rounded-xl border transition-all cursor-pointer bg-[#111318] hover:border-amber-500/60 group relative ${
                  selectedMachine.id === machine.id ? 'border-amber-500 ring-1 ring-amber-500/30' : 'border-zinc-800'
                }`}
              >
                <div className="flex gap-4">
                  <img 
                    src={machine.img} 
                    alt={machine.model}
                    className="w-28 h-28 object-cover rounded-lg border border-zinc-800 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-amber-400 font-bold">{machine.id}</span>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        machine.status === 'READY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        machine.status === 'ON RENT' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {machine.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base mt-1 group-hover:text-amber-400 transition-colors truncate">
                      {machine.model}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{machine.category} • {machine.weight}</p>

                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-zinc-800/80 font-mono text-[11px]">
                      <div>
                        <span className="text-zinc-500 block">Hours</span>
                        <span className="text-zinc-200 font-bold">{machine.hours} hrs</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Fuel Level</span>
                        <span className="text-amber-400 font-bold">{machine.fuel}%</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Day Rate</span>
                        <span className="text-emerald-400 font-bold">${machine.dayRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Slide-out Inspection Drawer */}
        {isDrawerOpen && (
          <aside className="w-full sm:w-[480px] bg-[#111318] border-l border-zinc-800 p-6 overflow-y-auto flex flex-col justify-between font-sans shrink-0 fixed sm:relative right-0 top-0 bottom-0 z-40 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-amber-500" />
                  <span className="font-mono text-sm font-bold text-zinc-200">INSPECTION DRAWER</span>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <img 
                  src={selectedMachine.img} 
                  alt={selectedMachine.model}
                  className="w-full h-44 object-cover rounded-xl border border-zinc-800" 
                />

                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-amber-500">
                    <span>{selectedMachine.id}</span>
                    <span>S/N: {selectedMachine.serial}</span>
                  </div>
                  <h2 className="text-xl font-black text-white mt-1">{selectedMachine.model}</h2>
                  <p className="text-xs text-zinc-400">{selectedMachine.location}</p>
                </div>

                {/* Technical Specifications */}
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-2.5 font-mono text-xs">
                  <div className="text-zinc-400 font-bold uppercase tracking-wider text-[11px] mb-1">Telematics & Rigging</div>
                  <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                    <span className="text-zinc-400">Powertrain</span>
                    <span className="text-zinc-200 font-bold text-right">{selectedMachine.specs.engine}</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                    <span className="text-zinc-400">Tool Attachment</span>
                    <span className="text-zinc-200 font-bold text-right">{selectedMachine.specs.capacity}</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                    <span className="text-zinc-400">Aux Hydraulic Flow</span>
                    <span className="text-zinc-200 font-bold">{selectedMachine.specs.flow}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Live Pressure</span>
                    <span className="text-emerald-400 font-bold">{selectedMachine.hydraulics}</span>
                  </div>
                </div>

                {/* Rental Duration Calculator */}
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-300 font-bold">Mobilization Period</span>
                    <span className="text-amber-400 font-black">{rentalDays} Days</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    value={rentalDays} 
                    onChange={e => setRentalDays(Number(e.target.value))}
                    className="w-full accent-amber-500" 
                  />
                  <div className="flex justify-between pt-2 border-t border-zinc-800 text-sm">
                    <span className="text-zinc-400">Estimated Total:</span>
                    <span className="text-emerald-400 font-black text-base">
                      ${calculateEstimate(selectedMachine, rentalDays).toLocaleString()} USD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-zinc-800 space-y-2 font-mono">
              {dispatchSuccess ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl text-center text-xs font-bold">
                  ✓ MOBILIZATION DISPATCH ORDER GENERATED
                </div>
              ) : (
                <button
                  onClick={() => setDispatchSuccess(true)}
                  disabled={selectedMachine.status === 'ON RENT'}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer min-h-[44px]"
                >
                  {selectedMachine.status === 'ON RENT' ? 'UNIT CURRENTLY DEPLOYED' : 'DISPATCH TO JOBSITE NOW'}
                </button>
              )}
            </div>
          </aside>
        )}
      </div>

      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
