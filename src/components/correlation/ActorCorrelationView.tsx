import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { DigitalIdentity } from '../../types/investigation';
import { calculatePairwiseSimilarity } from '../../services/scoringEngine';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
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
  Server,
  Layers,
  Share2
} from 'lucide-react';

interface ActorCorrelationViewProps {
  preselectedId?: string;
}

export const ActorCorrelationView: React.FC<ActorCorrelationViewProps> = ({
  preselectedId
}) => {
  const { identities, config, activeCase, pairwiseRelationships } = useCase();
  const navigate = useNavigate();

  const [selectedIdA, setSelectedIdA] = useState<string>(preselectedId || identities[0]?.id || 'id-01');
  const [selectedIdB, setSelectedIdB] = useState<string>(identities[1]?.id || 'id-02');

  const identityA = identities.find(id => id.id === selectedIdA) || identities[0];
  const identityB = identities.find(id => id.id === selectedIdB) || identities[1];

  const analysis = calculatePairwiseSimilarity(identityA, identityB, config);
  const bd = analysis.breakdown;

  // Find pre-calculated pairwise relationship if available for rich signals
  const existingPairwise = pairwiseRelationships.find(
    rel => (rel.sourceIdentityId === identityA.id && rel.targetIdentityId === identityB.id) ||
           (rel.sourceIdentityId === identityB.id && rel.targetIdentityId === identityA.id)
  );

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header Bar with Required Heading and Purpose Statement */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1E2430]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
                STAGE 1 ANALYSIS WORKSPACE
              </span>
              <span className="text-xs text-slate-400 font-mono">
                CASE: {activeCase.id}
              </span>
              <span className="text-xs text-slate-600 font-mono">|</span>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                CLUSTER EVIDENCE STRENGTH: 92%
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight font-mono flex items-center gap-2.5">
              <GitMerge className="w-6 h-6 text-orange-400" />
              <span>Digital Identity Correlation Analysis</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => navigate(`/cases/${activeCase.id}/graph`)}
              className="px-3.5 py-2 rounded-lg bg-[#181D26] hover:bg-[#202734] text-slate-200 border border-[#2A3342] transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-orange-400" />
              <span>View in Graph</span>
            </button>
            <button
              onClick={() => navigate(`/cases/${activeCase.id}/attribution`)}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-950/60 flex items-center gap-1.5"
            >
              <span>Stage 2 Attribution &rarr;</span>
            </button>
          </div>
        </div>

        {/* Mandatory Purpose Statement (Requirement #8) */}
        <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-1.5">
          <div className="text-[11px] font-mono text-orange-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            <span>ANALYTICAL OBJECTIVE:</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            "Assess whether multiple digital identities demonstrate sufficient evidence of association with the same underlying digital actor."
          </p>
          <div className="text-[11px] font-mono text-slate-500 pt-0.5">
            * Note: This calculation does not represent a probability that the person is a hacker or cyber criminal. It measures multi-signal forensic relational strength between digital identities.
          </div>
        </div>

        {/* Identity Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-[#0D1016] border border-[#1E2430] rounded-lg p-3">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5 font-semibold">
              Source Identity A
            </label>
            <select
              value={selectedIdA}
              onChange={(e) => setSelectedIdA(e.target.value)}
              className="w-full bg-[#12161E] border border-[#232A36] rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-orange-500"
            >
              {identities.map((id) => (
                <option key={id.id} value={id.id}>
                  @{id.username} ({id.platform}) [{id.clusterId}]
                </option>
              ))}
            </select>
          </div>

          <div className="bg-[#0D1016] border border-[#1E2430] rounded-lg p-3">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5 font-semibold">
              Target Identity B
            </label>
            <select
              value={selectedIdB}
              onChange={(e) => setSelectedIdB(e.target.value)}
              className="w-full bg-[#12161E] border border-[#232A36] rounded-md px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-orange-500"
            >
              {identities.map((id) => (
                <option key={id.id} value={id.id}>
                  @{id.username} ({id.platform}) [{id.clusterId}]
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Actor Correlation Evidence Strength Hero Card */}
      <div className="bg-[#12161E] border border-orange-500/40 rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 font-mono">
          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
            Pairwise Actor Correlation Evidence Strength
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-orange-400">
              {existingPairwise?.overallScore || bd.overallConfidence}%
            </span>
            <span className="text-base font-bold text-white uppercase">
              {existingPairwise?.classification || analysis.classification}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1 max-w-xl">
            Calculated across weighted multi-vector signals. Score reflects evidentiary synergy between @{identityA.username} and @{identityB.username}. Missing indicators are categorized as unknown gaps rather than negative proof.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg text-center min-w-[100px]">
            <span className="text-slate-500 text-[10px] uppercase block">Supporting</span>
            <span className="text-emerald-400 font-bold text-base">
              {existingPairwise?.supportingEvidence.length || 5}
            </span>
          </div>
          <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg text-center min-w-[100px]">
            <span className="text-slate-500 text-[10px] uppercase block">Conflicting</span>
            <span className="text-red-400 font-bold text-base">
              {existingPairwise?.conflictingEvidence.length || 1}
            </span>
          </div>
          <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg text-center min-w-[100px]">
            <span className="text-slate-500 text-[10px] uppercase block">Unknown</span>
            <span className="text-amber-400 font-bold text-base">
              {existingPairwise?.unknownEvidence.length || 2}
            </span>
          </div>
        </div>
      </div>

      {/* 3. The Six Analysis Dimensions (Requirement #8) */}
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#1E2430] pb-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            <span>The Six Correlation Analysis Dimensions</span>
          </h2>
          <span className="text-[10px] text-slate-500">EXPLAINABLE MULTI-VECTOR BREAKDOWN</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dimension 1: Username / Alias Similarity */}
          <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E2430] pb-2">
              <span className="font-bold text-white text-sm">1. Username / Alias Similarity</span>
              <span className="text-orange-400 font-bold">{bd.usernameSimilarity}% (Strong)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Evidence:</span>
              <div className="text-slate-200 mt-0.5">@{identityA.username} vs @{identityB.username} (Stem root: "shadow" / "x")</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Analysis:</span>
              <p className="text-slate-400 font-sans leading-relaxed text-[11px] mt-0.5">
                Levenshtein distance of 3 with 100% lexical root continuity. Preserves characteristic prefix/suffix transposition across multiple forums.
              </p>
            </div>
            <div className="space-y-1 pt-1 border-t border-[#1E2430]">
              <div className="text-[10px] text-emerald-400 font-bold">✓ Supporting: Identical alphanumeric root token</div>
              <div className="text-[10px] text-slate-500">○ Conflicting: None detected</div>
              <div className="text-[10px] text-amber-400">? Unknown: Historical pre-2024 alias registration records</div>
            </div>
          </div>

          {/* Dimension 2: Stylometry / Writing Style */}
          <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E2430] pb-2">
              <span className="font-bold text-white text-sm">2. Stylometry / Writing Style</span>
              <span className="text-orange-400 font-bold">{bd.writingStyle}% (Strong)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Evidence:</span>
              <div className="text-slate-200 mt-0.5">NLP feature extraction across 42 post samples</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Analysis:</span>
              <p className="text-slate-400 font-sans leading-relaxed text-[11px] mt-0.5">
                Idiosyncratic double-hyphen (--) delimiter habit present in 100% of samples. Jaccard syntactic similarity index of 0.89 with uniform lowercase conventions.
              </p>
            </div>
            <div className="space-y-1 pt-1 border-t border-[#1E2430]">
              <div className="text-[10px] text-emerald-400 font-bold">✓ Supporting: Double-hyphen delimiter & Oxford comma omission</div>
              <div className="text-[10px] text-red-400">✗ Conflicting: Minor variance in marketplace greeting formality</div>
              <div className="text-[10px] text-amber-400">? Unknown: Second-language non-native grammar artifacts</div>
            </div>
          </div>

          {/* Dimension 3: Behavioural Similarity */}
          <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E2430] pb-2">
              <span className="font-bold text-white text-sm">3. Behavioural Similarity</span>
              <span className="text-orange-400 font-bold">{bd.behaviouralPattern}% (Strong)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Evidence:</span>
              <div className="text-slate-200 mt-0.5">Forum trading logs, escrow mandates, and OPSEC protocols</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Analysis:</span>
              <p className="text-slate-400 font-sans leading-relaxed text-[11px] mt-0.5">
                Predictable 45-minute escalation sequence between exploit announcements on Dread and sales escrow postings on XSS. Strict anti-forensic Tor discipline.
              </p>
            </div>
            <div className="space-y-1 pt-1 border-t border-[#1E2430]">
              <div className="text-[10px] text-emerald-400 font-bold">✓ Supporting: Synchronized escrow listings and multi-sig mandate</div>
              <div className="text-[10px] text-slate-500">○ Conflicting: None detected</div>
              <div className="text-[10px] text-amber-400">? Unknown: Out-of-band Jabber private dispute logs</div>
            </div>
          </div>

          {/* Dimension 4: Temporal Activity */}
          <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E2430] pb-2">
              <span className="font-bold text-white text-sm">4. Temporal Activity</span>
              <span className="text-orange-400 font-bold">{bd.temporalPattern}% (Strong)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Evidence:</span>
              <div className="text-slate-200 mt-0.5">Session timestamps across 180 monitored days</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Analysis:</span>
              <p className="text-slate-400 font-sans leading-relaxed text-[11px] mt-0.5">
                Pearson correlation coefficient r = 0.88 with active window between 20:00 and 03:00 UTC (peak 22:30 UTC). Matching multi-week December hiatus.
              </p>
            </div>
            <div className="space-y-1 pt-1 border-t border-[#1E2430]">
              <div className="text-[10px] text-emerald-400 font-bold">✓ Supporting: Correlated UTC+03:00 diurnal window and seasonal hiatus</div>
              <div className="text-[10px] text-slate-500">○ Conflicting: Zero concurrent conflicting timestamps</div>
              <div className="text-[10px] text-amber-400">? Unknown: Exact operational timezone variance during travel</div>
            </div>
          </div>

          {/* Dimension 5: Technical / Digital Indicators */}
          <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E2430] pb-2">
              <span className="font-bold text-white text-sm">5. Technical / Digital Indicators</span>
              <span className="text-orange-400 font-bold">{bd.technicalIndicators}% (Very Strong)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Evidence:</span>
              <div className="text-slate-200 mt-0.5">PGP key 0x7E4A8F2C91B4 & Bitcoin SegWit wallet</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Analysis:</span>
              <p className="text-slate-400 font-sans leading-relaxed text-[11px] mt-0.5">
                Hard cryptographic collision: identical RSA 4096-bit public key signature embedded in account profile metadata on both platforms.
              </p>
            </div>
            <div className="space-y-1 pt-1 border-t border-[#1E2430]">
              <div className="text-[10px] text-emerald-400 font-bold">✓ Supporting: Cryptographic PGP public key signature match</div>
              <div className="text-[10px] text-red-400">✗ Conflicting: Distinct darknet client TLS JA3 fingerprint</div>
              <div className="text-[10px] text-amber-400">? Unknown: Hardware host MAC address behind virtualized environment</div>
            </div>
          </div>

          {/* Dimension 6: Infrastructure / Relationship Evidence */}
          <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E2430] pb-2">
              <span className="font-bold text-white text-sm">6. Infrastructure / Relationship Evidence</span>
              <span className="text-orange-400 font-bold">93% (Strong)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Evidence:</span>
              <div className="text-slate-200 mt-0.5">Reverse-proxy IP 185.220.101.45 & SSH host key</div>
            </div>
            <div>
              <p className="text-slate-400 font-sans leading-relaxed text-[11px] mt-0.5">
                Analysis: Clear-web mirror darkx17-vault.is and Dread paste mirrors route through the same Njalla/FlokiNET hosting node. SSH key reuse on developmental node.
              </p>
            </div>
            <div className="space-y-1 pt-1 border-t border-[#1E2430]">
              <div className="text-[10px] text-emerald-400 font-bold">✓ Supporting: Co-located reverse-proxy node and SSH public key reuse</div>
              <div className="text-[10px] text-slate-500">○ Conflicting: None detected</div>
              <div className="text-[10px] text-amber-400">? Unknown: BGP upstream routing logs past bulletproof provider</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
