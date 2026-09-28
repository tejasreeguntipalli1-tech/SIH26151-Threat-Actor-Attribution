import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  Clock, 
  Key, 
  Server, 
  Activity, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { ConfidenceBadge } from '../common/ConfidenceBadge';

export const EvidenceAnalysisView: React.FC = () => {
  const { clusters, activeCase, selectedClusterId, setSelectedClusterId } = useCase();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState<'overview' | 'stylometry' | 'behaviour' | 'temporal' | 'technical' | 'infrastructure'>(
    (tabParam as any) || 'overview'
  );

  const cluster = clusters.find(c => c.id === selectedClusterId) || clusters[0];

  const handleTabChange = (newTab: typeof activeTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header bar */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
              EVIDENCE ASSESSMENT REPOSITORY
            </span>
            <span className="text-xs text-slate-400 font-mono">
              CASE: {activeCase.id}
            </span>
            <span className="text-xs text-slate-600 font-mono">|</span>
            <span className="text-xs text-slate-400 font-mono">
              TARGET: <strong className="text-white">{cluster.id}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 font-mono">
            <Database className="w-6 h-6 text-orange-400" />
            <span>Forensic Evidence Analysis & Triage</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Multidimensional forensic cataloging. Missing intelligence items are explicitly categorized as <code>UNKNOWN</code> and are never treated as negative evidence against a digital persona.
          </p>
        </div>

        {/* Cluster Selector */}
        <div className="flex items-center gap-2 bg-[#0D1016] border border-[#202734] rounded-lg p-1.5">
          {clusters.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedClusterId(c.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                cluster.id === c.id
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#181D26]'
              }`}
            >
              <span>{c.id}</span>
              <span className="text-[10px] opacity-80">({c.actorCorrelationScore}%)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Requirement #10 Sub-sections / Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#1E2430] font-mono text-xs">
        <button
          onClick={() => handleTabChange('overview')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-orange-400" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => handleTabChange('stylometry')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'stylometry'
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-orange-400" />
          <span>Stylometry Analysis</span>
        </button>

        <button
          onClick={() => handleTabChange('behaviour')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'behaviour'
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-orange-400" />
          <span>Behavioural Modus Operandi</span>
        </button>

        <button
          onClick={() => handleTabChange('temporal')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'temporal'
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span>Temporal & Diurnal Analysis</span>
        </button>

        <button
          onClick={() => handleTabChange('technical')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'technical'
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <Key className="w-3.5 h-3.5 text-orange-400" />
          <span>Technical Indicators</span>
        </button>

        <button
          onClick={() => handleTabChange('infrastructure')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'infrastructure'
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-orange-400" />
          <span>Infrastructure & Relational</span>
        </button>
      </div>

      {/* Tab 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-100">
          {/* 3 Pillar Matrix: Supporting (green), Conflicting (red), Unknown (amber) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* Supporting Evidence */}
            <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E2430]">
                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SUPPORTING EVIDENCE ({cluster.supportingReasons.length})</span>
                </div>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                  CORROBORATED
                </span>
              </div>
              <div className="space-y-2">
                {cluster.supportingReasons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-emerald-300/90 font-sans leading-relaxed bg-[#0D1016] p-2.5 rounded-lg border border-emerald-950/60">
                    <span className="text-emerald-400 font-bold mt-0.5">&bull;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conflicting Evidence */}
            <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E2430]">
                <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>CONFLICTING EVIDENCE ({cluster.conflictingReasons.length})</span>
                </div>
                <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-800">
                  CONTRADICTORY
                </span>
              </div>
              <div className="space-y-2">
                {cluster.conflictingReasons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-red-300/90 font-sans leading-relaxed bg-[#0D1016] p-2.5 rounded-lg border border-red-950/60">
                    <span className="text-red-400 font-bold mt-0.5">&bull;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unknown Evidence / Forensic Gaps */}
            <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E2430]">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>UNKNOWN EVIDENCE ({cluster.unknownReasons.length})</span>
                </div>
                <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800">
                  INVESTIGATION GAPS
                </span>
              </div>
              <div className="space-y-2">
                {cluster.unknownReasons.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-amber-300/90 font-sans leading-relaxed bg-[#0D1016] p-2.5 rounded-lg border border-amber-950/60">
                    <span className="text-amber-400 font-bold mt-0.5">&bull;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: STYLOMETRY */}
      {activeTab === 'stylometry' && (
        <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 space-y-4 font-mono text-xs animate-in fade-in duration-100">
          <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
            <span className="font-bold text-white text-sm">Stylometric Evidence Assessment</span>
            <span className="text-orange-400 font-bold">92% Match Score</span>
          </div>

          <div className="space-y-3 font-sans">
            <div className="p-3 rounded-lg bg-[#0D1016] border border-emerald-950 text-emerald-300 text-xs leading-relaxed">
              <strong className="text-emerald-400 font-mono uppercase block mb-1">SUPPORTING:</strong>
              Idiosyncratic double-hyphen (--) delimiter habit present in 100% of analyzed forum posts across all 4 personas. Jaccard syntactic similarity index of 0.89 with uniform lowercase conventions and omission of Oxford commas.
            </div>

            <div className="p-3 rounded-lg bg-[#0D1016] border border-red-950 text-red-300 text-xs leading-relaxed">
              <strong className="text-red-400 font-mono uppercase block mb-1">CONFLICTING:</strong>
              Developer persona x17_dev uses English UK spelling conventions ("optimise", "synchronisation"), whereas darkx17 forum posts feature mixed US/UK terminology.
            </div>

            <div className="p-3 rounded-lg bg-[#0D1016] border border-amber-950 text-amber-300 text-xs leading-relaxed">
              <strong className="text-amber-400 font-mono uppercase block mb-1">UNKNOWN:</strong>
              Non-English forum paste samples require native Cyrillic/Slavic authorial baseline crawls.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: BEHAVIOUR */}
      {activeTab === 'behaviour' && (
        <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 space-y-4 font-mono text-xs animate-in fade-in duration-100">
          <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
            <span className="font-bold text-white text-sm">Behavioural Modus Operandi Assessment</span>
            <span className="text-orange-400 font-bold">88% Match Score</span>
          </div>

          <div className="space-y-3 font-sans">
            <div className="p-3 rounded-lg bg-[#0D1016] border border-emerald-950 text-emerald-300 text-xs leading-relaxed">
              <strong className="text-emerald-400 font-mono uppercase block mb-1">SUPPORTING:</strong>
              Coordinated cross-forum escalation pattern: database leaks published by shadow_x17 on Dread are consistently monetized within 45 minutes by x_shadow on XSS via multi-sig escrow.
            </div>

            <div className="p-3 rounded-lg bg-[#0D1016] border border-red-950 text-red-300 text-xs leading-relaxed">
              <strong className="text-red-400 font-mono uppercase block mb-1">CONFLICTING:</strong>
              Divergence in customer support response speed: x_shadow responds to escrow disputes within 15 minutes, whereas shadow_x17 maintains multi-day response delays on public breach queries.
            </div>

            <div className="p-3 rounded-lg bg-[#0D1016] border border-amber-950 text-amber-300 text-xs leading-relaxed">
              <strong className="text-amber-400 font-mono uppercase block mb-1">UNKNOWN:</strong>
              Private off-platform Jabber (XMPP) chat logs between secondary brokers have not been intercepted.
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: TEMPORAL */}
      {activeTab === 'temporal' && (
        <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 space-y-4 font-mono text-xs animate-in fade-in duration-100">
          <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
            <span className="font-bold text-white text-sm">Temporal Telemetry & Diurnal Activity</span>
            <span className="text-orange-400 font-bold">91% Match Score</span>
          </div>

          <div className="space-y-3 font-sans">
            <div className="p-3 rounded-lg bg-[#0D1016] border border-emerald-950 text-emerald-300 text-xs leading-relaxed">
              <strong className="text-emerald-400 font-mono uppercase block mb-1">SUPPORTING:</strong>
              Pearson correlation r = 0.88 across 180 monitored days. Sessions strictly confined to 20:00–03:00 UTC (peak 22:30 UTC), indicating UTC+03:00 operational timezone. Synchronized 3-week holiday dormancy.
            </div>

            <div className="p-3 rounded-lg bg-[#0D1016] border border-red-950 text-red-300 text-xs leading-relaxed">
              <strong className="text-red-400 font-mono uppercase block mb-1">CONFLICTING:</strong>
              Isolated session burst at 08:30 UTC recorded once on BreachForums mirror, diverging from nocturnal schedule.
            </div>

            <div className="p-3 rounded-lg bg-[#0D1016] border border-amber-950 text-amber-300 text-xs leading-relaxed">
              <strong className="text-amber-400 font-mono uppercase block mb-1">UNKNOWN:</strong>
              Physical geolocation cannot be resolved solely from diurnal distribution without ISP cooperation.
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: TECHNICAL */}
      {activeTab === 'technical' && (
        <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 space-y-4 font-mono text-xs animate-in fade-in duration-100">
          <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
            <span className="font-bold text-white text-sm">Technical Indicators & Cryptographic Anchors</span>
            <span className="text-orange-400 font-bold">96% Match Score</span>
          </div>

          <div className="space-y-3 font-sans">
            <div className="p-3 rounded-lg bg-[#0D1016] border border-emerald-950 text-emerald-300 text-xs leading-relaxed">
              <strong className="text-emerald-400 font-mono uppercase block mb-1">SUPPORTING:</strong>
              Hard cryptographic collision: RSA 4096-bit OpenPGP key fingerprint 0x7E4A8F2C91B4 shared identically across shadow_x17 and x_shadow. Bitcoin SegWit address observed across escrow listings.
            </div>

            <div className="p-3 rounded-lg bg-[#0D1016] border border-red-950 text-red-300 text-xs leading-relaxed">
              <strong className="text-red-400 font-mono uppercase block mb-1">CONFLICTING:</strong>
              Distinct darknet client TLS JA3 fingerprint (771,4865-4866... vs 771,4867...) indicating possible dual-workstation or virtual machine environment.
            </div>

            <div className="p-3 rounded-lg bg-[#0D1016] border border-amber-950 text-amber-300 text-xs leading-relaxed">
              <strong className="text-amber-400 font-mono uppercase block mb-1">UNKNOWN:</strong>
              Physical host MAC address and CPU hardware serial numbers are obscured by virtualized hypervisors.
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: INFRASTRUCTURE */}
      {activeTab === 'infrastructure' && (
        <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 space-y-4 font-mono text-xs animate-in fade-in duration-100">
          <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
            <span className="font-bold text-white text-sm">Infrastructure Relationships</span>
            <span className="text-orange-400 font-bold">93% Match Score</span>
          </div>

          <div className="space-y-3 font-sans">
            <div className="p-3 rounded-lg bg-[#0D1016] border border-emerald-950 text-emerald-300 text-xs leading-relaxed">
              <strong className="text-emerald-400 font-mono uppercase block mb-1">SUPPORTING:</strong>
              Reverse-proxy node 185.220.101.45 (AS206238 Njalla/FlokiNET) hosts clear-web gateway darkx17-vault.is. SSH host public key fingerprint matches developmental staging node.
            </div>

            <div className="p-3 rounded-lg bg-[#0D1016] border border-red-950 text-red-300 text-xs leading-relaxed">
              <strong className="text-red-400 font-mono uppercase block mb-1">CONFLICTING:</strong>
              Development staging node routes outbound DNS queries through public Cloudflare 1.1.1.1, whereas darknet mirror strictly resolves through internal onion daemon.
            </div>

            <div className="p-3 rounded-lg bg-[#0D1016] border border-amber-950 text-amber-300 text-xs leading-relaxed">
              <strong className="text-amber-400 font-mono uppercase block mb-1">UNKNOWN:</strong>
              Upstream ISP physical transit contracts for 185.220.101.45 require formal court subpoena.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
