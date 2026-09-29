import { InvestigationCase } from '../../context/CaseContext';
import { initialCases } from '../../context/CaseContext';

const CASES_STORAGE_KEY = 'spectra_cases_store';

function getStoredCases(): InvestigationCase[] {
  const raw = localStorage.getItem(CASES_STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fallback
    }
  }
  return initialCases;
}

function saveStoredCases(cases: InvestigationCase[]): void {
  localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
}

export const caseService = {
  async getCases(): Promise<InvestigationCase[]> {
    await new Promise((r) => setTimeout(r, 120));
    return getStoredCases();
  },

  async getCaseById(caseId: string): Promise<InvestigationCase | null> {
    await new Promise((r) => setTimeout(r, 100));
    const cases = getStoredCases();
    return cases.find((c) => c.id === caseId) || null;
  },

  async createCase(caseData: Partial<InvestigationCase>): Promise<InvestigationCase> {
    await new Promise((r) => setTimeout(r, 180));
    const cases = getStoredCases();
    const newCaseId = `CASE-2026-${String(cases.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString().split('T')[0];

    const newCase: InvestigationCase = {
      id: newCaseId,
      name: caseData.name || 'New Investigation Case',
      codename: caseData.codename || 'Operation PhantomEcho',
      targetActor: caseData.targetActor || 'Uncorrelated Threat Cluster',
      status: 'ACTIVE INVESTIGATION',
      priority: caseData.priority || 'HIGH',
      currentStage: 'Stage 1: Digital Identity Correlation',
      stage1Status: 'IN_PROGRESS',
      stage2Status: 'NOT_INITIATED',
      createdDate: now,
      lastUpdated: now,
      leadInvestigator: caseData.leadInvestigator || 'Senior Inspector INV-017',
      agency: caseData.agency || 'National Cyber Crime Coordination Centre (I4C) / SPECTRA',
      warrantNumber: caseData.warrantNumber || `WARRANT-CR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      summary: caseData.summary || 'Initial ingestion and forensic triangulation of darknet handles.',
      identitiesCount: 0,
      clustersCount: 0,
      evidenceCount: 0,
      correlationScore: 0,
      attributionConfidence: 0
    };

    const updated = [newCase, ...cases];
    saveStoredCases(updated);
    return newCase;
  },

  async updateCase(caseId: string, updates: Partial<InvestigationCase>): Promise<InvestigationCase> {
    await new Promise((r) => setTimeout(r, 150));
    const cases = getStoredCases();
    const index = cases.findIndex((c) => c.id === caseId);
    if (index === -1) {
      throw new Error(`Case ${caseId} not found`);
    }

    const updatedCase: InvestigationCase = {
      ...cases[index],
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    cases[index] = updatedCase;
    saveStoredCases(cases);
    return updatedCase;
  }
};
