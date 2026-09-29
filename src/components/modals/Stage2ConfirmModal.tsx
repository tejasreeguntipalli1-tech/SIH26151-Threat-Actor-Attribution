import React, { useState } from 'react';
import { ActorCluster } from '../../types/investigation';
import { 
  ShieldAlert, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Search, 
  FileCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';

interface Stage2ConfirmModalProps {
  cluster: ActorCluster | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (clusterId: string, reason?: string) => void;
}

export const Stage2ConfirmModal: React.FC<Stage2ConfirmModalProps> = ({
  cluster,
  isOpen,
  onClose,
  onConfirm
}) => {
  const navigate = useNavigate();
  const { activeCase, addAuditLog } = useCase();
  const [reason, setReason] = useState<string>(
    'Multi-signal digital correlation threshold exceeded (91%). Authorized Stage 2 entity resolution against public registries and authorized intelligence records.'
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen || !cluster) return null;

  const clusterName = cluster.id === 'Actor Cluster A' ? 'DarkWolf Cluster' : cluster.codename;
  const personaCount = cluster.identities?.length || 4;
  const confidenceScore = cluster.actorCorrelationScore || 91;
  const supportingCount = cluster.scoreBreakdown?.supportingCount ?? 12;
  const conflictingCount = cluster.scoreBreakdown?.conflictingCount ?? 2;
  const unknownCount = cluster.scoreBreakdown?.unknownCount ?? 3;

  const handleReviewEvidence = () => {
    onClose();
    navigate(`/cases/${activeCase.id}/correlation`);
  };

  const handleAuthorize = () => {
    if (!reason.trim()) {
      setValidationError('Authorization reason is required for immutable audit logging.');
      return;
    }

    addAuditLog(
      'Stage 2 Authorized',
      cluster.id,
      `Authorized transition from Stage 1 (91% correlation) to Stage 2 Entity Resolution. Reason: ${reason}`
    );

    onConfirm(cluster.id, reason.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12151B] border border-[#2A313E] rounded-xl max-w-xl w-full p-6 shadow-2xl shadow-black/80 relative text-slate-200 font-sans">
        
        {/* Top Status Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E2430]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-orange-950/60 border border-orange-500/40 text-orange-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                  STAGE 1 COMPLETE
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  GATE: STAGE 1 &rarr; STAGE 2
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight uppercase font-mono mt-1">
                INITIATE REAL-WORLD ATTRIBUTION?
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage 1 Correlation Summary */}
        <div className="py-4 space-y-4 text-xs">
          <div className="bg-[#0B0D12] border border-[#1E2430] rounded-lg p-4 space-y-3 font-mono">
            <div className="flex justify-between items-center pb-2 border-b border-[#1A202C]">
              <span className="text-slate-400 text-xs">Probable Actor Cluster:</span>
              <span className="text-white font-bold text-sm tracking-wide text-orange-400">
                {clusterName}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 py-1 border-b border-[#1A202C]">
              <div>
                <span className="text-slate-400 block text-[11px]">Digital Personas:</span>
                <span className="text-slate-100 font-semibold text-sm">{personaCount} personas correlated</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cluster.identities?.map(id => (
                    <span key={id.id} className="bg-[#151922] text-slate-300 px-1.5 py-0.5 rounded border border-slate-700/50 text-[10px]">
                      @{id.username}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Correlation Confidence:</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xl font-bold text-emerald-400">{confidenceScore}%</span>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                    VERY STRONG
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Multi-signal verified</div>
              </div>
            </div>

            {/* Evidence Breakdown Grid */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-[#121620] p-2.5 rounded border border-emerald-900/40">
                <div className="text-slate-400 text-[10px] flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Supporting</span>
                </div>
                <div className="text-emerald-300 font-bold text-base mt-0.5">{supportingCount}</div>
              </div>
              <div className="bg-[#121620] p-2.5 rounded border border-amber-900/40">
                <div className="text-slate-400 text-[10px] flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  <span>Conflicting</span>
                </div>
                <div className="text-amber-300 font-bold text-base mt-0.5">{conflictingCount}</div>
              </div>
              <div className="bg-[#121620] p-2.5 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px] flex items-center justify-center gap-1">
                  <HelpCircle className="w-3 h-3 text-slate-400" />
                  <span>Unknown</span>
                </div>
                <div className="text-slate-300 font-bold text-base mt-0.5">{unknownCount}</div>
              </div>
            </div>
          </div>

          {/* Explanation Banner (Prompt Mandated) */}
          <div className="bg-[#161B26] border border-[#232B3B] rounded-lg p-3 text-xs leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <FileCheck className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Attribution Scope & Evidentiary Principle:</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-normal">
              Stage 2 searches authorized/public identity relationships connected to the correlated digital actor. Results are investigative candidates and require human verification.
            </p>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono pt-1">
              <span>&bull; Public Registries</span>
              <span>&bull; PGP Directories</span>
              <span>&bull; Infrastructure Telemetry</span>
              <span>&bull; Controlled Demo Data</span>
            </div>
          </div>

          {/* Mandatory Authorization Reason Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-semibold text-slate-300">
              Reason for Authorization <span className="text-orange-400">*</span>
              <span className="text-[10px] text-slate-400 font-normal ml-2">(Recorded in Audit Trail)</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Enter investigative justification for initiating Stage 2 real-world entity resolution..."
              className="w-full bg-[#0A0C10] border border-[#262D3D] focus:border-orange-500 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none transition-colors"
            />
            {validationError && (
              <p className="text-[11px] text-red-400 font-mono">{validationError}</p>
            )}
          </div>
        </div>

        {/* Action Buttons (Prompt Mandated 3 Buttons) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3.5 border-t border-[#1E2430]">
          <button
            type="button"
            onClick={handleReviewEvidence}
            className="w-full sm:w-auto px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-300" />
            <span>REVIEW STAGE 1 EVIDENCE</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={handleAuthorize}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-orange-950/60 cursor-pointer"
            >
              <span>AUTHORIZE STAGE 2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
