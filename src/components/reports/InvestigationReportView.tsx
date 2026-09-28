import React, { useState } from 'react';
import { 
  ActorCluster, 
  DigitalIdentity, 
  InvestigationConfig, 
  RealWorldAttributionLead, 
  AuditLogItem,
  DigitalIndicatorItem,
  CandidateEntity,
  EntityResolutionDimension
} from '../../types/investigation';
import { 
  initialDigitalIndicators, 
  initialMatchingDimensions, 
  initialCandidateEntities 
} from '../../data/syntheticData';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Fingerprint, 
  FileCheck2,
  Calendar,
  UserCheck,
  Building2,
  Server
} from 'lucide-react';
import { ConfidenceBadge } from '../common/ConfidenceBadge';

interface InvestigationReportViewProps {
  clusters: ActorCluster[];
  identities: DigitalIdentity[];
  leads: Record<string, RealWorldAttributionLead>;
  config: InvestigationConfig;
  auditLogs: AuditLogItem[];
}

export const InvestigationReportView: React.FC<InvestigationReportViewProps> = ({
  clusters,
  identities,
  leads,
  config,
  auditLogs
}) => {
  const [reportGenerated, setReportGenerated] = useState(true);
  const generationTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  const indicators: DigitalIndicatorItem[] = initialDigitalIndicators;
  const dimensions: EntityResolutionDimension[] = initialMatchingDimensions;
  const candidates: CandidateEntity[] = initialCandidateEntities;
  const primaryCluster = clusters[0];
  const primaryLead = leads[primaryCluster.id] || Object.values(leads)[0];

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const reportData = {
      investigationId: config.investigationId,
      agency: config.agency,
      leadInvestigator: config.leadInvestigator,
      generatedAt: generationTimestamp,
      classification: "CONFIDENTIAL // LAW ENFORCEMENT & INVESTIGATIVE RESEARCH ONLY",
      boundaryNotice: "CORRELATION != IDENTIFICATION. ATTRIBUTION LEAD - HUMAN VALIDATION REQUIRED.",
      identitiesCount: identities.length,
      clusters,
      indicators,
      matchingDimensions: dimensions,
      candidateEntities: candidates,
      stage2Leads: leads,
      auditLogs
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SIH26151_Report_${config.investigationId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
              AUDIT-GRADE DOSSIER
            </span>
            <span className="text-xs text-slate-400 font-mono">
              CASE: {config.investigationId}
            </span>
          </div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>End-to-End Investigation Report (Sections 1–13)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete dossier bridging Stage 1 digital actor correlation with Stage 2 real-world entity resolution.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setReportGenerated(true)}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-950/60 flex items-center gap-1.5"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>GENERATE ATTRIBUTION REPORT</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-300" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      {reportGenerated && (
        <div className="bg-[#080d17] border border-slate-700/80 rounded-xl p-8 max-w-5xl mx-auto space-y-8 shadow-2xl relative font-mono text-xs">
          {/* Top Security & Classification Bar */}
          <div className="text-center border-b-2 border-slate-800 pb-5 space-y-1">
            <div className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              CONFIDENTIAL // LAW ENFORCEMENT & INVESTIGATIVE INTELLIGENCE REPORT
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide uppercase">
              Dark Web Threat Actor De-Anonymization &amp; Attribution Report
            </h1>
            <div className="text-xs text-slate-400">
              Investigation: <strong>{config.investigationId}</strong> &bull; Agency: <strong>{config.agency}</strong> &bull; SIH26151
            </div>
          </div>

          {/* Mandatory Watermark / Compliance Banner Required by Prompt */}
          <div className="bg-gradient-to-r from-cyan-950/50 via-slate-900/60 to-cyan-950/50 border-2 border-dashed border-cyan-500/70 rounded-xl p-4 text-center space-y-1">
            <div className="text-sm font-extrabold text-cyan-300 uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <span>ATTRIBUTION LEAD — HUMAN VALIDATION REQUIRED</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mx-auto font-sans">
              NOTICE: Correlation identifies relationships between digital identities. Attribution requires independent evidence connecting the actor to a real-world entity. 
              <strong> This report generates investigative leads, not criminal accusations.</strong>
            </p>
          </div>

          {/* SECTION 1 — DIGITAL IDENTITIES */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-1 flex justify-between">
              <span>SECTION 1 — DIGITAL IDENTITIES</span>
              <span className="text-[10px] text-slate-400">{identities.length} INDEXED PERSONAS</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase bg-[#0b1220]">
                    <th className="py-2 px-2.5">Handle</th>
                    <th className="py-2 px-2.5">Platform</th>
                    <th className="py-2 px-2.5">PGP Key ID</th>
                    <th className="py-2 px-2.5">Wallet Identifier</th>
                    <th className="py-2 px-2.5">Active Hours</th>
                    <th className="py-2 px-2.5">Assigned Cluster</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {identities.map((id) => (
                    <tr key={id.id}>
                      <td className="py-2 px-2.5 font-bold text-white">@{id.username}</td>
                      <td className="py-2 px-2.5 text-slate-300">{id.platform}</td>
                      <td className="py-2 px-2.5 text-slate-400">{id.technical.pgpKeyId}</td>
                      <td className="py-2 px-2.5 text-slate-400">
                        {id.technical.cryptoWallets[0] ? `${id.technical.cryptoWallets[0].substring(0, 14)}...` : 'UNKNOWN'}
                      </td>
                      <td className="py-2 px-2.5 text-slate-400">{id.temporal.activeHoursUtc.split(' ')[0]} UTC</td>
                      <td className="py-2 px-2.5 text-emerald-300 font-semibold">{id.clusterId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 2 — ACTOR CORRELATION */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 2 — ACTOR CORRELATION
            </h3>
            <div className="bg-[#0b1220] p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1.5 leading-relaxed">
              <p>
                Multi-signal correlation fused across 5 weighted dimensions: Username Similarity (20%), Stylometry (25%), Behavioural Profiling (20%), Temporal Alignment (15%), and Technical Indicators (20%).
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-[10px] pt-1">
                <div className="bg-[#070b14] p-1.5 rounded border border-slate-800">Username: <strong>94%</strong></div>
                <div className="bg-[#070b14] p-1.5 rounded border border-slate-800">Stylometry: <strong>91%</strong></div>
                <div className="bg-[#070b14] p-1.5 rounded border border-slate-800">Behaviour: <strong>87%</strong></div>
                <div className="bg-[#070b14] p-1.5 rounded border border-slate-800">Temporal: <strong>89%</strong></div>
                <div className="bg-[#070b14] p-1.5 rounded border border-slate-800">Technical: <strong>92%</strong></div>
              </div>
            </div>
          </div>

          {/* SECTION 3 — ACTOR CLUSTERS */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 3 — ACTOR CLUSTERS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {clusters.map((c) => (
                <div key={c.id} className="bg-[#0b1220] p-3 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">{c.id}</span>
                    <span className="text-emerald-400 font-bold">{c.actorCorrelationScore}%</span>
                  </div>
                  <div className="text-slate-400 text-[10px]">{c.codename}</div>
                  <div className="text-[10px] text-slate-300">
                    Accounts: {c.identities.map(i => `@${i.username}`).join(', ') || 'Isolated indicators'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4 — INVESTIGATOR VALIDATION (STAGE 1) */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 4 — INVESTIGATOR VALIDATION (STAGE 1)
            </h3>
            <div className="bg-[#0b1220] p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] block uppercase">Stage 1 Signed Validation:</span>
              <div className="text-slate-200">
                Lead Investigator INV-017 verified the multi-signal evidence linking shadow_x17, x_shadow, and darkx17. 
                Threshold standard met (92% &ge; 80% default threshold). Status cleared: <strong>ELIGIBLE FOR STAGE 2</strong>.
              </div>
            </div>
          </div>

          {/* SECTION 5 — STAGE 2 INITIATION */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 5 — STAGE 2 INITIATION
            </h3>
            <div className="bg-[#0b1220] p-3 rounded-lg border border-cyan-900/60 text-slate-300 space-y-1">
              <div className="text-cyan-300 font-bold">Investigator Clearance Cleared: STAGE 2 INITIATED</div>
              <p>
                Explicit investigator confirmation recorded. Digital indicators transferred to Entity Resolution Engine. 
                Statutory caveat acknowledged: Results represent investigative leads and do not constitute definitive identity.
              </p>
            </div>
          </div>

          {/* SECTION 6 — DIGITAL INDICATORS */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1 flex justify-between">
              <span>SECTION 6 — DIGITAL INDICATORS INVENTORY</span>
              <span className="text-[10px] text-slate-400">{indicators.length} EVIDENCE OBJECTS</span>
            </h3>
            <div className="space-y-1.5">
              {indicators.slice(0, 5).map((ind) => (
                <div key={ind.id} className="bg-[#0b1220] p-2 rounded border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-300 font-bold mr-2">{ind.id}</span>
                    <span className="text-white font-semibold">{ind.indicator}</span>
                    <span className="text-slate-400 text-[10px] ml-2">({ind.type} &bull; {ind.source})</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px]">{ind.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7 — ENTITY RESOLUTION */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 7 — ENTITY RESOLUTION (SIX DIMENSIONS)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {dimensions.map((dim) => (
                <div key={dim.id} className="bg-[#0b1220] p-2 rounded border border-slate-800">
                  <div className="text-slate-400 text-[10px]">{dim.name}</div>
                  <div className="text-cyan-300 font-bold text-sm mt-0.5">{dim.matchStrength}% Match</div>
                  <div className="text-[9px] text-slate-500">Supp: {dim.supportingCount} | Confl: {dim.conflictingCount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 8 — CANDIDATE ENTITIES */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 8 — CANDIDATE ENTITIES
            </h3>
            <div className="space-y-2">
              {candidates.map((cand) => (
                <div key={cand.id} className="bg-[#0b1220] p-3 rounded border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-white font-bold">{cand.name}</div>
                    <div className="text-slate-400 text-[10px]">{cand.summary}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-300 font-bold text-base">{cand.attributionStrength}%</span>
                    <span className="text-[9px] text-slate-400 block uppercase">Strength</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 9 — SUPPORTING / CONFLICTING / UNKNOWN EVIDENCE */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 9 — SUPPORTING / CONFLICTING / UNKNOWN EVIDENCE
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#0b1220] p-2 rounded border border-emerald-950 text-emerald-300">
                Supporting: <strong>{primaryCluster.scoreBreakdown.supportingCount} Items</strong>
              </div>
              <div className="bg-[#0b1220] p-2 rounded border border-red-950 text-red-300">
                Conflicting: <strong>{primaryCluster.scoreBreakdown.conflictingCount} Items</strong>
              </div>
              <div className="bg-[#0b1220] p-2 rounded border border-slate-800 text-slate-300">
                Unknown / Missing: <strong>{primaryCluster.scoreBreakdown.unknownCount} Items</strong>
              </div>
            </div>
          </div>

          {/* SECTION 10 — EVIDENCE GAPS */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 10 — EVIDENCE GAPS & NEXT STEPS
            </h3>
            <div className="bg-[#0b1220] p-3 rounded-lg border border-teal-900/60 space-y-1.5 text-slate-300">
              <div className="text-teal-300 font-bold">Recommended Lawful Next Directives:</div>
              {primaryCluster.evidenceGaps.map((gap, i) => (
                <div key={i} className="text-[11px] flex items-start gap-1.5">
                  <span className="text-teal-400">&bull;</span>
                  <span>{gap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 11 — ATTRIBUTION EVIDENCE STRENGTH */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 11 — ATTRIBUTION EVIDENCE STRENGTH
            </h3>
            <div className="bg-[#0b1220] p-3 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-white font-bold text-sm">Lead: Candidate Entity A</span>
                <div className="text-slate-400 text-[10px]">Attribution Evidence Strength: 82% (High Relational Convergence)</div>
              </div>
              <span className="bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 text-[10px]">
                NON-CALIBRATED PROBABILITY
              </span>
            </div>
          </div>

          {/* SECTION 12 — INVESTIGATOR DECISIONS */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 12 — INVESTIGATOR DECISION LOG
            </h3>
            <div className="space-y-1.5">
              {auditLogs.map((log) => (
                <div key={log.id} className="bg-[#0b1220] p-2 rounded border border-slate-800 flex justify-between items-center text-[10px]">
                  <div>
                    <span className="text-cyan-400 font-bold mr-2">{log.action}</span>
                    <span className="text-slate-300">{log.target || log.details}</span>
                  </div>
                  <span className="text-slate-500">{log.investigator} &bull; {log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 13 — FINAL ATTRIBUTION LEAD */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              SECTION 13 — FINAL ATTRIBUTION LEAD
            </h3>
            <div className="bg-[#0c182d] border-2 border-cyan-500/80 rounded-xl p-5 text-center space-y-2">
              <div className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
                FINAL STATUTORY DISPOSITION
              </div>
              <div className="text-base font-extrabold text-white">
                ATTRIBUTION LEAD — HUMAN VALIDATION REQUIRED
              </div>
              <p className="text-slate-400 text-[11px] max-w-2xl mx-auto font-sans">
                The digital actor is linked to Candidate Entity A via 9 corroborated indicators. 
                Definitive real-world identity is not confirmed. This intelligence dossier is certified for lawful MLAT request filings.
              </p>
            </div>
          </div>

          {/* Sign-off */}
          <div className="border-t-2 border-slate-800 pt-6 grid grid-cols-2 gap-8 text-[11px]">
            <div>
              <span className="text-slate-400 text-[10px] uppercase block mb-3">Case Officer Sign-Off</span>
              <div className="border-b border-slate-700 pb-1 text-slate-200 font-bold">
                {config.leadInvestigator}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Cyber Threat Intelligence Cell</div>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase block mb-3">Judicial Liaison Certification</span>
              <div className="border-b border-slate-700 pb-1 text-slate-200 font-bold">
                Special Prosecutor (SIH-2026-REG)
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Pending Warrants Review</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
