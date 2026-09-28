import React from 'react';
import { ConfidenceBand } from '../../types/investigation';
import { ShieldCheck, ShieldAlert, AlertTriangle, HelpCircle } from 'lucide-react';

interface ConfidenceBadgeProps {
  band: ConfidenceBand;
  score?: number;
  showExplanation?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  band,
  score,
  showExplanation = false,
  size = 'md'
}) => {
  let colorClasses = '';
  let Icon = HelpCircle;

  switch (band) {
    case 'VERY STRONG EVIDENCE':
      colorClasses = 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300';
      Icon = ShieldCheck;
      break;
    case 'STRONG EVIDENCE':
      colorClasses = 'bg-teal-950/70 border-teal-500/50 text-teal-300';
      Icon = ShieldCheck;
      break;
    case 'MODERATE EVIDENCE':
      colorClasses = 'bg-blue-950/70 border-blue-500/50 text-blue-300';
      Icon = ShieldCheck;
      break;
    case 'WEAK / INCONCLUSIVE':
      colorClasses = 'bg-amber-950/70 border-amber-500/50 text-amber-300';
      Icon = AlertTriangle;
      break;
    case 'INSUFFICIENT EVIDENCE':
      colorClasses = 'bg-red-950/70 border-red-500/50 text-red-300';
      Icon = ShieldAlert;
      break;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5 font-semibold'
  }[size];

  return (
    <div className="inline-flex flex-col">
      <div className={`inline-flex items-center rounded-md border ${colorClasses} ${sizeClasses}`}>
        <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        <span>
          {score !== undefined && <span className="font-mono font-bold mr-1.5">{score}%</span>}
          {band}
        </span>
      </div>
      {showExplanation && (
        <span className="text-[11px] text-slate-400 mt-1 italic">
          Confidence bands represent the strength of available evidence and are not definitive identity determinations.
        </span>
      )}
    </div>
  );
};
