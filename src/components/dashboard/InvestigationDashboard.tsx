import React from 'react';
import { 
  ActorCluster, 
  InvestigationConfig, 
  TimelineEvent, 
  AuditLogItem 
} from '../../types/investigation';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { EvidenceCounter } from '../common/EvidenceCounter';
import { 
  Users, 
  GitMerge, 
  Boxes, 
  FileCheck2, 
  ShieldCheck, 
  CheckCircle2,
  Fingerprint, 
  AlertCircle, 
  ArrowRight, 
  Eye, 
  ShieldAlert, 
  Activity,
  Layers,
  ChevronRight,
  Compass,
  TrendingUp,
  Sparkles,
  Lock
} from 'lucide-react';

interface InvestigationDashboardProps {
  clusters: ActorCluster[];
  config: InvestigationConfig;
  events: TimelineEvent[];
  auditLogs: AuditLogItem[];
  onOpenStage2Modal: (cluster: ActorCluster) => void;
  onNavigate: (tabId: string) => void;
  onSelectCluster: (clusterId: string) => void;
}

export const InvestigationDashboard: React.FC<InvestigationDashboardProps> = ({
  clusters,
  config,
  events,
  auditLogs,
  onOpenStage2Modal,
  onNavigate,
  onSelectCluster
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner: Core Architecture & Statutory Standard */}
      <div className="bg-gradient-to-r from-[#0b1424] via-[#0d1a30] to-[#0b1424] border border-cyan-500/40 rounded-xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-600/50 px-2 py-0.5 rounded">
                INTEGRATED INVESTIGATION WORKSPACE
              </span>
              <span className="text-xs font-mono text-slate-300">
                CASE: <strong className="text-white font-mono">{config.investigationId}</strong>
              </span>
              <span className="text-xs font-mono text-slate-400">
                • {config.agency}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              End-to-End Threat Actor De-Anonymization & Attribution Platform
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Synthesizing fragmented dark web identities in Stage 1 and performing explainable entity resolution in Stage 2 with mandatory investigator gates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('reports')}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Full Dossier</span>
            </button>
            <button
              onClick={() => onNavigate('stage2')}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/60 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <span>Stage 2 Attribution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Upgraded Dashboard Metrics Grid (Prompt Specified) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Digital Identities</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">24</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Stage 1 Personas</div>
        </div>

        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Actor Clusters</span>
            <Boxes className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">8</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Correlated groups</div>
        </div>

        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Stage 2 Eligible</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-300">5</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Score &ge; 80% Threshold</div>
        </div>

        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Attributions Initiated</span>
            <Fingerprint className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300">3</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Authorized by human</div>
        </div>

        <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Candidate Entities</span>
            <Layers className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-teal-300">9</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Hypotheses active</div>
        </div>

        <div className="bg-[#0b1220] border border-amber-900/50 rounded-xl p-3.5 bg-gradient-to-b from-[#0b1220] to-[#1c1206]">
          <div className="flex items-center justify-between text-amber-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Pending Validation</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">4</div>
          <div className="text-[11px] text-amber-400/80 mt-0.5">Requires Investigator</div>
        </div>
      </div>

      {/* DUAL-CONFIDENCE DISPLAY (Prompt Specified) */}
      <div className="bg-[#0b1220] border-2 border-slate-700 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Dual-Confidence Architecture: Stage 1 Correlation vs. Stage 2 Attribution</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            SEPARATE ANALYTICAL QUESTIONS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Stage 1 Confidence Card */}
          <div className="bg-[#070b14] border border-emerald-500/50 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                STAGE 1 // ACTOR CORRELATION
              </span>
              <span className="text-2xl font-extrabold font-mono text-emerald-400">92%</span>
            </div>
            <div className="text-xs font-bold text-white uppercase font-mono">
              VERY STRONG EVIDENCE
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
              "Are these digital identities likely controlled by the same actor?"
            </p>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              Target: Actor Cluster A (shadow_x17, x_shadow, darkx17)
            </div>
          </div>

          {/* Stage 2 Confidence Card */}
          <div className="bg-[#070b14] border border-cyan-500/50 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-cyan-400">
                STAGE 2 // REAL-WORLD ATTRIBUTION
              </span>
              <span className="text-2xl font-extrabold font-mono text-cyan-300">82%</span>
            </div>
            <div className="text-xs font-bold text-white uppercase font-mono">
              ATTRIBUTION LEAD
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
              "Is there evidence connecting this actor to Candidate Entity A?"
            </p>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              Target: Candidate Entity A (Meridian Analytics S.R.O. / Subject A. K.)
            </div>
          </div>
        </div>

        <div className="text-center pt-1 text-xs font-mono text-slate-400 italic">
          "The system never computes an 'Overall Hacker Probability'. Stage 1 establishes digital actor linkage; Stage 2 investigates potential real-world attribution."
        </div>
      </div>

      {/* ACTOR → ENTITY INVESTIGATION OVERVIEW (Prompt Specified) */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
        <h3 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
          ACTOR &rarr; ENTITY INVESTIGATION OVERVIEW
        </h3>

        <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3.5 flex items-center justify-between overflow-x-auto gap-3 text-xs font-mono">
          <div className="text-center p-2 rounded bg-[#0b1220] border border-emerald-900/60 min-w-[130px] flex-shrink-0">
            <div className="text-slate-400 text-[10px]">Probable Actor</div>
            <div className="text-emerald-300 font-bold mt-0.5">Actor Cluster A</div>
            <div className="text-[10px] text-emerald-400 font-mono font-semibold">92% Very Strong</div>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />

          <div className="text-center p-2 rounded bg-[#0b1220] border border-cyan-900/60 min-w-[130px] flex-shrink-0">
            <div className="text-slate-400 text-[10px]">Stage 2 Gate</div>
            <div className="text-cyan-300 font-bold mt-0.5">Stage 2 Initiated</div>
            <div className="text-[10px] text-cyan-400 font-mono font-semibold">By Investigator</div>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />

          <div className="text-center p-2 rounded bg-[#0b1220] border border-slate-800 min-w-[130px] flex-shrink-0">
            <div className="text-slate-400 text-[10px]">Evidence Provenance</div>
            <div className="text-white font-bold mt-0.5">9 Connections</div>
            <div className="text-[10px] text-slate-400 font-mono font-semibold">7 Supp / 1 Confl</div>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />

          <div className="text-center p-2 rounded bg-[#0b1220] border border-slate-800 min-w-[130px] flex-shrink-0">
            <div className="text-slate-400 text-[10px]">Hypotheses Board</div>
            <div className="text-white font-bold mt-0.5">3 Candidates</div>
            <div className="text-[10px] text-slate-400 font-mono font-semibold">Multiple Retained</div>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />

          <div className="text-center p-2 rounded bg-[#0b1220] border border-cyan-500 min-w-[150px] flex-shrink-0">
            <div className="text-slate-400 text-[10px]">Attribution Lead</div>
            <div className="text-cyan-300 font-bold mt-0.5">Candidate A (82%)</div>
            <div className="text-[10px] text-amber-300 font-mono font-semibold">Validation Required</div>
          </div>
        </div>
      </div>

      {/* WHY THIS APPROACH IS DIFFERENT (Prompt Specified Innovation Panel) */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Why This Approach Is Different — 7 Architectural Innovations</span>
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            SIH 2026 VALUE PROPOSITION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 space-y-1">
            <div className="text-cyan-300 font-bold">1. Evidence-to-Entity Resolution</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Digital actor indicators are progressively resolved into potential real-world entities through multi-dimensional consistency checks.
            </p>
          </div>

          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 space-y-1">
            <div className="text-cyan-300 font-bold">2. Explainable Attribution</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Every attribution lead has a traceable evidence chain back to original darknet forum accounts and indicators.
            </p>
          </div>

          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 space-y-1">
            <div className="text-cyan-300 font-bold">3. Multi-Hypothesis Analysis</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              The system retains multiple candidate entities simultaneously instead of prematurely picking a single suspect.
            </p>
          </div>

          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 space-y-1">
            <div className="text-cyan-300 font-bold">4. Conflict Detection</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Contradictory evidence (e.g. inconsistent operating hours or coinjoin mixer hops) is explicitly surfaced and factored in.
            </p>
          </div>

          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 space-y-1">
            <div className="text-cyan-300 font-bold">5. Evidence Gap Analysis</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Transparently catalogs missing forensic requirements and provides lawful recommendations on what to subpoena next.
            </p>
          </div>

          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 space-y-1">
            <div className="text-cyan-300 font-bold">6. Confidence Evolution & Human Validation</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Evidence strength dynamically recalculates when investigators reject or accept links. Human validation is strictly mandatory.
            </p>
          </div>
        </div>
      </div>

      {/* Cluster Overview List with Stage 2 Gate Actions */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
              <Boxes className="w-4 h-4 text-emerald-400" />
              <span>Actor Clusters & Stage 2 Decision Gates</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluated clusters with Stage 2 eligibility checks against the {config.stage2Threshold}% threshold.
            </p>
          </div>
          <button
            onClick={() => onNavigate('clusters')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-mono"
          >
            Manage Clusters &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clusters.map((c) => {
            const isEligible = c.actorCorrelationScore >= config.stage2Threshold;
            return (
              <div key={c.id} className="bg-[#070b14] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold font-mono text-white text-sm">{c.id}</h4>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {c.identities.map(i => `@${i.username}`).join(', ') || 'Peripheral indicators'}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold font-mono text-emerald-400">{c.actorCorrelationScore}%</span>
                    <span className="text-[9px] text-slate-400 block font-mono uppercase">Correlation</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-slate-800/80">
                  <ConfidenceBadge band={c.classification} size="sm" />
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isEligible ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isEligible ? 'STAGE 2 ELIGIBLE' : 'NOT ELIGIBLE'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => { onSelectCluster(c.id); onNavigate('evidence'); }}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
                  >
                    View Evidence
                  </button>

                  {isEligible ? (
                    c.stage2Initiated ? (
                      <button
                        onClick={() => onNavigate('stage2')}
                        className="px-3 py-1.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 hover:bg-cyan-900 text-xs font-mono font-semibold transition-colors flex items-center gap-1"
                      >
                        <Fingerprint className="w-3.5 h-3.5" />
                        <span>View Attribution Lead</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenStage2Modal(c)}
                        className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-950/60 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Initiate Attribution</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => { onSelectCluster(c.id); onNavigate('evidence'); }}
                      className="px-3 py-1.5 rounded bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-mono border border-slate-800 transition-colors"
                    >
                      View Evidence Gaps
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
