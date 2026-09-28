import React, { useState } from 'react';
import { DigitalIdentity, InvestigationConfig } from '../../types/investigation';
import { calculatePairwiseSimilarity } from '../../services/scoringEngine';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { EvidenceCounter } from '../common/EvidenceCounter';
import { 
  GitMerge, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  Sliders, 
  FileText, 
  Clock, 
  Key, 
  Activity, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface ActorCorrelationViewProps {
  identities: DigitalIdentity[];
  config: InvestigationConfig;
  preselectedId?: string;
  onNavigate: (tabId: string) => void;
}

export const ActorCorrelationView: React.FC<ActorCorrelationViewProps> = ({
  identities,
  config,
  preselectedId,
  onNavigate
}) => {
  const [selectedIdA, setSelectedIdA] = useState<string>(preselectedId || identities[0]?.id || '');
  const [selectedIdB, setSelectedIdB] = useState<string>(identities[1]?.id || '');

  const identityA = identities.find(id => id.id === selectedIdA) || identities[0];
  const identityB = identities.find(id => id.id === selectedIdB) || identities[1];

  const analysis = calculatePairwiseSimilarity(identityA, identityB, config);
  const bd = analysis.breakdown;

  return (
    <div className="space-y-6">
      {/* Title & Selector Bar */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                STAGE 1 // MULTI-SIGNAL CORRELATION
              </span>
              <span className="text-xs text-slate-400 font-mono">
                PAIRWISE RELATIONSHIP ENGINE
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-emerald-400" />
              <span>Multi-Signal Digital Identity Correlation</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Calculates relational strength across multiple digital indicators without assuming identity. Missing information is treated as <code>UNKNOWN / INSUFFICIENT DATA</code>, never as negative evidence.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Demo Pair:</span>
            <button
              onClick={() => { setSelectedIdA('id-01'); setSelectedIdB('id-02'); }}
              className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors"
            >
              shadow_x17 ↔ x_shadow (92%)
            </button>
            <button
              onClick={() => { setSelectedIdA('id-01'); setSelectedIdB('id-06'); }}
              className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors"
            >
              shadow_x17 ↔ silentnode (67%)
            </button>
          </div>
        </div>

        {/* Identity Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5 font-semibold">
              Source Identity A
            </label>
            <select
              value={selectedIdA}
              onChange={(e) => setSelectedIdA(e.target.value)}
              className="w-full bg-[#0b1220] border border-slate-700 rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
            >
              {identities.map((id) => (
                <option key={id.id} value={id.id}>
                  @{id.username} ({id.platform}) [{id.clusterId || 'Isolated'}]
                </option>
              ))}
            </select>
            <div className="mt-2 text-xs text-slate-400 font-mono flex items-center justify-between">
              <span>Aliases: {identityA.aliases.join(', ')}</span>
              <span className="text-emerald-400">{identityA.riskRating} RISK</span>
            </div>
          </div>

          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5 font-semibold">
              Target Identity B
            </label>
            <select
              value={selectedIdB}
              onChange={(e) => setSelectedIdB(e.target.value)}
              className="w-full bg-[#0b1220] border border-slate-700 rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
            >
              {identities.map((id) => (
                <option key={id.id} value={id.id}>
                  @{id.username} ({id.platform}) [{id.clusterId || 'Isolated'}]
                </option>
              ))}
            </select>
            <div className="mt-2 text-xs text-slate-400 font-mono flex items-center justify-between">
              <span>Aliases: {identityB.aliases.join(', ')}</span>
              <span className="text-emerald-400">{identityB.riskRating} RISK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Score Output Card (Prompt Specified) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Overall Confidence and Breakdown */}
        <div className="lg:col-span-5 bg-[#0b1220] border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                ACTOR CORRELATION
              </div>
              <div className="text-xs text-slate-400 mt-0.5 font-mono">
                Evidence Confidence Analysis
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold font-mono text-emerald-400">
                {bd.overallConfidence}%
              </span>
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                Actor Correlation Confidence
              </div>
            </div>
          </div>

          {/* Classification & Disclaimer */}
          <div className="bg-[#070b14] border border-slate-800/80 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-400 font-mono uppercase">EVALUATION BAND:</span>
              <ConfidenceBadge band={analysis.classification} size="sm" />
            </div>
            <p className="text-[11px] text-slate-400 leading-snug italic mt-1">
              "Confidence bands represent the strength of available evidence and are not definitive identity determinations."
            </p>
          </div>

          {/* Exact Score Breakdown List required by prompt */}
          <div className="space-y-3 pt-1">
            <div className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
              Signal Breakdown & Weights
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Username Similarity (20%)</span>
                <span className="font-bold text-white">{bd.usernameSimilarity}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${bd.usernameSimilarity}%` }} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-300">Writing Style / Stylometry (25%)</span>
                <span className="font-bold text-white">{bd.writingStyle}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${bd.writingStyle}%` }} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-300">Behavioural Pattern (20%)</span>
                <span className="font-bold text-white">{bd.behaviouralPattern}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${bd.behaviouralPattern}%` }} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-300">Temporal Pattern (15%)</span>
                <span className="font-bold text-white">{bd.temporalPattern}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${bd.temporalPattern}%` }} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-300">Technical Indicators (20%)</span>
                <span className="font-bold text-white">{bd.technicalIndicators}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${bd.technicalIndicators}%` }} />
              </div>
            </div>

            {/* Separator & Summary */}
            <div className="border-t border-slate-800 pt-3">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-slate-200">OVERALL CONFIDENCE</span>
                <span className="text-lg font-bold text-emerald-400">{bd.overallConfidence}%</span>
              </div>
            </div>

            {/* Evidence Counter */}
            <div className="pt-2">
              <EvidenceCounter 
                supporting={bd.supportingCount}
                conflicting={bd.conflictingCount}
                unknown={bd.unknownCount}
              />
            </div>
          </div>
        </div>

        {/* Right: Explainable Evidence Reasoning (Prompt Specified) */}
        <div className="lg:col-span-7 bg-[#0b1220] border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Evidence Reasoning & Attribution Logic</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Explainable breakdown of factors driving the correlation confidence score.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
              NON-BLACKBOX AUDIT
            </span>
          </div>

          {/* 1. WHY ARE THESE ACCOUNTS CONNECTED? */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>WHY ARE THESE ACCOUNTS CONNECTED? ({analysis.whyConnected.length})</span>
            </div>
            <div className="space-y-1.5">
              {analysis.whyConnected.map((reason, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2 bg-[#070b14] border border-emerald-950 p-2.5 rounded-lg text-xs font-mono text-emerald-300/90 leading-relaxed"
                >
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. CONFLICTING EVIDENCE */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>CONFLICTING EVIDENCE ({analysis.conflicting.length})</span>
            </div>
            <div className="space-y-1.5">
              {analysis.conflicting.length > 0 ? (
                analysis.conflicting.map((conf, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-2 bg-[#070b14] border border-red-950 p-2.5 rounded-lg text-xs font-mono text-red-300/90 leading-relaxed"
                  >
                    <span className="text-red-400 font-bold mt-0.5">⚠</span>
                    <span>{conf}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs font-mono text-slate-500 italic p-2 bg-[#070b14] rounded">
                  No material operational or technical conflicts recorded.
                </div>
              )}
            </div>
          </div>

          {/* 3. UNKNOWN / MISSING EVIDENCE */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>UNKNOWN / MISSING EVIDENCE ({analysis.unknown.length})</span>
            </div>
            <div className="space-y-1.5">
              {analysis.unknown.length > 0 ? (
                analysis.unknown.map((unk, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-2 bg-[#070b14] border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-slate-300 leading-relaxed"
                  >
                    <span className="text-slate-400 font-bold mt-0.5">?</span>
                    <span>{unk}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs font-mono text-slate-500 italic p-2 bg-[#070b14] rounded">
                  Comprehensive telemetry available.
                </div>
              )}
            </div>
          </div>

          {/* 4. EVIDENCE GAPS RECOMMENDATIONS */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="text-xs font-mono font-bold text-teal-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-teal-400" />
              <span>IDENTIFIED EVIDENCE GAPS & NEXT STEPS</span>
            </div>
            <div className="space-y-1.5">
              {analysis.evidenceGaps.map((gap, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2 bg-[#070b14] border border-teal-950/70 p-2 rounded-lg text-xs font-mono text-teal-300/80"
                >
                  <span className="text-teal-400">&bull;</span>
                  <span>{gap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Deep Signal Inspector */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>Side-by-Side Stylometric & Temporal Diff</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Identity A Post */}
          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3.5 space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-1.5">
              <span>@{identityA.username} Post Sample</span>
              <span className="text-emerald-400">{identityA.platform}</span>
            </div>
            <div className="bg-[#0b1220] p-3 rounded text-slate-200 leading-relaxed italic border border-slate-800/80">
              "{identityA.stylometry.sampleText}"
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 text-slate-400">
              <div>Length: <strong className="text-slate-200">{identityA.stylometry.avgSentenceLength} wps</strong></div>
              <div>TTR Richness: <strong className="text-slate-200">{identityA.stylometry.vocabularyRichnessTTR}</strong></div>
              <div>Active Hours: <strong className="text-slate-200">{identityA.temporal.activeHoursUtc}</strong></div>
              <div>PGP: <strong className="text-slate-200">{identityA.technical.pgpKeyId}</strong></div>
            </div>
          </div>

          {/* Identity B Post */}
          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3.5 space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-1.5">
              <span>@{identityB.username} Post Sample</span>
              <span className="text-emerald-400">{identityB.platform}</span>
            </div>
            <div className="bg-[#0b1220] p-3 rounded text-slate-200 leading-relaxed italic border border-slate-800/80">
              "{identityB.stylometry.sampleText}"
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 text-slate-400">
              <div>Length: <strong className="text-slate-200">{identityB.stylometry.avgSentenceLength} wps</strong></div>
              <div>TTR Richness: <strong className="text-slate-200">{identityB.stylometry.vocabularyRichnessTTR}</strong></div>
              <div>Active Hours: <strong className="text-slate-200">{identityB.temporal.activeHoursUtc}</strong></div>
              <div>PGP: <strong className="text-slate-200">{identityB.technical.pgpKeyId}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
