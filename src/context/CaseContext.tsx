import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  ActorCluster, 
  DigitalIdentity, 
  InvestigationConfig, 
  TimelineEvent, 
  AuditLogItem, 
  RealWorldAttributionLead, 
  DigitalIndicatorItem, 
  CandidateEntity, 
  PairwiseRelationship 
} from '../types/investigation';
import { 
  syntheticIdentities, 
  initialActorClusters, 
  initialStage2Leads, 
  syntheticTimelineEvents, 
  initialAuditLogs, 
  initialConfig, 
  initialDigitalIndicators, 
  initialCandidateEntities, 
  initialPairwiseRelationships 
} from '../data/syntheticData';

export interface InvestigationCase {
  id: string; // e.g. "CASE-2026-001"
  name: string;
  codename: string;
  targetActor: string;
  status: 'ACTIVE INVESTIGATION' | 'PENDING REVIEW' | 'CLOSED' | 'ARCHIVED';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  currentStage: string;
  stage1Status: 'COMPLETED' | 'IN_PROGRESS';
  stage2Status: 'NOT_INITIATED' | 'IN_PROGRESS' | 'PENDING_VALIDATION' | 'VALIDATED';
  createdDate: string;
  lastUpdated: string;
  leadInvestigator: string;
  agency: string;
  warrantNumber: string;
  summary: string;
  identitiesCount: number;
  clustersCount: number;
  evidenceCount: number;
  correlationScore: number;
  attributionConfidence: number;
  primaryAttributionLead?: string;
}

interface CaseContextType {
  cases: InvestigationCase[];
  activeCaseId: string;
  activeCase: InvestigationCase;
  selectCase: (caseId: string) => void;
  createCase: (caseData: Partial<InvestigationCase>) => InvestigationCase;
  identities: DigitalIdentity[];
  addIdentity: (newId: Partial<DigitalIdentity>) => void;
  removeIdentity: (id: string) => void;
  clusters: ActorCluster[];
  selectedClusterId: string;
  setSelectedClusterId: (id: string) => void;
  activeCluster: ActorCluster;
  pairwiseRelationships: PairwiseRelationship[];
  indicators: DigitalIndicatorItem[];
  candidateEntities: CandidateEntity[];
  leads: Record<string, RealWorldAttributionLead>;
  events: TimelineEvent[];
  auditLogs: AuditLogItem[];
  config: InvestigationConfig;
  updateConfig: (newConfig: InvestigationConfig) => void;
  confirmStage2: (clusterId: string, rationale: string, investigator: string) => void;
  recordInvestigatorDecision: (action: string, target: string, reason: string, details?: string) => void;
  resetToDefault: () => void;
}

