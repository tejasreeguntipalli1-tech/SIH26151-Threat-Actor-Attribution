import { 
  syntheticIdentities, 
  initialActorClusters, 
  initialStage2Leads, 
  initialCandidateEntities, 
  initialDigitalIndicators, 
  initialPairwiseRelationships, 
  initialAuditLogs 
} from '../../data/syntheticData';
import { ReportGenerationRequest } from './types';

export const reportService = {
  async getReportByCase(caseId: string): Promise<any> {
    await new Promise((r) => setTimeout(r, 150));
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

    return {
      reportMetadata: {
        title: "INVESTIGATION ANALYTICAL REPORT",
        platform: "SPECTRA Threat Actor Attribution Platform",
        caseId: caseId,
        classification: "CONTROLLED DEMONSTRATION // SYNTHETIC DATA",
        reportVersion: "1.0",
        generatedAt: now,
        leadInvestigator: "Senior Inspector INV-017",
        agency: "National Cyber Crime Coordination Centre (I4C) / SPECTRA Attribution Cell",
        warrantNumber: "WARRANT #CR-2026-8819",
        statutoryNotice: "Correlation identifies evidence-based relationships between digital identities. Attribution requires independent corroboration connecting the threat actor cluster to a real-world entity. This analytical report establishes lawful investigative leads for sworn investigator verification, not automated criminal charges."
      },
      digitalIdentities: syntheticIdentities,
      actorCluster: initialActorClusters[0],
      pairwiseRelationships: initialPairwiseRelationships,
      indicators: initialDigitalIndicators,
      candidateEntities: initialCandidateEntities,
      primaryAttributionLead: initialStage2Leads['Actor Cluster A'],
      auditLogs: initialAuditLogs
    };
  },

  async generateReport(caseId: string, options?: ReportGenerationRequest): Promise<{ downloadUrl: string; reportData: any }> {
    await new Promise((r) => setTimeout(r, 350));
    const reportData = await this.getReportByCase(caseId);
    if (options?.investigatorNotes) {
      reportData.investigatorNotes = options.investigatorNotes;
    }
    return {
      downloadUrl: `/api/cases/${caseId}/report/export`,
      reportData
    };
  }
};
