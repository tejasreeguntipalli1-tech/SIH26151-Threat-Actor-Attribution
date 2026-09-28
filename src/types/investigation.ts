export type ConfidenceBand = 
  | 'VERY STRONG EVIDENCE'
  | 'STRONG EVIDENCE'
  | 'MODERATE EVIDENCE'
  | 'WEAK / INCONCLUSIVE'
  | 'INSUFFICIENT EVIDENCE';

export type Stage2Status = 
  | 'ELIGIBLE FOR INVESTIGATOR REVIEW'
  | 'NOT ELIGIBLE'
  | 'STAGE 2 INITIATED'
  | 'ATTRIBUTION LEAD VALIDATED'
  | 'ATTRIBUTION LEAD REJECTED'
  | 'REQUIRES MORE EVIDENCE';

export type SignalType = 
  | 'username'
  | 'stylometry'
  | 'behaviour'
  | 'temporal'
  | 'technical'
  | 'infrastructure'
  | 'financial'
  | 'intelligence';

export type EvidenceStatus = 'available' | 'missing' | 'conflicting';

export interface EvidenceItem {
  id: string;
  category: SignalType;
  title: string;
  description: string;
  status: EvidenceStatus;
  indicatorValue?: string;
  sourcePlatform?: string;
  confidenceContribution: number;
  reasoning: string;
  timestamp?: string;
}

export interface DigitalIndicatorItem {
  id: string; // e.g. IND-0041
  type: 'Identity' | 'Behavioural' | 'Technical' | 'Financial' | 'Infrastructure';
  indicator: string;
  source: string;
  firstSeen: string;
  lastSeen: string;
  confidence: 'High' | 'Moderate' | 'Weak';
  status: 'Supporting' | 'Conflicting' | 'Unknown';
  description: string;
  originStage: 'Stage 1' | 'Stage 2';
}

export interface DigitalIdentity {
  id: string;
  username: string;
  aliases: string[];
  platform: string;
  firstSeen: string;
  lastSeen: string;
  avatarLetter: string;
  status: 'ACTIVE' | 'DORMANT' | 'SUSPENDED';
  riskRating: 'HIGH' | 'ELEVATED' | 'MODERATE';
  clusterId?: string;
  
  stylometry: {
    avgSentenceLength: number;
    vocabularyRichnessTTR: number;
    punctuationHabit: string;
    casingHabit: string;
    sampleText: string;
    distinctivePhrases: string[];
  };
  
  behavioural: {
    primaryRole: string;
    tradingMethod: string;
    opsecDiscipline: 'STRICT' | 'MODERATE' | 'POOR';
    forumSections: string[];
    antiForensicHabits: string[];
  };
  
  temporal: {
    activeHoursUtc: string;
    peakDay: string;
    timezoneEstimate: string;
    burstFrequency: string;
  };
  
  technical: {
    pgpKeyId: string | 'NOT AVAILABLE';
    pgpFingerprint?: string;
    cryptoWallets: string[];
    walletType: string;
    onionAddresses: string[];
    infrastructureIps: string[];
    userAgents: string[];
  };
}

export interface ScoreBreakdown {
  usernameSimilarity: number;
  writingStyle: number;
  behaviouralPattern: number;
  temporalPattern: number;
  technicalIndicators: number;
  overallConfidence: number;
  supportingCount: number;
  conflictingCount: number;
  unknownCount: number;
}

export interface ActorCluster {
  id: string; // e.g., TA-001 or Actor Cluster A
  codename: string;
  identityIds: string[];
  identities: DigitalIdentity[];
  actorCorrelationScore: number; // 0 - 100
  classification: ConfidenceBand;
  stage2Status: Stage2Status;
  stage2Initiated: boolean;
  scoreBreakdown: ScoreBreakdown;
  supportingReasons: string[];
  conflictingReasons: string[];
  unknownReasons: string[];
  evidenceGaps: string[];
  createdAt: string;
  lastUpdated: string;
  notes?: string;
}

// Stage 2: Entity Resolution & Matching Dimension
export interface EntityResolutionDimension {
  id: string;
  name: string;
  description: string;
  matchStrength: number; // 0 - 100
  evidenceCount: number;
  supportingCount: number;
  conflictingCount: number;
  unknownCount: number;
  keyObservation: string;
}

