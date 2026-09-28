import React, { useState } from 'react';
import { 
  ActorCluster, 
  DigitalIndicatorItem, 
  CandidateEntity, 
  RelationshipEvidenceItem, 
  ConfidenceEvolutionPoint, 
  MatrixEvidenceRow, 
  AuditLogItem,
  InvestigationConfig 
} from '../../types/investigation';
import { 
  initialDigitalIndicators, 
  initialMatchingDimensions, 
  initialCandidateEntities, 
  initialConfidenceEvolution, 
  initialMatrixRows, 
  initialRelationshipEvidenceItems, 
  initialAuditLogs 
} from '../../data/syntheticData';
import { 
  Database,
  Fingerprint, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Globe, 
  Server, 
  Key, 
  FileText, 
  ArrowRight, 
  UserCheck, 
  Building2, 
  Lock, 
  ChevronRight, 
  RotateCcw, 
  TrendingUp, 
  Layers, 
  AlertTriangle, 
  Clock, 
  Search, 
  Sliders, 
  Share2, 
  Check, 
  X, 
  Sparkles,
  Compass,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { evidenceService } from '../../services/attributionEngine';

interface Stage2AttributionViewProps {
  cluster?: ActorCluster;
  config?: InvestigationConfig;
  onNavigate?: (tabId: string) => void;
  onOpenStage2Modal?: (cluster: ActorCluster) => void;
}

export const Stage2AttributionView: React.FC<Stage2AttributionViewProps> = (props) => {
  const caseContext = useCase();
  const navigate = useNavigate();
  const outletCtx = useOutletContext<{ onOpenStage2Modal?: (c: ActorCluster) => void }>();

  const cluster = props.cluster || caseContext.activeCluster;
  const config = props.config || caseContext.config;
  const activeCase = caseContext.activeCase;

  const onOpenStage2Modal = props.onOpenStage2Modal || outletCtx?.onOpenStage2Modal || ((_c: ActorCluster) => {});

  const onNavigate = (tabId: string) => {
    if (props.onNavigate) {
      props.onNavigate(tabId);
      return;
    }
    const tabMap: Record<string, string> = {
      'case-builder': `/cases/${activeCase.id}`,
      'identities': `/cases/${activeCase.id}/identities`,
      'correlation': `/cases/${activeCase.id}/correlation`,
      'graph': `/cases/${activeCase.id}/graph`,
      'clusters': `/cases/${activeCase.id}/clusters`,
      'evidence': `/cases/${activeCase.id}/evidence`,
      'timeline': `/cases/${activeCase.id}/timeline`,
      'stage2': `/cases/${activeCase.id}/attribution`,
      'candidates': `/cases/${activeCase.id}/candidates`,
      'reports': `/cases/${activeCase.id}/report`,
      'sources': '/sources',
      'settings': '/settings',
    };
    navigate(tabMap[tabId] || `/cases/${activeCase.id}`);
  };
  // Candidate Entity State
  const [candidates, setCandidates] = useState<CandidateEntity[]>(initialCandidateEntities);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('CANDIDATE-A');

  // Indicators Inventory Filter
  const [indicators, setIndicators] = useState<DigitalIndicatorItem[]>(initialDigitalIndicators);
  const [indicatorFilter, setIndicatorFilter] = useState<string>('ALL');

  // Relationships & Evidence Chain Explorer State
  const [relationships, setRelationships] = useState<RelationshipEvidenceItem[]>(initialRelationshipEvidenceItems);
  const [selectedRelItem, setSelectedRelItem] = useState<RelationshipEvidenceItem | null>(initialRelationshipEvidenceItems[0]);

  // Confidence Evolution Data
  const [evolutionPoints, setEvolutionPoints] = useState<ConfidenceEvolutionPoint[]>(initialConfidenceEvolution);

  // Decision Log & Inputs
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [relDecisionReason, setRelDecisionReason] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  // Selected candidate object
  const activeCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  // Filter indicators
  const filteredIndicators = indicatorFilter === 'ALL' 
    ? indicators 
    : indicators.filter(i => i.type.toLowerCase() === indicatorFilter.toLowerCase());

  // Handle Per-Relationship Decision
  const handleRelationshipAction = (
    relId: string, 
    decision: 'ACCEPTED' | 'REJECTED' | 'NEED_MORE_EVIDENCE'
  ) => {
    const reasonText = relDecisionReason.trim() || 
      (decision === 'ACCEPTED' ? 'Independently supported by synthetic intelligence records.' : 'Inconclusive link; excluded from primary attribution.');

    const { updatedItems, newAttributionScore } = evidenceService.updateRelationshipDecision(
      relId,
      decision,
      reasonText,
      'INV-017'
    );

    setRelationships(updatedItems);
    
    // Update active candidate attribution strength dynamically
    setCandidates(prev => prev.map(c => {
      if (c.id === 'CANDIDATE-A') {
        const oldScore = c.attributionStrength;
        return {
          ...c,
          attributionStrength: newAttributionScore,
          status: newAttributionScore < 80 ? 'REQUIRES ADDITIONAL EVIDENCE' : 'ATTRIBUTION LEAD'
        };
      }
      return c;
    }));

    // Add Audit Log
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      investigator: 'INV-017',
      action: `Evidence ${decision === 'ACCEPTED' ? 'Accepted' : decision === 'REJECTED' ? 'Rejected' : 'Pending'}`,
      target: selectedRelItem?.targetNode || 'Relationship Link',
      reason: reasonText,
      clusterId: cluster.id,
      details: `Investigator recorded [${decision}] on relationship ${relId}.`
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Show Evidence Change Notification (Prompt Mandated)
    setNotification(
      decision === 'REJECTED' 
        ? `Evidence state changed: Relationship rejected. Candidate Entity A: 82% → ${newAttributionScore}%. Status changed: ATTRIBUTION LEAD → REQUIRES ADDITIONAL EVIDENCE.`
        : `Evidence state changed: Relationship accepted. Candidate Entity A evidence strength validated at ${newAttributionScore}%.`
    );
    setTimeout(() => setNotification(null), 6000);
    setRelDecisionReason('');
  };

  // Final Attribution Lead Decision
  const handleFinalAttributionDecision = (decision: 'ACCEPTED' | 'REJECTED' | 'NEED_MORE_EVIDENCE') => {
    setCandidates(prev => prev.map(c => {
      if (c.id === activeCandidate.id) {
        return {
          ...c,
          humanValidation: decision,
          status: decision === 'ACCEPTED' ? 'VALIDATED LEAD' : decision === 'REJECTED' ? 'REJECTED' : 'REQUIRES ADDITIONAL EVIDENCE'
        };
      }
      return c;
    }));

    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      investigator: 'INV-017',
      action: `Attribution Lead ${decision}`,
      target: activeCandidate.name,
      reason: decision === 'ACCEPTED' ? 'Validated for lawful mutual legal assistance warrant liaison.' : 'Insufficient evidentiary corroboration.',
      clusterId: cluster.id,
      details: `Investigator recorded final validation decision: ${decision}.`
    };
    setAuditLogs(prev => [newLog, ...prev]);

    setNotification(
      decision === 'ACCEPTED'
        ? 'Attribution Lead Accepted for Further Investigation.'
        : decision === 'REJECTED'
          ? 'Attribution Lead Rejected.'
          : 'Investigation remains open — additional evidence required.'
    );
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Investigation Principle Warning (Prompt Mandated) */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                STAGE 2 // REAL-WORLD ATTRIBUTION
              </span>
              <span className="text-xs text-slate-400 font-mono">
                CASE: {config.investigationId}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-cyan-400" />
              <span>Stage 2 — Real-World Entity Attribution</span>
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Resolve a probable digital actor against potential real-world entities using explainable evidence relationships.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onNavigate('correlation')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>RETURN TO STAGE 1</span>
            </button>
            <button
              onClick={() => onNavigate('reports')}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-950/60 flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>GENERATE ATTRIBUTION REPORT</span>
            </button>
          </div>
        </div>

        {/* Prompt-mandated warning banner */}
        <div className="mt-3.5 p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-xs font-mono text-amber-200/90 flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong className="text-white uppercase font-bold">Investigative Principle:</strong> Correlation identifies relationships between digital identities. Attribution requires independent evidence connecting the actor to a real-world entity.
          </span>
        </div>
      </div>

      {/* Dynamic Evidence Change Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-cyan-950/90 border-2 border-cyan-500 text-cyan-200 text-xs font-mono flex items-center justify-between shadow-xl animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="font-semibold">{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-cyan-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. STAGE 1 → STAGE 2 HANDOFF SUMMARY & ACTOR PROFILE (Prompt Mandated) */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-slate-300">
              STAGE 1 &rarr; STAGE 2 HANDOFF SUMMARY
            </span>
            <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
              EVIDENCE VERIFIED
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('clusters')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
            >
              VIEW STAGE 1 EVIDENCE
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Module 1: Digital Actor Profile Card */}
          <div className="lg:col-span-5 bg-[#070b14] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">Target Digital Persona</span>
                <h3 className="text-base font-bold font-mono text-white mt-0.5">
                  ACTOR CLUSTER A
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold font-mono text-emerald-400">92%</span>
                <span className="text-[9px] text-slate-400 block font-mono uppercase">Correlation Strength</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono pt-1">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Correlated Aliases:</span>
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  <span className="bg-[#0b1220] text-emerald-300 px-2 py-0.5 rounded border border-slate-700">@shadow_x17</span>
                  <span className="bg-[#0b1220] text-emerald-300 px-2 py-0.5 rounded border border-slate-700">@x_shadow</span>
                  <span className="bg-[#0b1220] text-emerald-300 px-2 py-0.5 rounded border border-slate-700">@darkx17</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Monitored Platforms:</span>
                <span className="text-slate-300">Forum-X (Dread), Market-Y (XSS), Chat-Z (BreachForums)</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px]">
                <div className="bg-[#0b1220] p-1.5 rounded border border-emerald-950 text-emerald-300">
                  <span className="text-[9px] text-slate-400 block">Supporting</span>
                  <strong className="text-sm">11</strong>
                </div>
                <div className="bg-[#0b1220] p-1.5 rounded border border-red-950 text-red-300">
                  <span className="text-[9px] text-slate-400 block">Conflicting</span>
                  <strong className="text-sm">1</strong>
                </div>
                <div className="bg-[#0b1220] p-1.5 rounded border border-slate-800 text-slate-300">
                  <span className="text-[9px] text-slate-400 block">Unknown</span>
                  <strong className="text-sm">2</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Indicators Passed to Stage 2 Overview */}
          <div className="lg:col-span-7 bg-[#070b14] border border-slate-800 rounded-xl p-4 space-y-3">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
              Digital Indicators Passed to Stage 2 Entity Resolution:
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="bg-[#0b1220] p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Alias Indicators</span>
                <span className="text-white font-bold">3 Monikers</span>
              </div>
              <div className="bg-[#0b1220] p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Technical Indicators</span>
                <span className="text-white font-bold">2 Fingerprints</span>
              </div>
              <div className="bg-[#0b1220] p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Temporal Indicators</span>
                <span className="text-white font-bold">3 Active Windows</span>
              </div>
              <div className="bg-[#0b1220] p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Infrastructure</span>
                <span className="text-white font-bold">2 Proxy Nodes</span>
              </div>
              <div className="bg-[#0b1220] p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Financial Indicators</span>
                <span className="text-white font-bold">1 Wallet Cluster</span>
              </div>
              <div className="bg-[#0b1220] p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Cryptographic Key</span>
                <span className="text-white font-bold">1 PGP RSA-4096</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-mono italic pt-1">
              "Iterative Loop Active: If entity-level evidence proves insufficient, investigator may return to Stage 1 to refine digital cluster without losing Stage 2 findings."
            </div>
          </div>
        </div>
      </div>

      {/* 3. MODULE 2: DIGITAL INDICATOR INVENTORY (Prompt Specified) */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Module 2 — Known Digital Indicators Inventory</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Structured evidence objects cataloged across monitored infrastructure, blockchains, and forum feeds.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 bg-[#070b14] border border-slate-800 rounded-lg p-1 text-xs font-mono overflow-x-auto">
            {['ALL', 'Infrastructure', 'Technical', 'Financial', 'Identity', 'Behavioural'].map((cat) => (
              <button
                key={cat}
                onClick={() => setIndicatorFilter(cat)}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  indicatorFilter.toLowerCase() === cat.toLowerCase()
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Indicators Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase bg-[#070b14]">
                <th className="py-2.5 px-3">Indicator ID</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Indicator Telemetry</th>
                <th className="py-2.5 px-3">Source Intelligence</th>
                <th className="py-2.5 px-3">First Seen</th>
                <th className="py-2.5 px-3">Last Seen</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredIndicators.map((ind) => (
                <tr key={ind.id} className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-bold text-cyan-300">{ind.id}</td>
                  <td className="py-2.5 px-3">
                    <span className="bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 text-[10px]">
                      {ind.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-white max-w-xs truncate" title={ind.description}>
                    {ind.indicator}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px]">{ind.source}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px]">{ind.firstSeen}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px]">{ind.lastSeen}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold ${
                      ind.confidence === 'High' ? 'text-emerald-400' : ind.confidence === 'Moderate' ? 'text-cyan-400' : 'text-amber-400'
                    }`}>
                      {ind.confidence}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ind.status === 'Supporting'
                        ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                        : ind.status === 'Conflicting'
                          ? 'bg-red-950/70 text-red-300 border border-red-800'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {ind.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODULE 3: ENTITY RESOLUTION ENGINE & 6 MATCHING DIMENSIONS (Prompt Specified) */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
              MODULE 3 // RESOLUTION ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              MULTI-DIMENSIONAL CONSISTENCY
            </span>
          </div>
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
            Entity Resolution Engine & Six Consistency Dimensions
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Progressive evidence transformation: Digital Indicators &rarr; Normalization &rarr; Entity Matching &rarr; Relationship Discovery &rarr; Candidate Generation.
          </p>
        </div>

        {/* Transformation Pipeline Visual */}
        <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs font-mono text-slate-300 overflow-x-auto gap-2">
          {['DIGITAL INDICATORS', 'NORMALIZATION', 'ENTITY MATCHING', 'RELATIONSHIP DISCOVERY', 'CANDIDATE GENERATION'].map((step, idx) => (
            <React.Fragment key={step}>
              <div className="px-2.5 py-1 rounded bg-[#0b1220] border border-slate-700 text-center flex-shrink-0 text-[11px] font-semibold">
                {step}
              </div>
              {idx < 4 && <ChevronRight className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        {/* Six Dimensions Grid (Prompt Mandated) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {initialMatchingDimensions.map((dim) => (
            <div key={dim.id} className="bg-[#070b14] border border-slate-800 rounded-lg p-3.5 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">{dim.id}</span>
                  <h4 className="text-xs font-bold font-mono text-white mt-0.5">{dim.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold font-mono text-cyan-300">{dim.matchStrength}%</span>
                  <span className="text-[9px] text-slate-400 block font-mono uppercase">Match Strength</span>
                </div>
              </div>

              {/* Progress Bar (Prompt Mandated Style) */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-500 h-2 rounded-full transition-all"
                  style={{ width: `${dim.matchStrength}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-1.5">
                <span>Supp: <strong className="text-emerald-400">{dim.supportingCount}</strong></span>
                <span>Confl: <strong className="text-red-400">{dim.conflictingCount}</strong></span>
                <span>Unk: <strong className="text-slate-300">{dim.unknownCount}</strong></span>
              </div>

              <p className="text-[11px] font-sans text-slate-400 leading-snug">
                {dim.keyObservation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. MODULE 4: CANDIDATE ENTITY DISCOVERY TABLE (Prompt Specified) */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Module 4 — Candidate Real-World Entities Discovery</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Multiple hypotheses retained without premature rank selection. Evaluated by Attribution Evidence Strength.
            </p>
          </div>
          <span className="text-xs font-mono bg-slate-900 text-cyan-300 px-2 py-1 rounded border border-slate-800">
            {candidates.length} HYPOTHESES GENERATED
          </span>
        </div>

        {/* Candidate Table Exact Format from Prompt */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase bg-[#070b14]">
                <th className="py-2.5 px-3">Candidate Entity</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Evidence Links</th>
                <th className="py-2.5 px-3">Supporting</th>
                <th className="py-2.5 px-3">Conflicting</th>
                <th className="py-2.5 px-3">Unknown</th>
                <th className="py-2.5 px-3">Attribution Strength</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {candidates.map((cand) => {
                const isSelected = cand.id === activeCandidate.id;
                return (
                  <tr 
                    key={cand.id} 
                    className={`transition-colors ${isSelected ? 'bg-cyan-950/40 border-l-2 border-l-cyan-400' : 'hover:bg-slate-900/40'}`}
                  >
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                      <span>{cand.name}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{cand.entityType}</td>
                    <td className="py-3 px-3 font-bold text-white">{cand.evidenceLinksTotal}</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">{cand.supportingCount}</td>
                    <td className="py-3 px-3 text-red-400 font-bold">{cand.conflictingCount}</td>
                    <td className="py-3 px-3 text-slate-400">{cand.unknownCount}</td>
                    <td className="py-3 px-3">
                      <span className="text-base font-bold font-mono text-cyan-300">
                        {cand.attributionStrength}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedCandidateId(cand.id)}
                        className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition-all ${
                          isSelected
                            ? 'bg-cyan-600 text-white shadow-md'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        VIEW EVIDENCE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. CANDIDATE DETAIL WORKSPACE: MULTI-PANEL INVESTIGATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Evidence Chain Explorer, Confidence Evolution, Support/Conflict Matrix */}
        <div className="lg:col-span-7 space-y-6">
          {/* Detailed Drawer Header */}
          <div className="bg-[#0b1220] border-2 border-cyan-500/50 rounded-xl p-5 shadow-xl space-y-3">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                  POTENTIAL REAL-WORLD ENTITY
                </span>
                <h2 className="text-xl font-bold font-mono text-white mt-1">
                  {activeCandidate.name}
                </h2>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Entity Type: <strong className="text-slate-200">{activeCandidate.entityType}</strong> &bull; Jurisdiction: {activeCandidate.jurisdiction}
                </div>
              </div>

              <div className="text-right">
                <span className="text-3xl font-extrabold font-mono text-cyan-300">
                  {activeCandidate.attributionStrength}%
                </span>
                <span className="text-[10px] text-slate-400 block font-mono uppercase">Attribution Evidence Strength</span>
              </div>
            </div>

            {/* Prompt Mandated Warning */}
            <div className="p-2.5 rounded bg-[#070b14] border border-amber-500/40 text-xs font-mono text-amber-300/90 leading-relaxed">
              <strong>Notice:</strong> This candidate represents an investigative lead generated from available evidence. It is not a confirmed identity.
            </div>
          </div>

          {/* INNOVATIVE FEATURE 1: EVIDENCE CHAIN EXPLORER (Prompt Mandated) */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <span>Evidence Chain Explorer</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Clickable provenance trail: Actor &rarr; Indicator &rarr; Relationship &rarr; Entity.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                PROVENANCE TRACE
              </span>
            </div>

            {/* Trace Step Nodes */}
            <div className="space-y-3">
              {relationships.map((rel, idx) => {
                const isSelected = selectedRelItem?.id === rel.id;
                return (
                  <div 
                    key={rel.id}
                    onClick={() => setSelectedRelItem(rel)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#0f1b33] border-cyan-500 shadow-md shadow-cyan-950/50'
                        : 'bg-[#070b14] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500 flex items-center justify-center font-bold text-[10px] text-cyan-300">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-white">{rel.sourceNode}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-bold text-cyan-300">{rel.targetNode}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        rel.status === 'SUPPORTING'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : rel.status === 'CONFLICTING'
                            ? 'bg-red-950 text-red-300 border-red-800'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {rel.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                      {rel.notes}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 flex-wrap gap-2">
                      <span>Source: {rel.sourceReport}</span>
                      <span>Observed: {rel.observedDate}</span>
                      <span>Origin: {rel.provenance.origin}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* INNOVATIVE FEATURE 2: SUPPORT / CONFLICT / UNKNOWN MATRIX (Prompt Mandated) */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Evidence Support / Conflict / Unknown Matrix</span>
            </h3>
            <p className="text-xs text-slate-400">
              Green = Supporting, Red = Conflicting, Grey = Unknown. Prevents treating missing evidence as negative evidence.
            </p>

            <div className="overflow-x-auto pt-1">
              <table className="w-full text-xs font-mono text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase bg-[#070b14]">
                    <th className="py-2 px-3">Evidence Category</th>
                    <th className="py-2 px-3 text-center">Supports (✓)</th>
                    <th className="py-2 px-3 text-center">Conflicts (⚠)</th>
                    <th className="py-2 px-3 text-center">Unknown (?)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {initialMatrixRows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-900/40">
                      <td className="py-2.5 px-3 font-semibold text-white">{row.category}</td>
                      <td className="py-2.5 px-3 text-center">
                        {row.status === 'supporting' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                            ✓ {row.supportingText}
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {row.status === 'conflicting' ? (
                          <span className="inline-flex items-center gap-1 text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                            ⚠ {row.conflictingText}
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {row.status === 'unknown' ? (
                          <span className="inline-flex items-center gap-1 text-slate-300 font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                            ? {row.unknownText}
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* INNOVATIVE FEATURE 3: ATTRIBUTION CONFIDENCE EVOLUTION (Prompt Mandated) */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>ATTRIBUTION CONFIDENCE EVOLUTION</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400 italic">
                Evidence-strength visualization — not a calibrated probability.
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Demonstrates that the system updates its assessment dynamically as investigators add, accept, or reject evidence.
            </p>

            <div className="space-y-2 pt-1 font-mono text-xs">
              {evolutionPoints.map((pt, idx) => (
                <div key={idx} className="bg-[#070b14] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-500 text-[10px] w-12">{pt.step}</span>
                    <span className="text-slate-200 font-medium">{pt.event}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold ${
                      pt.type === 'increase' ? 'text-emerald-400' : pt.type === 'decrease' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {pt.delta}
                    </span>
                    <span className="text-base font-bold text-cyan-300 w-12 text-right">
                      {pt.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Inspector, Hypotheses Board, Validation Controls, Decision Log */}
        <div className="lg:col-span-5 space-y-6">
          {/* INNOVATIVE FEATURE 5: MULTI-HYPOTHESIS ATTRIBUTION BOARD (Prompt Mandated) */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>ATTRIBUTION HYPOTHESIS BOARD</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 italic">
                "Multiple candidate hypotheses are retained until investigators validate or reject the available evidence."
              </p>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {candidates.map((cand, idx) => (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidateId(cand.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    cand.id === activeCandidate.id
                      ? 'bg-cyan-950/60 border-cyan-500 shadow-md'
                      : 'bg-[#070b14] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">HYPOTHESIS {String.fromCharCode(65 + idx)}</span>
                    <span className="text-cyan-300 font-bold text-sm">{cand.attributionStrength}% Evidence Strength</span>
                  </div>
                  <div className="text-slate-300 font-sans text-xs mt-1">{cand.name}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1 border-t border-slate-800/80">
                    <span>Links: {cand.evidenceLinksTotal}</span>
                    <span className="text-emerald-400">Supp: {cand.supportingCount}</span>
                    <span className="text-red-400">Confl: {cand.conflictingCount}</span>
                    <span>Unk: {cand.unknownCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INNOVATIVE FEATURE 6 & 7: WHY DID THIS ENTITY APPEAR? & WHAT COULD CHANGE THIS? */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4 font-mono text-xs">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-300 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHY DID THIS ENTITY APPEAR?</span>
              </h4>
              <div className="space-y-1.5 pt-2">
                {activeCandidate.whyAppeared.map((reason, i) => (
                  <div key={i} className="flex items-start gap-2 bg-[#070b14] p-2 rounded border border-slate-800/80 text-slate-300 text-[11px] leading-relaxed">
                    <span className="text-cyan-400">&bull;</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-teal-300 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>WHAT COULD CHANGE THIS ASSESSMENT?</span>
              </h4>
              <div className="space-y-2 pt-2">
                <div>
                  <span className="text-emerald-400 font-bold text-[10px] block uppercase">Evidence that could strengthen the lead:</span>
                  <div className="space-y-1 mt-1">
                    {activeCandidate.whatCouldStrengthen.map((item, i) => (
                      <div key={i} className="text-[11px] text-emerald-300/80 flex items-start gap-1.5 bg-[#070b14] p-1.5 rounded">
                        <span>+</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-red-400 font-bold text-[10px] block uppercase">Evidence that could weaken the lead:</span>
                  <div className="space-y-1 mt-1">
                    {activeCandidate.whatCouldWeaken.map((item, i) => (
                      <div key={i} className="text-[11px] text-red-300/80 flex items-start gap-1.5 bg-[#070b14] p-1.5 rounded">
                        <span>-</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HUMAN-IN-THE-LOOP RELATIONSHIP VALIDATION PANEL (Prompt Mandated) */}
          <div className="bg-[#0b1220] border border-cyan-500/50 rounded-xl p-5 shadow-lg space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>Human-In-The-Loop Relationship Validation</span>
              </h4>
              <span className="text-[10px] text-slate-400">MANDATORY REASON</span>
            </div>

            {selectedRelItem ? (
              <div className="space-y-2.5">
                <div className="bg-[#070b14] p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase block">Selected Relationship:</span>
                  <div className="font-bold text-white text-xs mt-0.5">
                    {selectedRelItem.sourceNode} &rarr; {selectedRelItem.targetNode}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-sans">
                    {selectedRelItem.notes}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                    Investigator Rationale:
                  </label>
                  <input
                    type="text"
                    value={relDecisionReason}
                    onChange={(e) => setRelDecisionReason(e.target.value)}
                    placeholder="Enter justification for corroboration or rejection..."
                    className="w-full bg-[#070b14] border border-slate-800 focus:border-cyan-500 rounded p-2 text-xs text-white placeholder-slate-500 font-sans focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] font-bold">
                  <button
                    onClick={() => handleRelationshipAction(selectedRelItem.id, 'ACCEPTED')}
                    className="py-2 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 transition-colors uppercase text-center"
                  >
                    ACCEPT LINK
                  </button>
                  <button
                    onClick={() => handleRelationshipAction(selectedRelItem.id, 'REJECTED')}
                    className="py-2 rounded bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 transition-colors uppercase text-center"
                  >
                    REJECT LINK
                  </button>
                  <button
                    onClick={() => handleRelationshipAction(selectedRelItem.id, 'NEED_MORE_EVIDENCE')}
                    className="py-2 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors uppercase text-center"
                  >
                    NEED MORE
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 italic p-3 text-center">
                Select an edge in the Evidence Chain to record validation.
              </div>
            )}
          </div>

          {/* FINAL ATTRIBUTION DECISION & VALIDATION (Prompt Mandated) */}
          <div className="bg-[#0b1220] border-2 border-cyan-500/70 rounded-xl p-5 shadow-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>FINAL INVESTIGATOR ATTRIBUTION DECISION</span>
              </h4>
              <span className="text-[10px] text-cyan-300 font-bold">STAGE 2 GATE</span>
            </div>

            <div className="bg-[#070b14] p-3 rounded-lg border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Candidate Evaluation Target</span>
              <div className="text-base font-bold text-white">{activeCandidate.name}</div>
              <div className="text-xs font-bold text-cyan-300">
                STATUS: {activeCandidate.status}
              </div>
              <div className="text-[10px] text-amber-300 font-semibold mt-1">
                HUMAN VALIDATION: {activeCandidate.humanValidation}
              </div>
            </div>

            {/* Validation Buttons (Prompt Specified) */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => handleFinalAttributionDecision('ACCEPTED')}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>ACCEPT ATTRIBUTION LEAD</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFinalAttributionDecision('REJECTED')}
                  className="py-2 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>REJECT</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFinalAttributionDecision('NEED_MORE_EVIDENCE')}
                  className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>NEED MORE EVIDENCE</span>
                </button>
              </div>
            </div>
          </div>

          {/* ATTRIBUTION DECISION AUDIT LOG (Prompt Mandated) */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>ATTRIBUTION DECISION AUDIT LOG</span>
              </h4>
              <span className="text-[10px] text-slate-400">IMMUTABLE LOG</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-2.5 rounded bg-[#070b14] border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300">{log.action}</span>
                    <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                  </div>
                  <div className="text-slate-200 text-[11px] font-sans">
                    Target: <strong>{log.target || log.details}</strong>
                  </div>
                  {log.reason && (
                    <div className="text-[10px] text-slate-400 italic">
                      Reason: {log.reason}
                    </div>
                  )}
                  <div className="text-[9px] text-slate-500 text-right">By {log.investigator}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FINAL UI MANDATORY MESSAGE (Prompt Required) */}
      <div className="bg-[#070b14] border border-slate-800 rounded-xl p-6 text-center space-y-1.5 font-mono">
        <div className="text-sm font-bold text-white tracking-wide">
          AI discovers relationships. Evidence connects entities. Investigators validate attribution.
        </div>
        <div className="text-xs text-amber-400 font-semibold">
          Attribution results are investigative leads and require human validation.
        </div>
      </div>
    </div>
  );
};
