import React, { useState } from 'react';
import { ActorCluster } from '../../types/investigation';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Sliders, 
  Compass, 
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface EvidenceAnalysisViewProps {
  clusters: ActorCluster[];
  selectedClusterId?: string;
  onNavigate: (tabId: string) => void;
  onOpenStage2Modal: (cluster: ActorCluster) => void;
}

export const EvidenceAnalysisView: React.FC<EvidenceAnalysisViewProps> = ({
  clusters,
  selectedClusterId,
  onNavigate,
  onOpenStage2Modal
}) => {
  const [activeClusterId, setActiveClusterId] = useState<string>(
    selectedClusterId || clusters[0]?.id || 'TA-001'
  );

  const cluster = clusters.find(c => c.id === activeClusterId) || clusters[0];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                FORENSIC EVIDENCE ASSESSMENT
              </span>
              <span className="text-xs text-slate-400 font-mono">
                GAP DETECTION & TRIAGE
              </span>
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              <span>Evidence Gap Analysis & Triage Matrix</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Transparently catalogs available indicators against missing forensic requirements. 
              <strong> Crucial principle:</strong> Missing indicators are recorded as <code>UNKNOWN / NOT AVAILABLE</code> and are never treated as negative evidence against a persona.
            </p>
          </div>

          {/* Cluster Selector Tabs */}
          <div className="flex items-center gap-2 bg-[#070b14] border border-slate-800 rounded-lg p-1.5 overflow-x-auto">
            {clusters.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveClusterId(c.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeClusterId === c.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{c.id}</span>
                <span className="text-[10px] opacity-80">({c.actorCorrelationScore}%)</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Cluster Overview Summary */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold font-mono text-white">
                Cluster: {cluster.id}
              </h3>
              <span className="text-xs text-slate-400 font-mono">({cluster.codename})</span>
              <ConfidenceBadge band={cluster.classification} size="sm" />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-xs font-mono text-slate-400">Target Personas:</span>
              {cluster.identities.map((id) => (
                <span key={id.id} className="text-xs font-mono text-emerald-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  @{id.username}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-extrabold font-mono text-emerald-400">
                {cluster.actorCorrelationScore}%
              </div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">
                Actor Correlation Confidence
              </div>
            </div>

            {cluster.actorCorrelationScore >= 80 && !cluster.stage2Initiated && (
              <button
                onClick={() => onOpenStage2Modal(cluster)}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/60"
              >
                <span>Initiate Stage 2</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Pillar Matrix: Available, Missing, Conflicting (Prompt Spec) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {/* 1. AVAILABLE EVIDENCE */}
          <div className="bg-[#070b14] border border-emerald-950/90 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>AVAILABLE EVIDENCE ({cluster.supportingReasons.length})</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                VERIFIED
              </span>
            </div>

            <div className="space-y-2">
              {cluster.supportingReasons.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-mono text-emerald-300/90 leading-relaxed bg-[#0b1220] p-2 rounded border border-emerald-950/60">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. MISSING EVIDENCE (UNKNOWN) */}
          <div className="bg-[#070b14] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>MISSING EVIDENCE ({cluster.unknownReasons.length})</span>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                NOT NEGATIVE
              </span>
            </div>

            <div className="space-y-2">
              {cluster.unknownReasons.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300 leading-relaxed bg-[#0b1220] p-2 rounded border border-slate-800/80">
                  <span className="text-slate-400 font-bold mt-0.5">?</span>
                  <div>
                    <span>{item}</span>
                    <span className="block mt-0.5 text-[9px] text-amber-400/80 uppercase font-mono">
                      [CLASSIFIED: UNKNOWN / INSUFFICIENT DATA]
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. CONFLICTING EVIDENCE */}
          <div className="bg-[#070b14] border border-red-950/90 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>CONFLICTING EVIDENCE ({cluster.conflictingReasons.length})</span>
              </div>
              <span className="text-[10px] font-mono bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-800">
                DISCREPANCY
              </span>
            </div>

            <div className="space-y-2">
              {cluster.conflictingReasons.length > 0 ? (
                cluster.conflictingReasons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-mono text-red-300/90 leading-relaxed bg-[#0b1220] p-2 rounded border border-red-950/60">
                    <span className="text-red-400 font-bold mt-0.5">⚠</span>
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs font-mono text-slate-500 italic p-3 bg-[#0b1220] rounded">
                  No material operational conflicts detected across monitored forum sections.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* EVIDENCE GAPS (Major Actionable Feature Required by Prompt) */}
        <div className="mt-5 bg-gradient-to-r from-[#070f1e] via-[#09152b] to-[#070f1e] border-2 border-teal-500/40 rounded-xl p-4.5 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold font-mono text-teal-300 uppercase tracking-wide">
              <Compass className="w-5 h-5 text-teal-400" />
              <span>ACTIONABLE EVIDENCE GAPS: WHAT MUST BE OBTAINED NEXT</span>
            </div>
            <span className="text-xs font-mono bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800">
              INVESTIGATIVE DIRECTIVES
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The following specific intelligence items have been algorithmically flagged as critical missing links. Closing these gaps will either promote this cluster into Stage 2 eligibility or provide evidentiary grounds for real-world subpoena requests.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {cluster.evidenceGaps.map((gap, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#0b1220] border border-teal-900/60 text-xs font-mono text-slate-200"
              >
                <div className="w-5 h-5 rounded-full bg-teal-950 border border-teal-600 flex items-center justify-center text-teal-300 font-bold text-[11px] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-teal-200">{gap}</div>
                  <div className="text-[10px] text-slate-400">Target Jurisdiction / Source: MLAT / Subpoena / ISP Telemetry</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
