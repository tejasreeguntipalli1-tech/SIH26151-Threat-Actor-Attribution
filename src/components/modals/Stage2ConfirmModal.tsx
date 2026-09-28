import React from 'react';
import { ActorCluster } from '../../types/investigation';
import { AlertCircle, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { ConfidenceBadge } from '../common/ConfidenceBadge';

interface Stage2ConfirmModalProps {
  cluster: ActorCluster | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (clusterId: string) => void;
}

export const Stage2ConfirmModal: React.FC<Stage2ConfirmModalProps> = ({
  cluster,
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !cluster) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b1322] border-2 border-cyan-500/60 rounded-xl max-w-lg w-full p-6 shadow-2xl shadow-cyan-950/40 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide uppercase font-mono">
                INITIATE REAL-WORLD ATTRIBUTION?
              </h2>
              <p className="text-xs text-slate-400 font-mono">STAGE 1 &rarr; STAGE 2 INVESTIGATOR GATE</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Matching Prompt Exactly */}
        <div className="py-4 space-y-4 text-xs font-mono">
          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-4 space-y-2.5">
            <div className="flex justify-between items-center py-1 border-b border-slate-900">
              <span className="text-slate-400">Selected Actor:</span>
              <span className="text-white font-bold">{cluster.id}</span>
            </div>

            <div className="py-1 border-b border-slate-900">
              <span className="text-slate-400 block mb-1">Aliases:</span>
              <div className="flex flex-wrap gap-1.5">
                {cluster.identities.map(id => (
                  <span key={id.id} className="bg-slate-900 text-emerald-300 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
                    @{id.username}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-900">
              <span className="text-slate-400">Stage 1 Evidence Strength:</span>
              <span className="text-emerald-400 font-bold">
                {cluster.actorCorrelationScore}% — {cluster.classification}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-[#0b1322] p-2 rounded border border-emerald-900/60">
                <div className="text-slate-400 text-[10px]">Supporting Evidence</div>
                <div className="text-emerald-300 font-bold text-sm mt-0.5">{cluster.scoreBreakdown.supportingCount}</div>
              </div>
              <div className="bg-[#0b1322] p-2 rounded border border-red-900/60">
                <div className="text-slate-400 text-[10px]">Conflicting Evidence</div>
                <div className="text-red-300 font-bold text-sm mt-0.5">{cluster.scoreBreakdown.conflictingCount}</div>
              </div>
              <div className="bg-[#0b1322] p-2 rounded border border-slate-800">
                <div className="text-slate-400 text-[10px]">Unknown</div>
                <div className="text-slate-300 font-bold text-sm mt-0.5">{cluster.scoreBreakdown.unknownCount}</div>
              </div>
            </div>
          </div>

          {/* Potential Stage 2 Evidence Sources (Prompt Specified) */}
          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 space-y-1.5">
            <span className="text-slate-300 font-bold block uppercase text-[10px] text-cyan-300">
              Potential Stage 2 Evidence Sources:
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
              <span>&bull; Digital indicators</span>
              <span>&bull; Financial indicators</span>
              <span>&bull; Infrastructure relationships</span>
              <span>&bull; Public intelligence</span>
              <span>&bull; Technical indicators</span>
              <span>&bull; Authorized intelligence</span>
            </div>
          </div>

          {/* Important Warning & Explanation */}
          <div className="bg-amber-950/30 border border-amber-500/40 rounded-lg p-3 text-amber-200/90 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Evidentiary Boundary:</span>
            </div>
            <p className="text-[11px] font-sans leading-relaxed">
              Stage 2 will use the selected actor cluster and its validated digital indicators to generate potential real-world entity hypotheses. 
              <strong> Results are investigative leads and require human validation.</strong>
            </p>
          </div>
        </div>

        {/* Action Buttons (Prompt Specified) */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(cluster.id);
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-950/60 cursor-pointer"
          >
            <span>PROCEED TO STAGE 2</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
