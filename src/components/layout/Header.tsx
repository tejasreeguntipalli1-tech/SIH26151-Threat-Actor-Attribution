import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Search, 
  User, 
  Activity, 
  CheckCircle2, 
  ChevronRight, 
  CircleDot, 
  Circle,
  AlertTriangle,
  Database
} from 'lucide-react';
import { InvestigationConfig, ActorCluster } from '../../types/investigation';

interface HeaderProps {
  config: InvestigationConfig;
  activeCluster: ActorCluster;
  stage2Count: number;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onSearch: (query: string) => void;
  onOpenPipelineModal: (step: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  activeCluster,
  stage2Count,
  activeTab,
  onNavigate,
  onSearch,
  onOpenPipelineModal
}) => {
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearch(searchVal.trim());
    }
  };

  return (
    <div className="sticky top-0 z-40">
      {/* 1. Topmost Persistent Prototype Dataset Banner (Prompt Required) */}
      <div className="bg-[#0f172a] border-b border-amber-900/40 px-4 py-1 text-center text-[11px] font-mono tracking-wider text-amber-300/90 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-bold">PROTOTYPE DATASET — SYNTHETIC INVESTIGATION DATA</span>
        <span className="text-slate-400">|</span>
        <span className="text-slate-300">Statutory Standard: Correlation ≠ Identification &bull; Attribution Lead ≠ Confirmed Identity</span>
      </div>

      {/* 2. Main Header Bar */}
      <header className="bg-[#0b101b] border-b border-slate-800 px-6 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Brand & Shared Investigation Context */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onNavigate('dashboard')}
              className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 shadow-md shadow-emerald-950/50 flex-shrink-0 cursor-pointer"
            >
              <Shield className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                <span className="font-bold bg-slate-800 text-emerald-400 px-2 py-0.5 rounded border border-slate-700">
                  {config.investigationId}
                </span>
                <span className="text-slate-400">
                  Focus: <strong className="text-white">{activeCluster.id}</strong>
                </span>
                <span className="text-emerald-400/90 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-900/60">
                  Stage 1: {activeCluster.actorCorrelationScore}% {activeCluster.classification}
                </span>
                <span className={`px-1.5 py-0.5 rounded border ${
                  activeCluster.stage2Initiated 
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-800' 
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}>
                  Stage 2: {activeCluster.stage2Initiated ? 'In Progress' : 'Eligible'}
                </span>
                <span className="text-slate-400 hidden xl:inline">
                  Officer: <strong className="text-slate-200">INV-017</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Global Search Bar (Prompt Mandated) */}
          <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search handle, alias, domain, IP, candidate..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full bg-[#070b14] border border-slate-800 focus:border-emerald-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none transition-colors"
            />
          </form>

          {/* Quick System & Investigator Status */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 bg-[#070b14] border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px]">System: Operational</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#070b14] border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px]">INV-017</span>
            </div>
          </div>
        </div>

        {/* 3. Persistent 5-Step Visual Investigation Pipeline (Prompt Mandated) */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between overflow-x-auto gap-2 text-xs font-mono">
          <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1 flex-shrink-0">
            <span>PIPELINE:</span>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-around min-w-[700px]">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => { onNavigate('identities'); onOpenPipelineModal(1); }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070b14] hover:bg-slate-800 border border-emerald-900/60 text-emerald-300 transition-colors"
              title="Click to view contributing Digital Identities evidence"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>① DIGITAL IDENTITIES</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => { onNavigate('correlation'); onOpenPipelineModal(2); }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070b14] hover:bg-slate-800 border border-emerald-900/60 text-emerald-300 transition-colors"
              title="Click to view Multi-Signal Correlation evidence"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>② ACTOR CORRELATION</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />

            {/* Step 3 */}
            <button
              type="button"
              onClick={() => { onNavigate('clusters'); onOpenPipelineModal(3); }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070b14] hover:bg-slate-800 border border-emerald-900/60 text-emerald-300 transition-colors"
              title="Click to view Actor Validation & Gate status"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>③ ACTOR VALIDATION</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />

            {/* Step 4: Current Stage */}
            <button
              type="button"
              onClick={() => { onNavigate('stage2'); onOpenPipelineModal(4); }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
                activeTab === 'stage2'
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md font-bold'
                  : 'bg-[#070b14] hover:bg-slate-800 border-cyan-900/60 text-cyan-300'
              }`}
              title="Click to inspect Real-World Attribution evidence"
            >
              <CircleDot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>④ REAL-WORLD ATTRIBUTION</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />

            {/* Step 5 */}
            <button
              type="button"
              onClick={() => { onNavigate('stage2'); onOpenPipelineModal(5); }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070b14] hover:bg-slate-800 border border-slate-800 text-slate-400 transition-colors"
              title="Pending final Human Validation Decision"
            >
              <Circle className="w-3.5 h-3.5 text-slate-500" />
              <span>⑤ HUMAN VALIDATION</span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
