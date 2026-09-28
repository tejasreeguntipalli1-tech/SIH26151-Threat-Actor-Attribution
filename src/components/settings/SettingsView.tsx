import React from 'react';
import { InvestigationConfig, AuditLogItem } from '../../types/investigation';
import { 
  Sliders, 
  ShieldCheck, 
  HelpCircle, 
  RotateCcw, 
  FileText, 
  Save, 
  UserCheck, 
  Scale,
  Activity
} from 'lucide-react';
import { ConfidenceBadge } from '../common/ConfidenceBadge';

interface SettingsViewProps {
  config: InvestigationConfig;
  onUpdateConfig: (newConfig: InvestigationConfig) => void;
  auditLogs: AuditLogItem[];
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  config,
  onUpdateConfig,
  auditLogs,
  onResetData
}) => {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
              CONFIGURABLE EVALUATION ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              INVESTIGATOR PARAMETERS
            </span>
          </div>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <span>Platform Configuration & Audit Settings</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure Stage 2 eligibility thresholds, adjust signal weights, and review full system audit logs.
          </p>
        </div>

        <button
          onClick={onResetData}
          className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Reset Demonstration State</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configurable Threshold & Weights */}
        <div className="lg:col-span-6 space-y-6">
          {/* Configurable Threshold Slider (Prompt Mandated) */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  <span>Stage 2 Eligibility Threshold</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Minimum Actor Correlation score required for an investigator to authorize Stage 2 entity resolution.
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold font-mono text-emerald-400">
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
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>50% (Permissive)</span>
                <span className="text-emerald-400 font-bold">&larr; Recommended: 80% &rarr;</span>
                <span>95% (Strict Evidentiary)</span>
              </div>
            </div>

            <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-300 space-y-1">
              <div className="font-semibold text-emerald-300">THRESHOLD IMPACT:</div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Clusters scoring &ge; {config.stage2Threshold}% are marked <code>ELIGIBLE FOR INVESTIGATOR REVIEW</code>. 
                Clusters scoring below {config.stage2Threshold}% cannot proceed to Stage 2 and are marked <code>NOT ELIGIBLE</code>.
              </p>
            </div>
          </div>

          {/* Signal Weights Slider */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Multi-Signal Fusion Weights
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Username / Alias Similarity:</span>
                  <span className="text-white font-bold">{Math.round(config.weights.username * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.40"
                  step="0.05"
                  value={config.weights.username}
                  onChange={(e) => handleWeightChange('username', Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Writing Style / Stylometry:</span>
                  <span className="text-white font-bold">{Math.round(config.weights.stylometry * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.40"
                  step="0.05"
                  value={config.weights.stylometry}
                  onChange={(e) => handleWeightChange('stylometry', Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Behavioural Patterns:</span>
                  <span className="text-white font-bold">{Math.round(config.weights.behaviour * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.40"
                  step="0.05"
                  value={config.weights.behaviour}
                  onChange={(e) => handleWeightChange('behaviour', Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Temporal Patterns:</span>
                  <span className="text-white font-bold">{Math.round(config.weights.temporal * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.40"
                  step="0.05"
                  value={config.weights.temporal}
                  onChange={(e) => handleWeightChange('temporal', Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">Technical / Digital Indicators:</span>
                  <span className="text-white font-bold">{Math.round(config.weights.technical * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.40"
                  step="0.05"
                  value={config.weights.technical}
                  onChange={(e) => handleWeightChange('technical', Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Confidence Bands Definition & Audit Trail */}
        <div className="lg:col-span-6 space-y-6">
          {/* Confidence Bands Reference Table (Prompt Mandated) */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Evidence Confidence Range Interpretation Bands
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-[#070b14] border border-emerald-900/60">
                <span className="font-bold text-white">90–100%</span>
                <ConfidenceBadge band="VERY STRONG EVIDENCE" size="sm" />
                <span className="text-[10px] text-emerald-400">Immediate Stage 2 Candidate</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#070b14] border border-teal-900/60">
                <span className="font-bold text-white">80–89%</span>
                <ConfidenceBadge band="STRONG EVIDENCE" size="sm" />
                <span className="text-[10px] text-teal-400">Default Eligible Threshold</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#070b14] border border-blue-900/60">
                <span className="font-bold text-white">70–79%</span>
                <ConfidenceBadge band="MODERATE EVIDENCE" size="sm" />
                <span className="text-[10px] text-blue-400">Secondary Corroboration Needed</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#070b14] border border-amber-900/60">
                <span className="font-bold text-white">50–69%</span>
                <ConfidenceBadge band="WEAK / INCONCLUSIVE" size="sm" />
                <span className="text-[10px] text-amber-400">Not Eligible for Stage 2</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#070b14] border border-red-900/60">
                <span className="font-bold text-white">Below 50%</span>
                <ConfidenceBadge band="INSUFFICIENT EVIDENCE" size="sm" />
                <span className="text-[10px] text-red-400">Strictly Rejected / Ineligible</span>
              </div>
            </div>

            <div className="bg-[#070b14] border border-slate-800/80 rounded p-2.5 text-[11px] text-slate-400 italic">
              "Confidence bands represent the strength of available evidence and are not definitive identity determinations."
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>System & Investigator Audit Trail</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">{auditLogs.length} events logged</span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-2.5 rounded bg-[#070b14] border border-slate-800 text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">{log.action}</span>
                    <span className="text-slate-400 text-[10px]">{log.timestamp}</span>
                  </div>
                  <div className="text-slate-200 text-[11px] font-sans">{log.details}</div>
                  <div className="text-slate-400 text-[10px]">By: {log.investigator}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
