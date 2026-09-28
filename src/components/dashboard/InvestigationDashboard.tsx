import React from 'react';
import { 
  ActorCluster, 
  InvestigationConfig, 
  TimelineEvent, 
  AuditLogItem 
} from '../../types/investigation';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { 
  Users, 
  Boxes, 
  FileCheck2, 
  ShieldCheck, 
  CheckCircle2,
  Fingerprint, 
  AlertCircle, 
  ArrowRight, 
  Eye, 
  ShieldAlert, 
  TrendingUp,
  FileText,
  Clock,
  Sparkles,
  Search,
  ExternalLink,
  Share2
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
  const clusterA = clusters.find(c => c.id === 'Actor Cluster A') || clusters[0];
  const clusterB = clusters.find(c => c.id === 'Actor Cluster B') || clusters[1];

  return (
    <div className="space-y-6">
      {/* Command Center Header Banner */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded">
                INVESTIGATION COMMAND CENTER
              </span>
              <span className="text-xs font-mono text-slate-300">
                CASE: <strong className="text-white font-mono">{config.investigationId}</strong>
              </span>
              <span className="text-xs font-mono text-slate-500">|</span>
              <span className="text-xs font-mono text-slate-400">
                WARRANT #CR-2026-8819 (AUTHORIZED)
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Dark Web Threat Actor De-Anonymization & Real-World Attribution
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Problem Statement SIH26151 • Multi-signal digital identity correlation (Stage 1) and explainable candidate entity attribution (Stage 2) with human-in-the-loop validation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('reports')}
              className="px-3.5 py-2 rounded-lg bg-[#181D26] hover:bg-[#202733] text-slate-200 border border-[#2A3342] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-orange-400" />
              <span>Dossier Report</span>
            </button>
            <button
              onClick={() => onNavigate('graph')}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-950/60 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Relationship Graph</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Key Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#12161E] border border-[#202632] rounded-xl p-3.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Active Cases</span>
            <FileCheck2 className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">1</div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">INV-2026-0151</div>
        </div>

        <div className="bg-[#12161E] border border-[#202632] rounded-xl p-3.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Digital Identities</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">4</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Ingested handles</div>
        </div>

        <div className="bg-[#12161E] border border-[#202632] rounded-xl p-3.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Actor Clusters</span>
            <Boxes className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{clusters.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Stage 1 groupings</div>
        </div>

        <div className="bg-[#12161E] border border-[#202632] rounded-xl p-3.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Evidence Items</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">18</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Cross-verified links</div>
        </div>

        <div className="bg-[#12161E] border border-[#202632] rounded-xl p-3.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Stage 2 Eligible</span>
            <Fingerprint className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-orange-400">1</div>
          <div className="text-[11px] text-slate-500 mt-0.5">&ge; 80% Threshold</div>
        </div>

        <div className="bg-[#12161E] border border-amber-900/40 rounded-xl p-3.5 bg-gradient-to-b from-[#12161E] to-[#1C1710]">
          <div className="flex items-center justify-between text-amber-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Pending Validation</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">1</div>
          <div className="text-[11px] text-amber-400/80 mt-0.5">Investigator gate</div>
        </div>
      </div>

      {/* Active Investigation Card */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#1E2430] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                PRIMARY ACTIVE INVESTIGATION
              </span>
              <span className="text-xs font-mono bg-[#181D26] text-slate-300 px-2 py-0.5 rounded border border-[#27303E]">
                CASE {config.investigationId}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Operation DarkEcho // Threat Actor Cluster A Attribution
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Lead: {config.leadInvestigator} • {config.agency}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('case-builder')}
              className="px-3.5 py-2 rounded-lg bg-[#181D26] hover:bg-[#202733] text-slate-200 border border-[#2A3342] text-xs font-mono transition-colors"
            >
              Open Case Builder
            </button>
            <button
              onClick={() => onNavigate('stage2')}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-950/60 flex items-center gap-1.5"
            >
              <span>Stage 2 Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Case Status Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono bg-[#0D1016] border border-[#1A202C] rounded-lg p-4">
          <div>
            <div className="text-slate-500 text-[10px] uppercase">Correlated Identities</div>
            <div className="text-white font-bold mt-1 text-sm">4 Personas</div>
            <div className="text-slate-400 text-[11px] mt-0.5">@shadow_x17, @x_shadow, @darkx17, @x17_dev</div>
          </div>

          <div>
            <div className="text-slate-500 text-[10px] uppercase">Stage 1 Correlation Score</div>
            <div className="text-orange-400 font-bold mt-1 text-sm">92% Strength</div>
            <div className="text-emerald-400 text-[11px] mt-0.5">VERY STRONG EVIDENCE (&gt;80%)</div>
          </div>

          <div>
            <div className="text-slate-500 text-[10px] uppercase">Stage 2 Gate Status</div>
            <div className="text-emerald-300 font-bold mt-1 text-sm">STAGE 2 INITIATED</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Authorized by INV-017</div>
          </div>

          <div>
            <div className="text-slate-500 text-[10px] uppercase">Primary Attribution Lead</div>
            <div className="text-white font-bold mt-1 text-sm">Candidate Entity A (82%)</div>
            <div className="text-amber-400 text-[11px] mt-0.5">Human Validation Required</div>
          </div>
        </div>
      </div>

      {/* Dual-Confidence Display */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
              Dual-Confidence Framework: Stage 1 Correlation vs. Stage 2 Attribution
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            SEPARATE ANALYTICAL QUESTIONS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Stage 1 Confidence Card */}
          <div className="bg-[#0D1016] border border-orange-500/40 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-orange-400">
                STAGE 1 // ACTOR CORRELATION
              </span>
              <span className="text-2xl font-extrabold font-mono text-orange-400">92%</span>
            </div>
            <div className="text-xs font-bold text-white uppercase font-mono">
              VERY STRONG EVIDENCE
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
              "Are these digital identities likely controlled by the same threat actor?"
            </p>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              Target: Actor Cluster A (shadow_x17, x_shadow, darkx17, x17_dev)
            </div>
          </div>

          {/* Stage 2 Confidence Card */}
          <div className="bg-[#0D1016] border border-amber-500/40 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-amber-400">
                STAGE 2 // REAL-WORLD ATTRIBUTION
              </span>
              <span className="text-2xl font-extrabold font-mono text-amber-300">82%</span>
            </div>
            <div className="text-xs font-bold text-white uppercase font-mono">
              ATTRIBUTION LEAD
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
              "Is there evidence-based linkage connecting this actor to Candidate Entity A?"
            </p>
            <div className="text-[11px] text-slate-400 font-mono pt-1">
              Target: Candidate Entity A (Meridian S.R.O. / Subject A. K.)
            </div>
          </div>
        </div>

        <div className="text-center pt-2 text-xs font-mono text-slate-400 italic">
          "The system never computes an 'Overall Hacker Probability'. Stage 1 establishes digital actor linkage; Stage 2 investigates potential real-world attribution."
        </div>
      </div>

      {/* Actor Clusters & Decision Gates Grid */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
          <div>
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
              <Boxes className="w-4 h-4 text-orange-400" />
              <span>Actor Clusters & Stage 2 Decision Gates</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluated clusters with eligibility checks against the {config.stage2Threshold}% threshold.
            </p>
          </div>
          <button
            onClick={() => onNavigate('clusters')}
            className="text-xs text-orange-400 hover:text-orange-300 font-mono flex items-center gap-1"
          >
            <span>Manage Clusters</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clusters.map((c) => {
            const isEligible = c.actorCorrelationScore >= config.stage2Threshold;
            return (
              <div key={c.id} className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold font-mono text-white text-sm">{c.id}</h4>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {c.identities.map(i => `@${i.username}`).join(', ') || 'No identities linked'}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold font-mono text-orange-400">{c.actorCorrelationScore}%</span>
                    <span className="text-[9px] text-slate-500 block font-mono uppercase">Correlation</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-[#1A202C]">
                  <ConfidenceBadge band={c.classification} size="sm" />
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isEligible ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30' : 'bg-[#181D26] text-slate-400 border border-[#232A36]'
                  }`}>
                    {isEligible ? 'STAGE 2 ELIGIBLE' : 'NOT ELIGIBLE (<80%)'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#1A202C]">
                  <button
                    onClick={() => { onSelectCluster(c.id); onNavigate('evidence'); }}
                    className="px-3 py-1.5 rounded bg-[#181D26] hover:bg-[#202733] text-slate-300 text-xs font-mono transition-colors"
                  >
                    View Evidence
                  </button>

                  {isEligible ? (
                    c.stage2Initiated ? (
                      <button
                        onClick={() => onNavigate('stage2')}
                        className="px-3 py-1.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40 hover:bg-orange-500/30 text-xs font-mono font-semibold transition-colors flex items-center gap-1"
                      >
                        <Fingerprint className="w-3.5 h-3.5" />
                        <span>View Attribution Lead</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenStage2Modal(c)}
                        className="px-3.5 py-1.5 rounded bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-950/60 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Initiate Attribution</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => { onSelectCluster(c.id); onNavigate('evidence'); }}
                      className="px-3 py-1.5 rounded bg-[#151922] text-slate-400 hover:text-slate-200 text-xs font-mono border border-[#1E2430] transition-colors"
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

      {/* Real-time Forensic Recent Activity Feed */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
              Forensic Activity & Decision Log
            </h3>
          </div>
          <button
            onClick={() => onNavigate('timeline')}
            className="text-xs text-orange-400 hover:text-orange-300 font-mono flex items-center gap-1"
          >
            <span>Full Timeline</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {events.slice(0, 5).map((evt) => (
            <div 
              key={evt.id}
              className="flex items-start justify-between p-3 rounded-lg bg-[#0D1016] border border-[#1A202C] hover:border-[#27303E] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    <span>{evt.title}</span>
                    <span className="text-[10px] text-slate-500 bg-[#161B24] px-1.5 py-0.2 rounded border border-[#202734]">
                      {evt.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                    {evt.description}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div className="text-[10px] font-mono text-slate-500">{evt.date}</div>
                {evt.confidenceImpact && (
                  <span className="text-[10px] font-mono text-orange-400 font-semibold mt-0.5 block">
                    {evt.confidenceImpact}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

