export * from './types';
export { authService } from './authService';
export { caseService } from './caseService';
export { identityService } from './identityService';
export { correlationService } from './correlationService';
export { relationshipService } from './relationshipService';
export { evidenceService } from './evidenceService';
export { attributionService } from './attributionService';
export { timelineService } from './timelineService';
export { reportService } from './reportService';

// Unified client interface for REST/Mock operations
export const spectraApi = {
  auth: () => import('./authService').then(m => m.authService),
  cases: () => import('./caseService').then(m => m.caseService),
  identities: () => import('./identityService').then(m => m.identityService),
  correlation: () => import('./correlationService').then(m => m.correlationService),
  relationships: () => import('./relationshipService').then(m => m.relationshipService),
  evidence: () => import('./evidenceService').then(m => m.evidenceService),
  attribution: () => import('./attributionService').then(m => m.attributionService),
  timeline: () => import('./timelineService').then(m => m.timelineService),
  report: () => import('./reportService').then(m => m.reportService),
};
