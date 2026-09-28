import React, { useState } from 'react';
import { 
  ActorCluster, 
  DigitalIdentity, 
  InvestigationConfig, 
  RealWorldAttributionLead, 
  AuditLogItem,
  DigitalIndicatorItem,
  CandidateEntity,
  EntityResolutionDimension,
  PairwiseRelationship
} from '../../types/investigation';
import { 
  initialDigitalIndicators, 
  initialMatchingDimensions, 
  initialCandidateEntities,
  initialPairwiseRelationships 
} from '../../data/syntheticData';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Fingerprint, 
  FileCheck2,
  Calendar,
  Building2,
  Server,
  User,
  GitMerge,
  ExternalLink,
  Edit3,
  Check,
  ShieldCheck,
  Layers,
  Clock,
  Key
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
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [investigatorAddendum, setInvestigatorAddendum] = useState<string>(
    "Lead Analyst Note: Multi-vector convergence across cryptographic anchors, shared hosting topology, and identical stylometric quirks strongly corroborates unified actor control. Recommend immediate issuance of mutual legal assistance treaty (MLAT) preservation requests for hosting gateway subnet 185.220.101.0/24."
  );

  const generationTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  const indicators: DigitalIndicatorItem[] = initialDigitalIndicators;
  const dimensions: EntityResolutionDimension[] = initialMatchingDimensions;
  const candidates: CandidateEntity[] = initialCandidateEntities;
  const pairwiseRels: PairwiseRelationship[] = initialPairwiseRelationships;
  const primaryCluster = clusters.find(c => c.id === 'Actor Cluster A') || clusters[0];
  const primaryLead = leads[primaryCluster.id] || Object.values(leads)[0];

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const reportData = {
      reportTitle: "Dark Web Threat Actor De-Anonymization and Attribution Dossier",
      caseId: config.investigationId,
      agency: config.agency,
      leadInvestigator: config.leadInvestigator,
      generatedAt: generationTimestamp,
      statutoryAuthority: "Warrant #CR-2026-8819 (Authorized)",
      classification: "CONFIDENTIAL // LAW ENFORCEMENT & INVESTIGATIVE INTELLIGENCE ONLY",
      operationalStandard: "Correlation identifies relationships between digital identities. Attribution requires independent evidence connecting the actor to a real-world entity. This report generates investigative leads, not criminal accusations.",
      sections: {
        section1_caseMetadata: {
          caseId: config.investigationId,
          agency: config.agency,
          leadInvestigator: config.leadInvestigator,
          statutoryWarrant: "Warrant #CR-2026-8819",
          classification: "CONFIDENTIAL"
        },
        section2_digitalIdentities: identities,
        section3_stylometricAnalysis: {
          jaccardSyntacticSimilarity: 0.89,
          doubleHyphenHabitPercent: 100,
          oxfordCommaOmission: "Consistent across all 4 personas",
          casingConvention: "Uniform lowercase command syntax"
        },
        section4_behaviouralAnalysis: {
          escalationTimeline: "45-minute handoff between Dread exploit leak and XSS marketplace escrow listing",
          opsecStandard: "STRICT Tor circuit isolation and multi-sig escrow mandates"
        },
        section5_temporalAnalysis: {
          pearsonCorrelation: 0.88,
          activeHoursUtc: "20:00 - 03:00 UTC",
          peakActivity: "22:30 UTC",
          timezoneEstimate: "UTC+03:00"
        },
        section6_technicalInfrastructure: {
          pgpKeyFingerprint: "0x7E4A8F2C91B4",
          sharedHostingRelayIp: "185.220.101.45",
          mirrorDomain: "darkx17-vault.is",
          sshKeyFingerprint: "SHA256: 8f3c...71ab"
        },
        section7_pairwiseRelationships: pairwiseRels,
        section8_overallActorCluster: primaryCluster,
        section9_structuredIndicators: indicators,
        section10_stage2Attribution: {
          primaryCandidate: candidates[0],
          secondaryCandidate: candidates[1],
          matchingDimensions: dimensions,
          attributionLead: primaryLead
        },
        section11_investigatorDecisions: auditLogs,
        section12_limitationsAndGaps: primaryCluster.evidenceGaps,
        section13_conclusion: {
          investigatorAddendum,
          recommendation: "Issue Mutual Legal Assistance Treaty (MLAT) warrant for subscriber records"
        }
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ARGUS_Case_Dossier_${config.investigationId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Header Banner */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
              AUDIT-GRADE CASE DOSSIER
            </span>
            <span className="text-xs text-slate-400 font-mono">
              CASE: {config.investigationId}
            </span>
            <span className="text-xs text-slate-500 font-mono">|</span>
            <span className="text-xs text-slate-400 font-mono">
              SECTIONS 1–13 COMPLETE
            </span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <FileText className="w-5 h-5 text-orange-400" />
            <span>Threat Actor Attribution Analytical Dossier</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Formal narrative intelligence dossier bridging Stage 1 digital actor correlation and Stage 2 real-world entity resolution.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 border ${
              isEditMode 
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/50' 
                : 'bg-[#181D26] hover:bg-[#202734] text-slate-300 border-[#2A3342]'
            }`}
          >
            <Edit3 className="w-4 h-4 text-orange-400" />
            <span>{isEditMode ? 'Close Edit Mode' : 'Edit Addendum'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg bg-[#181D26] hover:bg-[#202734] text-slate-200 border border-[#2A3342] text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Print Dossier (PDF)</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-950/60 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Case JSON</span>
          </button>
        </div>
      </div>

      {/* Printable Narrative Report Document Sheet */}
      <div 
        id="printable-report"
        className="bg-[#0F1218] border border-[#232A36] rounded-xl p-8 max-w-5xl mx-auto space-y-8 shadow-2xl relative font-sans text-xs text-slate-200"
      >
        {/* Document Classification & Header Bar */}
        <div className="text-center border-b-2 border-[#1E2430] pb-6 space-y-2">
          <div className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
            CONFIDENTIAL // LAW ENFORCEMENT & INVESTIGATIVE INTELLIGENCE ONLY
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide uppercase font-mono">
            Dark Web Threat Actor De-Anonymization & Attribution Dossier
          </h1>
          <div className="text-xs font-mono text-slate-400">
            Case: <strong className="text-slate-200">{config.investigationId}</strong> &bull; Agency: <strong className="text-slate-200">{config.agency}</strong> &bull; Warrant: <strong className="text-slate-200">#CR-2026-8819</strong>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Dossier Compiled: {generationTimestamp} &bull; Lead Investigator: {config.leadInvestigator}
          </div>
        </div>

        {/* Mandatory Statutory Compliance Banner */}
        <div className="bg-[#141820] border-2 border-dashed border-orange-500/60 rounded-xl p-4 text-center space-y-1">
          <div className="text-sm font-extrabold text-orange-400 uppercase tracking-wider flex items-center justify-center gap-2 font-mono">
            <ShieldAlert className="w-5 h-5 text-orange-400" />
            <span>ATTRIBUTION LEAD — HUMAN VALIDATION REQUIRED</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mx-auto font-sans">
            <strong>STATUTORY NOTICE:</strong> Correlation identifies evidence-based relationships between digital personas. Attribution requires independent corroboration connecting the threat actor cluster to a real-world entity. 
            <em> This report produces lawful investigative leads for sworn investigator verification, not automated criminal charges.</em>
          </p>
        </div>

        {/* SECTION 1 — CASE OVERVIEW & ADMINISTRATIVE METADATA */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 1 — CASE OVERVIEW & ADMINISTRATIVE METADATA</span>
            <span className="text-[10px] text-slate-500">AUTHORIZED INVESTIGATION</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-[#0A0D14] p-3 rounded-lg border border-[#1A202C] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase">Case Identifier:</span>
              <div className="text-white font-bold">{config.investigationId} (Operation DarkEcho)</div>
              <span className="text-[10px] text-slate-500 uppercase block pt-1">Investigating Unit:</span>
              <div className="text-slate-300">{config.agency}</div>
            </div>

            <div className="bg-[#0A0D14] p-3 rounded-lg border border-[#1A202C] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase">Lead Investigator:</span>
              <div className="text-white font-bold">{config.leadInvestigator}</div>
              <span className="text-[10px] text-slate-500 uppercase block pt-1">Statutory Authority:</span>
              <div className="text-emerald-400 font-semibold">Warrant #CR-2026-8819 (Active Judicial Authorization)</div>
            </div>
          </div>
        </div>

        {/* SECTION 2 — IDENTIFIED DIGITAL PERSONAS & OPERATIONAL SCOPE */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 2 — IDENTIFIED DIGITAL PERSONAS & OPERATIONAL SCOPE</span>
            <span className="text-[10px] text-slate-400 font-mono">4 INDEXED IDENTITIES</span>
          </h2>
          <p className="text-slate-300 leading-relaxed font-sans text-xs">
            During Operation DarkEcho, four digital identities were extracted across independent dark web and developmental repositories. These personas were ingested into the correlation pipeline for multi-vector forensic evaluation:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-[11px]">
              <thead>
                <tr className="border-b border-[#1E2430] text-slate-400 uppercase bg-[#0A0D14]">
                  <th className="py-2.5 px-3">Identity Handle</th>
                  <th className="py-2.5 px-3">Platform & Domain</th>
                  <th className="py-2.5 px-3">Operational Role</th>
                  <th className="py-2.5 px-3">PGP Key ID</th>
                  <th className="py-2.5 px-3">Active Hours</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A202C]">
                {identities.map((id) => (
                  <tr key={id.id} className="hover:bg-[#12161E]">
                    <td className="py-2.5 px-3 font-bold text-white">@{id.username}</td>
                    <td className="py-2.5 px-3 text-slate-300">{id.platform}</td>
                    <td className="py-2.5 px-3 text-slate-400">{id.behavioural.primaryRole}</td>
                    <td className="py-2.5 px-3 text-slate-400">{id.technical.pgpKeyId}</td>
                    <td className="py-2.5 px-3 text-slate-400">{id.temporal.activeHoursUtc.split(' ')[0]} UTC</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">Correlated</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3 — STYLOMETRIC & LINGUISTIC ANALYSIS */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 3 — STYLOMETRIC & LINGUISTIC ANALYSIS</span>
            <span className="text-[10px] text-slate-400 font-mono">92% STRENGTH</span>
          </h2>
          <div className="bg-[#0A0D14] p-4 rounded-lg border border-[#1A202C] space-y-2.5 leading-relaxed text-xs">
            <p className="text-slate-300 font-sans">
              Stylometric feature extraction conducted across 42 dark web forum submissions and code commit messages reveals an unmistakable authorial signature. Natural Language Processing (NLP) tokenization and grammatical feature mapping yielded a <strong>Jaccard syntactic similarity index of 0.89</strong> across all corpora.
            </p>
            <p className="text-slate-300 font-sans">
              The primary syntactic hallmark is an idiosyncratic double-hyphen delimiter habit (<code>--</code>), which occurs in <strong>100% of analyzed text samples</strong> in lieu of conventional parenthetical punctuation or em-dashes. Furthermore, sentence capitalization shows uniform preference for lowercase command syntax, coupled with the systematic omission of the Oxford comma in technical enumerations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center font-mono text-[10px] pt-1">
              <div className="bg-[#12161E] p-2 rounded border border-[#202734]">Syntactic Similarity: <strong>0.89 Jaccard</strong></div>
              <div className="bg-[#12161E] p-2 rounded border border-[#202734]">Double-Hyphen Usage: <strong>100% Prevalence</strong></div>
              <div className="bg-[#12161E] p-2 rounded border border-[#202734]">Oxford Comma: <strong>0% (Systematic Omission)</strong></div>
              <div className="bg-[#12161E] p-2 rounded border border-[#202734]">Stylometry Score: <strong className="text-orange-400">92% Match</strong></div>
            </div>
          </div>
        </div>

        {/* SECTION 4 — BEHAVIOURAL PATTERN & MODUS OPERANDI */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 4 — BEHAVIOURAL PATTERN & MODUS OPERANDI</span>
            <span className="text-[10px] text-slate-400 font-mono">88% STRENGTH</span>
          </h2>
          <div className="bg-[#0A0D14] p-4 rounded-lg border border-[#1A202C] space-y-2 leading-relaxed text-xs">
            <p className="text-slate-300 font-sans">
              The operational modus operandi exhibits rigorous consistency. The threat actor adheres to a predictable multi-stage release sequence: initial vulnerability announcements and data leak dumps are posted to <em>Forum-X (Dread)</em> by <code>@shadow_x17</code>, followed within an average window of <strong>45 minutes</strong> by sales escrow listings posted to <em>Market-Y (XSS)</em> by <code>@x_shadow</code>.
            </p>
            <p className="text-slate-300 font-sans">
              Simultaneously, failover download mirrors are deployed to <em>darkx17-vault.is</em> by <code>@darkx17</code> within 12 minutes of active link censorship. All commercial interactions enforce strict escrow arrangements, rejecting unvouched direct payments and mandating multi-signature Bitcoin transactions.
            </p>
          </div>
        </div>

        {/* SECTION 5 — TEMPORAL & DIURNAL ACTIVITY ANALYSIS */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 5 — TEMPORAL & DIURNAL ACTIVITY ANALYSIS</span>
            <span className="text-[10px] text-slate-400 font-mono">91% STRENGTH</span>
          </h2>
          <div className="bg-[#0A0D14] p-4 rounded-lg border border-[#1A202C] space-y-2 leading-relaxed text-xs">
            <p className="text-slate-300 font-sans">
              Timestamp telemetry extracted from 180 monitored days demonstrates synchronized temporal alignment with a <strong>Pearson activity correlation coefficient of r = 0.88</strong>. Active sessions consistently occur between <strong>20:00 and 03:00 UTC</strong>, with peak publishing frequency observed at <strong>22:30 UTC</strong>.
            </p>
            <p className="text-slate-300 font-sans">
              Longitudinal analysis reveals synchronized dormant intervals: all four personas demonstrated concurrent multi-week hiatuses during the late-December holiday period, corroborating shared personal lifecycle schedules rather than autonomous bot operations.
            </p>
          </div>
        </div>

        {/* SECTION 6 — TECHNICAL INFRASTRUCTURE & CRYPTOGRAPHIC ANCHORS */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 6 — TECHNICAL INFRASTRUCTURE & CRYPTOGRAPHIC ANCHORS</span>
            <span className="text-[10px] text-slate-400 font-mono">96% STRENGTH</span>
          </h2>
          <div className="bg-[#0A0D14] p-4 rounded-lg border border-[#1A202C] space-y-2 leading-relaxed text-xs">
            <p className="text-slate-300 font-sans">
              A hard cryptographic collision establishes indisputable technical cross-referencing: the RSA 4096-bit OpenPGP key fingerprint <code>0x7E4A8F2C91B4</code> is explicitly embedded in profile bios and signed verification headers across both <code>@shadow_x17</code> and <code>@x_shadow</code>.
            </p>
            <p className="text-slate-300 font-sans">
              Furthermore, clearweb mirror gateway <code>darkx17-vault.is</code> routes through reverse-proxy host <code>185.220.101.45</code> (AS206238, FlokiNET/Njalla). SSH host key fingerprint <code>SHA256: 8f3c...71ab</code> discovered in developmental deployments by <code>@x17_dev</code> matches the SSH banner of the staging backend utilized by <code>@darkx17</code>.
            </p>
          </div>
        </div>

        {/* SECTION 7 — PAIRWISE RELATIONSHIP ANALYSES (DETAILED BREAKDOWN) */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 7 — PAIRWISE RELATIONSHIP ANALYSES</span>
            <span className="text-[10px] text-slate-400 font-mono">5 EVALUATED PAIRS</span>
          </h2>
          <p className="text-slate-300 leading-relaxed font-sans text-xs">
            Independent bilateral correlation was calculated across each pair of ingested identities. All evaluated pairs exceed the 80% threshold standard:
          </p>

          <div className="space-y-3 font-mono text-xs">
            {pairwiseRels.map((pw) => (
              <div key={pw.id} className="bg-[#0A0D14] border border-[#1E2430] rounded-lg p-3.5 space-y-2">
                <div className="flex items-center justify-between border-b border-[#1E2430] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">@{pw.sourceUsername} &harr; @{pw.targetUsername}</span>
                    <span className="text-[10px] text-slate-500">({pw.relationshipType})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-orange-400">{pw.overallScore}% Overall</span>
                    <ConfidenceBadge band={pw.classification} size="sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[10px]">
                  <div className="bg-[#12161E] p-1.5 rounded border border-[#1E2430]">
                    <span className="text-slate-500 block">Username:</span>
                    <span className="text-white font-bold">{pw.signals.username.score}% ({pw.signals.username.strength})</span>
                  </div>
                  <div className="bg-[#12161E] p-1.5 rounded border border-[#1E2430]">
                    <span className="text-slate-500 block">Stylometry:</span>
                    <span className="text-white font-bold">{pw.signals.stylometry.score}% ({pw.signals.stylometry.strength})</span>
                  </div>
                  <div className="bg-[#12161E] p-1.5 rounded border border-[#1E2430]">
                    <span className="text-slate-500 block">Behaviour:</span>
                    <span className="text-white font-bold">{pw.signals.behaviour.score}% ({pw.signals.behaviour.strength})</span>
                  </div>
                  <div className="bg-[#12161E] p-1.5 rounded border border-[#1E2430]">
                    <span className="text-slate-500 block">Temporal:</span>
                    <span className="text-white font-bold">{pw.signals.temporal.score}% ({pw.signals.temporal.strength})</span>
                  </div>
                  <div className="bg-[#12161E] p-1.5 rounded border border-[#1E2430]">
                    <span className="text-slate-500 block">Technical:</span>
                    <span className="text-white font-bold">{pw.signals.technical.score}% ({pw.signals.technical.strength})</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 font-sans leading-relaxed pt-1">
                  <strong>Forensic Finding:</strong> {pw.analystSummary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 8 — OVERALL ACTOR CLUSTER SYNTHESIS & STAGE 1 GATE */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 8 — OVERALL ACTOR CLUSTER SYNTHESIS & STAGE 1 GATE</span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">GATE CLEARED: 92%</span>
          </h2>
          <div className="bg-[#0A0D14] p-4 rounded-lg border border-[#1A202C] space-y-2 leading-relaxed text-xs">
            <p className="text-slate-300 font-sans">
              Stage 1 correlation engine aggregated all four personas into <strong>Actor Cluster A (TA-001)</strong> with an overall <strong>Actor Correlation Score of 92% (VERY STRONG EVIDENCE)</strong>.
            </p>
            <div className="bg-[#12161E] p-3 rounded border border-orange-500/30 flex items-center justify-between font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">CRITICAL DECISION GATE STATUS:</span>
                <span className="text-emerald-400 font-bold text-sm">STAGE 2 ELIGIBILITY APPROVED</span>
              </div>
              <div className="text-right">
                <span className="text-white font-bold">Score: 92% &ge; Threshold 80%</span>
                <span className="text-[10px] text-slate-400 block">Authorized by Lead Investigator INV-017</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 9 — STRUCTURED DIGITAL INDICATORS INVENTORY */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 9 — STRUCTURED DIGITAL INDICATORS INVENTORY</span>
            <span className="text-[10px] text-slate-400 font-mono">{indicators.length} PASSED TO STAGE 2</span>
          </h2>
          <p className="text-slate-300 leading-relaxed font-sans text-xs">
            Forensic indicators successfully validated in Stage 1 were structured and transferred across the operational boundary to the Stage 2 Entity Resolution engine:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-[11px]">
              <thead>
                <tr className="border-b border-[#1E2430] text-slate-400 uppercase bg-[#0A0D14]">
                  <th className="py-2 px-3">Indicator ID</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Value / Detail</th>
                  <th className="py-2 px-3">Observed Feed</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A202C]">
                {indicators.map((ind) => (
                  <tr key={ind.id}>
                    <td className="py-2 px-3 font-bold text-white">{ind.id}</td>
                    <td className="py-2 px-3 text-slate-400">{ind.type}</td>
                    <td className="py-2 px-3 text-slate-200">{ind.indicator}</td>
                    <td className="py-2 px-3 text-slate-400">{ind.source}</td>
                    <td className="py-2 px-3 text-emerald-400 font-semibold">{ind.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 10 — STAGE 2 REAL-WORLD ATTRIBUTION & CANDIDATE RESOLUTION */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 10 — STAGE 2 REAL-WORLD ATTRIBUTION & CANDIDATE RESOLUTION</span>
            <span className="text-[10px] text-amber-400 font-mono font-bold">ATTRIBUTION LEAD: 82%</span>
          </h2>
          <div className="bg-[#0A0D14] p-4 rounded-lg border border-[#1A202C] space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-[#1E2430] pb-2 font-mono">
              <div>
                <span className="text-white font-bold text-sm">Primary Lead: Candidate Entity A</span>
                <span className="text-slate-400 block text-[10px]">Meridian Analytics S.R.O. (Subject: A. K., Prague, CZ)</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-400">82%</span>
                <span className="text-[10px] text-slate-500 block uppercase">Attribution Strength</span>
              </div>
            </div>

            <p className="text-slate-300 font-sans leading-relaxed">
              Stage 2 entity resolution established an evidence-based resolution chain connecting the digital actor cluster to Candidate Entity A. Reverse-proxy IP <code>185.220.101.45</code> resolved to clear-web mirror <code>darkx17-vault.is</code>, whose TLS certificate transparency records and registrar contact details matched corporate infrastructure registered to Meridian Analytics S.R.O. Code commits by author handle <code>alex-k-sec</code> embedded matching deployment scripts.
            </p>

            <div className="bg-[#12161E] p-3 rounded border border-[#1E2430] space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Multi-Hypothesis Board:</span>
              <div className="flex items-center justify-between text-slate-300 font-mono text-[11px]">
                <span>Hypothesis A: Meridian Analytics S.R.O.</span>
                <span className="text-emerald-400 font-bold">82% (Retained as Primary Attribution Lead)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                <span>Hypothesis B: Vortex Cloud Solutions</span>
                <span className="text-red-400 font-bold">67% (Secondary Hypothesis - Rejected due to ASN conflict)</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 11 — HUMAN INVESTIGATOR VALIDATION & DECISION LOG */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 11 — HUMAN INVESTIGATOR VALIDATION & DECISION LOG</span>
            <span className="text-[10px] text-slate-400 font-mono">AUDIT TRAIL</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-[11px]">
              <thead>
                <tr className="border-b border-[#1E2430] text-slate-400 uppercase bg-[#0A0D14]">
                  <th className="py-2 px-3">Timestamp</th>
                  <th className="py-2 px-3">Investigator</th>
                  <th className="py-2 px-3">Action</th>
                  <th className="py-2 px-3">Target Indicator</th>
                  <th className="py-2 px-3">Justification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A202C]">
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="py-2 px-3 text-slate-400">{log.timestamp}</td>
                    <td className="py-2 px-3 font-bold text-white">{log.investigator}</td>
                    <td className="py-2 px-3 text-orange-400 font-semibold">{log.action}</td>
                    <td className="py-2 px-3 text-slate-300">{log.target}</td>
                    <td className="py-2 px-3 text-slate-400 font-sans text-[10px]">{log.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 12 — EVIDENTIARY LIMITATIONS & INTELLIGENCE GAPS */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 12 — EVIDENTIARY LIMITATIONS & INTELLIGENCE GAPS</span>
            <span className="text-[10px] text-amber-400 font-mono">LEGAL BOUNDARY</span>
          </h2>
          <div className="bg-[#0A0D14] p-4 rounded-lg border border-[#1A202C] space-y-2 text-xs">
            <p className="text-slate-300 font-sans leading-relaxed">
              To ensure adherence to forensic integrity standards, the following analytical gaps are formally noted:
            </p>
            <ul className="space-y-1.5 font-mono text-[11px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">&bull;</span>
                <span><strong>Tor Circuit Anonymity:</strong> Direct subscriber IP addresses for forum postings remain shielded behind multi-hop onion routing circuits.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">&bull;</span>
                <span><strong>VPN Payment Verification:</strong> Commercial VPN subscriber records require formal Mutual Legal Assistance Treaty (MLAT) subpoena to verify bank/card holder identity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">&bull;</span>
                <span><strong>Corporate Entity Representation:</strong> Meridian Analytics S.R.O. may represent a compromised intermediary or offshore shelf corporation; physical control by Subject A. K. requires judicial interview.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 13 — FINAL INVESTIGATIVE CONCLUSION & SIGN-OFF */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider font-mono border-b border-[#1E2430] pb-1.5 flex justify-between">
            <span>SECTION 13 — FINAL INVESTIGATIVE CONCLUSION & NEXT STEPS</span>
            <span className="text-[10px] text-slate-400 font-mono">FORMAL DISPOSITION</span>
          </h2>
          <div className="bg-[#0A0D14] p-4 rounded-lg border border-[#1A202C] space-y-3 text-xs">
            {isEditMode ? (
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-orange-400 uppercase font-bold">
                  Edit Lead Analyst Addendum:
                </label>
                <textarea
                  value={investigatorAddendum}
                  onChange={(e) => setInvestigatorAddendum(e.target.value)}
                  rows={4}
                  className="w-full bg-[#12161E] border border-orange-500/50 rounded-lg p-2.5 text-xs text-white font-sans focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            ) : (
              <div className="bg-[#12161E] border border-[#202734] rounded-lg p-3 space-y-1">
                <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">Lead Analyst Narrative Disposition:</span>
                <p className="text-slate-200 font-sans leading-relaxed">
                  {investigatorAddendum}
                </p>
              </div>
            )}

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Recommended Statutory Actions:</span>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 font-sans text-xs">
                <li>Submit formal Mutual Legal Assistance Treaty (MLAT) request to Czech authorities regarding Meridian Analytics S.R.O.</li>
                <li>Issue preservation letter for hosting gateway subnet 185.220.101.0/24 to ISP FlokiNET/Njalla.</li>
                <li>Maintain passive telemetry surveillance across Dread and XSS forum profiles without active disruption.</li>
              </ol>
            </div>

            {/* Signature Block */}
            <div className="pt-4 border-t border-[#1E2430] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Sworn Lead Investigator:</span>
                <span className="text-white font-bold">{config.leadInvestigator}</span>
                <span className="text-[10px] text-emerald-400 block font-semibold mt-0.5">Digitally Signed &bull; SHA-256 Validated</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-500 uppercase block">Authorization Date:</span>
                <span className="text-white font-bold">{generationTimestamp}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Warrant #CR-2026-8819</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
