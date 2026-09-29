import React, { useState } from 'react';
import { InvestigationConfig, AuditLogItem } from '../../types/investigation';
import { 
  Sliders, 
  ShieldCheck, 
  RotateCcw, 
  Scale,
  Activity,
  User,
  Palette,
  Settings as SettingsIcon,
  Database,
  Cpu,
  CheckCircle2,
  FileCheck2,
  Lock,
  Terminal,
  Globe
} from 'lucide-react';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { useCase } from '../../context/CaseContext';

interface SettingsViewProps {
  config?: InvestigationConfig;
  onUpdateConfig?: (newConfig: InvestigationConfig) => void;
  auditLogs?: AuditLogItem[];
  onResetData?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = (props) => {
  const caseContext = useCase();
  const config = props.config || caseContext.config;
  const onUpdateConfig = props.onUpdateConfig || caseContext.updateConfig;
  const auditLogs = props.auditLogs || caseContext.auditLogs;
  const onResetData = props.onResetData || caseContext.resetToDefault;

  const [activeSection, setActiveSection] = useState<'account' | 'appearance' | 'preferences' | 'sources' | 'system'>('preferences');
  const [themePreference, setThemePreference] = useState<'charcoal' | 'dossier'>('charcoal');
  const [saveToast, setSaveToast] = useState(false);

  const handleThresholdChange = (newVal: number) => {
    onUpdateConfig({
      ...config,
      stage2Threshold: newVal
    });
  };

  const handleWeightChange = (key: keyof InvestigationConfig['weights'], val: number) => {
    onUpdateConfig({
      ...config,
      weights: {
        ...config.weights,
        [key]: val
      }
    });
  };

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-[#C85F0A]/15 text-[#E97817] px-2.5 py-0.5 rounded border border-[#C85F0A]/40 uppercase tracking-wider">
              SPECTRA SYSTEM CONTROL
            </span>
            <span className="text-xs text-slate-400 font-mono">
              PLATFORM PREFERENCES
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 font-mono">
            <Sliders className="w-6 h-6 text-[#E97817]" />
            <span>Platform Configuration & Audit Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure Stage 2 eligibility thresholds, adjust signal weights, manage investigator credentials, and review immutable audit logs.
          </p>
        </div>

        <button
          onClick={onResetData}
          className="px-3.5 py-2 rounded-lg bg-[#181D26] hover:bg-[#202734] text-slate-200 border border-[#2A3342] text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#E97817]" />
          <span>Reset Demonstration State</span>
        </button>
      </div>

      {/* 5-Section Nav Tabs (Part 46: Account, Appearance, Investigation Preferences, Data Sources, System) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#1E2430] font-mono text-xs">
        <button
          onClick={() => setActiveSection('account')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeSection === 'account'
              ? 'bg-[#C85F0A]/20 text-orange-300 border border-[#C85F0A]/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <User className="w-3.5 h-3.5 text-[#E97817]" />
          <span>Account</span>
        </button>

        <button
          onClick={() => setActiveSection('appearance')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeSection === 'appearance'
              ? 'bg-[#C85F0A]/20 text-orange-300 border border-[#C85F0A]/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-[#E97817]" />
          <span>Appearance</span>
        </button>

        <button
          onClick={() => setActiveSection('preferences')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeSection === 'preferences'
              ? 'bg-[#C85F0A]/20 text-orange-300 border border-[#C85F0A]/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-[#E97817]" />
          <span>Investigation Preferences</span>
        </button>

        <button
          onClick={() => setActiveSection('sources')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeSection === 'sources'
              ? 'bg-[#C85F0A]/20 text-orange-300 border border-[#C85F0A]/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-[#E97817]" />
          <span>Data Sources</span>
        </button>

        <button
          onClick={() => setActiveSection('system')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeSection === 'system'
              ? 'bg-[#C85F0A]/20 text-orange-300 border border-[#C85F0A]/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-[#12161E]'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-[#E97817]" />
          <span>System & Audit</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-lg text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Preferences updated successfully. Changes applied to active session.</span>
        </div>
      )}

      {/* SECTION 1: ACCOUNT */}
      {activeSection === 'account' && (
        <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl space-y-5 text-xs font-mono">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#1E232B] pb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-[#E97817]" />
            <span>Investigator Credentials & Security Clearance</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#0D1016] rounded-lg border border-[#1E2430] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Active Investigator:</span>
              <div className="text-white font-bold text-sm">Special Agent INV-017</div>
              <span className="text-[10px] text-[#E97817] block pt-0.5">Role: Lead Digital Forensics Analyst</span>
            </div>
            <div className="p-4 bg-[#0D1016] rounded-lg border border-[#1E2430] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Agency Clearance:</span>
              <div className="text-emerald-400 font-bold text-sm">LEVEL 4 // FORENSIC ATTRIBUTION</div>
              <span className="text-[10px] text-slate-400 block pt-0.5">Statutory Warrant Authority: Section 69A IT Act</span>
            </div>
            <div className="p-4 bg-[#0D1016] rounded-lg border border-[#1E2430] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Session Integrity:</span>
              <div className="text-white font-bold text-sm">Air-Gapped Controlled Environment</div>
              <span className="text-[10px] text-slate-500 block pt-0.5">Token: SHA-256 JWT Signed</span>
            </div>
            <div className="p-4 bg-[#0D1016] rounded-lg border border-[#1E2430] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Investigating Unit:</span>
              <div className="text-white font-bold text-sm">SPECTRA Cyber Attribution Cell</div>
              <span className="text-[10px] text-slate-400 block pt-0.5">National Cyber Crime Coordination Centre (I4C)</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: APPEARANCE */}
      {activeSection === 'appearance' && (
        <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl space-y-5 text-xs font-mono">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#1E232B] pb-2 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#E97817]" />
            <span>Theme & Display Configurations</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              onClick={() => { setThemePreference('charcoal'); triggerSaveNotification(); }}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                themePreference === 'charcoal'
                  ? 'bg-[#181D26] border-[#C85F0A] ring-1 ring-[#C85F0A]'
                  : 'bg-[#0D1016] border-[#1E2430] hover:bg-[#151A24]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Tactical Obsidian Console</span>
                <span className="text-[10px] text-[#E97817] font-bold">DEFAULT</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                Optimized for dark-room threat telemetry with charcoal (#151515) and restrained orange (#C85F0A) accents.
              </p>
            </div>

            <div 
              onClick={() => { setThemePreference('dossier'); triggerSaveNotification(); }}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                themePreference === 'dossier'
                  ? 'bg-[#181D26] border-[#C85F0A] ring-1 ring-[#C85F0A]'
                  : 'bg-[#0D1016] border-[#1E2430] hover:bg-[#151A24]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Archival Dossier (Warm Paper)</span>
                <span className="text-[10px] text-slate-500">PRINT MODE</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                High-contrast warm off-white (#F7F3EC) paper presentation with dark charcoal typography for audit dossiers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: INVESTIGATION PREFERENCES */}
      {activeSection === 'preferences' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Configurable Threshold & Weights */}
          <div className="lg:col-span-6 space-y-6">
            {/* Configurable Threshold Slider */}
            <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
                <div>
                  <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#E97817]" />
                    <span>Stage 2 Eligibility Threshold</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Minimum Actor Correlation score required for an investigator to authorize Stage 2 entity resolution.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-[#E97817]">
                    {config.stage2Threshold}%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    DEFAULT: 80%
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="1"
                  value={config.stage2Threshold}
                  onChange={(e) => handleThresholdChange(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer h-2 bg-[#0D1016] rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>50% (Permissive)</span>
                  <span className="text-[#E97817] font-bold">&larr; Recommended: 80% &rarr;</span>
                  <span>95% (Strict Evidentiary)</span>
                </div>
              </div>

              <div className="bg-[#0D1016] border border-[#1E2430] rounded-lg p-3 text-xs font-mono text-slate-300 space-y-1">
                <div className="font-semibold text-orange-400">THRESHOLD IMPACT:</div>
                <p className="text-[11px] leading-relaxed text-slate-400 font-sans">
                  Clusters scoring &ge; {config.stage2Threshold}% are marked <code>ELIGIBLE FOR INVESTIGATOR REVIEW</code>. 
                  Clusters scoring below {config.stage2Threshold}% cannot proceed to Stage 2 and are marked <code>NOT ELIGIBLE</code>.
                </p>
              </div>
            </div>

            {/* Signal Weights Slider */}
            <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-4">
              <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-[#1E2430] pb-2">
                Multi-Signal Fusion Weights
              </h2>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Technical / Digital Indicators (Hard Anchors):</span>
                    <span className="text-white font-bold">{Math.round(config.weights.technical * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="0.50"
                    step="0.05"
                    value={config.weights.technical}
                    onChange={(e) => handleWeightChange('technical', Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-1.5 bg-[#0D1016] rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Writing Style / Stylometry (NLP Syntax):</span>
                    <span className="text-white font-bold">{Math.round(config.weights.stylometry * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.40"
                    step="0.05"
                    value={config.weights.stylometry}
                    onChange={(e) => handleWeightChange('stylometry', Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-1.5 bg-[#0D1016] rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Behavioural Patterns & Modus Operandi:</span>
                    <span className="text-white font-bold">{Math.round(config.weights.behaviour * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.40"
                    step="0.05"
                    value={config.weights.behaviour}
                    onChange={(e) => handleWeightChange('behaviour', Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-1.5 bg-[#0D1016] rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Temporal Synchronization & Diurnal Cycle:</span>
                    <span className="text-white font-bold">{Math.round(config.weights.temporal * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.40"
                    step="0.05"
                    value={config.weights.temporal}
                    onChange={(e) => handleWeightChange('temporal', Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-1.5 bg-[#0D1016] rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Username / Alias Orthography:</span>
                    <span className="text-white font-bold">{Math.round(config.weights.username * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.30"
                    step="0.05"
                    value={config.weights.username}
                    onChange={(e) => handleWeightChange('username', Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-1.5 bg-[#0D1016] rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Confidence Bands Interpretation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-3">
              <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-[#1E2430] pb-2">
                Evidence Confidence Interpretation Bands
              </h2>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded bg-[#0D1016] border border-orange-900/60">
                  <span className="font-bold text-white">90–100%</span>
                  <ConfidenceBadge band="VERY STRONG EVIDENCE" size="sm" />
                  <span className="text-[10px] text-[#E97817]">Immediate Stage 2 Candidate</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded bg-[#0D1016] border border-orange-950/60">
                  <span className="font-bold text-white">80–89%</span>
                  <ConfidenceBadge band="STRONG EVIDENCE" size="sm" />
                  <span className="text-[10px] text-orange-400">Default Eligible Threshold</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded bg-[#0D1016] border border-[#202734]">
                  <span className="font-bold text-white">70–79%</span>
                  <ConfidenceBadge band="MODERATE EVIDENCE" size="sm" />
                  <span className="text-[10px] text-slate-400">Secondary Corroboration Needed</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded bg-[#0D1016] border border-amber-900/60">
                  <span className="font-bold text-white">50–69%</span>
                  <ConfidenceBadge band="WEAK / INCONCLUSIVE" size="sm" />
                  <span className="text-[10px] text-amber-400">Not Eligible for Stage 2</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded bg-[#0D1016] border border-red-900/60">
                  <span className="font-bold text-white">Below 50%</span>
                  <ConfidenceBadge band="INSUFFICIENT EVIDENCE" size="sm" />
                  <span className="text-[10px] text-red-400">Strictly Rejected / Ineligible</span>
                </div>
              </div>

              <div className="bg-[#0D1016] border border-[#1E2430] rounded p-3 text-[11px] text-slate-400 italic font-sans leading-relaxed">
                "Confidence bands represent the evidentiary strength of observed digital correlations. They do not constitute automated judicial conclusions."
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: DATA SOURCES */}
      {activeSection === 'sources' && (
        <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl space-y-4 text-xs font-mono">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#1E232B] pb-2 flex items-center gap-2">
            <Database className="w-4 h-4 text-[#E97817]" />
            <span>Active Darknet Feeds & Ingestion Connectors</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#0D1016] border border-[#1E2430] rounded-lg flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Tor Dread Forum Crawler</span>
                <span className="text-[10px] text-slate-400">Onion v3 Auth Relay &bull; 15 min poll</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                ACTIVE
              </span>
            </div>

            <div className="p-3.5 bg-[#0D1016] border border-[#1E2430] rounded-lg flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Market-Y Escrow Ledger</span>
                <span className="text-[10px] text-slate-400">Multi-sig BTC UTXO Watcher</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                ACTIVE
              </span>
            </div>

            <div className="p-3.5 bg-[#0D1016] border border-[#1E2430] rounded-lg flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">BreachForums Mirror Indexer</span>
                <span className="text-[10px] text-slate-400">Database Dump Hash Extractor</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                ACTIVE
              </span>
            </div>

            <div className="p-3.5 bg-[#0D1016] border border-[#1E2430] rounded-lg flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Developer Git Staging Mirror</span>
                <span className="text-[10px] text-slate-400">Commit Authorship & PGP Watcher</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: SYSTEM & AUDIT */}
      {activeSection === 'system' && (
        <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl space-y-4 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-[#1E2430] pb-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#E97817]" />
              <span>Immutable Chain-of-Custody Audit Trail</span>
            </h2>
            <span className="text-xs text-slate-400">{auditLogs.length} events recorded</span>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded bg-[#0D1016] border border-[#1E2430] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#E97817] font-bold">{log.action}</span>
                  <span className="text-slate-400 text-[10px]">{log.timestamp}</span>
                </div>
                <div className="text-slate-300 text-[11px] font-sans leading-relaxed">{log.details}</div>
                <div className="text-slate-500 text-[10px]">Officer: {log.investigator}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
