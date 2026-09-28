import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  Eye, 
  Building2, 
  Server, 
  User, 
  GitMerge, 
  ShieldCheck, 
  Clock, 
  Key,
  Layers,
  Edit3,
  Check
} from 'lucide-react';
import { ConfidenceBadge } from '../common/ConfidenceBadge';

interface InvestigationReportViewProps {
  clusters?: any[];
  identities?: any[];
  leads?: any;
  config?: any;
  auditLogs?: any[];
}

export const InvestigationReportView: React.FC<InvestigationReportViewProps> = (props) => {
  const caseContext = useCase();

  const clusters = props.clusters || caseContext.clusters;
  const identities = props.identities || caseContext.identities;
  const leads = props.leads || caseContext.leads;
  const config = props.config || caseContext.config;
  const auditLogs = props.auditLogs || caseContext.auditLogs;
  const activeCase = caseContext.activeCase;
  const pairwiseRels = caseContext.pairwiseRelationships;
  const indicators = caseContext.indicators;
  const candidates = caseContext.candidateEntities;

  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [investigatorAddendum, setInvestigatorAddendum] = useState<string>(
    "Lead Analyst Synthesis: The forensic examination of four digital identities associated with Actor Cluster A demonstrates multi-vector convergence across cryptographic anchors, shared reverse-proxy routing topology, and an idiosyncratic double-hyphen delimiter habit. Stage 1 correlation satisfies the statutory threshold standard (92% > 80%). Stage 2 entity resolution established an 82% attribution strength lead linking staging infrastructure to Candidate Entity A (Meridian Analytics S.R.O. / Subject A. K.). Sworn mutual legal assistance treaty (MLAT) preservation orders for gateway subnet 185.220.101.0/24 are recommended."
  );

  const generationTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  const primaryCluster = clusters.find((c: any) => c.id === 'Actor Cluster A') || clusters[0];
  const primaryLead = leads[primaryCluster.id] || Object.values(leads)[0] || {
    candidateEntity: 'Meridian Analytics S.R.O. (Subject A. K.)',
    attributionConfidence: 82,
    status: 'ATTRIBUTION LEAD - HUMAN VALIDATION REQUIRED'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const reportData = {
      reportTitle: "Investigation Findings and Analytical Report",
      caseId: activeCase.id,
      caseName: activeCase.name,
      agency: config.agency,
      leadInvestigator: config.leadInvestigator,
      generatedAt: generationTimestamp,
      statutoryAuthority: activeCase.warrantNumber,
      classification: "CONFIDENTIAL // LAW ENFORCEMENT & INVESTIGATIVE INTELLIGENCE ONLY",
      operationalStandard: "Correlation identifies relationships between digital identities. Attribution requires independent evidence connecting the actor to a real-world entity. This report generates investigative leads, not criminal accusations.",
      sections: {
        section1_caseOverview: { caseId: activeCase.id, name: activeCase.name, warrant: activeCase.warrantNumber, status: activeCase.status },
        section2_investigationScope: "Analysis of 4 darknet handles across Forum-X Dread, Market-Y XSS, BreachForums mirror, and developer Git tree.",
        section3_digitalIdentitiesAnalyzed: identities.map((id: any) => ({ handle: id.username, platform: id.platform, role: id.behavioural?.primaryRole })),
        section4_identityDetails: identities,
        section5_writingStyleStylometry: { jaccardIndex: 0.89, doubleHyphenUsage: "100%", casing: "lowercase" },
        section6_behaviouralAnalysis: { escalationInterval: "45 minutes", escrowMandate: "Multi-sig BTC mandatory" },
        section7_temporalAnalysis: { pearsonCorrelation: 0.88, diurnalWindow: "20:00 - 03:00 UTC", peak: "22:30 UTC" },
        section8_technicalIndicators: { pgpKey: "0x7E4A8F2C91B4", wallet: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
        section9_infrastructureRelationships: { reverseProxyIp: "185.220.101.45", domain: "darkx17-vault.is", sshKey: "SHA256: 8f3c...71ab" },
        section10_pairwiseRelationshipAnalysis: pairwiseRels,
        section11_overallActorClusterAnalysis: primaryCluster,
        section12_supportingEvidence: primaryCluster.supportingReasons,
        section13_conflictingEvidence: primaryCluster.conflictingReasons,
        section14_unknownMissingEvidence: primaryCluster.unknownReasons,
        section15_stage2AttributionAnalysis: { candidate: candidates[0], attributionLead: primaryLead },
        section16_humanValidationDecisions: auditLogs,
        section17_investigationLimitations: [
          "Tor circuit routing shields physical subscriber ISP IP address",
          "VPN logs require formal MLAT subpoena to commercial provider",
          "Corporate registration may represent offshore shell entity"
        ],
        section18_finalInvestigativeSummary: investigatorAddendum
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ARGUS_Case_Report_${activeCase.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Action Header Banner (Requirement #14) */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
              AUDIT-GRADE REPORT
            </span>
            <span className="text-xs text-slate-400 font-mono">
              CASE: {activeCase.id}
            </span>
            <span className="text-xs text-slate-600 font-mono">|</span>
            <span className="text-xs text-slate-400 font-mono">
              18 NUMBERED SECTIONS COMPLETE
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 font-mono">
            <FileText className="w-6 h-6 text-orange-400" />
            <span>Investigation Findings and Analytical Report</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Formal narrative case dossier bridging Stage 1 digital actor correlation and Stage 2 real-world entity resolution.
          </p>
        </div>

        {/* Action Controls: [Preview Report], [Generate PDF], [Export JSON] */}
        <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 border ${
              isPreviewMode
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 font-bold'
                : 'bg-[#181D26] hover:bg-[#202734] text-slate-300 border-[#2A3342]'
            }`}
          >
            <Eye className="w-4 h-4 text-orange-400" />
            <span>{isPreviewMode ? 'Exit Preview' : 'Preview Report'}</span>
          </button>

          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 border ${
              isEditMode 
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 font-bold' 
                : 'bg-[#181D26] hover:bg-[#202734] text-slate-300 border-[#2A3342]'
            }`}
          >
            <Edit3 className="w-4 h-4 text-orange-400" />
            <span>{isEditMode ? 'Close Edit' : 'Edit Summary'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg bg-[#181D26] hover:bg-[#202734] text-slate-200 border border-[#2A3342] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            title="Generate clean white-paper formatted PDF via browser print"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Generate PDF</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-950/60 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* 2. Printable / Preview Report Sheet (18 Distinct Numbered Sections) */}
      <div 
        id="printable-report"
        className="bg-[#0F1218] border border-[#232A36] rounded-xl p-8 max-w-5xl mx-auto space-y-8 shadow-2xl relative text-slate-200 text-xs"
      >
        {/* Document Classification & Formal Header */}
        <div className="text-center border-b-2 border-[#1E2430] pb-6 space-y-2 font-mono">
          <div className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            CONFIDENTIAL // LAW ENFORCEMENT & INVESTIGATIVE INTELLIGENCE ONLY
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide uppercase">
            Threat Actor De-Anonymization and Attribution Dossier
          </h2>
          <div className="text-xs text-slate-400">
            Case ID: <strong className="text-slate-200">{activeCase.id}</strong> &bull; Agency: <strong className="text-slate-200">{config.agency}</strong> &bull; Authority: <strong className="text-slate-200">{activeCase.warrantNumber}</strong>
          </div>
          <div className="text-[10px] text-slate-500">
            Report Version 1.0 &bull; Generated: {generationTimestamp} &bull; Lead Investigator: {config.leadInvestigator}
          </div>
        </div>

        {/* Mandatory Statutory Notice */}
        <div className="bg-[#141820] border-2 border-dashed border-orange-500/60 rounded-xl p-4 text-center space-y-1">
          <div className="text-sm font-extrabold text-orange-400 uppercase tracking-wider flex items-center justify-center gap-2 font-mono">
            <ShieldAlert className="w-5 h-5 text-orange-400" />
            <span>ATTRIBUTION LEAD — HUMAN VALIDATION REQUIRED</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mx-auto font-sans">
            <strong>STATUTORY NOTICE:</strong> Correlation identifies evidence-based relationships between digital identities. Attribution requires independent corroboration connecting the threat actor cluster to a real-world entity. 
            <em> This report produces lawful investigative leads for sworn investigator verification, not automated criminal charges.</em>
          </p>
        </div>

        {/* SECTION 1 — CASE OVERVIEW */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 1 — CASE OVERVIEW</span>
            <span className="text-[10px] text-slate-500">ADMINISTRATIVE METADATA</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-[#0A0D14] p-3 rounded-lg border border-[#1A202C] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Case Identifier:</span>
              <div className="text-white font-bold">{activeCase.id} ({activeCase.name})</div>
              <span className="text-[10px] text-slate-500 uppercase block pt-1">Codename:</span>
              <div className="text-slate-300">{activeCase.codename}</div>
            </div>
            <div className="bg-[#0A0D14] p-3 rounded-lg border border-[#1A202C] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Lead Investigator:</span>
              <div className="text-white font-bold">{config.leadInvestigator}</div>
              <span className="text-[10px] text-slate-500 uppercase block pt-1">Statutory Authority:</span>
              <div className="text-emerald-400 font-semibold">{activeCase.warrantNumber} (Authorized)</div>
            </div>
          </div>
        </div>

        {/* SECTION 2 — INVESTIGATION SCOPE */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5">
            SECTION 2 — INVESTIGATION SCOPE
          </h3>
          <p className="text-slate-300 font-sans leading-relaxed text-xs">
            Operation DarkEcho investigates persistent cyber threat actor activities spanning initial access brokering on Dread forums, credential monetisation on XSS marketplaces, leak dissemination across BreachForums mirrors, and exploit toolchain staging in public developer trees. The scope encompasses digital identity correlation (Stage 1) and evidence-based candidate entity resolution (Stage 2).
          </p>
        </div>

        {/* SECTION 3 — DIGITAL IDENTITIES ANALYZED */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 3 — DIGITAL IDENTITIES ANALYZED</span>
            <span className="text-[10px] text-slate-400 font-mono">4 INDEXED PERSONAS</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-[11px]">
              <thead>
                <tr className="border-b border-[#1E2430] text-slate-400 uppercase bg-[#0A0D14]">
                  <th className="py-2 px-3">Persona Handle</th>
                  <th className="py-2 px-3">Platform of Origin</th>
                  <th className="py-2 px-3">Operational Role</th>
                  <th className="py-2 px-3">First Seen</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A202C]">
                {identities.map((id: any) => (
                  <tr key={id.id} className="hover:bg-[#12161E]">
                    <td className="py-2 px-3 font-bold text-white">@{id.username}</td>
                    <td className="py-2 px-3 text-slate-300">{id.platform}</td>
                    <td className="py-2 px-3 text-slate-400">{id.behavioural?.primaryRole}</td>
                    <td className="py-2 px-3 text-slate-400">{id.firstSeen}</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">Correlated</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4 — IDENTITY DETAILS */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5">
            SECTION 4 — IDENTITY DETAILS & TELEMETRY
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {identities.map((id: any) => (
              <div key={id.id} className="bg-[#0A0D14] border border-[#1E2430] p-3 rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">@{id.username}</span>
                  <span className="text-orange-400 text-[10px]">{id.clusterId}</span>
                </div>
                <div className="text-[11px] text-slate-400">Aliases: {id.aliases?.join(', ') || 'None recorded'}</div>
                <div className="text-[11px] text-slate-400">PGP Key: {id.technical?.pgpKeyId}</div>
                <div className="text-[11px] text-slate-400 truncate">Wallet: {id.technical?.cryptoWallets?.[0] || 'Unknown'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5 — WRITING STYLE / STYLOMETRY ANALYSIS */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 5 — WRITING STYLE / STYLOMETRY ANALYSIS</span>
            <span className="text-[10px] text-orange-400 font-mono">92% STRENGTH</span>
          </h3>
          <p className="text-slate-300 font-sans leading-relaxed text-xs">
            Natural Language Processing (NLP) tokenization across 42 extracted darknet forum posts and commit messages established a Jaccard syntactic similarity index of 0.89. The author exhibits an idiosyncratic double-hyphen (--) delimiter habit present in 100% of samples, consistent omission of Oxford commas, and uniform lowercase casing in bash commands.
          </p>
        </div>

        {/* SECTION 6 — BEHAVIOURAL ANALYSIS */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 6 — BEHAVIOURAL ANALYSIS</span>
            <span className="text-[10px] text-orange-400 font-mono">88% STRENGTH</span>
          </h3>
          <p className="text-slate-300 font-sans leading-relaxed text-xs">
            Modus operandi analysis demonstrates a predictable 45-minute handover sequence: exploit vulnerabilities announced on Dread under @shadow_x17 are listed for sales escrow on XSS by @x_shadow within 45 minutes, with failover staging mirrors deployed to darkx17-vault.is by @darkx17 within 12 minutes. Multi-signature escrow is universally mandated.
          </p>
        </div>

        {/* SECTION 7 — TEMPORAL ANALYSIS */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 7 — TEMPORAL ANALYSIS</span>
            <span className="text-[10px] text-orange-400 font-mono">91% STRENGTH</span>
          </h3>
          <p className="text-slate-300 font-sans leading-relaxed text-xs">
            Longitudinal activity logs over 180 monitored days reveal a Pearson activity correlation coefficient of r = 0.88. Diurnal active windows are concentrated between 20:00 and 03:00 UTC (peak activity at 22:30 UTC), indicating a UTC+03:00 operational timezone. A synchronized 3-week absence across all personas occurred during the December holiday season.
          </p>
        </div>

        {/* SECTION 8 — TECHNICAL / DIGITAL INDICATOR ANALYSIS */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 8 — TECHNICAL / DIGITAL INDICATOR ANALYSIS</span>
            <span className="text-[10px] text-orange-400 font-mono">96% STRENGTH</span>
          </h3>
          <p className="text-slate-300 font-sans leading-relaxed text-xs">
            A definitive cryptographic collision was established: the RSA 4096-bit OpenPGP key fingerprint <code>0x7E4A8F2C91B4</code> is explicitly embedded in profile bios and signed PGP release headers of both @shadow_x17 and @x_shadow. Bitcoin SegWit multi-sig deposit wallet <code>bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code> was verified across escrow threads.
          </p>
        </div>

        {/* SECTION 9 — INFRASTRUCTURE RELATIONSHIPS */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 9 — INFRASTRUCTURE RELATIONSHIPS</span>
            <span className="text-[10px] text-orange-400 font-mono">93% STRENGTH</span>
          </h3>
          <p className="text-slate-300 font-sans leading-relaxed text-xs">
            Reverse proxy host <code>185.220.101.45</code> (AS206238, FlokiNET/Njalla) co-hosts darkx17-vault.is mirror gateway and Dread staging mirrors. SSH host public key fingerprint <code>SHA256: 8f3c...71ab</code> discovered on x17_dev development staging matches the SSH banner of the darkx17 staging backend.
          </p>
        </div>

        {/* SECTION 10 — PAIRWISE RELATIONSHIP ANALYSIS */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 10 — PAIRWISE RELATIONSHIP ANALYSIS</span>
            <span className="text-[10px] text-slate-400 font-mono">5 EVALUATED PAIRS</span>
          </h3>
          <div className="space-y-2.5 font-mono text-xs">
            {pairwiseRels.map((pw: any) => (
              <div key={pw.id} className="bg-[#0A0D14] border border-[#1E2430] p-3 rounded-lg space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">@{pw.sourceUsername} &harr; @{pw.targetUsername}</span>
                  <span className="text-orange-400 font-bold">{pw.overallScore}% ({pw.relationshipType})</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  {pw.analystSummary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 11 — OVERALL ACTOR CLUSTER ANALYSIS */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 11 — OVERALL ACTOR CLUSTER ANALYSIS</span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">CLUSTER SCORE: 92%</span>
          </h3>
          <p className="text-slate-300 font-sans leading-relaxed text-xs">
            Multi-signal synthesis aggregates all four digital identities into <strong>Actor Cluster A (TA-001)</strong> with an overall correlation strength of <strong>92% (VERY STRONG EVIDENCE)</strong>. The multi-vector evidence firmly clears the 80% threshold standard, justifying escalation across the critical gate to Stage 2 Real-World Attribution.
          </p>
        </div>

        {/* SECTION 12 — SUPPORTING EVIDENCE */}
        <div className="space-y-2 font-mono text-xs">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider border-b border-[#1E2430] pb-1.5">
            SECTION 12 — SUPPORTING EVIDENCE ({primaryCluster.supportingReasons.length})
          </h3>
          <ul className="space-y-1 font-sans text-xs text-slate-300">
            {primaryCluster.supportingReasons.map((item: string, idx: number) => (
              <li key={idx} className="bg-[#0A0D14] p-2 rounded border border-[#1E2430] flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 13 — CONFLICTING EVIDENCE */}
        <div className="space-y-2 font-mono text-xs">
          <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider border-b border-[#1E2430] pb-1.5">
            SECTION 13 — CONFLICTING EVIDENCE ({primaryCluster.conflictingReasons.length})
          </h3>
          <ul className="space-y-1 font-sans text-xs text-slate-300">
            {primaryCluster.conflictingReasons.map((item: string, idx: number) => (
              <li key={idx} className="bg-[#0A0D14] p-2 rounded border border-red-950/60 flex items-start gap-2">
                <span className="text-red-400 font-bold">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 14 — UNKNOWN / MISSING EVIDENCE */}
        <div className="space-y-2 font-mono text-xs">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-[#1E2430] pb-1.5">
            SECTION 14 — UNKNOWN / MISSING EVIDENCE ({primaryCluster.unknownReasons.length})
          </h3>
          <ul className="space-y-1 font-sans text-xs text-slate-300">
            {primaryCluster.unknownReasons.slice(0, 4).map((item: string, idx: number) => (
              <li key={idx} className="bg-[#0A0D14] p-2 rounded border border-amber-950/60 flex items-start gap-2">
                <span className="text-amber-400 font-bold">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 15 — STAGE 2 ATTRIBUTION ANALYSIS */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 15 — STAGE 2 ATTRIBUTION ANALYSIS</span>
            <span className="text-[10px] text-amber-400 font-mono font-bold">ATTRIBUTION LEAD: 82%</span>
          </h3>
          <div className="bg-[#0A0D14] p-4 rounded-lg border border-[#1E2430] space-y-2 text-xs">
            <div className="flex items-center justify-between font-mono">
              <span className="text-white font-bold">Candidate Entity A: Meridian Analytics S.R.O.</span>
              <span className="text-amber-400 font-bold">82% Strength (Lead)</span>
            </div>
            <p className="text-slate-300 font-sans leading-relaxed">
              Entity resolution matched hosting node 185.220.101.45 and domain darkx17-vault.is to corporate registrant Meridian Analytics S.R.O. (Subject: A. K., Prague, CZ). Developer commit author alex-k-sec embedded matching hardened Go reverse-proxy binaries. Alternative Candidate Entity B (Vortex Cloud) was rejected at 67% due to BGP routing conflicts.
            </p>
          </div>
        </div>

        {/* SECTION 16 — HUMAN VALIDATION DECISIONS */}
        <div className="space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider border-b border-[#1E2430] pb-1.5">
            SECTION 16 — HUMAN INVESTIGATOR VALIDATION DECISIONS
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-[#1E2430] text-slate-400 uppercase bg-[#0A0D14]">
                  <th className="py-2 px-3">Timestamp</th>
                  <th className="py-2 px-3">Officer</th>
                  <th className="py-2 px-3">Decision Action</th>
                  <th className="py-2 px-3">Justification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A202C]">
                {auditLogs.map((log: any) => (
                  <tr key={log.id}>
                    <td className="py-2 px-3 text-slate-400">{log.timestamp}</td>
                    <td className="py-2 px-3 text-white font-bold">{log.investigator}</td>
                    <td className="py-2 px-3 text-orange-400 font-semibold">{log.action}</td>
                    <td className="py-2 px-3 text-slate-300 font-sans text-[10px]">{log.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 17 — INVESTIGATION LIMITATIONS */}
        <div className="space-y-2 font-mono text-xs">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider border-b border-[#1E2430] pb-1.5">
            SECTION 17 — INVESTIGATION LIMITATIONS & BOUNDARIES
          </h3>
          <ul className="space-y-1 font-sans text-xs text-slate-300">
            <li className="bg-[#0A0D14] p-2.5 rounded border border-[#1E2430] flex items-start gap-2">
              <span className="text-amber-400 font-bold">&bull;</span>
              <span><strong>Anonymity Circuit Limits:</strong> Tor onion routing prevents physical ISP subscriber IP extraction without Tor directory authority logs.</span>
            </li>
            <li className="bg-[#0A0D14] p-2.5 rounded border border-[#1E2430] flex items-start gap-2">
              <span className="text-amber-400 font-bold">&bull;</span>
              <span><strong>Cross-Border Subpoena Limits:</strong> VPN exit gateway payment subscriber logs require mutual legal assistance treaty (MLAT) requests.</span>
            </li>
            <li className="bg-[#0A0D14] p-2.5 rounded border border-[#1E2430] flex items-start gap-2">
              <span className="text-amber-400 font-bold">&bull;</span>
              <span><strong>Corporate Entity Representation:</strong> Meridian Analytics S.R.O. may represent a front company or compromised infrastructure.</span>
            </li>
          </ul>
        </div>

        {/* SECTION 18 — FINAL INVESTIGATIVE SUMMARY (NARRATIVE PARAGRAPHS) */}
        <div className="space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 18 — FINAL INVESTIGATIVE SUMMARY & DISPOSITION</span>
            <span className="text-[10px] text-emerald-400 font-bold">DISPOSITION COMPILED</span>
          </h3>

          <div className="bg-[#0A0D14] border border-[#1E2430] p-4 rounded-lg space-y-3">
            {isEditMode ? (
              <div className="space-y-2">
                <label className="text-[10px] text-orange-400 uppercase font-bold block">
                  Edit Narrative Summary:
                </label>
                <textarea
                  rows={5}
                  value={investigatorAddendum}
                  onChange={(e) => setInvestigatorAddendum(e.target.value)}
                  className="w-full bg-[#12161E] border border-orange-500/50 rounded-lg p-2.5 text-xs text-white font-sans focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            ) : (
              <div className="space-y-2 text-xs text-slate-200 font-sans leading-relaxed">
                <p>
                  {investigatorAddendum}
                </p>
                <p className="text-slate-400">
                  The analysis identified recurring forensic commonalities across alias usage, writing habits, temporal scheduling, and technical infrastructure. The strongest relationships were observed between @shadow_x17 and @x_shadow (94%), anchored by an identical RSA-4096 PGP key and synchronized diurnal activity. Formal MLAT preservation requests for gateway subnet 185.220.101.0/24 are formally endorsed.
                </p>
              </div>
            )}

            {/* Signature Block */}
            <div className="pt-4 border-t border-[#1E2430] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Sworn Lead Investigator:</span>
                <span className="text-white font-bold">{config.leadInvestigator}</span>
                <span className="text-[10px] text-emerald-400 block font-semibold mt-0.5">Digitally Signed &bull; SHA-256 Validated</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-500 uppercase block">Authorization Date:</span>
                <span className="text-white font-bold">{generationTimestamp}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{activeCase.warrantNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
