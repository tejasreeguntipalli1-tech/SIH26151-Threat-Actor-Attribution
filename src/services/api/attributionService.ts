import { 
  CandidateEntity, 
  RealWorldAttributionLead, 
  AuditLogItem 
} from '../../types/investigation';
import { 
  initialCandidateEntities, 
  initialStage2Leads, 
  initialAuditLogs 
} from '../../data/syntheticData';
import { AttributionInitiateRequest, AttributionValidationRequest } from './types';

export const attributionService = {
  async getAttributionByCase(_caseId: string): Promise<{
    candidates: CandidateEntity[];
    leads: Record<string, RealWorldAttributionLead>;
    auditLogs: AuditLogItem[];
  }> {
    await new Promise((r) => setTimeout(r, 120));
    return {
      candidates: initialCandidateEntities,
      leads: initialStage2Leads,
      auditLogs: initialAuditLogs
    };
  },

  async initiateAttribution(
    caseId: string, 
    request: AttributionInitiateRequest
  ): Promise<{ status: string; auditLog: AuditLogItem; lead: RealWorldAttributionLead }> {
    await new Promise((r) => setTimeout(r, 250));
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const auditItem: AuditLogItem = {
      id: `LOG-${Date.now()}`,
      timestamp: now,
      investigator: request.authorizedBy || 'Senior Inspector INV-017',
      action: 'STAGE 2 REAL-WORLD ATTRIBUTION INITIATED',
      details: request.justification || 'Correlation threshold cleared (>80%). Transition to physical entity resolution approved.',
      clusterId: request.clusterId || 'Actor Cluster A'
    };

    const lead = initialStage2Leads['Actor Cluster A'];
    return {
      status: 'STAGE 2 INITIATED',
      auditLog: auditItem,
      lead
    };
  },

  async validateCandidateLead(
    _caseId: string, 
    request: AttributionValidationRequest
  ): Promise<AuditLogItem> {
    await new Promise((r) => setTimeout(r, 180));
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    return {
      id: `LOG-VAL-${Date.now()}`,
      timestamp: now,
      investigator: request.investigator,
      action: `ATTRIBUTION LEAD ${request.decision}`,
      details: request.reason,
      target: request.candidateId
    };
  }
};
