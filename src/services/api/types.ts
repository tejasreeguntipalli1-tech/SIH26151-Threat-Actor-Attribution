import { InvestigationCase } from '../../context/CaseContext';
import { 
  ActorCluster, 
  DigitalIdentity,
  PairwiseRelationship, 
  DigitalIndicatorItem, 
  CandidateEntity, 
  RealWorldAttributionLead, 
  TimelineEvent, 
  AuditLogItem 
} from '../../types/investigation';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  badgeNumber: string;
  role: string;
  agency: string;
  token?: string;
}

export interface LoginRequest {
  username: string;
  password?: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
  expiresIn: number;
}

export interface CorrelationAnalysisRequest {
  weights?: {
    username?: number;
    stylometry?: number;
    behaviour?: number;
    temporal?: number;
    technical?: number;
  };
  recompute?: boolean;
}

export interface AttributionInitiateRequest {
  justification: string;
  authorizedBy: string;
  clusterId?: string;
}

export interface AttributionValidationRequest {
  candidateId: string;
  decision: 'ACCEPTED' | 'REJECTED' | 'NEED_MORE_EVIDENCE';
  reason: string;
  investigator: string;
}

export interface ReportGenerationRequest {
  includeStage2?: boolean;
  format?: 'json' | 'pdf';
  investigatorNotes?: string;
}
