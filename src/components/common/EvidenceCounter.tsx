import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface EvidenceCounterProps {
  supporting: number;
  conflicting: number;
  unknown: number;
  inline?: boolean;
}

export const EvidenceCounter: React.FC<EvidenceCounterProps> = ({
  supporting,
  conflicting,
  unknown,
  inline = false
}) => {
  if (inline) {
    return (
      <div className="flex items-center gap-3 text-xs font-mono">
        <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/60">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{supporting} Supp</span>
        </span>
        <span className="flex items-center gap-1 text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/60">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{conflicting} Confl</span>
        </span>
        <span className="flex items-center gap-1 text-slate-300 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/60" title="Missing information is treated as UNKNOWN, not negative evidence">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{unknown} Unk</span>
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="bg-[#0f172a] border border-emerald-900/50 rounded-lg p-2.5">
        <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs mb-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Supporting</span>
        </div>
        <div className="text-xl font-bold font-mono text-emerald-300">{supporting}</div>
      </div>

      <div className="bg-[#0f172a] border border-red-900/50 rounded-lg p-2.5">
        <div className="flex items-center justify-center gap-1 text-red-400 text-xs mb-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Conflicting</span>
        </div>
        <div className="text-xl font-bold font-mono text-red-300">{conflicting}</div>
      </div>

      <div className="bg-[#0f172a] border border-slate-700/50 rounded-lg p-2.5" title="Missing information is treated as UNKNOWN / INSUFFICIENT DATA and not as negative evidence">
        <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Unknown</span>
        </div>
        <div className="text-xl font-bold font-mono text-slate-200">{unknown}</div>
      </div>
    </div>
  );
};
