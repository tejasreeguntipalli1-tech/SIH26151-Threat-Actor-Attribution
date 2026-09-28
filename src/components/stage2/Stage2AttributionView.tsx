import React, { useState } from 'react';
import { 
  ActorCluster, 
  CandidateEntity, 
  EvidenceProvenance, 
  TemporalConflictItem, 
  ContextualConsistencyItem, 
  AlternativeExplanation, 
  EvidenceLineage, 
  AttributionSnapshot, 
  InvestigatorNote, 
  AuditLogItem, 
  CaseLifecycleState,
  AnalyticalStatus,
  InvestigationConfig 
} from '../../types/investigation';
import { 
  initialCandidateEntities, 
  syntheticEvidenceProvenance, 
  syntheticTemporalConflicts, 
  syntheticContextualConsistencies, 
  syntheticAlternativeExplanations, 
  syntheticEvidenceLineages, 
  syntheticAttributionSnapshots, 
  syntheticInvestigatorNotes, 
  syntheticStage2AiResponses,
  initialAuditLogs 
} from '../../data/syntheticData';
import { 
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
  ChevronRight, 
  RotateCcw, 
  Layers, 
  AlertTriangle, 
  Clock, 
  Search, 
  Sparkles, 
  Send, 
  Eye, 
  RefreshCw, 
  Sliders, 
  Check, 
  X, 
  MessageSquare, 
  ShieldCheck, 
  GitBranch, 
  Terminal, 
  Lock, 
  Wallet, 
  Plus, 
  AlertCircle,
  TrendingDown,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';

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

  // State Machine Lifecycle
  const [lifecycleState, setLifecycleState] = useState<CaseLifecycleState>('INVESTIGATOR REVIEW');

  // Candidate Entities State
  const [candidates, setCandidates] = useState<CandidateEntity[]>(initialCandidateEntities);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('CANDIDATE-A');

  // Active Tab in Deep Console
  const [activeTab, setActiveTab] = useState<
    'provenance' | 'temporal' | 'challenges' | 'snapshots' | 'monitoring' | 'notes' | 'comparison'
  >('provenance');

  // Evidence Provenance & Analytical Status State
  const [provenanceList, setProvenanceList] = useState<EvidenceProvenance[]>(syntheticEvidenceProvenance);
  const [analyticalStatuses, setAnalyticalStatuses] = useState<Record<string, AnalyticalStatus>>({
    'EV-2047-18': 'INVESTIGATOR-VERIFIED',
    'EV-2047-19': 'INVESTIGATOR-VERIFIED',
    'EV-2047-20': 'INVESTIGATOR-VERIFIED',
    'EV-2047-21': 'SYSTEM-SUGGESTED',
    'EV-2047-22': 'SYSTEM-SUGGESTED',
    'EV-2047-23': 'SYSTEM-SUGGESTED',
    'EV-2047-24': 'INVESTIGATOR-VERIFIED',
    'EV-2047-25': 'DISPUTED',
  });

  // Temporal & Contextual Consistency
  const [temporalConflicts] = useState<TemporalConflictItem[]>(syntheticTemporalConflicts);
  const [contextualConsistencies] = useState<ContextualConsistencyItem[]>(syntheticContextualConsistencies);

  // Attribution Challenge Engine
  const [challenges] = useState<AlternativeExplanation[]>(syntheticAlternativeExplanations);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('HYP-01');

  // Evidence Lineages & Snapshots
  const [lineages] = useState<EvidenceLineage[]>(syntheticEvidenceLineages);
  const [snapshots, setSnapshots] = useState<AttributionSnapshot[]>(syntheticAttributionSnapshots);

  // Continuous Monitoring ("Watch This Actor")
  const [isWatching, setIsWatching] = useState<boolean>(true);
  const [monitoringTelemetryIndex, setMonitoringTelemetryIndex] = useState<number>(0);
  const [lastTelemetryMessage, setLastTelemetryMessage] = useState<string | null>(null);

  // Investigator Notes
  const [notes, setNotes] = useState<InvestigatorNote[]>(syntheticInvestigatorNotes);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [newNoteTargetType, setNewNoteTargetType] = useState<InvestigatorNote['targetType']>('Candidate');

  // Final Decision Input
  const [decisionReason, setDecisionReason] = useState<string>('');
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);

  // AI Investigator Assistant Drawer
  const [aiSelectedPromptKey, setAiSelectedPromptKey] = useState<string>('why-candidate-a');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);

  // Visual Traversal Pipeline Step Highlight
  const [selectedPipelineStep, setSelectedPipelineStep] = useState<number>(6);

  // Active selected candidate
  const activeCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  // Pipeline Traversal Path Data
  const pipelineSteps = [
    {
      step: 1,
      title: 'DarkWolf Cluster',
      type: 'DIGITAL ACTOR',
      icon: Terminal,
      badge: '91% Correlation',
      detail: 'Correlated across 4 digital personas (@shadow_x17, @x_shadow, @darkx17, @shadow17)'
    },
    {
      step: 2,
      title: 'Alias: @shadow_x17',
      type: 'PERSONA',
      icon: UserCheck,
      badge: 'Access Broker',
      detail: 'Published database leak proof on Dread forum with PGP signature'
    },
    {
      step: 3,
      title: 'PGP: 0x7E4A8F2C91B4',
      type: 'CRYPTOGRAPHIC ANCHOR',
      icon: Key,
      badge: 'RSA-4096',
      detail: 'Key verified on OpenPGP SKS keyserver; cross-signs clear-net developer keyring'
    },
    {
      step: 4,
      title: 'Identity Link: x17_dev',
      type: 'PUBLIC IDENTITY',
      icon: Globe,
      badge: 'Git Author',
      detail: 'Historical public developer repository commits authored under moniker x17_dev'
    },
    {
      step: 5,
      title: 'darkx17-vault.is & IP',
      type: 'INFRASTRUCTURE',
      icon: Server,
      badge: '185.220.101.45',
      detail: 'Clear-web mirror domain and reverse proxy hosting staging gateway with SSL SAN match'
    },
    {
      step: 6,
      title: 'Vector Systems Ltd.',
      type: 'ORGANIZATION',
      icon: Building2,
      badge: 'Registrar Billing',
      detail: 'Commercial server lease billed to corporate account #VEC-ENT-410; Director: Arun Mehta'
    },
    {
      step: 7,
      title: 'Arun Mehta (FICTIONAL DEMO)',
      type: 'CANDIDATE ENTITY',
      icon: Fingerprint,
      badge: '74% Attribution',
      detail: 'Primary evidence-backed investigative candidate. Human validation required.'
    }
  ];

  // Handler for Analytical Status change
  const handleStatusChange = (evidenceId: string, newStatus: AnalyticalStatus) => {
    setAnalyticalStatuses(prev => ({ ...prev, [evidenceId]: newStatus }));
    caseContext.addAuditLog(
      'Evidence Analytical Status Updated',
      evidenceId,
      `Investigator updated analytical status to [${newStatus}].`
    );
  };

  // Handler for adding investigator note
  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newNote: InvestigatorNote = {
      id: `NOTE-${Date.now()}`,
      targetType: newNoteTargetType,
      targetId: newNoteTargetType === 'Candidate' ? activeCandidate.id : 'EV-2047-18',
      author: 'Senior Investigator INV-017',
      text: newNoteText.trim(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
    };
    setNotes(prev => [newNote, ...prev]);
    caseContext.addAuditLog(
      'Investigator Note Added',
      newNote.targetId,
      `Note added by INV-017 on ${newNote.targetType}: "${newNote.text.substring(0, 40)}..."`
    );
    setNewNoteText('');
  };

  // Handler for Continuous Monitoring Telemetry Simulation
  const handleSimulateTelemetry = () => {
    const simulationEvents = [
      {
        message: 'NEW TELEMETRY: German BKA MLAT response verified corporate registration shareholding. Confidence adjusted: 74% → 82% (+8%).',
        delta: 8,
        reason: 'Authorized foreign corporate registry verified candidate single-shareholder ownership.'
      },
      {
        message: 'NEW TELEMETRY: Temporal conflict flagged: Secondary ISP connection observed in Mumbai at 02:15 UTC. Confidence adjusted: 82% → 69% (-13%).',
        delta: -13,
        reason: 'Unresolved geographical discrepancy between Mumbai ISP and Frankfurt Tor node.'
      },
      {
        message: 'NEW TELEMETRY: Subpoenaed VPN provider confirmed Mumbai session was candidate verified mobile endpoint. Confidence adjusted: 69% → 77% (+8%).',
        delta: 8,
        reason: 'Authorized VPN session logs matched candidate device IMEI and public key.'
      }
    ];

    const currentEvent = simulationEvents[monitoringTelemetryIndex % simulationEvents.length];
    setMonitoringTelemetryIndex(prev => prev + 1);
    setLastTelemetryMessage(currentEvent.message);

    // Update candidate attribution score
    setCandidates(prev => prev.map(c => {
      if (c.id === 'CANDIDATE-A') {
        const updatedScore = Math.max(30, Math.min(95, c.attributionStrength + currentEvent.delta));
        return {
          ...c,
          attributionStrength: updatedScore,
          status: updatedScore >= 70 ? 'ATTRIBUTION LEAD' : 'REQUIRES ADDITIONAL EVIDENCE'
        };
      }
      return c;
    }));

    // Add to snapshots
    const newSnapshot: AttributionSnapshot = {
      id: `SNAP-SIM-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      confidence: Math.max(30, Math.min(95, activeCandidate.attributionStrength + currentEvent.delta)),
      triggerEvent: currentEvent.reason,
      evidenceAddedOrChanged: [currentEvent.message],
      stage: 'CONTINUOUS MONITORING'
    };
    setSnapshots(prev => [newSnapshot, ...prev]);

    caseContext.addAuditLog(
      'Continuous Monitoring Telemetry Ingested',
      'CANDIDATE-A',
      currentEvent.message
    );
  };

  // Handler for Human-in-the-Loop Decision
  const handleFinalDecision = (decision: 'ACCEPTED' | 'REJECTED' | 'NEED_MORE_EVIDENCE' | 'INCONCLUSIVE') => {
    const finalReason = decisionReason.trim() || 'Investigator reviewed multi-signal evidence, temporal consistency, and attribution challenges.';
    
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

    // Update case lifecycle state
    const nextState: CaseLifecycleState = 
      decision === 'ACCEPTED' ? 'INVESTIGATIVE LEAD' : 
      decision === 'REJECTED' ? 'CANDIDATE REJECTED' : 
      decision === 'INCONCLUSIVE' ? 'INCONCLUSIVE' : 'MORE EVIDENCE REQUIRED';
    setLifecycleState(nextState);

    caseContext.addAuditLog(
      `Stage 2 Decision: ${decision}`,
      activeCandidate.name,
      `Investigator INV-017 recorded decision [${decision}]. Reason: ${finalReason}`
    );

    setDecisionFeedback(`Decision recorded: [${decision}]. Lifecycle transitioned to [${nextState}]. Recorded in immutable audit log.`);
    setTimeout(() => setDecisionFeedback(null), 7000);
    setDecisionReason('');
  };

  const aiResponse = syntheticStage2AiResponses[aiSelectedPromptKey] || syntheticStage2AiResponses['why-candidate-a'];

  return (
    <div className="space-y-6 text-slate-200 font-sans pb-16">
      
      {/* 1. Header & Synthetic Prototype Boundary Banner */}
      <div className="bg-[#0F1218] border border-[#222938] rounded-xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1E2535]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold bg-orange-950/80 text-orange-400 px-2.5 py-0.5 rounded border border-orange-700/60 uppercase tracking-wider">
                STAGE 2 // REAL-WORLD ATTRIBUTION
              </span>
              <span className="text-xs text-slate-400 font-mono">
                CASE: #SP-2047 ({config.investigationId})
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#182030] text-slate-300 border border-slate-700">
                ACTOR: {cluster.id === 'Actor Cluster A' ? 'DarkWolf Cluster (TA-001)' : cluster.codename}
              </span>
            </div>
            
            <h1 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2.5 font-mono">
              <Fingerprint className="w-5 h-5 text-orange-500" />
              <span>Real-World Entity Resolution & Attribution</span>
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Investigate verifiable links between the correlated digital actor and evidence-backed real-world entity candidates. 
              Attribution generates investigative leads and strictly disallows automated unverified conclusions.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => onNavigate('correlation')}
              className="px-3.5 py-2 rounded-lg bg-[#161B24] hover:bg-[#1E2432] text-slate-200 border border-slate-700 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>RETURN TO STAGE 1</span>
            </button>

            <button
              onClick={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
              className="px-3.5 py-2 rounded-lg bg-orange-950/80 hover:bg-orange-900/90 text-orange-300 border border-orange-600/50 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-950/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>AI INVESTIGATOR (STAGE 2)</span>
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-950/60 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>ATTRIBUTION REPORT</span>
            </button>
          </div>
        </div>

        {/* Section 30 Safety / Privacy Disclaimer Banner (Prompt Mandated) */}
        <div className="mt-3.5 bg-amber-950/20 border border-amber-500/30 rounded-lg p-2.5 flex items-center justify-between text-xs text-amber-300/90">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-semibold text-amber-200 font-mono uppercase text-[11px]">
              SYNTHETIC / DEMONSTRATION DATA:
            </span>
            <span className="text-[11px] text-amber-200/80 hidden md:inline">
              Controlled lab environment. All identities (Arun Mehta, Rohan Verma, Vector Systems Ltd.) are synthetic entities. No private scraping, doxxing, or credential discovery permitted.
            </span>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-900/40 px-2 py-0.5 rounded border border-amber-700/40 uppercase">
            STRICT PRIVACY CONTROLLED
          </span>
        </div>
      </div>

      {/* 2. Section 23: Case State Machine Banner */}
      <div className="bg-[#0B0E14] border border-[#1E2535] rounded-xl p-4 shadow-lg font-mono">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#182030]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold uppercase text-slate-300">INVESTIGATION LIFECYCLE STATE MACHINE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400">Current Phase:</span>
            <span className="text-xs font-bold text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded border border-orange-600/50">
              {lifecycleState}
            </span>
          </div>
        </div>

        {/* 8-step lifecycle progression visual */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1.5 pt-1 text-[10px]">
          {[
            'STAGE 1 ANALYSIS',
            'STAGE 1 REVIEW',
            'STAGE 2 AUTHORIZATION',
            'IDENTITY RESOLUTION',
            'CANDIDATE ANALYSIS',
            'ATTRIBUTION CHALLENGE',
            'INVESTIGATOR REVIEW',
            'INVESTIGATIVE LEAD'
          ].map((stateName, idx) => {
            const isCurrent = lifecycleState === stateName;
            const isCompleted = [
              'STAGE 1 ANALYSIS',
              'STAGE 1 REVIEW',
              'STAGE 2 AUTHORIZATION',
              'IDENTITY RESOLUTION',
              'CANDIDATE ANALYSIS',
              'ATTRIBUTION CHALLENGE'
            ].includes(stateName);

            return (
              <div 
                key={stateName}
                onClick={() => setLifecycleState(stateName as CaseLifecycleState)}
                className={`p-2 rounded border text-center transition-all cursor-pointer ${
                  isCurrent 
                    ? 'bg-orange-600 text-white font-bold border-orange-400 shadow-md shadow-orange-950'
                    : isCompleted
                      ? 'bg-[#121824] text-emerald-400 border-emerald-900/60'
                      : 'bg-[#0E121B] text-slate-500 border-slate-800 hover:text-slate-300'
                }`}
              >
                <div className="text-[9px] opacity-70 mb-0.5">0{idx + 1}</div>
                <div className="truncate">{stateName}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Dual Confidence Strip & Evidence Independence Counter (Points 11, 12, 13, 14) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
        
        {/* Stage 1 Metric */}
        <div className="bg-[#0D1017] border border-[#1E2535] rounded-xl p-4">
          <div className="text-slate-400 text-[11px] font-mono uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>STAGE 1: DIGITAL CORRELATION</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-400">91%</span>
            <span className="text-[10px] font-mono text-emerald-500 uppercase font-semibold">HIGH CONFIDENCE</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            4 personas correlated across Dread, XSS, and clearweb mirror.
          </p>
        </div>

        {/* Stage 2 Metric */}
        <div className="bg-[#0D1017] border border-orange-500/40 rounded-xl p-4 shadow-lg shadow-orange-950/20">
          <div className="text-orange-400 text-[11px] font-mono uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>STAGE 2: ATTRIBUTION CONFIDENCE</span>
            <Fingerprint className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-orange-400">
              {activeCandidate.attributionStrength}%
            </span>
            <span className="text-[10px] font-mono text-orange-300 uppercase font-bold">
              {activeCandidate.attributionStrength >= 70 ? 'PROBABLE CANDIDATE' : 'REQUIRES EVIDENCE'}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1">
            Human verification required; does not claim confirmed real-world identity.
          </p>
        </div>

        {/* Evidence Independence Counter (Point 11) */}
        <div className="bg-[#0D1017] border border-[#1E2535] rounded-xl p-4">
          <div className="text-slate-400 text-[11px] font-mono uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>EVIDENCE INDEPENDENCE</span>
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-cyan-400">6</span>
            <span className="text-xs text-slate-400 font-mono">Independent Sources</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            11 derived/duplicate reports grouped to prevent artificial confidence inflation.
          </p>
        </div>

        {/* Temporal Conflict Status (Point 8) */}
        <div className="bg-[#0D1017] border border-amber-500/40 rounded-xl p-4">
          <div className="text-amber-400 text-[11px] font-mono uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>TEMPORAL CONFLICT STATUS</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-bold font-mono text-amber-300 uppercase">
              1 CONFLICT DETECTED
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Bengaluru session (14:32 UTC) vs Frankfurt terminal (14:33 UTC).
          </p>
        </div>
      </div>

      {/* 4. Section 3: Visual Identity-Link Traversal Pipeline (Point 3, Point 19) */}
      <div className="bg-[#0B0E14] border border-[#1F2737] rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1A2230]">
          <div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-orange-400" />
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
                Visual Identity-Link Pipeline Traversal
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Step-by-step verifiable evidence chain linking DarkWolf Cluster to Candidate Entity A (Arun Mehta). Click any step to inspect edge provenance.
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-[#141A24] px-2.5 py-1 rounded border border-slate-700">
            6 HOPS // 0 UNEXPLAINED BRIDGES
          </span>
        </div>

        {/* Pipeline Step Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {pipelineSteps.map((step) => {
            const isSelected = selectedPipelineStep === step.step;
            const Icon = step.icon;

            return (
              <div
                key={step.step}
                onClick={() => setSelectedPipelineStep(step.step)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-orange-950/60 border-orange-500 text-white shadow-lg shadow-orange-950/40'
                    : 'bg-[#10141D] border-[#1C2330] text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                  <span className="text-orange-400 font-bold">Step 0{step.step}</span>
                  <span className={`text-[9px] px-1 py-0.2 rounded border ${
                    isSelected ? 'bg-orange-900/60 border-orange-600 text-orange-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    {step.type}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-400' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold truncate text-slate-100">{step.title}</span>
                </div>

                <div className="text-[10px] font-mono text-emerald-400 mb-1 font-semibold">{step.badge}</div>
                <p className="text-[10px] text-slate-400 leading-tight line-clamp-2">{step.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Step Edge Inspector Box */}
        {selectedPipelineStep && (
          <div className="mt-3.5 bg-[#121620] border border-[#232C3E] rounded-lg p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
            <div className="space-y-0.5">
              <span className="text-orange-400 font-bold text-[11px]">
                INSPECTING EDGE: STEP 0{selectedPipelineStep} — {pipelineSteps[selectedPipelineStep - 1].title}
              </span>
              <p className="text-slate-300 text-[11px] font-sans">
                {pipelineSteps[selectedPipelineStep - 1].detail}
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 flex-shrink-0">
              <span className="bg-[#182030] px-2 py-1 rounded border border-slate-700">Source: OpenPGP & BGP</span>
              <span className="bg-[#182030] px-2 py-1 rounded border border-slate-700">Reliability: A</span>
              <span className="text-emerald-400 font-bold">Verified Link</span>
            </div>
          </div>
        )}
      </div>

      {/* 5. Section 5: Real-World Entity Candidates Selector (Point 5) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-orange-400" />
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
              Real-World Entity Candidates (Synthetic Lab Dataset)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {candidates.length} CANDIDATES DISCOVERED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {candidates.map(candidate => {
            const isSelected = candidate.id === selectedCandidateId;

            return (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidateId(candidate.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#131722] border-orange-500 shadow-xl shadow-orange-950/30'
                    : 'bg-[#0E1118] border-[#1C2330] hover:border-slate-700'
                }`}
              >
                {/* Header & Score Gauge */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#1A202E]">
                  <div>
                    <span className="text-[10px] font-mono text-orange-400 font-bold block mb-0.5">
                      {candidate.id} // {candidate.entityType}
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {candidate.rawName}
                    </h3>
                    <span className="text-[9px] font-mono text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/60 mt-0.5 inline-block">
                      FICTIONAL DEMO ENTITY
                    </span>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xl font-bold font-mono text-orange-400">
                      {candidate.attributionStrength}%
                    </span>
                    <span className={`block text-[9px] font-mono font-bold uppercase ${
                      candidate.status === 'ATTRIBUTION LEAD' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {candidate.status}
                    </span>
                  </div>
                </div>

                {/* Candidate Summary & Location */}
                <div className="py-2.5 space-y-1.5 text-xs text-slate-300">
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Affiliation:</strong> {candidate.organization}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Contextual Location:</strong> {candidate.possibleLocation}
                  </div>
                </div>

                {/* Evidence Metrics Pill Bar */}
                <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[#1A202E] text-center text-[10px] font-mono">
                  <div className="bg-[#161B26] p-1.5 rounded text-emerald-400">
                    <span className="block text-[8px] text-slate-400">Supporting</span>
                    <strong>{candidate.supportingCount}</strong>
                  </div>
                  <div className="bg-[#161B26] p-1.5 rounded text-amber-400">
                    <span className="block text-[8px] text-slate-400">Conflicting</span>
                    <strong>{candidate.conflictingCount}</strong>
                  </div>
                  <div className="bg-[#161B26] p-1.5 rounded text-slate-300">
                    <span className="block text-[8px] text-slate-400">Gaps</span>
                    <strong>{candidate.evidenceGaps?.length || 3}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Deep-Dive Analytical Tabs Console */}
      <div className="bg-[#0B0E14] border border-[#1E2535] rounded-xl overflow-hidden shadow-2xl">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-1 p-2 bg-[#0E121B] border-b border-[#1C2330] overflow-x-auto font-mono text-xs">
          {[
            { id: 'provenance', label: 'EVIDENCE PROVENANCE & LINEAGE', count: provenanceList.length },
            { id: 'temporal', label: 'TEMPORAL & CONTEXTUAL CONSISTENCY', count: temporalConflicts.length },
            { id: 'challenges', label: 'ATTRIBUTION CHALLENGE ENGINE', count: challenges.length },
            { id: 'snapshots', label: 'VERSIONING & SNAPSHOTS', count: snapshots.length },
            { id: 'monitoring', label: 'CONTINUOUS MONITORING', badge: isWatching ? 'LIVE' : 'PAUSED' },
            { id: 'comparison', label: 'CANDIDATE MATRIX', count: 11 },
            { id: 'notes', label: 'INVESTIGATOR NOTES & GAPS', count: notes.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#141924]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  activeTab === tab.id ? 'bg-orange-800 text-white' : 'bg-[#182030] text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800/60 font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* TAB 1: Evidence Provenance & Lineage Explorer (Points 4, 11, 28) */}
          {activeTab === 'provenance' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase">
                    Stage 2 Evidence Provenance Master Records
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Trace every attribution conclusion back to its discovery source, collection method, and reliability rating.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="bg-[#121620] px-2.5 py-1 rounded border border-slate-700">
                    Source Reliability: A (Highest) to E (Unverified)
                  </span>
                </div>
              </div>

              {/* Provenance Table */}
              <div className="overflow-x-auto border border-[#1E2535] rounded-lg">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0E121B] text-slate-400 uppercase text-[10px] border-b border-[#1E2535]">
                    <tr>
                      <th className="py-2.5 px-3">Evidence ID</th>
                      <th className="py-2.5 px-3">Indicator / Evidence</th>
                      <th className="py-2.5 px-3">Source & Collection Method</th>
                      <th className="py-2.5 px-3 text-center">Reliability</th>
                      <th className="py-2.5 px-3 text-center">Confidence</th>
                      <th className="py-2.5 px-3">Verification</th>
                      <th className="py-2.5 px-3">Analytical Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#182030] text-slate-300">
                    {provenanceList.map(item => {
                      const currentStatus = analyticalStatuses[item.evidenceId] || 'SYSTEM-SUGGESTED';

                      return (
                        <tr key={item.evidenceId} className="hover:bg-[#121622] transition-colors">
                          <td className="py-3 px-3 font-bold text-orange-400">{item.evidenceId}</td>
                          <td className="py-3 px-3">
                            <span className="text-white block font-semibold">{item.originalIndicator}</span>
                            <span className="text-[10px] text-slate-400">{item.relationshipType}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-slate-200 block">{item.source}</span>
                            <span className="text-[10px] text-slate-500">{item.collectionMethod} &bull; {item.discoveryTimestamp}</span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.reliability === 'A' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              item.reliability === 'B' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                              'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}>
                              Grade {item.reliability}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-emerald-400">
                            {item.confidence}%
                          </td>
                          <td className="py-3 px-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded border ${
                              item.verificationStatus === 'Cross-source verified'
                                ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
                                : item.verificationStatus === 'Disputed'
                                  ? 'bg-red-950/60 border-red-800/60 text-red-300'
                                  : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}>
                              {item.verificationStatus}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={currentStatus}
                              onChange={(e) => handleStatusChange(item.evidenceId, e.target.value as AnalyticalStatus)}
                              className="bg-[#0A0D14] border border-[#232B3B] text-[11px] text-slate-200 rounded px-2 py-1 font-mono focus:outline-none focus:border-orange-500 cursor-pointer"
                            >
                              <option value="UNREVIEWED">UNREVIEWED</option>
                              <option value="SYSTEM-SUGGESTED">SYSTEM-SUGGESTED</option>
                              <option value="INVESTIGATOR-VERIFIED">INVESTIGATOR-VERIFIED</option>
                              <option value="DISPUTED">DISPUTED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Evidence Lineage Explorer (Point 11) */}
              <div className="bg-[#0E121B] border border-[#1E2535] rounded-xl p-4 space-y-3 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-[#182030]">
                  <span className="text-xs font-bold text-cyan-400 uppercase">
                    EVIDENCE LINEAGE & DUPLICATION DEDUPLICATION
                  </span>
                  <span className="text-[10px] text-slate-400">
                    PREVENTS CONFIDENCE INFLATION FROM DERIVED FEEDS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {lineages.map(lin => (
                    <div key={lin.lineageId} className="bg-[#121622] p-3 rounded-lg border border-[#1F2738] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200 font-bold">{lin.rootEvidence}</span>
                        <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800">
                          {lin.duplicatedCount} Duplicates Deduplicated
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <strong className="text-slate-300">Independent Root:</strong> {lin.independentSource}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Derived: {lin.derivedReports.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Temporal & Contextual Consistency (Points 8, 9, 26) */}
          {activeTab === 'temporal' && (
            <div className="space-y-5">
              {/* Temporal Conflict Alert Banner (Point 8) */}
              <div className="bg-red-950/30 border border-red-500/50 rounded-xl p-4 text-red-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="font-bold font-mono text-sm text-red-300 uppercase">
                      TEMPORAL CONFLICT DETECTED // CROSS-CONTINENTAL CONCURRENCY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-red-900/60 px-2 py-0.5 rounded border border-red-700 text-red-200 font-bold">
                    IMPACT: -13% CONFIDENCE PENALTY
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#0A0D14]/70 p-3 rounded-lg border border-red-900/40 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Candidate Activity Observed:</span>
                    <span className="text-white font-semibold">Bengaluru, India ISP &bull; 14:32 UTC</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Actor Terminal Command Executed:</span>
                    <span className="text-white font-semibold">Frankfurt, Germany Host &bull; 14:33 UTC</span>
                  </div>
                </div>
                <p className="text-xs text-red-300/90 leading-relaxed font-sans">
                  60 seconds between physical locations is physically impossible without automated scheduled script runner (systemd/cron) or a multi-operator criminal collective. Attribution confidence was penalized accordingly from 87% to 74%.
                </p>
              </div>

              {/* Contextual Consistency Grid (Point 9) */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white font-mono uppercase">
                  Contextual Location & Behavioral Consistency Matrix
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {contextualConsistencies.map(cc => (
                    <div key={cc.id} className="bg-[#10141D] border border-[#1E2535] rounded-lg p-3.5 space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#182030]">
                        <span className="text-white font-bold">{cc.factor}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          cc.status === 'CONSISTENT' 
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                            : 'bg-red-950 text-red-400 border-red-800'
                        }`}>
                          {cc.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        <span className="text-slate-500 block text-[10px]">DarkWolf Observation:</span>
                        {cc.actorObservation}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        <span className="text-slate-500 block text-[10px]">Candidate Observation:</span>
                        {cc.candidateObservation}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-[#182030]">
                        {cc.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Attribution Challenge Engine (Point 10) */}
          {activeTab === 'challenges' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase">
                    Attribution Challenge Engine // 10 Alternative Hypotheses
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    "The system doesn't only try to prove attribution. It actively tries to disprove its own hypothesis."
                  </p>
                </div>
                <span className="text-xs font-mono text-orange-400 bg-orange-950/80 px-2.5 py-1 rounded border border-orange-700/60">
                  10 ADVERSARIAL HYPOTHESES TESTED
                </span>
              </div>

              {/* Hypotheses List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {challenges.map(hyp => {
                  const isSelected = hyp.id === selectedChallengeId;

                  return (
                    <div
                      key={hyp.id}
                      onClick={() => setSelectedChallengeId(hyp.id)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#141824] border-orange-500 shadow-lg shadow-orange-950/30'
                          : 'bg-[#0E1118] border-[#1C2330] hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#1A202E]">
                        <span className="font-bold text-xs text-white font-mono">{hyp.hypothesis}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                          hyp.probability === 'High' ? 'bg-red-950 text-red-300 border-red-800' :
                          hyp.probability === 'Moderate' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                          'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {hyp.probability} Probability
                        </span>
                      </div>

                      <div className="py-2 space-y-1.5 text-xs font-mono">
                        <div>
                          <span className="text-slate-500 text-[10px] block">Evidence For Hypothesis:</span>
                          <span className="text-slate-300 text-[11px]">&bull; {hyp.evidenceFor[0]}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">Evidence Against:</span>
                          <span className="text-emerald-400 text-[11px]">&bull; {hyp.evidenceAgainst[0]}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#1A202E] text-[11px] text-slate-300 font-sans leading-relaxed">
                        <strong className="text-orange-400 font-mono text-[10px] block">SYSTEM REBUTTAL:</strong>
                        {hyp.alternativeRebuttal}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Evidence Versioning & Snapshots (Points 24, 25) */}
          {activeTab === 'snapshots' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase">
                    Attribution Evolution Snapshots & Version History
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Compare how attribution confidence changed as new evidence was added, verified, or challenged.
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
                  {snapshots.length} AUDIT SNAPSHOTS CAPTURED
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {snapshots.map((snap, idx) => (
                  <div key={snap.id} className="bg-[#10141D] border border-[#1E2535] rounded-lg p-3.5 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#182030]">
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 font-bold">Snapshot 0{idx + 1}</span>
                        <span className="text-slate-400">&bull; {snap.timestamp}</span>
                        <span className="bg-[#182030] text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                          {snap.stage}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">Calculated Confidence:</span>
                        <span className="text-base font-bold text-orange-400">{snap.confidence}%</span>
                      </div>
                    </div>

                    <div className="text-slate-200">
                      <strong className="text-slate-400 block text-[10px]">Trigger Event:</strong>
                      {snap.triggerEvent}
                    </div>

                    <div className="text-slate-400 text-[11px] space-y-0.5">
                      <strong className="text-slate-500 block text-[10px]">Evidence Delta:</strong>
                      {snap.evidenceAddedOrChanged.map((ev, i) => (
                        <div key={i} className="text-slate-300">&bull; {ev}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Continuous Monitoring ("Watch This Actor") (Point 21) */}
          {activeTab === 'monitoring' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="bg-[#111520] border border-[#222C3E] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-orange-400" />
                    <h3 className="text-sm font-bold text-white uppercase">
                      POST-ATTRIBUTION TELEMETRY MONITORING
                    </h3>
                  </div>
                  <p className="text-slate-400 text-xs font-sans mt-0.5">
                    Continuously ingest new external indicators. Re-evaluates candidate confidence dynamically (increases or decreases based on corroboration or contradiction).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsWatching(!isWatching)}
                    className={`px-3.5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      isWatching 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isWatching ? 'MONITORING ACTIVE' : 'MONITORING PAUSED'}
                  </button>

                  <button
                    onClick={handleSimulateTelemetry}
                    className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-950/60"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>SIMULATE NEW TELEMETRY INGEST</span>
                  </button>
                </div>
              </div>

              {lastTelemetryMessage && (
                <div className="bg-orange-950/40 border border-orange-500/50 rounded-lg p-3 text-orange-200 animate-in fade-in">
                  <span className="font-bold block text-orange-300 mb-0.5">DYNAMIC RE-EVALUATION TRIGGERED:</span>
                  <p className="text-slate-200 font-sans text-xs">{lastTelemetryMessage}</p>
                </div>
              )}

              {/* Monitoring Workflow Flowchart */}
              <div className="bg-[#0B0E14] border border-[#1E2535] rounded-xl p-4 text-center">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-3 font-bold">
                  AUTONOMOUS ATTRIBUTION RE-EVALUATION PIPELINE
                </span>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-2 text-[10px]">
                  {['NEW EVIDENCE', 'CORRELATE', 'UPDATE DNA', 'RE-EVALUATE', 'CHALLENGE', 'CONFIDENCE DELTA', 'ALERT INVESTIGATOR'].map((s, i) => (
                    <div key={s} className="bg-[#121622] p-2 rounded border border-[#1E2535] text-slate-300">
                      <div className="text-[9px] text-orange-400 mb-0.5">STEP {i+1}</div>
                      <div className="font-bold">{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Side-by-Side Candidate Comparison Matrix (Point 6) */}
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase">
                    Side-by-Side Candidate Comparison Matrix (11 Evaluation Dimensions)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Inspect why each candidate received its respective attribution confidence score.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto border border-[#1E2535] rounded-lg font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#0E121B] text-slate-400 uppercase text-[10px] border-b border-[#1E2535]">
                    <tr>
                      <th className="py-2.5 px-3">EVALUATION DIMENSION</th>
                      <th className="py-2.5 px-3 text-orange-400">Candidate A (Arun Mehta - 74%)</th>
                      <th className="py-2.5 px-3 text-slate-300">Candidate B (Rohan Verma - 58%)</th>
                      <th className="py-2.5 px-3 text-slate-300">Candidate C (Vector Systems - 62%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#182030] text-slate-300 text-[11px]">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">Alias Link</td>
                      <td className="py-2.5 px-3 text-emerald-400">Direct: x17_dev ↔ shadow_x17</td>
                      <td className="py-2.5 px-3 text-slate-400">None observed</td>
                      <td className="py-2.5 px-3 text-slate-300">Corporate staging handle</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">PGP Link</td>
                      <td className="py-2.5 px-3 text-emerald-400">Deterministic: 0x7E4A8F2C91B4</td>
                      <td className="py-2.5 px-3 text-red-400">None (unrelated key)</td>
                      <td className="py-2.5 px-3 text-slate-300">Corporate build release key</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">Domain Link</td>
                      <td className="py-2.5 px-3 text-emerald-400">Registrar account darkx17-vault.is</td>
                      <td className="py-2.5 px-3 text-slate-400">ISP customer portal only</td>
                      <td className="py-2.5 px-3 text-emerald-400">Registered DNS nameservers</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">Wallet Link</td>
                      <td className="py-2.5 px-3 text-emerald-400">Deposit address co-spend block 842109</td>
                      <td className="py-2.5 px-3 text-slate-400">None (SEPA bank transfer)</td>
                      <td className="py-2.5 px-3 text-slate-300">Corporate crypto revenue filing</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">Infrastructure Link</td>
                      <td className="py-2.5 px-3 text-emerald-400">185.220.101.45 SSL SAN match</td>
                      <td className="py-2.5 px-3 text-amber-400">Upstream BGP transit AS49210</td>
                      <td className="py-2.5 px-3 text-emerald-400">Billed to account #VEC-ENT-410</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">Temporal Match</td>
                      <td className="py-2.5 px-3 text-emerald-400">Nocturnal peak 20:00 - 04:00 UTC</td>
                      <td className="py-2.5 px-3 text-red-400">Daytime EU business hours</td>
                      <td className="py-2.5 px-3 text-slate-300">24/7 automated CI/CD pipeline</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">Behavioral Match</td>
                      <td className="py-2.5 px-3 text-emerald-400">91% stylometry, kernel exploits</td>
                      <td className="py-2.5 px-3 text-slate-400">Generic ISP admin writing</td>
                      <td className="py-2.5 px-3 text-slate-300">Enterprise documentation</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">Public Identity Link</td>
                      <td className="py-2.5 px-3 text-emerald-400">Public portfolio blog & GitHub</td>
                      <td className="py-2.5 px-3 text-slate-400">ISP employee registry</td>
                      <td className="py-2.5 px-3 text-emerald-400">UK Companies House #REG-99104</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">Contradictions Flagged</td>
                      <td className="py-2.5 px-3 text-amber-400">3 (14:32 UTC session conflict)</td>
                      <td className="py-2.5 px-3 text-red-400">4 (diurnal schedule mismatch)</td>
                      <td className="py-2.5 px-3 text-slate-300">2 (multi-employee company)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">Missing Evidence</td>
                      <td className="py-2.5 px-3 text-slate-300">4 critical legal MLAT gaps</td>
                      <td className="py-2.5 px-3 text-slate-300">3 upstream transit logs purged</td>
                      <td className="py-2.5 px-3 text-slate-300">3 internal employee audit logs</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-slate-400">Source Reliability</td>
                      <td className="py-2.5 px-3 text-emerald-400">Grade A (Cryptographic & BGP)</td>
                      <td className="py-2.5 px-3 text-cyan-400">Grade B (ISP Support Ticket)</td>
                      <td className="py-2.5 px-3 text-emerald-400">Grade A (Official Registries)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: Investigator Notes & Evidence Gaps (Points 16, 27) */}
          {activeTab === 'notes' && (
            <div className="space-y-5 font-mono text-xs">
              
              {/* Evidence Gap Recommendations (Point 16) */}
              <div className="bg-[#121622] border border-[#232B3B] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#182030]">
                  <span className="font-bold text-orange-400 uppercase text-xs">
                    NEXT BEST EVIDENCE TO VERIFY (AUTHORIZED CHANNELS ONLY)
                  </span>
                  <span className="text-[10px] text-slate-400">STRICT PRIVACY / LAWFUL WARRANTS ONLY</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-start gap-2 bg-[#0A0D14] p-2.5 rounded border border-slate-800">
                    <span className="text-orange-400 font-bold">1.</span>
                    <div>
                      <strong className="text-white">Mutual Legal Assistance Treaty (MLAT) Subpoena for VPN Sessions:</strong>
                      <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                        Issue lawful judicial request to unmask the subscriber session logs for Bengaluru residential IP timestamp 14:32 UTC to resolve the cross-continental concurrency conflict.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-[#0A0D14] p-2.5 rounded border border-slate-800">
                    <span className="text-orange-400 font-bold">2.</span>
                    <div>
                      <strong className="text-white">Historical Domain Registrar Billing Settlement:</strong>
                      <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                        Request payment processor invoice receipts for darkx17-vault.is to establish whether the domain was settled with the corporate credit card or personal cryptocurrency.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-[#0A0D14] p-2.5 rounded border border-slate-800">
                    <span className="text-orange-400 font-bold">3.</span>
                    <div>
                      <strong className="text-white">Cross-Source Infrastructure Hypervisor Telemetry:</strong>
                      <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                        Obtain virtual container memory dump from German datacenter provider to verify whether target server operated standalone or under shared multi-tenant proxy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investigator Notes Repository (Point 27) */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase">
                  Investigator Notes & Chain of Custody
                </h3>

                {/* Add Note Form */}
                <div className="bg-[#0E1118] border border-[#1E2535] rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px]">Target:</span>
                    <select
                      value={newNoteTargetType}
                      onChange={(e) => setNewNoteTargetType(e.target.value as any)}
                      className="bg-[#0A0C10] border border-[#232B3B] text-slate-200 rounded px-2 py-1 text-xs"
                    >
                      <option value="Candidate">Candidate Entity</option>
                      <option value="Evidence">Evidence Item</option>
                      <option value="Relationship">Relationship Link</option>
                      <option value="Timeline">Timeline Event</option>
                      <option value="Cluster">Actor Cluster</option>
                    </select>
                    <span className="text-slate-500 text-[10px]">Author: Senior Investigator INV-017</span>
                  </div>

                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Attach investigative observation to final dossier..."
                    className="w-full bg-[#0A0C10] border border-[#232B3B] rounded-lg p-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleAddNote}
                      className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ATTACH NOTE</span>
                    </button>
                  </div>
                </div>

                {/* Notes Feed */}
                <div className="space-y-2">
                  {notes.map(note => (
                    <div key={note.id} className="bg-[#10141D] border border-[#1E2535] rounded-lg p-3 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="text-orange-400 font-bold">{note.author}</span>
                          <span className="bg-[#182030] text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
                            {note.targetType}: {note.targetId}
                          </span>
                        </div>
                        <span>{note.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-200 font-sans leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 7. Section 15: Human-in-the-Loop Final Decision Panel (Point 15) */}
      <div className="bg-[#10141E] border border-orange-500/50 rounded-xl p-5 shadow-2xl space-y-4 font-mono text-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-[#1E273A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-950/80 border border-orange-500/40 text-orange-400">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wide">
                HUMAN-IN-THE-LOOP INVESTIGATOR DECISION REQUIRED
              </h2>
              <p className="text-[11px] text-slate-400 font-sans">
                SPECTRA disallows automated judicial conclusions. Record your analytical ruling on candidate: <strong className="text-orange-400">{activeCandidate.name}</strong>.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-400 bg-[#161B26] px-2.5 py-1 rounded border border-slate-700">
            CASE #SP-2047 // INVESTIGATOR: INV-017
          </span>
        </div>

        {decisionFeedback && (
          <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-lg p-3 text-emerald-300 font-sans text-xs">
            {decisionFeedback}
          </div>
        )}

        {/* Reason Text Area */}
        <div className="space-y-1.5">
          <label className="block text-slate-300 font-semibold text-[11px]">
            Decision Justification & Statutory Rationale <span className="text-orange-400">*</span>
          </label>
          <textarea
            rows={2}
            value={decisionReason}
            onChange={(e) => setDecisionReason(e.target.value)}
            placeholder="Record legal or evidentiary justification for accepting, rejecting, or requesting further investigation..."
            className="w-full bg-[#0A0C10] border border-[#232B3B] focus:border-orange-500 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none"
          />
        </div>

        {/* 4 Decision Action Buttons (Prompt Mandated) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          <button
            onClick={() => handleFinalDecision('ACCEPTED')}
            className="p-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>ACCEPT AS INVESTIGATIVE LEAD</span>
          </button>

          <button
            onClick={() => handleFinalDecision('NEED_MORE_EVIDENCE')}
            className="p-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-950/60 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Clock className="w-4 h-4" />
            <span>REQUEST MORE EVIDENCE</span>
          </button>

          <button
            onClick={() => handleFinalDecision('INCONCLUSIVE')}
            className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>MARK INCONCLUSIVE</span>
          </button>

          <button
            onClick={() => handleFinalDecision('REJECTED')}
            className="p-3 rounded-lg bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-950/60 flex items-center justify-center gap-2 cursor-pointer"
          >
            <XCircle className="w-4 h-4" />
            <span>REJECT CANDIDATE</span>
          </button>
        </div>
      </div>

      {/* 8. Section 29: Final Stage 2 Executive Summary Screen (Point 29) */}
      <div className="bg-[#090C12] border-2 border-orange-500/60 rounded-xl p-6 shadow-2xl relative space-y-6 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#1E2538]">
          <div>
            <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block">
              FINAL STAGE 2 EXECUTIVE SUMMARY // CASE #SP-2047
            </span>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight mt-0.5">
              SPECTRA Threat Actor Attribution Briefing
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">DIGITAL ACTOR</span>
            <span className="text-sm font-bold text-white text-orange-400">DarkWolf Cluster (TA-001)</span>
          </div>
        </div>

        {/* High-level metrics matrix matching Section 29 requirements */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center">
          <div className="bg-[#121622] p-2.5 rounded border border-[#1E2538]">
            <span className="text-[10px] text-slate-400 block">STAGE 1</span>
            <span className="text-lg font-bold text-emerald-400">91%</span>
            <span className="text-[9px] text-emerald-500 block">Correlation</span>
          </div>
          <div className="bg-[#121622] p-2.5 rounded border border-orange-500/40">
            <span className="text-[10px] text-orange-400 block">STAGE 2</span>
            <span className="text-lg font-bold text-orange-400">74%</span>
            <span className="text-[9px] text-orange-300 block">Attribution</span>
          </div>
          <div className="bg-[#121622] p-2.5 rounded border border-[#1E2538]">
            <span className="text-[10px] text-slate-400 block">CANDIDATES</span>
            <span className="text-lg font-bold text-white">3</span>
            <span className="text-[9px] text-slate-400 block">Evaluated</span>
          </div>
          <div className="bg-[#121622] p-2.5 rounded border border-[#1E2538]">
            <span className="text-[10px] text-slate-400 block">SUPPORTING</span>
            <span className="text-lg font-bold text-emerald-400">14</span>
            <span className="text-[9px] text-emerald-500 block">Signals</span>
          </div>
          <div className="bg-[#121622] p-2.5 rounded border border-[#1E2538]">
            <span className="text-[10px] text-slate-400 block">CONTRADICTORY</span>
            <span className="text-lg font-bold text-red-400">3</span>
            <span className="text-[9px] text-red-400 block">Contradictions</span>
          </div>
          <div className="bg-[#121622] p-2.5 rounded border border-[#1E2538]">
            <span className="text-[10px] text-slate-400 block">INDEPENDENT</span>
            <span className="text-lg font-bold text-cyan-400">6</span>
            <span className="text-[9px] text-cyan-300 block">Root Feeds</span>
          </div>
          <div className="bg-[#121622] p-2.5 rounded border border-[#1E2538]">
            <span className="text-[10px] text-slate-400 block">EVIDENCE GAPS</span>
            <span className="text-lg font-bold text-amber-400">3</span>
            <span className="text-[9px] text-amber-300 block">Pending MLAT</span>
          </div>
        </div>

        {/* 7-Step Pipeline Diagram (Prompt Mandated) */}
        <div className="bg-[#10141E] p-4 rounded-xl border border-[#1E2538] text-center space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest block">
            END-TO-END EVIDENTIARY CONVERGENCE PIPELINE
          </span>
          <div className="flex flex-col md:flex-row items-center justify-between gap-1.5 text-xs">
            {[
              'DIGITAL ACTOR',
              'DIGITAL EVIDENCE',
              'IDENTITY LINKS',
              'CROSS-SOURCE VALIDATION',
              'CANDIDATE ENTITY',
              'ATTRIBUTION CHALLENGE',
              'INVESTIGATOR REVIEW'
            ].map((node, i) => (
              <React.Fragment key={node}>
                <div className="bg-[#161B26] px-3 py-2 rounded-lg border border-[#232B3B] text-slate-200 font-bold text-[11px] w-full md:w-auto">
                  {node}
                </div>
                {i < 6 && (
                  <span className="text-orange-500 font-bold hidden md:inline">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Final Bottom Banner (Prompt Mandated Exact String) */}
        <div className="bg-gradient-to-r from-orange-950 via-orange-900 to-orange-950 border border-orange-500/60 rounded-xl p-4 text-center">
          <p className="text-sm md:text-base font-bold text-white tracking-widest uppercase text-orange-200">
            "FROM ANONYMOUS DIGITAL PERSONA TO AN EVIDENCE-BACKED INVESTIGATIVE LEAD"
          </p>
        </div>
      </div>

      {/* 9. Section 18: AI Investigator Stage 2 Q&A Assistant Drawer (Point 18) */}
      {isAiDrawerOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[540px] bg-[#0E121B] border-l border-[#262F42] shadow-2xl z-50 flex flex-col font-mono text-xs">
          
          {/* Drawer Header */}
          <div className="p-4 bg-[#121622] border-b border-[#202738] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-orange-950 border border-orange-600/50 text-orange-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase">AI Investigator // Stage 2 Assistant</h3>
                <p className="text-[10px] text-slate-400">Deterministic Q&A on Stage 2 seeded evidence & candidates</p>
              </div>
            </div>
            <button 
              onClick={() => setIsAiDrawerOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 10 Clickable Prompt Chips */}
          <div className="p-3.5 bg-[#0A0D14] border-b border-[#1C2332] space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              SELECT INVESTIGATIVE QUERY (10 PRE-INDEXED ANALYSIS PROMPTS):
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
              {[
                { key: 'why-candidate-a', label: 'Why is Candidate A linked to DarkWolf?' },
                { key: 'contradictory-evidence', label: 'What evidence contradicts Candidate A?' },
                { key: 'independent-evidence', label: 'Which evidence is independently verified?' },
                { key: 'missing-evidence', label: 'What evidence is still missing?' },
                { key: 'evidence-chain', label: 'Show complete digital-to-real evidence chain.' },
                { key: 'duplicate-sources', label: 'Are any sources duplicating same evidence?' },
                { key: 'confidence-decrease', label: 'Why did Candidate A confidence decrease?' },
                { key: 'compare-candidates', label: 'Compare Candidate A and Candidate B.' },
                { key: 'alternative-explanations', label: 'What alternative explanations exist?' },
                { key: 'strongest-pgp', label: 'Which candidate has strongest PGP link?' }
              ].map(chip => (
                <button
                  key={chip.key}
                  onClick={() => setAiSelectedPromptKey(chip.key)}
                  className={`px-2.5 py-1.5 rounded text-[10px] text-left transition-colors cursor-pointer border ${
                    aiSelectedPromptKey === chip.key
                      ? 'bg-orange-600 text-white font-bold border-orange-400'
                      : 'bg-[#141824] text-slate-300 border-slate-700/60 hover:border-slate-500'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Structured Response Viewer */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
            <div className="bg-[#121622] border border-[#222C3E] rounded-xl p-4 space-y-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-orange-400 uppercase block">
                  ANALYTICAL CONCLUSION
                </span>
                <p className="text-slate-100 text-xs font-semibold mt-1 leading-relaxed">
                  {aiResponse.conclusion}
                </p>
              </div>

              {/* Evidence For & Against */}
              <div className="space-y-2 pt-2 border-t border-[#1C2434]">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">
                    EVIDENCE FOR ATTRIBUTION ({aiResponse.evidenceFor.length}):
                  </span>
                  <ul className="space-y-1 text-slate-300 text-[11px] list-disc pl-4">
                    {aiResponse.evidenceFor.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-red-400 font-bold block mb-1">
                    EVIDENCE AGAINST / CONTRADICTIONS:
                  </span>
                  <ul className="space-y-1 text-slate-300 text-[11px] list-disc pl-4">
                    {aiResponse.evidenceAgainst.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">
                    MISSING EVIDENCE GAPS:
                  </span>
                  <ul className="space-y-1 text-slate-300 text-[11px] list-disc pl-4">
                    {aiResponse.missingEvidence.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Source Reliability & Confidence */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1C2434] font-mono text-[10px]">
                <div className="bg-[#0A0D14] p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block">SOURCE RELIABILITY:</span>
                  <span className="text-slate-200 font-bold">{aiResponse.sourceReliability}</span>
                </div>
                <div className="bg-[#0A0D14] p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block">EVALUATED CONFIDENCE:</span>
                  <span className="text-orange-400 font-bold">{aiResponse.confidence}</span>
                </div>
              </div>

              {/* Alternative Explanation */}
              <div className="pt-2 border-t border-[#1C2434] text-[11px]">
                <span className="text-[10px] font-mono text-slate-400 font-bold block">
                  ADVERSARIAL REBUTTAL / ALTERNATIVE HYPOTHESIS:
                </span>
                <p className="text-slate-300 italic mt-0.5">{aiResponse.alternativeExplanation}</p>
              </div>

              {/* Evidence Chain Visual */}
              <div className="pt-2 border-t border-[#1C2434] font-mono text-[10px] text-slate-400 space-y-1">
                <span className="font-bold text-slate-300 block">EVIDENCE CHAIN TRAVERSAL:</span>
                {aiResponse.evidenceChain.map((link, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-orange-500">&bull;</span>
                    <span>{link}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