// Stage 2: Source Reliability & Analytical Status
export type SourceReliabilityRating = 'A' | 'B' | 'C' | 'D' | 'E';
export type AnalyticalStatus = 'UNREVIEWED' | 'SYSTEM-SUGGESTED' | 'INVESTIGATOR-VERIFIED' | 'DISPUTED' | 'REJECTED';
export type CaseLifecycleState = 
  | 'STAGE 1 ANALYSIS'
  | 'STAGE 1 REVIEW'
  | 'STAGE 2 AUTHORIZATION'
  | 'IDENTITY RESOLUTION'
  | 'CANDIDATE ANALYSIS'
  | 'ATTRIBUTION CHALLENGE'
  | 'INVESTIGATOR REVIEW'
  | 'INVESTIGATIVE LEAD'
  | 'MORE EVIDENCE REQUIRED'
  | 'INCONCLUSIVE'
  | 'CANDIDATE REJECTED';

// Stage 2: Candidate Entity with Fictional Demonstration Flags
export interface CandidateEntity {
  id: string; // e.g., CANDIDATE-A
  name: string; // e.g., Arun Mehta (FICTIONAL DEMO ENTITY)
  rawName: string; // Arun Mehta
  entityType: 'Individual' | 'Organization' | 'Infrastructure Owner';
  organization: string;
  possibleLocation: string;
  attributionStrength: number; // e.g., 74%
  status: 'ATTRIBUTION LEAD' | 'REQUIRES ADDITIONAL EVIDENCE' | 'REJECTED' | 'VALIDATED LEAD';
  humanValidation: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'NEED_MORE_EVIDENCE' | 'INCONCLUSIVE';
  evidenceLinksTotal: number;
  supportingCount: number;
  conflictingCount: number;
  unknownCount: number;
  jurisdiction: string;
  summary: string;
  sourceReliability: SourceReliabilityRating;
  isFictionalDemo: boolean;
  relatedIdentities: string[];
  infrastructureRels: string[];
  pgpRels: string[];
  domainRels: string[];
  walletRels: string[];
  temporalRels: string[];
  supportingEvidence: string[];
  contradictoryEvidence: string[];
  unknownEvidence: string[];
  evidenceGaps: string[];
  whyAppeared: string[];
  whatCouldStrengthen: string[];
  whatCouldWeaken: string[];
}

export interface EvidenceProvenance {
  evidenceId: string;
  source: string;
  sourceType: string;
  originalIndicator: string;
  discoveryTimestamp: string;
  collectionMethod: string;
  reliability: SourceReliabilityRating;
  confidence: number;
  relatedEntity: string;
  relationshipType: string;
  verificationStatus: 'Cross-source verified' | 'Single-source unconfirmed' | 'Disputed' | 'Invalidated';
}

export interface TemporalConflictItem {
  id: string;
  title: string;
  candidateActivity: string;
  actorActivity: string;
  conflictExplanation: string;
  detectedAt: string;
  impactOnConfidence: string;
}

export interface ContextualConsistencyItem {
  id: string;
  factor: string;
  actorObservation: string;
  candidateObservation: string;
  status: 'CONSISTENT' | 'CONFLICT' | 'INCONCLUSIVE';
  explanation: string;
}

export interface AlternativeExplanation {
  id: string;
  hypothesis: string;
  probability: 'High' | 'Moderate' | 'Low';
  evidenceFor: string[];
  evidenceAgainst: string[];
  missingEvidence: string[];
  alternativeRebuttal: string;
}

export interface EvidenceLineage {
  lineageId: string;
  rootEvidence: string;
  independentSource: string;
  derivedReports: string[];
  duplicatedCount: number;
}

export interface AttributionSnapshot {
  id: string;
  timestamp: string;
  confidence: number;
  triggerEvent: string;
  evidenceAddedOrChanged: string[];
  stage: string;
}

export interface InvestigatorNote {
  id: string;
  targetType: 'Candidate' | 'Evidence' | 'Relationship' | 'Timeline' | 'Cluster';
  targetId: string;
  author: string;
  text: string;
  timestamp: string;
}

