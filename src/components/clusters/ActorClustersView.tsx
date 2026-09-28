import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { ActorCluster, InvestigationConfig } from '../../types/investigation';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { EvidenceCounter } from '../common/EvidenceCounter';
import { 
  Boxes, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  FileText, 
  Sliders,
  HelpCircle,
  AlertTriangle,
  Lock,
  DoorClosed
} from 'lucide-react';

interface ActorClustersViewProps {
  clusters?: ActorCluster[];
  config?: InvestigationConfig;
  onOpenStage2Modal?: (cluster: ActorCluster) => void;
  onNavigate?: (tabId: string) => void;
  onSelectCluster?: (clusterId: string) => void;
}

export const ActorClustersView: React.FC<ActorClustersViewProps> = (props) => {
  const caseContext = useCase();
  const navigate = useNavigate();
  const outletCtx = useOutletContext<{ onOpenStage2Modal?: (c: ActorCluster) => void }>();

  const clusters = props.clusters || caseContext.clusters;
  const config = props.config || caseContext.config;
  const activeCase = caseContext.activeCase;

  const onOpenStage2Modal = props.onOpenStage2Modal || outletCtx?.onOpenStage2Modal || ((_c: ActorCluster) => {});
  const onSelectCluster = props.onSelectCluster || caseContext.setSelectedClusterId;

  const onNavigate = (tabId: string) => {
    if (props.onNavigate) {
      props.onNavigate(tabId);
      return;
    }
    const tabMap: Record<string, string> = {
      'case-builder': `/cases/${activeCase.id}`,
      'identities': `/cases/${activeCase.id}/identities`,
      'correlation': `/cases/${activeCase.id}/correlation`,
      'graph': `/cases/${activeCase.id}/graph`,
      'clusters': `/cases/${activeCase.id}/clusters`,
      'evidence': `/cases/${activeCase.id}/evidence`,
      'timeline': `/cases/${activeCase.id}/timeline`,
      'stage2': `/cases/${activeCase.id}/attribution`,
      'candidates': `/cases/${activeCase.id}/candidates`,
      'reports': `/cases/${activeCase.id}/report`,
      'sources': '/sources',
      'settings': '/settings',
    };
    navigate(tabMap[tabId] || `/cases/${activeCase.id}`);
  };

  const eligibleCluster = clusters.find(c => c.actorCorrelationScore >= config.stage2Threshold);

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                STAGE 1 // ACTOR CLUSTERING
              </span>
              <span className="text-xs text-slate-400 font-mono">
                STAGE 2 ELIGIBILITY THRESHOLD: <strong className="text-emerald-400">{config.stage2Threshold}%</strong>
              </span>
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <Boxes className="w-5 h-5 text-emerald-400" />
              <span>Probable Digital Actor Clusters & Stage 2 Evidence Gate</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Clusters are formed by multi-signal evidence fusion. High correlation indicates relational confidence, never a confirmed legal person. Only clusters scoring &ge; {config.stage2Threshold}% are eligible for investigator authorization to initiate Stage 2.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#070b14] border border-slate-800 rounded-lg p-3 text-xs font-mono">
            <div>
              <div className="text-slate-400 text-[10px] uppercase">Clusters Evaluated</div>
              <div className="text-white font-bold text-base">{clusters.length} Groups</div>
            </div>
            <div className="h-7 w-px bg-slate-800 mx-2" />
            <div>
              <div className="text-slate-400 text-[10px] uppercase">Stage 2 Eligible</div>
              <div className="text-emerald-400 font-bold text-base">
                {clusters.filter(c => c.actorCorrelationScore >= config.stage2Threshold).length} Clusters
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STAGE 2 EVIDENCE GATE (Prompt Mandated Card) */}
      {eligibleCluster && (
        <div className="bg-[#0b162c] border-2 border-cyan-500/80 rounded-xl p-6 shadow-2xl relative overflow-hidden font-mono">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm uppercase tracking-wider">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>STAGE 2 EVIDENCE GATE: {eligibleCluster.id}</span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-3 flex-wrap">
                <span>Actor Correlation: <strong className="text-emerald-400">{eligibleCluster.actorCorrelationScore}%</strong></span>
                <span>Threshold: <strong className="text-white">{config.stage2Threshold}%</strong></span>
                <span>Supporting: <strong className="text-emerald-400">{eligibleCluster.scoreBreakdown.supportingCount}</strong></span>
                <span>Conflicting: <strong className="text-red-400">{eligibleCluster.scoreBreakdown.conflictingCount}</strong></span>
                <span>Unknown: <strong className="text-slate-400">{eligibleCluster.scoreBreakdown.unknownCount}</strong></span>
              </div>
              <div className="text-[11px] text-amber-300 flex items-center gap-1.5 pt-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>STATUS: ELIGIBLE — Mandatory investigator authorization required before entity resolution begins.</span>
              </div>
            </div>

            <div>
              {eligibleCluster.stage2Initiated ? (
                <button
                  onClick={() => onNavigate('stage2')}
                  className="px-4 py-2 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-600 hover:bg-cyan-900 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <span>STAGE 2 ACTIVE &rarr;</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenStage2Modal(eligibleCluster)}
                  className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-950/60 flex items-center gap-2 cursor-pointer"
                >
                  <span>[ INITIATE REAL-WORLD ATTRIBUTION ]</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Clusters Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clusters.map((cluster) => {
          const isEligible = cluster.actorCorrelationScore >= config.stage2Threshold;
          const bd = cluster.scoreBreakdown;

          return (
            <div 
              key={cluster.id}
              className={`bg-[#0b1220] border rounded-xl p-5 space-y-4 shadow-xl transition-all ${
                isEligible 
                  ? 'border-slate-800 hover:border-slate-700' 
                  : 'border-slate-800/60 bg-[#090e18]/80'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    PROBABLE DIGITAL ACTOR CLUSTER
                  </div>
                  <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                    <span>{cluster.id}</span>
                  </h3>
                  <div className="text-xs text-slate-400 font-sans mt-0.5">
                    {cluster.codename}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-extrabold font-mono text-emerald-400">
                    {cluster.actorCorrelationScore}%
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">
                    Correlation Strength
                  </div>
                </div>
              </div>

              {/* Accounts in Cluster */}
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5 font-semibold">
                  Correlated Accounts ({cluster.identities.length}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {cluster.identities.length > 0 ? (
                    cluster.identities.map((id) => (
                      <span 
                        key={id.id}
                        className="px-2.5 py-1 rounded bg-[#070b14] border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>@{id.username}</span>
                        <span className="text-[10px] text-slate-400">({id.platform.split(' ')[0]})</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-mono text-slate-400 italic">
                      Isolated peripheral telemetry (No direct persona overlap)
                    </span>
                  )}
                </div>
              </div>

              {/* Classification and Eligibility Status */}
              <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Evidence Classification:</span>
                  <ConfidenceBadge band={cluster.classification} size="sm" />
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400">Stage 2 Eligibility:</span>
                  {isEligible ? (
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{cluster.stage2Initiated ? 'STAGE 2 INITIATED' : 'ELIGIBLE'}</span>
                    </span>
                  ) : (
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>NOT ELIGIBLE (&lt; {config.stage2Threshold}%)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Supporting, Conflicting, Unknown counts */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-[#070b14] p-2 rounded border border-emerald-950">
                  <div className="text-slate-400 text-[10px]">Supporting Evidence</div>
                  <div className="text-emerald-400 font-bold text-base mt-0.5">{bd.supportingCount}</div>
                </div>
                <div className="bg-[#070b14] p-2 rounded border border-red-950">
                  <div className="text-slate-400 text-[10px]">Conflicting Evidence</div>
                  <div className="text-red-400 font-bold text-base mt-0.5">{bd.conflictingCount}</div>
                </div>
                <div className="bg-[#070b14] p-2 rounded border border-slate-800" title="Missing data treated as UNKNOWN, never negative">
                  <div className="text-slate-400 text-[10px]">Unknown / Missing</div>
                  <div className="text-slate-300 font-bold text-base mt-0.5">{bd.unknownCount}</div>
                </div>
              </div>

              {/* Actions Specified by Prompt */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap font-mono text-xs">
                <button
                  onClick={() => {
                    onSelectCluster(cluster.id);
                    onNavigate('identities');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold uppercase tracking-wider transition-colors"
                >
                  VIEW ACTOR
                </button>

                {isEligible ? (
                  cluster.stage2Initiated ? (
                    <button
                      onClick={() => onNavigate('stage2')}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-600 hover:bg-cyan-900 font-bold uppercase tracking-wider transition-all"
                    >
                      VIEW ATTRIBUTION
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenStage2Modal(cluster)}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-950/60 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>INITIATE REAL-WORLD ATTRIBUTION</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => {
                      onSelectCluster(cluster.id);
                      onNavigate('evidence');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-950 border border-amber-900/60 text-amber-300 font-semibold uppercase tracking-wider transition-colors"
                  >
                    VIEW EVIDENCE GAPS
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
