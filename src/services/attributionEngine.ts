import { 
  ActorCluster, 
  CandidateEntity, 
  DigitalIndicatorItem, 
  EntityResolutionDimension, 
  RelationshipEvidenceItem, 
  TimelineEvent, 
  AuditLogItem 
} from '../types/investigation';
import { 
  initialActorClusters, 
  initialDigitalIndicators, 
  initialMatchingDimensions, 
  initialCandidateEntities, 
  initialRelationshipEvidenceItems, 
  syntheticTimelineEvents, 
  initialAuditLogs 
} from '../data/syntheticData';

// Modular Service Architecture (FastAPI-ready abstractions)

export const actorService = {
  getClusters: (): ActorCluster[] => initialActorClusters,
  getClusterById: (id: string): ActorCluster | undefined => 
    initialActorClusters.find(c => c.id === id),
  validateCluster: (id: string, notes: string): boolean => {
    console.log(`[actorService] Validated cluster ${id}: ${notes}`);
    return true;
  }
};

export const indicatorService = {
  getIndicators: (): DigitalIndicatorItem[] => initialDigitalIndicators,
  getByCategory: (category: DigitalIndicatorItem['type']): DigitalIndicatorItem[] =>
    initialDigitalIndicators.filter(i => i.type === category),
  getById: (id: string): DigitalIndicatorItem | undefined =>
    initialDigitalIndicators.find(i => i.id === id)
};

export const entityResolutionService = {
  getDimensions: (): EntityResolutionDimension[] => initialMatchingDimensions,
  calculateDimensionScore: (dimensionId: string, supporting: number, conflicting: number): number => {
    const total = supporting + conflicting;
    if (total === 0) return 50;
    return Math.round((supporting / total) * 100);
  }
};

export const evidenceService = {
  getRelationships: (): RelationshipEvidenceItem[] => initialRelationshipEvidenceItems,
  updateRelationshipDecision: (
    relId: string, 
    decision: 'ACCEPTED' | 'REJECTED' | 'NEED_MORE_EVIDENCE', 
    reason: string,
    investigator: string
  ): { updatedItems: RelationshipEvidenceItem[]; newAttributionScore: number } => {
    const items = [...initialRelationshipEvidenceItems];
    const target = items.find(r => r.id === relId);
    if (target) {
      target.investigatorDecision = decision;
      target.decisionReason = reason;
      target.decisionBy = investigator;
      target.decisionTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      if (decision === 'REJECTED') {
        target.status = 'CONFLICTING';
      } else if (decision === 'ACCEPTED') {
        target.status = 'SUPPORTING';
      }
    }

    // Dynamic recalculation of Candidate A attribution strength
    const supporting = items.filter(r => r.status === 'SUPPORTING' && r.investigatorDecision !== 'REJECTED').length;
    const conflicting = items.filter(r => r.status === 'CONFLICTING' || r.investigatorDecision === 'REJECTED').length;
    
    // Base 50 + (supporting * 6) - (conflicting * 8)
    const recalculated = Math.min(95, Math.max(30, 50 + (supporting * 6) - (conflicting * 8)));

    return {
      updatedItems: items,
      newAttributionScore: recalculated
    };
  }
};

export const attributionService = {
  getCandidates: (): CandidateEntity[] => initialCandidateEntities,
  getCandidateById: (id: string): CandidateEntity | undefined =>
    initialCandidateEntities.find(c => c.id === id),
  updateCandidateDecision: (
    candidateId: string, 
    decision: 'ACCEPTED' | 'REJECTED' | 'NEED_MORE_EVIDENCE',
    investigator: string
  ): CandidateEntity | undefined => {
    const candidate = initialCandidateEntities.find(c => c.id === candidateId);
    if (candidate) {
      candidate.humanValidation = decision;
      candidate.status = decision === 'ACCEPTED' ? 'VALIDATED LEAD' : decision === 'REJECTED' ? 'REJECTED' : 'REQUIRES ADDITIONAL EVIDENCE';
    }
    return candidate;
  }
};

export const timelineService = {
  getEvents: (): TimelineEvent[] => syntheticTimelineEvents,
  addEvent: (event: Omit<TimelineEvent, 'id'>): TimelineEvent => {
    const newEvent: TimelineEvent = {
      ...event,
      id: `evt-${Date.now()}`
    };
    return newEvent;
  }
};

export const reportService = {
  generateFullDossier: (investigationId: string, cluster: ActorCluster, candidate: CandidateEntity) => {
    return {
      investigationId,
      classification: 'CONFIDENTIAL // LAW ENFORCEMENT & INVESTIGATIVE RESEARCH ONLY',
      watermark: 'ATTRIBUTION LEAD — HUMAN VALIDATION REQUIRED',
      generatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      cluster,
      candidate,
      status: 'ATTRIBUTION LEAD — HUMAN VALIDATION REQUIRED'
    };
  }
};