// Stage 2: Traceable Evidence Relationship
export interface RelationshipEvidenceItem {
  id: string;
  sourceNode: string;
  targetNode: string;
  relationType: string;
  evidenceType: string;
  sourceReport: string;
  observedDate: string;
  strength: 'Strong' | 'Moderate' | 'Weak';
  status: 'SUPPORTING' | 'CONFLICTING' | 'UNKNOWN';
  notes: string;
  investigatorDecision?: 'ACCEPTED' | 'REJECTED' | 'NEED_MORE_EVIDENCE';
  decisionReason?: string;
  decisionBy?: string;
  decisionTimestamp?: string;
  provenance: {
    origin: string;
    originalIndicatorId: string;
    firstObserved: string;
    passedToStage2: string;
    validationState: string;
  };
}

// Stage 2: Confidence Evolution Timeline point
export interface ConfidenceEvolutionPoint {
  step: string;
  score: number;
  event: string;
  delta: string;
  type: 'increase' | 'decrease' | 'baseline';
}

// Stage 2: Support/Conflict Matrix item
export interface MatrixEvidenceRow {
  category: string;
  supportingText?: string;
  conflictingText?: string;
  unknownText?: string;
  status: 'supporting' | 'conflicting' | 'unknown';
}

export interface RealWorldAttributionLead {
  id: string;
  clusterId: string;
  candidateEntity: string;
  entityType: 'Individual' | 'Organization' | 'Infrastructure Owner';
  jurisdictionEstimate: string;
  attributionConfidence: number;
  status: 'ATTRIBUTION LEAD - HUMAN VALIDATION REQUIRED' | 'ACCEPTED' | 'REJECTED' | 'PENDING EVIDENCE';
  evidenceConnectionsTotal: number;
  supportingConnections: number;
  conflictingConnections: number;
  unknownConnections: number;
  resolutionChain: {
    step: number;
    from: string;
    to: string;
    relationship: string;
    evidenceSource: string;
    status: 'VERIFIED' | 'PROBABLE' | 'UNCONFIRMED';
  }[];
  investigatorNotes: string;
  humanValidationDecision?: 'ACCEPTED' | 'REJECTED' | 'NEED_MORE_EVIDENCE';
  validatedBy?: string;
  validatedAt?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  category: 'CREATION' | 'ACTIVITY' | 'NAME_CHANGE' | 'POST' | 'TECHNICAL' | 'RELATIONSHIP' | 'CLUSTER' | 'INVESTIGATOR' | 'STAGE2';
  description: string;
  identitiesInvolved: string[];
  clusterId?: string;
  confidenceImpact?: string;
  badgeType?: 'info' | 'success' | 'warning' | 'alert';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  investigator: string;
  action: string;
  details: string;
  clusterId?: string;
  target?: string;
  reason?: string;
}

export interface InvestigationConfig {
  stage2Threshold: number; // default 80
  weights: {
    username: number;
    stylometry: number;
    behaviour: number;
    temporal: number;
    technical: number;
  };
  investigationId: string;
  leadInvestigator: string;
  agency: string;
}

export interface PairwiseSignalDetail {
  dimension: 'Username' | 'Stylometry' | 'Behaviour' | 'Temporal' | 'Technical';
  score: number; // 0 - 100
  strength: 'Strong' | 'Moderate' | 'Weak' | 'Insufficient';
  observedPattern: string;
  explanation: string;
}

export interface PairwiseRelationship {
  id: string; // e.g. "rel-ab"
  sourceIdentityId: string; // e.g. "id-01"
  sourceUsername: string; // "shadow_x17"
  targetIdentityId: string; // e.g. "id-02"
  targetUsername: string; // "x_shadow"
  relationshipType: string; // "Potential Same-Actor Relationship"
  overallScore: number; // e.g. 94
  classification: ConfidenceBand;
  signals: {
    username: PairwiseSignalDetail;
    stylometry: PairwiseSignalDetail;
    behaviour: PairwiseSignalDetail;
    temporal: PairwiseSignalDetail;
    technical: PairwiseSignalDetail;
  };
  supportingEvidence: string[];
  conflictingEvidence: string[];
  unknownEvidence: string[];
  analystSummary: string;
}

