import React, { useState } from 'react';
import { 
  CandidateEntity, 
  AuditLogItem, 
  InvestigationConfig 
} from '../../types/investigation';
import { 
  initialCandidateEntities, 
  initialAuditLogs 
} from '../../data/syntheticData';
import { 
  Building2, 
  UserCheck, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Share2, 
  Clock, 
  FileText, 
  ArrowRight, 
  Lock, 
  Check, 
  X, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Scale
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { ConfidenceBadge } from '../common/ConfidenceBadge';

interface CandidateEntitiesViewProps {
  config?: InvestigationConfig;
  onNavigate?: (tabId: string) => void;
  onTraceGraphPath?: (candidateId: string) => void;
}

export const CandidateEntitiesView: React.FC<CandidateEntitiesViewProps> = (props) => {
  const caseContext = useCase();
  const navigate = useNavigate();

  const config = props.config || caseContext.config;
  const activeCase = caseContext.activeCase;

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
      'attribution-graph': `/cases/${activeCase.id}/attribution-graph`,
      'reports': `/cases/${activeCase.id}/report`,
      'sources': '/sources',
      'settings': '/settings',
    };
    navigate(tabMap[tabId] || `/cases/${activeCase.id}`);
  };

  const onTraceGraphPath = props.onTraceGraphPath || ((_id: string) => {
    navigate(`/cases/${activeCase.id}/attribution-graph`);
  });
  const [candidates, setCandidates] = useState<CandidateEntity[]>(initialCandidateEntities);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('CANDIDATE-A');
  const [decisionNotes, setDecisionNotes] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  const activeCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  const handleDecision = (
    candidateId: string, 
    decision: 'ACCEPTED' | 'REJECTED' | 'NEED_MORE_EVIDENCE'
  ) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        let newStatus = c.status;
        if (decision === 'ACCEPTED') newStatus = 'VALIDATED LEAD';
        if (decision === 'REJECTED') newStatus = 'REJECTED';
        if (decision === 'NEED_MORE_EVIDENCE') newStatus = 'REQUIRES ADDITIONAL EVIDENCE';

        return {
          ...c,
          status: newStatus,
          humanValidation: decision
        };
      }
      return c;
    }));

    const msg = `Candidate ${candidateId} decision recorded: ${decision}`;
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
              STAGE 2 ATTRIBUTION
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
              HYPOTHESIS RESOLUTION
            </span>
          </div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Scale className="w-5 h-5 text-cyan-400" />
            <span>Candidate Real-World Entities Comparison</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Comparative evaluation of physical individuals and corporate organizations linked to digital indicators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('graph')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 text-xs font-mono font-semibold transition-colors"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>Trace In Relationship Graph</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-950/80 border border-emerald-500 rounded-lg p-3 text-xs text-emerald-200 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidates.map((cand) => {
          const isSelected = cand.id === selectedCandidateId;
          const isLead = cand.status === 'ATTRIBUTION LEAD' || cand.status === 'VALIDATED LEAD';

          return (
            <div
              key={cand.id}
              onClick={() => setSelectedCandidateId(cand.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0f172a] border-cyan-500 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                  : 'bg-[#0b1220] border-slate-800 hover:border-slate-700 hover:bg-[#0e1626]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {cand.entityType}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    cand.humanValidation === 'ACCEPTED'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : cand.humanValidation === 'REJECTED'
                        ? 'bg-red-950 text-red-300 border border-red-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {cand.humanValidation === 'ACCEPTED' ? 'VALIDATED' : cand.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white font-mono mt-1">
                  {cand.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-sans mt-1 line-clamp-2">
                  {cand.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Attribution Strength:</span>
                  <span className="text-cyan-400 font-bold">{cand.attributionStrength}%</span>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${isLead ? 'bg-cyan-400' : 'bg-amber-500'}`} 
                    style={{ width: `${cand.attributionStrength}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                  <span className="text-emerald-400 font-semibold">{cand.supportingCount} Supp</span>
                  <span className="text-amber-400 font-semibold">{cand.conflictingCount} Confl</span>
                  <span className="text-slate-400">{cand.unknownCount} Unk</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Hypothesis Inspector for Selected Candidate */}
      <div className="bg-[#0b1220] border-2 border-cyan-500/50 rounded-xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                ACTIVE HYPOTHESIS DOSSIER
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                JURISDICTION: {activeCandidate.jurisdiction}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              <span>{activeCandidate.name}</span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Overall Strength</span>
              <span className="text-base font-bold text-cyan-400">{activeCandidate.attributionStrength}%</span>
            </div>
            <ConfidenceBadge 
              score={activeCandidate.attributionStrength} 
              band={activeCandidate.attributionStrength >= 80 ? 'STRONG EVIDENCE' : 'MODERATE EVIDENCE'} 
            />
          </div>
        </div>

        {/* 3-Column Diagnostic: Why Appeared, Strengthen, Weaken */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#070b14] border border-cyan-950 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Why Did Entity Appear?</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
              {activeCandidate.whyAppeared.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono mt-0.5">▸</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#070b14] border border-emerald-950 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>What Could Strengthen?</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
              {activeCandidate.whatCouldStrengthen.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#070b14] border border-amber-950 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>What Could Weaken?</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
              {activeCandidate.whatCouldWeaken.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Human Investigator Decision Panel */}
        <div className="bg-[#070b14] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Investigator Validation Gate — {activeCandidate.name}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              AUDIT LOG RECORDED UPON SUBMISSION
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                Legal & Evidentiary Rationale Notes:
              </label>
              <textarea
                rows={2}
                placeholder="Document justification for accepting or rejecting this attribution hypothesis..."
                value={decisionNotes}
                onChange={(e) => setDecisionNotes(e.target.value)}
                className="w-full bg-[#0b1220] border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => handleDecision(activeCandidate.id, 'ACCEPTED')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-950/60"
              >
                <Check className="w-4 h-4" />
                <span>Validate Attribution Lead</span>
              </button>

              <button
                onClick={() => handleDecision(activeCandidate.id, 'NEED_MORE_EVIDENCE')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-amber-950/60"
              >
                <Clock className="w-4 h-4" />
                <span>Request Subpoena Evidence</span>
              </button>

              <button
                onClick={() => handleDecision(activeCandidate.id, 'REJECTED')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-800 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Reject Hypothesis</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