export const initialCases: InvestigationCase[] = [
  {
    id: 'CASE-2026-001',
    name: 'Operation DarkEcho // Shadow Network Attribution',
    codename: 'SHADOW-NETWORK',
    targetActor: 'Actor Cluster A (TA-001)',
    status: 'ACTIVE INVESTIGATION',
    priority: 'CRITICAL',
    currentStage: 'Stage 2: Real-World Attribution',
    stage1Status: 'COMPLETED',
    stage2Status: 'PENDING_VALIDATION',
    createdDate: '2026-08-12 09:30 UTC',
    lastUpdated: '2026-09-28 10:14 UTC',
    leadInvestigator: 'Senior Investigator INV-017',
    agency: 'Cyber Threat Intelligence & Attribution Cell (SIH26151)',
    warrantNumber: 'Warrant #CR-2026-8819',
    summary: 'Multi-signal dark web de-anonymization operation targeting coordinated extortion, initial access brokering, and breach data syndication across Dread, XSS, and BreachForums. Correlated 4 digital handles into Probable Digital Actor Cluster A (92% strength) and linked staging gateway to Meridian Analytics S.R.O. (82% strength lead).',
    identitiesCount: 4,
    clustersCount: 2,
    evidenceCount: 18,
    correlationScore: 92,
    attributionConfidence: 82,
    primaryAttributionLead: 'Candidate Entity A (Meridian S.R.O. / Subject A. K.)'
  },
  {
    id: 'CASE-2026-002',
    name: 'Operation SilentVapor // Isolated PGP Nexus',
    codename: 'SILENT-VAPOR',
    targetActor: 'Actor Cluster B (TA-002)',
    status: 'PENDING REVIEW',
    priority: 'HIGH',
    currentStage: 'Stage 1: Actor Correlation',
    stage1Status: 'IN_PROGRESS',
    stage2Status: 'NOT_INITIATED',
    createdDate: '2026-08-24 14:00 UTC',
    lastUpdated: '2026-08-27 16:30 UTC',
    leadInvestigator: 'Investigator INV-022',
    agency: 'Cyber Threat Intelligence & Attribution Cell (SIH26151)',
    warrantNumber: 'Warrant #CR-2026-9041',
    summary: 'Evaluation of standalone Tor onion mirror and isolated PGP signature observed on Ramp Market. Evidence strength is currently 67%, remaining firmly blocked beneath the mandatory 80% Stage 2 threshold pending cryptographic and wallet corroboration.',
    identitiesCount: 1,
    clustersCount: 1,
    evidenceCount: 7,
    correlationScore: 67,
    attributionConfidence: 0,
    primaryAttributionLead: 'No Candidate Entity (Threshold Not Met)'
  }
];
export const DEFAULT_CASES = initialCases;

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export const CaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<InvestigationCase[]>(DEFAULT_CASES);
  const [activeCaseId, setActiveCaseId] = useState<string>('CASE-2026-001');

  // Unified forensic state
  const [config, setConfig] = useState<InvestigationConfig>(initialConfig);
  const [identities, setIdentities] = useState<DigitalIdentity[]>(syntheticIdentities.slice(0, 4));
  const [clusters, setClusters] = useState<ActorCluster[]>(initialActorClusters);
  const [leads, setLeads] = useState<Record<string, RealWorldAttributionLead>>(initialStage2Leads);
  const [events, setEvents] = useState<TimelineEvent[]>(syntheticTimelineEvents);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [selectedClusterId, setSelectedClusterId] = useState<string>('Actor Cluster A');
  const [indicators, setIndicators] = useState<DigitalIndicatorItem[]>(initialDigitalIndicators);
  const [candidateEntities, setCandidateEntities] = useState<CandidateEntity[]>(initialCandidateEntities);
  const [pairwiseRelationships, setPairwiseRelationships] = useState<PairwiseRelationship[]>(initialPairwiseRelationships);

  const activeCase = useMemo(() => {
    return cases.find(c => c.id === activeCaseId) || cases[0];
  }, [cases, activeCaseId]);

  const activeCluster = useMemo(() => {
    return clusters.find(c => c.id === selectedClusterId) || clusters[0];
  }, [clusters, selectedClusterId]);

  const selectCase = (caseId: string) => {
    const found = cases.find(c => c.id === caseId || (caseId === 'INV-2026-0151' && c.id === 'CASE-2026-001'));
    if (found) {
      setActiveCaseId(found.id);
    }
  };

  const createCase = (caseData: Partial<InvestigationCase>): InvestigationCase => {
    const newId = `CASE-2026-${String(cases.length + 1).padStart(3, '0')}`;
    const newCase: InvestigationCase = {
      id: newId,
      name: caseData.name || 'Untitled Threat Actor Investigation',
      codename: caseData.codename || `OP-${Date.now().toString().slice(-4)}`,
      targetActor: caseData.targetActor || 'Pending Cluster Assignment',
      status: 'ACTIVE INVESTIGATION',
      priority: caseData.priority || 'HIGH',
      currentStage: 'Stage 1: Actor Correlation',
      stage1Status: 'IN_PROGRESS',
      stage2Status: 'NOT_INITIATED',
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      leadInvestigator: caseData.leadInvestigator || config.leadInvestigator,
      agency: config.agency,
      warrantNumber: `Warrant #CR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      summary: caseData.summary || 'Newly registered digital threat actor investigation.',
      identitiesCount: 0,
      clustersCount: 0,
      evidenceCount: 0,
      correlationScore: 0,
      attributionConfidence: 0
    };

    setCases(prev => [newCase, ...prev]);
    setActiveCaseId(newId);

    recordInvestigatorDecision(
      'Investigation Case Created',
      newCase.name,
      `Case ${newCase.id} initiated under ${newCase.warrantNumber}.`
    );

    return newCase;
  };

  const addIdentity = (newIdData: Partial<DigitalIdentity>) => {
    const newId: DigitalIdentity = {
      id: `id-${Date.now().toString().slice(-4)}`,
      username: newIdData.username || 'unknown_handle',
      aliases: newIdData.aliases || [],
      platform: newIdData.platform || 'Forum-X (Dread)',
      firstSeen: newIdData.firstSeen || new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      lastSeen: newIdData.lastSeen || new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      avatarLetter: (newIdData.username || 'U').charAt(0).toUpperCase(),
      status: 'ACTIVE',
      riskRating: 'HIGH',
      clusterId: 'Actor Cluster A',
      stylometry: newIdData.stylometry || {
        avgSentenceLength: 14.0,
        vocabularyRichnessTTR: 0.65,
        punctuationHabit: 'Double hyphens (--)',
        casingHabit: 'lowercase',
        sampleText: 'new entry -- pending stylometric parsing',
        distinctivePhrases: ['escrow mandatory']
      },
      behavioural: newIdData.behavioural || {
        primaryRole: 'Access Broker',
        tradingMethod: 'Escrow',
        opsecDiscipline: 'STRICT',
        forumSections: ['Marketplace'],
        antiForensicHabits: ['Tor routing']
      },
      temporal: newIdData.temporal || {
        activeHoursUtc: '20:00 - 02:00 UTC',
        peakDay: 'Friday',
        timezoneEstimate: 'UTC+03:00',
        burstFrequency: 'Moderate'
      },
      technical: newIdData.technical || {
        pgpKeyId: '0x7E4A8F2C91B4',
        cryptoWallets: ['bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'],
        walletType: 'BTC SegWit',
        onionAddresses: [],
        infrastructureIps: ['185.220.101.45'],
        userAgents: ['Tor Browser 115.0']
      }
    };

    setIdentities(prev => [newId, ...prev]);

    // Update active case metrics
    setCases(prev => prev.map(c => {
      if (c.id === activeCaseId) {
        return { ...c, identitiesCount: c.identitiesCount + 1, evidenceCount: c.evidenceCount + 2 };
      }
      return c;
    }));

    recordInvestigatorDecision(
      'Digital Identity Ingested',
      `@${newId.username}`,
      `Added persona from ${newId.platform} into ${activeCaseId}.`
    );
  };

  const removeIdentity = (idToRemove: string) => {
    setIdentities(prev => prev.filter(i => i.id !== idToRemove));
  };

  const updateConfig = (newConfig: InvestigationConfig) => {
    setConfig(newConfig);
    setClusters(prev => prev.map(c => {
      const isEligible = c.actorCorrelationScore >= newConfig.stage2Threshold;
      return {
        ...c,
        stage2Status: c.stage2Initiated 
          ? 'STAGE 2 INITIATED' 
          : isEligible 
            ? 'ELIGIBLE FOR INVESTIGATOR REVIEW' 
            : 'NOT ELIGIBLE'
      };
    }));
  };

  const confirmStage2 = (clusterId: string, rationale: string, investigator: string) => {
    setClusters(prev => prev.map(c => {
      if (c.id === clusterId) {
        return {
          ...c,
          stage2Initiated: true,
          stage2Status: 'STAGE 2 INITIATED',
          stage2InitiatedAt: new Date().toISOString(),
          stage2InitiatedBy: investigator,
          stage2Rationale: rationale
        };
      }
      return c;
    }));

    // Update active case
    setCases(prev => prev.map(c => {
      if (c.id === activeCaseId) {
        return {
          ...c,
          currentStage: 'Stage 2: Real-World Attribution',
          stage2Status: 'PENDING_VALIDATION'
        };
      }
      return c;
    }));

    // Add Timeline Event
    const newEvent: TimelineEvent = {
      id: `evt-${Date.now()}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      title: 'Stage 2 Attribution Initiated by Investigator',
      category: 'STAGE2',
      description: `Investigator ${investigator} authorized Critical Decision Gate. Rationale: ${rationale}`,
      identitiesInvolved: ['shadow_x17', 'x_shadow', 'darkx17', 'x17_dev'],
      clusterId,
      confidenceImpact: 'Entity Resolution Active',
      badgeType: 'success'
    };
    setEvents(prev => [newEvent, ...prev]);

    recordInvestigatorDecision(
      'Critical Gate Authorized: Stage 2 Initiated',
      clusterId,
      rationale,
      `Sworn officer ${investigator} confirmed Stage 1 correlation threshold satisfied.`
    );
  };

  const recordInvestigatorDecision = (action: string, target: string, reason: string, details?: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      investigator: config.leadInvestigator.split(' ')[0] + ' ' + (config.leadInvestigator.split(' ')[1] || 'INV-017'),
      action,
      target,
      reason,
      details: details || `Investigative action recorded on Case ${activeCaseId}.`,
      clusterId: selectedClusterId
    };

    setAuditLogs(prev => [newLog, ...prev]);
  };

  const resetToDefault = () => {
    setCases(DEFAULT_CASES);
    setActiveCaseId('CASE-2026-001');
    setConfig(initialConfig);
    setIdentities(syntheticIdentities.slice(0, 4));
    setClusters(initialActorClusters);
    setLeads(initialStage2Leads);
    setEvents(syntheticTimelineEvents);
    setAuditLogs(initialAuditLogs);
    setSelectedClusterId('Actor Cluster A');
  };

  return (
    <CaseContext.Provider value={{
      cases,
      activeCaseId,
      activeCase,
      selectCase,
      createCase,
      identities,
      addIdentity,
      removeIdentity,
      clusters,
      selectedClusterId,
      setSelectedClusterId,
      activeCluster,
      pairwiseRelationships,
      indicators,
      candidateEntities,
      leads,
      events,
      auditLogs,
      config,
      updateConfig,
      confirmStage2,
      recordInvestigatorDecision,
      resetToDefault
    }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCase = (): CaseContextType => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
};
