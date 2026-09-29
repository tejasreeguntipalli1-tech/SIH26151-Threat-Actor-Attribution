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
  Check,
  Copy,
  FileCheck,
  Network,
  Fingerprint,
  Globe,
  Scale,
  Activity,
  ChevronRight
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

  // View state: 'dossier' (warm off-white #F7F3EC paper) or 'console' (charcoal #151515 dark)
  const [reportTheme, setReportTheme] = useState<'dossier' | 'console'>('dossier');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);
  const [investigatorAddendum, setInvestigatorAddendum] = useState<string>(
    "Lead Analyst Synthesis: The forensic examination of four primary digital identities associated with DarkWolf Cluster (TA-001) demonstrates conclusive multi-vector convergence across cryptographic anchors (PGP 0x7E4A8F2C91B4), shared reverse-proxy routing topology (185.220.101.45), and an idiosyncratic double-hyphen delimiter habit. Stage 1 correlation satisfies the statutory evidentiary threshold standard (91% > 80%). Stage 2 entity resolution established a 74% attribution confidence lead linking staging infrastructure and PGP subkeys to Candidate Entity A: Arun Mehta (FICTIONAL DEMO ENTITY). Candidate Entity B (Rohan Verma - 58%) and Candidate C (Vector Systems Ltd. - 62%) were evaluated. Temporal conflict (14:32 vs 14:33 UTC) and multi-tenant proxy hypotheses were rigorously challenged. Formal mutual legal assistance treaty (MLAT) preservation subpoenas are recommended."
  );

  const generationTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  const primaryCluster = clusters.find((c: any) => c.id === 'Actor Cluster A') || clusters[0] || {
    id: 'Actor Cluster A',
    name: 'Actor Cluster A (TA-001 / Shadow Network)',
    correlationScore: 92,
    confidenceTier: 'VERY STRONG EVIDENCE',
    supportingReasons: [
      'Identical 4096-bit RSA OpenPGP Key ID 0x7E4A8F2C91B4 embedded across @shadow_x17 and @x_shadow profiles',
      'Shared SegWit Bitcoin deposit cluster 3J98t1Wp... linked to escrow transaction manifests',
      'Reverse proxy gateway 185.220.101.45 co-hosting darkx17-vault.is and Dread forum mirror',
      'Matching SSH host public key SHA256:8f3c...71ab discovered in git deploy scripts',
      'Jaccard syntactic similarity index of 0.89 across 42 extracted text postings',
      'Idiosyncratic double-hyphen (--) delimiter habit present in 100% of analyzed communications',
      'Consistent omission of Oxford commas and uniform lowercase shell command casing',
      'Predictable 45-minute operational handover interval from exploit drop to escrow listing',
      'Longitudinal Pearson diurnal activity correlation coefficient r = 0.88 (UTC+03:00 window)',
      'Synchronized 3-week operational silence observed across all personas during December hiatus'
    ],
    conflictingReasons: [
      'Account registration dates span 14 months (Dread 2023 vs BreachForums mirror 2024)',
      'Minor variance in Tor browser user-agent header tokens across forum sessions',
      'Discrepancy in initial profile bio language tags (en-US vs en-GB)'
    ],
    unknownReasons: [
      'Physical ISP subscriber subscriber IP address shielded by 3-hop Tor circuit routing',
      'Commercial VPN upstream billing subscriber records require formal foreign MLAT subpoena',
      'Full corporate ownership ledger for offshore registrant Meridian Analytics S.R.O. pending verification',
      'Hardware MAC addresses and local interface telemetry not exposed over HTTP onion protocol'
    ]
  };

  const primaryLead = leads[primaryCluster.id] || Object.values(leads)[0] || {
    candidateEntity: 'Meridian Analytics S.R.O. (Subject A. K.)',
    attributionConfidence: 82,
    status: 'ATTRIBUTION LEAD - HUMAN VALIDATION REQUIRED'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summaryText = `SPECTRA INVESTIGATION ANALYTICAL REPORT
Case: ${activeCase.id} - ${activeCase.name}
Target: ${activeCase.targetActor} (${primaryCluster.name})
Classification: CONTROLLED DEMONSTRATION // SYNTHETIC DATA
Lead Investigator: ${config.leadInvestigator} (${config.agency})
Authority: ${activeCase.warrantNumber}

STAGE 1 DIGITAL CORRELATION: ${primaryCluster.correlationScore}% (VERY HIGH CONFIDENCE)
Correlated Identities: @shadow_x17, @x_shadow, @darkx17, @shadow17 (Peripheral baseline: @user_delta)
Primary Determinative Indicators: PGP 0x7E4A8F2C91B4 collision, Reverse Proxy 185.220.101.45, 0.89 Stylometric Jaccard Index.

STAGE 2 REAL-WORLD ATTRIBUTION: ${primaryLead.attributionConfidence}% (ATTRIBUTION LEAD)
Candidate Entity: ${primaryLead.candidateEntity}
Disposition: Recommendation for Lawful Mutual Legal Assistance Treaty (MLAT) Preservation Orders.

${investigatorAddendum}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  const handleExportJSON = () => {
    const reportData = {
      reportMetadata: {
        title: "INVESTIGATION ANALYTICAL REPORT",
        platform: "SPECTRA Threat Actor Attribution Platform",
        caseId: activeCase.id,
        caseName: activeCase.name,
        targetActor: activeCase.targetActor,
        classification: "CONTROLLED DEMONSTRATION // SYNTHETIC DATA",
        statutoryAuthority: activeCase.warrantNumber,
        agency: config.agency,
        leadInvestigator: config.leadInvestigator,
        generatedAt: generationTimestamp,
        reportVersion: "1.0",
        statutoryNotice: "Correlation identifies evidence-based relationships between digital identities. Attribution requires independent corroboration connecting the threat actor cluster to a real-world entity. This analytical report establishes lawful investigative leads for sworn investigator verification, not automated criminal charges."
      },
      sections: {
        section01_caseOverview: {
          caseId: activeCase.id,
          codename: activeCase.codename,
          status: activeCase.status,
          priority: activeCase.priority,
          warrant: activeCase.warrantNumber,
          leadInvestigator: config.leadInvestigator,
          investigationScope: "Cross-platform darknet actor de-anonymization and candidate entity resolution spanning Tor onion forums, exploit marketplaces, leak publish channels, and developer repositories.",
          objective: "Correlate disparate darknet personas into a validated threat actor cluster (Stage 1) and establish evidence-based real-world attribution leads (Stage 2) under rigorous evidentiary standards."
        },
        section02_digitalIdentitiesAnalyzed: identities,
        section03_investigationMethodology: {
          framework: "Multi-signal correlation engine combining weighted linguistic stylometry, temporal synchronization, network topology, and deterministic cryptographic anchors.",
          signalWeights: {
            cryptographicTechnical: "30%",
            stylometryNLP: "20%",
            behaviouralTradecraft: "20%",
            infrastructureHosting: "15%",
            temporalSynchronization: "15%"
          },
          thresholdGate: "80% minimum correlation required for Stage 2 Real-World Attribution escalation."
        },
        section04_writingStyleStylometry: {
          jaccardSyntacticSimilarity: 0.89,
          typeTokenRatio: "0.74 ± 0.03",
          doubleHyphenUsage: "100% (Present across all 42 analyzed samples)",
          oxfordCommaOmission: "Consistent across all asset listings",
          commandSyntaxCasing: "Uniform lowercase bash command formatting"
        },
        section05_behaviouralAnalysis: {
          operationalHandoverLatency: "45 minutes (σ = 4.2 min) between exploit disclosure and market escrow listing",
          leakPublishCadence: "Mirror upload to darkx17-vault.is within 12 minutes of transaction confirmation",
          escrowTradecraft: "Mandatory 2-of-3 Bitcoin multi-signature escrow for transactions > 0.5 BTC",
          opsecEnforcement: "Strict Tor circuit rotation with deliberate avoidance of Five Eyes exit nodes"
        },
        section06_temporalAnalysis: {
          monitoredPeriodDays: 180,
          sampleCount: 1420,
          pearsonCorrelationCoefficient: 0.88,
          diurnalWindow: "20:00 - 03:00 UTC",
          peakActivityUtc: "22:30 UTC",
          inferredTimezone: "UTC+03:00",
          synchronizedHiatus: "21-day silence window (Dec 22 - Jan 12) corresponding to Eastern European holiday calendar"
        },
        section07_technicalDigitalIndicators: indicators,
        section08_relationshipTopology: {
          cohesionScore: "0.92 clustering coefficient",
          averageNodeDegree: 3.5,
          peripheralNode: "user_delta (Isolated baseline at 0.24 score)"
        },
        section09_pairwiseRelationships: pairwiseRels,
        section10_crossComparisonMatrix: {
          focalIdentity: "shadow_x17",
          comparisons: [
            { target: "x_shadow", score: 94, status: "DETERMINATIVE", keyVector: "PGP Key 0x7E4A8F2C91B4 & Escrow Handover" },
            { target: "darkx17", score: 86, status: "STRONG", keyVector: "Reverse Proxy 185.220.101.45 & Leak Timing" },
            { target: "shadow17", score: 87, status: "STRONG", keyVector: "Git Commit SSH Key & Delimiter Habits" },
            { target: "user_delta", score: 24, status: "REFUTED / BASELINE", keyVector: "No cryptographic or temporal overlap" }
          ]
        },
        section11_overallActorCluster: primaryCluster,
        section12_evidenceAssessment: {
          supporting: primaryCluster.supportingReasons,
          conflicting: primaryCluster.conflictingReasons,
          unknown: primaryCluster.unknownReasons
        },
        section13_stage2Attribution: {
          primaryCandidate: candidates[0],
          evaluatedCandidates: candidates,
          attributionLead: primaryLead
        },
        section14_humanValidationDecisions: auditLogs,
        section15_investigationLimitations: [
          "Tor onion routing conceals physical subscriber ISP IP address without directory authority logs",
          "Commercial VPN upstream records require formal mutual legal assistance treaty (MLAT) subpoenas",
          "Meridian Analytics S.R.O. may represent a front entity or bulletproof hosting intermediary rather than direct operators",
          "Findings represent investigative intelligence establishing probable cause for warrants, not judicial verdicts"
        ],
        section16_finalInvestigativeSummary: {
          disposition: "RECOMMENDATION FOR FORMAL MUTUAL LEGAL ASSISTANCE TREATY (MLAT) PRESERVATION SUBPOENAS",
          investigatorAddendum: investigatorAddendum,
          signoffOfficer: config.leadInvestigator,
          warrantNumber: activeCase.warrantNumber,
          verificationHash: "SHA256: 4f8d9b2e7a1c3f5082e6d9b4c7a10283f5e9d2c1b8a4f7e2c0d5b9a8f1e3c2b1"
        }
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SPECTRA_Case_Report_${activeCase.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isDossier = reportTheme === 'dossier';

  return (
    <div className="space-y-6 font-sans">
      {/* Print-specific style definitions */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 14mm 14mm 16mm 14mm;
          }
          body {
            background-color: #FFFFFF !important;
            color: #151515 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header, aside, nav, #report-toolbar, .no-print {
            display: none !important;
          }
          #printable-dossier {
            background: #FFFFFF !important;
            color: #151515 !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .report-section {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .dossier-table {
            border-collapse: collapse !important;
          }
          .dossier-table th, .dossier-table td {
            border: 1px solid #D9D4CC !important;
          }
        }
      `}</style>

      {/* 1. TOP ACTION & CONTROLS TOOLBAR */}
      <div 
        id="report-toolbar"
        className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[11px] font-mono font-bold bg-[#C85F0A]/15 text-[#E97817] px-2.5 py-0.5 rounded border border-[#C85F0A]/40 uppercase tracking-wider">
              SPECTRA LEGAL DOSSIER
            </span>
            <span className="text-xs text-slate-400 font-mono">
              CASE: {activeCase.id}
            </span>
            <span className="text-xs text-slate-600 font-mono">|</span>
            <span className="text-xs text-slate-400 font-mono">
              16 NUMBERED NARRATIVE SECTIONS
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 font-mono">
            <FileText className="w-6 h-6 text-[#E97817]" />
            <span>Investigation Findings & Analytical Dossier</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Authoritative intelligence report bridging Stage 1 digital actor correlation and Stage 2 real-world entity resolution.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap font-mono text-xs">
          {/* Theme Switcher: Archival Dossier vs Tactical Console */}
          <div className="bg-[#181D26] p-1 rounded-lg border border-[#2A3342] flex items-center">
            <button
              onClick={() => setReportTheme('dossier')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                isDossier 
                  ? 'bg-[#F7F3EC] text-[#151515] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="View in Archival Dossier paper styling"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Dossier View</span>
            </button>
            <button
              onClick={() => setReportTheme('console')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                !isDossier 
                  ? 'bg-[#232A36] text-[#E97817] font-bold shadow-sm border border-[#C85F0A]/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="View in Tactical Console dark styling"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Dark Console</span>
            </button>
          </div>

          {/* Edit Addendum Toggle */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 border ${
              isEditMode 
                ? 'bg-[#C85F0A]/20 text-orange-300 border-[#C85F0A]/50 font-bold' 
                : 'bg-[#181D26] hover:bg-[#202734] text-slate-300 border-[#2A3342]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-[#E97817]" />
            <span>{isEditMode ? 'Close Edit' : 'Edit Addendum'}</span>
          </button>

          {/* Copy Brief */}
          <button
            onClick={handleCopySummary}
            className="px-3 py-2 rounded-lg bg-[#181D26] hover:bg-[#202734] text-slate-300 border border-[#2A3342] font-medium transition-colors flex items-center gap-1.5"
            title="Copy executive brief to clipboard"
          >
            {copiedBrief ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedBrief ? 'Copied Brief' : 'Copy Brief'}</span>
          </button>

          {/* Generate PDF */}
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg bg-[#181D26] hover:bg-[#202734] text-slate-200 border border-[#2A3342] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            title="Generate clean white-paper formatted PDF via browser print"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Generate PDF</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#C85F0A] to-[#E97817] hover:brightness-110 text-white font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-950/50 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* 2. THE INVESTIGATION DOSSIER DOCUMENT */}
      <div 
        id="printable-dossier"
        className={`rounded-xl border max-w-5xl mx-auto shadow-2xl relative transition-all duration-200 text-xs ${
          isDossier 
            ? 'bg-[#F7F3EC] text-[#202020] border-[#D9D4CC] p-8 sm:p-12 font-serif' 
            : 'bg-[#151515] text-slate-200 border-[#232A36] p-8 sm:p-10 font-sans'
        }`}
      >
        {/* ======================================================== */}
        {/* DOCUMENT COVER & FORMAL HEADER BLOCK */}
        {/* ======================================================== */}
        <div className={`border-b-4 pb-8 mb-8 space-y-4 ${isDossier ? 'border-[#C85F0A]' : 'border-[#C85F0A]'}`}>
          {/* Top Classification Stamp */}
          <div className="flex items-center justify-between flex-wrap gap-2 font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded font-bold uppercase tracking-widest ${
                isDossier ? 'bg-[#151515] text-[#F7F3EC]' : 'bg-[#C85F0A] text-white'
              }`}>
                CONTROLLED DEMONSTRATION // SYNTHETIC DATA
              </span>
              <span className={isDossier ? 'text-[#606060]' : 'text-slate-400'}>
                FOR OFFICIAL USE ONLY
              </span>
            </div>
            <div className={`font-mono text-[11px] ${isDossier ? 'text-[#606060]' : 'text-slate-400'}`}>
              DOC REF: <strong className={isDossier ? 'text-[#151515]' : 'text-white'}>SPECTRA-DOS-2026-001</strong> &bull; REV 1.0
            </div>
          </div>

          {/* Main Dossier Title Banner */}
          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#C85F0A] uppercase">
              <ShieldAlert className="w-4 h-4 text-[#C85F0A]" />
              <span>SPECTRA Threat Actor Attribution Platform</span>
            </div>
            <h1 className={`text-3xl sm:text-4xl font-black tracking-tight mt-1 uppercase ${
              isDossier ? 'text-[#151515] font-serif' : 'text-white font-mono'
            }`}>
              Investigation Analytical Report
            </h1>
            <p className={`text-sm mt-1.5 font-sans leading-relaxed ${isDossier ? 'text-[#4A4A4A]' : 'text-slate-300'}`}>
              Forensic Synthesis, Multi-Signal Persona Correlation (Stage 1), and Real-World Entity Resolution (Stage 2)
            </p>
          </div>

          {/* Official Administrative Metadata Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-lg font-mono text-[11px] border ${
            isDossier 
              ? 'bg-[#EFE9DF] border-[#D9D4CC] text-[#202020]' 
              : 'bg-[#0D0F12] border-[#1E232B] text-slate-300'
          }`}>
            <div>
              <span className="text-[10px] text-[#808080] uppercase block">Case Identifier:</span>
              <strong className={isDossier ? 'text-[#151515]' : 'text-white'}>{activeCase.id}</strong>
              <div className="text-[10px] text-[#C85F0A] font-semibold">{activeCase.name}</div>
            </div>
            <div>
              <span className="text-[10px] text-[#808080] uppercase block">Lead Investigator:</span>
              <strong className={isDossier ? 'text-[#151515]' : 'text-white'}>{config.leadInvestigator}</strong>
              <div className="text-[10px] text-slate-500">DFIR Attribution Cell</div>
            </div>
            <div>
              <span className="text-[10px] text-[#808080] uppercase block">Statutory Authority:</span>
              <strong className="text-emerald-700 font-bold">{activeCase.warrantNumber}</strong>
              <div className="text-[10px] text-slate-500">Sec 69A IT Act / MLAT</div>
            </div>
            <div>
              <span className="text-[10px] text-[#808080] uppercase block">Timestamp:</span>
              <strong className={isDossier ? 'text-[#151515]' : 'text-white'}>{generationTimestamp}</strong>
              <div className="text-[10px] text-slate-500">Hash Verified</div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MANDATORY STATUTORY WARNING CALLOUT */}
        {/* ======================================================== */}
        <div className={`p-4 rounded-lg border-2 border-dashed mb-8 text-center space-y-1.5 ${
          isDossier 
            ? 'bg-[#F2ECE1] border-[#C85F0A] text-[#151515]' 
            : 'bg-[#181D26] border-[#C85F0A] text-slate-200'
        }`}>
          <div className="text-xs font-mono font-black text-[#C85F0A] uppercase tracking-wider flex items-center justify-center gap-2">
            <Scale className="w-4 h-4 text-[#C85F0A]" />
            <span>MANDATORY STATUTORY EVIDENTIARY STANDARD</span>
          </div>
          <p className="text-xs font-sans leading-relaxed max-w-4xl mx-auto">
            <strong>STATUTORY NOTICE:</strong> Correlation identifies evidence-based relationships between digital identities. Attribution requires independent corroboration connecting the threat actor cluster to a real-world entity. 
            <em> This analytical report establishes lawful investigative leads for sworn investigator verification, not automated criminal charges.</em>
          </p>
        </div>

        {/* ======================================================== */}
        {/* ALL 16 NUMBERED SECTIONS (CONTINUOUS INVESTIGATIVE PROSE) */}
        {/* ======================================================== */}
        <div className="space-y-10">

          {/* ---------------------------------------------------- */}
          {/* SECTION 01 — CASE OVERVIEW */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 01 — CASE OVERVIEW & SCOPE</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase">ADMINISTRATIVE DIRECTIVE</span>
            </div>
            
            <p className="font-sans leading-relaxed text-xs">
              Operation DarkEcho was formally initiated under statutory warrant <strong>{activeCase.warrantNumber}</strong> to investigate an advanced threat cluster orchestrating initial access brokering, compromised credential dissemination, and zero-day staging operations across darknet forums and covert communication channels. The primary objective is twofold: first, systematically ingest and correlate disparate operational personas across disparate platforms into a cohesive digital threat actor cluster (Stage 1); second, analyze technical and operational infrastructure artifacts to establish lawful, evidence-backed real-world candidate entity leads (Stage 2).
            </p>

            <div className={`p-3.5 rounded-lg border font-sans text-xs space-y-1.5 ${
              isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
            }`}>
              <div className="font-bold font-mono text-[11px] text-[#C85F0A] uppercase">Investigation Directive Parameters:</div>
              <ul className="list-disc list-inside space-y-1 text-[11.5px]">
                <li><strong>Statutory Mandate:</strong> Section 69A Information Technology Act & Mutual Legal Assistance Treaty (MLAT) framework.</li>
                <li><strong>Investigative Scope:</strong> Multi-platform ingestion encompassing Tor Dread forums, XSS Exploit Marketplace, BreachForums mirrors, and developer git staging trees.</li>
                <li><strong>Target Classification:</strong> Persistent cyber-criminal syndication operating under the collective moniker <em>Actor Cluster A (TA-001 / 'Shadow Network')</em>.</li>
                <li><strong>Operational Posture:</strong> Active intelligence gathering with evidentiary isolation between Stage 1 digital correlation and Stage 2 real-world entity resolution.</li>
              </ul>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 02 — DIGITAL IDENTITIES ANALYZED */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 02 — DIGITAL IDENTITIES ANALYZED</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase">5 INDEXED DIGITAL PERSONAS</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              The investigative engine ingested and evaluated five distinct digital identities. Four of these personas exhibit intense behavioral and cryptographic convergence belonging to Actor Cluster A, while one peripheral identity was maintained throughout the corpus as a discriminative statistical baseline.
            </p>

            {/* Identities Inventory Table */}
            <div className="overflow-x-auto">
              <table className={`w-full text-left border-collapse text-[11px] dossier-table ${
                isDossier ? 'border border-[#D9D4CC]' : 'border border-[#1E232B]'
              }`}>
                <thead>
                  <tr className={`font-mono text-[10px] uppercase ${
                    isDossier ? 'bg-[#E5DFD3] text-[#202020]' : 'bg-[#0D0F12] text-slate-400'
                  }`}>
                    <th className="py-2.5 px-3 border">Persona Handle</th>
                    <th className="py-2.5 px-3 border">Platform of Origin</th>
                    <th className="py-2.5 px-3 border">Operational Role</th>
                    <th className="py-2.5 px-3 border">PGP / Cryptographic Anchor</th>
                    <th className="py-2.5 px-3 border">Diurnal Window</th>
                    <th className="py-2.5 px-3 border">Cluster Assignment</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDossier ? 'divide-[#D9D4CC]' : 'divide-[#1E232B]'}`}>
                  {identities.map((id: any) => (
                    <tr key={id.id} className={isDossier ? 'hover:bg-[#EFE9DF]' : 'hover:bg-[#12161E]'}>
                      <td className="py-2 px-3 border font-mono font-bold">@{id.username}</td>
                      <td className="py-2 px-3 border font-sans">{id.platform}</td>
                      <td className="py-2 px-3 border font-sans">{id.behavioural?.primaryRole || id.role}</td>
                      <td className="py-2 px-3 border font-mono text-[10px]">{id.technical?.pgpKeyId || 'None'}</td>
                      <td className="py-2 px-3 border font-mono text-[10px]">{id.temporal?.activeHours || '20:00 - 03:00 UTC'}</td>
                      <td className="py-2 px-3 border font-mono">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          id.clusterId === 'Actor Cluster A' 
                            ? 'bg-orange-500/20 text-[#C85F0A]' 
                            : 'bg-slate-500/20 text-slate-500'
                        }`}>
                          {id.clusterId}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Persona Profiles Brief */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {identities.map((id: any) => (
                <div key={id.id} className={`p-3 rounded-lg border text-xs font-sans space-y-1 ${
                  isDossier ? 'bg-[#F2ECE1] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
                }`}>
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-sm text-[#C85F0A]">@{id.username}</span>
                    <span className="text-[10px] font-semibold uppercase">{id.platform}</span>
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    <strong>Operational Function:</strong> {id.behavioural?.primaryRole || 'Threat actor participant'}. 
                    Observed aliases: <em>{id.aliases?.join(', ') || id.username}</em>. First recorded telemetry on {id.firstSeen || '2024-03-12'}.
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 03 — INVESTIGATION METHODOLOGY */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 03 — INVESTIGATION METHODOLOGY & ALGORITHMIC WEIGHTING</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase">EVIDENTIARY ARCHITECTURE</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              The SPECTRA analytical engine utilizes a disciplined multi-signal correlation pipeline that balances probabilistic stylometric heuristics against deterministic cryptographic and network telemetry. Rather than treating correlations as subjective opinions, the engine enforces mathematical weights across five discrete investigative dimensions:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 font-mono text-center text-xs">
              <div className={`p-3 rounded-lg border ${isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'}`}>
                <div className="text-lg font-black text-[#C85F0A]">30%</div>
                <div className="text-[10px] font-bold uppercase mt-0.5">Technical & PGP</div>
                <div className="text-[9px] text-slate-500 mt-1">Deterministic Hard Anchor</div>
              </div>
              <div className={`p-3 rounded-lg border ${isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'}`}>
                <div className="text-lg font-black text-[#C85F0A]">20%</div>
                <div className="text-[10px] font-bold uppercase mt-0.5">Stylometry / NLP</div>
                <div className="text-[9px] text-slate-500 mt-1">Syntactic & Lexical TTR</div>
              </div>
              <div className={`p-3 rounded-lg border ${isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'}`}>
                <div className="text-lg font-black text-[#C85F0A]">20%</div>
                <div className="text-[10px] font-bold uppercase mt-0.5">Behavioural Pattern</div>
                <div className="text-[9px] text-slate-500 mt-1">Tradecraft & Handover</div>
              </div>
              <div className={`p-3 rounded-lg border ${isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'}`}>
                <div className="text-lg font-black text-[#C85F0A]">15%</div>
                <div className="text-[10px] font-bold uppercase mt-0.5">Infrastructure</div>
                <div className="text-[9px] text-slate-500 mt-1">Reverse Proxy & SSH</div>
              </div>
              <div className={`p-3 rounded-lg border ${isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'}`}>
                <div className="text-lg font-black text-[#C85F0A]">15%</div>
                <div className="text-[10px] font-bold uppercase mt-0.5">Temporal Diurnal</div>
                <div className="text-[9px] text-slate-500 mt-1">Pearson Correlation (r)</div>
              </div>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              Under SPECTRA doctrine, a cluster must exceed the statutory correlation threshold of <strong>80.0%</strong> to earn legal qualification for Stage 2 Real-World Attribution. Any score falling below 80.0% remains locked strictly in Stage 1 intelligence monitoring to preserve privacy and prevent premature legal actions against uncorroborated entities.
            </p>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 04 — WRITING STYLE / STYLOMETRY ANALYSIS */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 04 — WRITING STYLE & STYLOMETRIC ANALYSIS</span>
              </h2>
              <span className="text-[10px] font-mono text-[#C85F0A] uppercase font-bold">CORRELATION STRENGTH: 92%</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              Natural Language Processing (NLP) tokenization and stylometric feature extraction were executed across a compiled corpus of 42 darknet forum threads, 18 git commit messages, and 7 PGP-signed release bulletins. The syntactic similarity analysis yielded a <strong>Jaccard syntactic similarity index of 0.89</strong> among @shadow_x17, @x_shadow, and @darkx17.
            </p>

            <div className={`p-3.5 rounded-lg border font-sans text-xs space-y-2 ${
              isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
            }`}>
              <div className="font-mono font-bold text-[#C85F0A] text-[11px] uppercase">Forensic Stylistic Markers Identified:</div>
              <ul className="list-disc list-inside space-y-1 leading-relaxed text-[11.5px]">
                <li><strong>Double-Hyphen Delimiter Habit:</strong> An idiosyncratic double-hyphen (<code>--</code>) punctuation habit is present in <strong>100% of analyzed communications</strong>, substituted systematically where standard English grammar prescribes em-dashes, semicolons, or parenthetical clauses.</li>
                <li><strong>Lexical Richness & Type-Token Ratio (TTR):</strong> The Type-Token Ratio across all four cluster personas remained stable at <code>0.74 ± 0.03</code>, confirming an identical specialized vocabulary depth in underground offensive security contexts.</li>
                <li><strong>Syntactic Grammar Anomaly:</strong> Complete, systematic omission of the Oxford comma in multi-item lists (e.g., <em>"credentials, access keys and staging configs"</em>).</li>
                <li><strong>Command-Line Orthography:</strong> Universal preference for lowercase shell syntax in published tutorials, omitting trailing semicolons and employing <code>curl -sSL</code> conventions without exception.</li>
              </ul>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 05 — BEHAVIOURAL ANALYSIS */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 05 — BEHAVIOURAL PATTERN & OPERATIONAL TRADECRAFT</span>
              </h2>
              <span className="text-[10px] font-mono text-[#C85F0A] uppercase font-bold">CORRELATION STRENGTH: 88%</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              Modus operandi analysis demonstrates a predictable, highly disciplined operational pipeline governing how illicit assets move through the underground market. The investigation tracked 14 transaction cycles over four months, exposing a rigid operational handover sequence:
            </p>

            <div className={`p-3.5 rounded-lg border font-sans text-xs space-y-2 ${
              isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
            }`}>
              <div className="font-mono font-bold text-[#C85F0A] text-[11px] uppercase">Operational Modus Operandi Sequences:</div>
              <div className="space-y-1.5 text-[11.5px] leading-relaxed">
                <div>&bull; <strong>45-Minute Handover Interval:</strong> Initial corporate access vulnerabilities announced by <code>@shadow_x17</code> on Dread forums are cataloged for sale on XSS marketplace by <code>@x_shadow</code> within an average elapsed latency of <strong>42.6 minutes</strong> (standard deviation σ = 4.2 minutes).</div>
                <div>&bull; <strong>Rapid Mirror Dissemination:</strong> In the event of marketplace disruption, failover database manifests are pushed to <code>darkx17-vault.is</code> by <code>@darkx17</code> within 12 minutes of transaction confirmation.</div>
                <div>&bull; <strong>Mandatory Escrow Policy:</strong> Both personas enforce an unyielding rule requiring 2-of-3 Bitcoin multi-signature escrow on transactions exceeding 0.5 BTC, explicitly rejecting direct wallet transfers or non-verifiable cryptocurrency mix services.</div>
                <div>&bull; <strong>Operational Security (OPSEC):</strong> Outbound network interactions originate exclusively from hardened Tor circuit relays, avoiding exit nodes located in Five Eyes jurisdictions.</div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 06 — TEMPORAL ANALYSIS */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 06 — TEMPORAL SYNCHRONIZATION & DIURNAL PROFILING</span>
              </h2>
              <span className="text-[10px] font-mono text-[#C85F0A] uppercase font-bold">CORRELATION STRENGTH: 91%</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              Longitudinal timestamp analysis of 1,420 discrete darknet events across 180 monitored calendar days revealed a <strong>Pearson correlation coefficient of r = 0.88</strong> across the activity curves of @shadow_x17 and @x_shadow. This mathematical convergence firmly rules out independent autonomous actors operating on discordant schedules.
            </p>

            <div className={`p-3.5 rounded-lg border font-mono text-xs space-y-2 ${
              isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Diurnal Window:</span>
                  <span className="text-sm font-bold text-[#C85F0A]">20:00 - 03:00 UTC</span>
                  <span className="text-[10px] block text-slate-400">Nightly Shift</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Peak Activity Time:</span>
                  <span className="text-sm font-bold text-[#C85F0A]">22:30 UTC</span>
                  <span className="text-[10px] block text-slate-400">Escrow Closing Hour</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Inferred Timezone:</span>
                  <span className="text-sm font-bold text-emerald-700">UTC+03:00</span>
                  <span className="text-[10px] block text-slate-400">Eastern European / Eurasian</span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#D9D4CC]/60 font-sans text-[11px] leading-relaxed">
                <strong>Synchronized December Hiatus:</strong> A complete 21-day operational silence (zero forum posts, zero git commits, zero wallet movements) was observed across all four identities simultaneously between December 22 and January 12, aligning directly with Eastern European Orthodox Christmas and New Year holiday observances.
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 07 — TECHNICAL / DIGITAL INDICATORS */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 07 — TECHNICAL & DIGITAL ARTIFACT ANALYSIS</span>
              </h2>
              <span className="text-[10px] font-mono text-[#C85F0A] uppercase font-bold">CORRELATION STRENGTH: 96%</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              Unlike behavioral traits, technical indicators provide deterministic forensic linkage. The investigation established conclusive cryptographic and infrastructure collisions bridging the personas:
            </p>

            <div className="overflow-x-auto">
              <table className={`w-full text-left border-collapse text-[11px] dossier-table ${
                isDossier ? 'border border-[#D9D4CC]' : 'border border-[#1E232B]'
              }`}>
                <thead>
                  <tr className={`font-mono text-[10px] uppercase ${
                    isDossier ? 'bg-[#E5DFD3] text-[#202020]' : 'bg-[#0D0F12] text-slate-400'
                  }`}>
                    <th className="py-2.5 px-3 border">Indicator Type</th>
                    <th className="py-2.5 px-3 border">Artifact Value / Hash</th>
                    <th className="py-2.5 px-3 border">Observed Across Personas</th>
                    <th className="py-2.5 px-3 border">Evidentiary Value</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDossier ? 'divide-[#D9D4CC]' : 'divide-[#1E232B]'}`}>
                  <tr className={isDossier ? 'hover:bg-[#EFE9DF]' : 'hover:bg-[#12161E]'}>
                    <td className="py-2 px-3 border font-mono font-bold text-[#C85F0A]">RSA 4096 PGP Key</td>
                    <td className="py-2 px-3 border font-mono text-[10px]">0x7E4A8F2C91B4</td>
                    <td className="py-2 px-3 border font-sans">@shadow_x17 & @x_shadow profile headers</td>
                    <td className="py-2 px-3 border font-mono text-emerald-700 font-bold">Deterministic Collison (100%)</td>
                  </tr>
                  <tr className={isDossier ? 'hover:bg-[#EFE9DF]' : 'hover:bg-[#12161E]'}>
                    <td className="py-2 px-3 border font-mono font-bold text-[#C85F0A]">Reverse Proxy Gateway</td>
                    <td className="py-2 px-3 border font-mono text-[10px]">185.220.101.45 (AS206238)</td>
                    <td className="py-2 px-3 border font-sans">darkx17-vault.is & Dread staging mirror</td>
                    <td className="py-2 px-3 border font-mono text-emerald-700 font-bold">Infrastructure Collision (93%)</td>
                  </tr>
                  <tr className={isDossier ? 'hover:bg-[#EFE9DF]' : 'hover:bg-[#12161E]'}>
                    <td className="py-2 px-3 border font-mono font-bold text-[#C85F0A]">SSH Host Public Key</td>
                    <td className="py-2 px-3 border font-mono text-[10px]">SHA256: 8f3c4e9a1b7d5f20...71ab</td>
                    <td className="py-2 px-3 border font-sans">@shadow17 deploy tree & darkx17 mirror host</td>
                    <td className="py-2 px-3 border font-mono text-emerald-700 font-bold">Host Fingerprint Match (91%)</td>
                  </tr>
                  <tr className={isDossier ? 'hover:bg-[#EFE9DF]' : 'hover:bg-[#12161E]'}>
                    <td className="py-2 px-3 border font-mono font-bold text-[#C85F0A]">Bitcoin SegWit Wallet</td>
                    <td className="py-2 px-3 border font-mono text-[10px]">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</td>
                    <td className="py-2 px-3 border font-sans">Escrow deposit threads across Market-Y</td>
                    <td className="py-2 px-3 border font-mono text-emerald-700 font-bold">UTXO Cluster Co-spending (89%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 08 — RELATIONSHIP ANALYSIS (TOPOLOGY) */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 08 — IDENTITY RELATIONSHIP NETWORK TOPOLOGY</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase">NETWORK GRAPH MATRIX</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              Graph topological analysis establishes a cohesive, high-density mesh network linking the core four digital personas. The graph exhibits an overall clustering coefficient of <strong>0.92</strong> with an average node degree of 3.5, confirming robust multi-point interconnection rather than a fragile hub-and-spoke configuration:
            </p>

            {/* Static Visual Graph Matrix Representation */}
            <div className={`p-4 rounded-lg border font-mono text-xs space-y-3 ${
              isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
            }`}>
              <div className="text-[11px] font-bold text-[#C85F0A] uppercase">Topological Co-occurrence Matrix:</div>
              <div className="grid grid-cols-6 gap-1 text-center text-[10px]">
                <div className="p-1 font-bold text-slate-400">NODE</div>
                <div className="p-1 font-bold text-[#C85F0A]">shadow_x17</div>
                <div className="p-1 font-bold text-[#C85F0A]">x_shadow</div>
                <div className="p-1 font-bold text-[#C85F0A]">darkx17</div>
                <div className="p-1 font-bold text-[#C85F0A]">shadow17</div>
                <div className="p-1 font-bold text-slate-500">user_delta</div>

                <div className="p-1 font-bold text-[#C85F0A] text-left">shadow_x17</div>
                <div className="p-1 bg-slate-300/30 text-slate-400">1.00</div>
                <div className="p-1 bg-orange-500/20 text-[#C85F0A] font-bold">0.94</div>
                <div className="p-1 bg-orange-500/20 text-[#C85F0A] font-bold">0.86</div>
                <div className="p-1 bg-orange-500/20 text-[#C85F0A] font-bold">0.87</div>
                <div className="p-1 bg-slate-200/50 text-slate-400">0.24</div>

                <div className="p-1 font-bold text-[#C85F0A] text-left">x_shadow</div>
                <div className="p-1 bg-orange-500/20 text-[#C85F0A] font-bold">0.94</div>
                <div className="p-1 bg-slate-300/30 text-slate-400">1.00</div>
                <div className="p-1 bg-orange-500/20 text-[#C85F0A] font-bold">0.89</div>
                <div className="p-1 bg-orange-500/10 text-orange-600">0.78</div>
                <div className="p-1 bg-slate-200/50 text-slate-400">0.18</div>

                <div className="p-1 font-bold text-[#C85F0A] text-left">darkx17</div>
                <div className="p-1 bg-orange-500/20 text-[#C85F0A] font-bold">0.86</div>
                <div className="p-1 bg-orange-500/20 text-[#C85F0A] font-bold">0.89</div>
                <div className="p-1 bg-slate-300/30 text-slate-400">1.00</div>
                <div className="p-1 bg-orange-500/20 text-[#C85F0A] font-bold">0.91</div>
                <div className="p-1 bg-slate-200/50 text-slate-400">0.21</div>

                <div className="p-1 font-bold text-[#C85F0A] text-left">shadow17</div>
                <div className="p-1 bg-orange-500/20 text-[#C85F0A] font-bold">0.87</div>
                <div className="p-1 bg-orange-500/10 text-orange-600">0.78</div>
                <div className="p-1 bg-orange-500/20 text-[#C85F0A] font-bold">0.91</div>
                <div className="p-1 bg-slate-300/30 text-slate-400">1.00</div>
                <div className="p-1 bg-slate-200/50 text-slate-400">0.15</div>

                <div className="p-1 font-bold text-slate-500 text-left">user_delta</div>
                <div className="p-1 bg-slate-200/50 text-slate-400">0.24</div>
                <div className="p-1 bg-slate-200/50 text-slate-400">0.18</div>
                <div className="p-1 bg-slate-200/50 text-slate-400">0.21</div>
                <div className="p-1 bg-slate-200/50 text-slate-400">0.15</div>
                <div className="p-1 bg-slate-300/30 text-slate-400">1.00</div>
              </div>
              <div className="font-sans text-[11px] text-slate-500 pt-1">
                * Note the definitive mathematical gap: core cluster pairs maintain &ge; 0.86 correlation, while baseline persona <code>@user_delta</code> remains below 0.25 across all vectors.
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 09 — PAIRWISE ANALYSIS */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 09 — GRANULAR PAIRWISE RELATIONSHIP DOSSIERS</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase">5 EVALUATED PAIRS</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              Every persona pair was evaluated across six investigative dimensions: Username Orthography, Stylometry/NLP, Behavioural Tradecraft, Temporal Synchronization, Technical Anchors, and Infrastructure Overlap:
            </p>

            <div className="space-y-3">
              {pairwiseRels.map((pw: any) => (
                <div key={pw.id} className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                  isDossier ? 'bg-[#F2ECE1] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
                }`}>
                  <div className="flex items-center justify-between font-mono">
                    <div className="font-bold text-sm text-[#C85F0A] flex items-center gap-2">
                      <span>@{pw.sourceUsername}</span>
                      <span className="text-slate-400">&harr;</span>
                      <span>@{pw.targetUsername}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{pw.relationshipType}</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                        pw.overallScore >= 85 ? 'bg-orange-500/20 text-[#C85F0A]' : 'bg-slate-400/20 text-slate-400'
                      }`}>
                        {pw.overallScore}% MATCH
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-[11.5px] leading-relaxed text-[#303030]">
                    {pw.analystSummary}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1 font-mono text-[10px]">
                    <div>Username: <strong>{pw.dimensions?.usernameSimilarity || 85}%</strong></div>
                    <div>Stylometry: <strong>{pw.dimensions?.stylometricSimilarity || 92}%</strong></div>
                    <div>Behaviour: <strong>{pw.dimensions?.behaviouralSimilarity || 88}%</strong></div>
                    <div>Temporal: <strong>{pw.dimensions?.temporalOverlap || 91}%</strong></div>
                    <div>Technical: <strong>{pw.dimensions?.technicalOverlap || 96}%</strong></div>
                    <div>Infra: <strong>{pw.dimensions?.infrastructureOverlap || 93}%</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 10 — ONE-TO-MANY ANALYSIS (CROSS-COMPARISON) */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 10 — ONE-TO-MANY CROSS-COMPARISON MATRIX</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase">FOCAL ANCHOR: @shadow_x17</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              Fixing <code>@shadow_x17</code> as the primary focal anchor persona, the multi-identity cross-comparison matrix illustrates how evidentiary signals converge across the entire operational apparatus:
            </p>

            <div className="overflow-x-auto">
              <table className={`w-full text-left border-collapse text-[11px] dossier-table ${
                isDossier ? 'border border-[#D9D4CC]' : 'border border-[#1E232B]'
              }`}>
                <thead>
                  <tr className={`font-mono text-[10px] uppercase ${
                    isDossier ? 'bg-[#E5DFD3] text-[#202020]' : 'bg-[#0D0F12] text-slate-400'
                  }`}>
                    <th className="py-2.5 px-3 border">Paired Target Persona</th>
                    <th className="py-2.5 px-3 border">Correlation Score</th>
                    <th className="py-2.5 px-3 border">Key Shared Telemetry</th>
                    <th className="py-2.5 px-3 border">Primary Divergence</th>
                    <th className="py-2.5 px-3 border">Triage Assessment</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDossier ? 'divide-[#D9D4CC]' : 'divide-[#1E232B]'}`}>
                  <tr className={isDossier ? 'hover:bg-[#EFE9DF]' : 'hover:bg-[#12161E]'}>
                    <td className="py-2 px-3 border font-mono font-bold">@x_shadow</td>
                    <td className="py-2 px-3 border font-mono font-bold text-[#C85F0A]">94%</td>
                    <td className="py-2 px-3 border font-sans">RSA-4096 Key 0x7E4A8F2C91B4, 45-min Escrow Handover</td>
                    <td className="py-2 px-3 border font-sans text-slate-500">None detected</td>
                    <td className="py-2 px-3 border font-mono text-emerald-700 font-bold">DETERMINATIVE</td>
                  </tr>
                  <tr className={isDossier ? 'hover:bg-[#EFE9DF]' : 'hover:bg-[#12161E]'}>
                    <td className="py-2 px-3 border font-mono font-bold">@darkx17</td>
                    <td className="py-2 px-3 border font-mono font-bold text-[#C85F0A]">86%</td>
                    <td className="py-2 px-3 border font-sans">Reverse Proxy 185.220.101.45, Double-Hyphen Habit</td>
                    <td className="py-2 px-3 border font-sans text-slate-500">14-month forum creation gap</td>
                    <td className="py-2 px-3 border font-mono text-emerald-700 font-bold">VERY STRONG</td>
                  </tr>
                  <tr className={isDossier ? 'hover:bg-[#EFE9DF]' : 'hover:bg-[#12161E]'}>
                    <td className="py-2 px-3 border font-mono font-bold">@shadow17</td>
                    <td className="py-2 px-3 border font-mono font-bold text-[#C85F0A]">87%</td>
                    <td className="py-2 px-3 border font-sans">Git SSH Key Fingerprint SHA256:8f3c, Lowercase Syntax</td>
                    <td className="py-2 px-3 border font-sans text-slate-500">Focus on dev commits vs forums</td>
                    <td className="py-2 px-3 border font-mono text-emerald-700 font-bold">STRONG</td>
                  </tr>
                  <tr className={isDossier ? 'hover:bg-[#EFE9DF]' : 'hover:bg-[#12161E]'}>
                    <td className="py-2 px-3 border font-mono font-bold text-slate-500">@user_delta</td>
                    <td className="py-2 px-3 border font-mono font-bold text-slate-400">24%</td>
                    <td className="py-2 px-3 border font-sans">Incidental general English tech terminology</td>
                    <td className="py-2 px-3 border font-sans text-red-600">Discordant hours, different PGP key</td>
                    <td className="py-2 px-3 border font-mono text-slate-400">PERIPHERAL / REFUTED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 11 — OVERALL ACTOR CLUSTER ANALYSIS */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 11 — OVERALL ACTOR CLUSTER SYNTHESIS (STAGE 1)</span>
              </h2>
              <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold">CLUSTER CORRELATION: 92%</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              Synthesizing all multi-vector telemetry, the four core identities coalesce into <strong>Actor Cluster A (TA-001 / 'Shadow Network')</strong> with a net weighted correlation confidence of <strong>92.0% (VERY STRONG EVIDENCE)</strong>. This exceeds the statutory 80% threshold standard by 12.0 percentage points.
            </p>

            <div className={`p-4 rounded-lg border font-sans text-xs space-y-2 ${
              isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
            }`}>
              <div className="font-mono font-bold text-[#C85F0A] text-[11px] uppercase">Mathematical & Operational Convergence Findings:</div>
              <p className="text-[11.5px] leading-relaxed">
                The hypothesis of independent actors cooperating casually or impersonating one another is mathematically unsustainable. A 92% correlation encompassing hard cryptographic key re-use, matching reverse-proxy hosting subnets, synchronized diurnal operating schedules, and 100% adherence to a rare grammatical delimiter establishes beyond reasonable investigative doubt that these four digital personas operate under unified operational control.
              </p>
              <div className="font-mono text-[11px] text-emerald-700 font-bold pt-1">
                &check; FORMAL CRITICAL GATE PASS: Cluster A is legally certified for Stage 2 Real-World Attribution.
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 12 — EVIDENCE ASSESSMENT (TRIAGE) */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 12 — EVIDENTIARY ASSESSMENT & TRIAGE MATRIX</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase">TRI-PARTITE AUDIT</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Supporting Evidence */}
              <div className={`p-3.5 rounded-lg border font-sans text-xs space-y-2 ${
                isDossier ? 'bg-[#EAF3EB] border-emerald-300' : 'bg-[#0D1510] border-emerald-900/60'
              }`}>
                <div className="flex items-center gap-1.5 font-mono font-bold text-emerald-700 text-[11px] uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Supporting Evidence ({primaryCluster.supportingReasons?.length || 10})</span>
                </div>
                <ul className="space-y-1.5 text-[11px] leading-relaxed">
                  {(primaryCluster.supportingReasons || []).slice(0, 5).map((r: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">&bull;</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conflicting Evidence */}
              <div className={`p-3.5 rounded-lg border font-sans text-xs space-y-2 ${
                isDossier ? 'bg-[#FBEBEB] border-red-300' : 'bg-[#180F11] border-red-900/60'
              }`}>
                <div className="flex items-center gap-1.5 font-mono font-bold text-red-600 text-[11px] uppercase">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Conflicting Evidence ({primaryCluster.conflictingReasons?.length || 3})</span>
                </div>
                <ul className="space-y-1.5 text-[11px] leading-relaxed">
                  {(primaryCluster.conflictingReasons || []).map((r: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">&bull;</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unknown / Missing Evidence */}
              <div className={`p-3.5 rounded-lg border font-sans text-xs space-y-2 ${
                isDossier ? 'bg-[#FEF6E9] border-amber-300' : 'bg-[#1A160F] border-amber-900/60'
              }`}>
                <div className="flex items-center gap-1.5 font-mono font-bold text-amber-600 text-[11px] uppercase">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Unknown / Missing Data ({primaryCluster.unknownReasons?.length || 4})</span>
                </div>
                <ul className="space-y-1.5 text-[11px] leading-relaxed">
                  {(primaryCluster.unknownReasons || []).map((r: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">&bull;</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 13 — STAGE 2 REAL-WORLD ENTITY ATTRIBUTION */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-4">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 13 — STAGE 2 REAL-WORLD ENTITY ATTRIBUTION ANALYSIS</span>
              </h2>
              <span className="text-[10px] font-mono text-[#C85F0A] uppercase font-bold">ATTRIBUTION LEAD: 74% // PROBABLE</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              Following explicit investigator authorization crossing the Stage 1/Stage 2 critical gate (justification logged in immutable audit custody), the SPECTRA entity resolution module resolved technical and corporate telemetry against registered physical entities. Three candidate entities were evaluated using synthetic, controlled laboratory demonstration intelligence:
            </p>

            {/* Candidate A (Lead) */}
            <div className={`p-4 rounded-lg border text-xs space-y-2.5 ${
              isDossier ? 'bg-[#F2ECE1] border-[#C85F0A]' : 'bg-[#0D0F12] border-[#C85F0A]/60'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-[#C85F0A]" />
                  <span className="font-bold text-sm text-[#C85F0A]">Candidate Entity A: Arun Mehta (FICTIONAL DEMO ENTITY)</span>
                </div>
                <span className="px-2.5 py-0.5 rounded font-bold font-mono text-[11px] bg-orange-500/20 text-[#C85F0A] self-start sm:self-auto">
                  74% ATTRIBUTION CONFIDENCE (PRIMARY INVESTIGATIVE LEAD)
                </span>
              </div>

              <div className="font-sans leading-relaxed text-[11.5px] space-y-1.5">
                <div><strong>Entity Affiliation & Jurisdiction:</strong> Former Senior Infrastructure Consultant at Vector Systems Ltd. / Director at Meridian Analytics; Registered Context: Bengaluru, India / Tallinn, Estonia. Source Reliability: Grade A.</div>
                <div><strong>Connecting Evidentiary Vectors & Provenance:</strong></div>
                <ul className="list-disc list-inside pl-2 space-y-1 text-slate-700">
                  <li><strong>PGP Cryptographic Anchor:</strong> RSA-4096 Key ID <code>0x7E4A8F2C91B4</code> verified on public keyserver mirrors cross-signing clear-net developer keyring (Evidence ID: <code>EV-2047-18</code>, Reliability: Grade A).</li>
                  <li><strong>Domain Registrar Account:</strong> Clear-web mirror domain <code>darkx17-vault.is</code> registered through corporate commercial account associated with Subject (Evidence ID: <code>EV-2047-20</code>, Reliability: Grade B).</li>
                  <li><strong>Reverse Proxy Co-Location:</strong> Proxy node <code>185.220.101.45</code> answered TLS handshakes matching SSL SAN for both darknet mirror and corporate staging gateway (Evidence ID: <code>EV-2047-19</code>, Reliability: Grade A).</li>
                  <li><strong>Stylometric & Lexical Concordance:</strong> Idiosyncratic double-hyphen syntax (--) and strict lowercase starters present across 100% of forum posts match candidate published whitepapers.</li>
                </ul>
              </div>

              {/* Digital-to-Real Traversal Chain */}
              <div className={`p-2.5 rounded border font-mono text-[10px] space-y-1 ${
                isDossier ? 'bg-[#E5DFD3] border-[#D9D4CC]' : 'bg-[#121620] border-[#1E2535]'
              }`}>
                <span className="text-[#C85F0A] font-bold block">VERIFIED EVIDENTIARY TRAVERSAL PIPELINE:</span>
                <div className="flex flex-wrap items-center gap-1.5 text-slate-700 font-semibold">
                  <span>DarkWolf Cluster (91%)</span>
                  <span>&rarr;</span>
                  <span>@shadow_x17</span>
                  <span>&rarr;</span>
                  <span>PGP 0x7E4A8F2C91B4</span>
                  <span>&rarr;</span>
                  <span>darkx17-vault.is</span>
                  <span>&rarr;</span>
                  <span>Vector Systems Ltd.</span>
                  <span>&rarr;</span>
                  <span className="text-[#C85F0A]">Arun Mehta (74% Lead)</span>
                </div>
              </div>

              {/* Contradictory Evidence & Temporal Conflict */}
              <div className="p-2.5 rounded bg-red-950/20 border border-red-500/30 text-[11px] font-sans text-red-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold font-mono text-red-700">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>CONTRADICTORY FINDINGS & TEMPORAL CONFLICT:</span>
                </div>
                <p>
                  A temporal conflict was detected at 14:32 UTC (India ISP session) vs 14:33 UTC (Frankfurt DarkWolf command execution). This physically impossible 60-second cross-continental travel reduced attribution confidence from 87% to 74%. In accordance with SPECTRA doctrine, contradictions are never concealed.
                </p>
              </div>
            </div>

            {/* Candidate B & C Secondary Evaluations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
              }`}>
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-slate-700">Candidate B: Rohan Verma (FICTIONAL DEMO)</span>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-amber-500/20 text-amber-700 font-semibold">
                    58% (REQUIRES EVIDENCE)
                  </span>
                </div>
                <p className="font-sans text-[11px] text-slate-600 leading-relaxed">
                  Evaluated due to upstream BGP transit ASN AS49210 announcing proxy subnet. Refuted as primary actor; activity occurred during business hours (09:00 - 18:00 UTC) with zero PGP or stylometric correlation.
                </p>
              </div>

              <div className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
              }`}>
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-slate-700">Candidate C: Vector Systems Ltd. (FICTIONAL DEMO)</span>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-orange-500/20 text-[#C85F0A] font-semibold">
                    62% (CORPORATE UMBRELLA)
                  </span>
                </div>
                <p className="font-sans text-[11px] text-slate-600 leading-relaxed">
                  Corporate billing entity under which mirror hosting account #VEC-ENT-410 was registered. Connects Candidate A commits to operational infrastructure; individual intent remains with Subject.
                </p>
              </div>
            </div>

            {/* Evidence Independence Counter & Adversarial Challenge Brief */}
            <div className={`p-3 rounded-lg border font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
              isDossier ? 'bg-[#E5DFD3] border-[#D9D4CC]' : 'bg-[#10141E] border-[#1E2535]'
            }`}>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block">Evidence Independence Audit:</span>
                <span className="font-bold text-slate-800">6 Independent Root Sources // 11 Derived Reports Deduplicated</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block">Attribution Challenge:</span>
                <span className="font-bold text-orange-700">10 Alternative Hypotheses Adversarially Rebutted</span>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 14 — HUMAN VALIDATION DECISIONS */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 14 — HUMAN INVESTIGATOR VALIDATION & AUDIT LOG</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase">CHAIN OF CUSTODY</span>
            </div>

            <p className="font-sans leading-relaxed text-xs">
              In strict adherence to human-in-the-loop governance doctrine, no automated attribution action is committed without explicit sworn investigator sign-off. The immutable audit log records all analytical decisions:
            </p>

            <div className="overflow-x-auto">
              <table className={`w-full text-left border-collapse text-[11px] dossier-table ${
                isDossier ? 'border border-[#D9D4CC]' : 'border border-[#1E232B]'
              }`}>
                <thead>
                  <tr className={`font-mono text-[10px] uppercase ${
                    isDossier ? 'bg-[#E5DFD3] text-[#202020]' : 'bg-[#0D0F12] text-slate-400'
                  }`}>
                    <th className="py-2.5 px-3 border">Timestamp (UTC)</th>
                    <th className="py-2.5 px-3 border">Sworn Officer</th>
                    <th className="py-2.5 px-3 border">Action Decision</th>
                    <th className="py-2.5 px-3 border">Evidentiary Justification</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDossier ? 'divide-[#D9D4CC]' : 'divide-[#1E232B]'}`}>
                  {auditLogs.map((log: any) => (
                    <tr key={log.id} className={isDossier ? 'hover:bg-[#EFE9DF]' : 'hover:bg-[#12161E]'}>
                      <td className="py-2 px-3 border font-mono text-[10px]">{log.timestamp}</td>
                      <td className="py-2 px-3 border font-mono font-bold">{log.investigator}</td>
                      <td className="py-2 px-3 border font-mono font-semibold text-[#C85F0A]">{log.action}</td>
                      <td className="py-2 px-3 border font-sans text-[10.5px] leading-relaxed">{log.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 15 — LIMITATIONS & BOUNDARIES */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 15 — INVESTIGATION LIMITATIONS & EVIDENTIARY BOUNDARIES</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase">LEGAL CAVEATS</span>
            </div>

            <div className={`p-4 rounded-lg border font-sans text-xs space-y-2 ${
              isDossier ? 'bg-[#EFE9DF] border-[#D9D4CC]' : 'bg-[#0D0F12] border-[#1E232B]'
            }`}>
              <div className="font-mono font-bold text-[#C85F0A] text-[11px] uppercase">Evidentiary Limitations & Counter-Hypotheses:</div>
              <ul className="list-disc list-inside space-y-1.5 text-[11.5px] leading-relaxed">
                <li><strong>Anonymity Network Constraints:</strong> Multi-hop Tor circuit routing shields physical subscriber ISP IP address and local client MAC addresses; correlation relies on application-layer leakage and cryptographic artifacts rather than packet routing interception.</li>
                <li><strong>Compromised Intermediary Possibility:</strong> Meridian Analytics S.R.O. servers may represent compromised infrastructure or an unvetted third-party commercial client leasing subnets rather than willful malicious syndication.</li>
                <li><strong>International Jurisdiction Boundaries:</strong> Physical server infrastructure resides in the Czech Republic; direct evidence retrieval requires formal letters rogatory and Mutual Legal Assistance Treaty (MLAT) requests.</li>
                <li><strong>Judicial Standard:</strong> This analytical report constitutes investigative intelligence establishing probable cause for warrants and subpoenas; it does not constitute a criminal conviction.</li>
              </ul>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 16 — FINAL INVESTIGATIVE SUMMARY & DISPOSITION */}
          {/* ---------------------------------------------------- */}
          <div className="report-section space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-[#C85F0A]/40">
              <h2 className="text-sm font-bold font-mono text-[#C85F0A] tracking-wider uppercase flex items-center gap-2">
                <span>SECTION 16 — FINAL INVESTIGATIVE SUMMARY & DISPOSITION</span>
              </h2>
              <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold">DISPOSITION FORMULATED</span>
            </div>

            <div className={`p-5 rounded-lg border space-y-4 ${
              isDossier ? 'bg-[#F2ECE1] border-[#C85F0A]' : 'bg-[#0D0F12] border-[#C85F0A]/60'
            }`}>
              {/* Disposition Header */}
              <div className="border-b pb-2 font-mono text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Formal Case Disposition:</span>
                  <span className="text-sm font-bold text-[#C85F0A] uppercase">
                    RECOMMENDATION FOR LAWFUL MUTUAL LEGAL ASSISTANCE (MLAT) PRESERVATION ORDERS
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-700/20 text-emerald-700 font-bold text-[10px]">
                  CERTIFIED DOSSIER
                </span>
              </div>

              {/* Editable or Displayed Addendum */}
              {isEditMode ? (
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-[#C85F0A] uppercase font-bold block">
                    Edit Investigator Narrative Addendum:
                  </label>
                  <textarea
                    rows={6}
                    value={investigatorAddendum}
                    onChange={(e) => setInvestigatorAddendum(e.target.value)}
                    className="w-full bg-[#12161E] border border-[#C85F0A] rounded-lg p-3 text-xs text-white font-sans focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  <div className="text-[10px] font-mono text-slate-500 text-right">
                    * Edits immediately update report view, PDF print preview, and JSON export.
                  </div>
                </div>
              ) : (
                <div className="space-y-2 font-sans text-xs leading-relaxed text-[#202020]">
                  <p className="font-medium">
                    {investigatorAddendum}
                  </p>
                  <p className="text-slate-600 text-[11px]">
                    Multi-vector convergence between <code>@shadow_x17</code> and <code>@x_shadow</code> (94% pairwise correlation) and their unified infrastructure links to <code>darkx17-vault.is</code> firmly substantiate Actor Cluster A. The identification of Candidate Entity A (Meridian Analytics S.R.O.) provides a high-confidence lead warranting preservation subpoenas to European authorities under Section 69A IT Act and reciprocal MLAT channels.
                  </p>
                </div>
              )}

              {/* Official Sworn Signature Block */}
              <div className="pt-4 border-t border-[#D9D4CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Lead Sworn Investigator:</span>
                  <span className="font-bold text-[#151515]">{config.leadInvestigator}</span>
                  <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5">
                    Digitally Signed &bull; SHA-256 Validated
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Verification Hash:</span>
                  <span className="font-mono text-[10px] text-slate-600 block">
                    SHA256: 4f8d9b2e...c18a03
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-500 uppercase block">Statutory Certification:</span>
                  <span className="font-bold text-[#151515]">{activeCase.warrantNumber}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {generationTimestamp}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* DOCUMENT RUNNING FOOTER (FOR PRINT & DISPLAY) */}
        {/* ======================================================== */}
        <div className="mt-12 pt-6 border-t-2 border-[#D9D4CC] flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-slate-500">
          <div>
            SPECTRA Threat Actor Attribution Platform &bull; Case: {activeCase.id}
          </div>
          <div className="text-center font-bold text-[#C85F0A]">
            CONFIDENTIAL // CONTROLLED DEMONSTRATION // SYNTHETIC DATA
          </div>
          <div>
            Official Intelligence Record &bull; Page 1 of 1
          </div>
        </div>

      </div>
    </div>
  );
};
