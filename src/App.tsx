import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CaseProvider } from './context/CaseContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { CaseWorkspaceLayout } from './components/layout/CaseWorkspaceLayout';

// Application Views & Dedicated Route Workspaces
import { LoginView } from './views/LoginView';
import { CasesListView } from './views/CasesListView';
import { CaseOverviewView } from './views/CaseOverviewView';
import { DigitalIdentitiesView } from './components/identities/DigitalIdentitiesView';
import { ActorCorrelationView } from './components/correlation/ActorCorrelationView';
import { RelationshipGraphView } from './components/graph/RelationshipGraphView';
import { ActorClustersView } from './components/clusters/ActorClustersView';
import { EvidenceAnalysisView } from './components/evidence/EvidenceAnalysisView';
import { Stage2AttributionView } from './components/stage2/Stage2AttributionView';
import { CandidateEntitiesView } from './components/stage2/CandidateEntitiesView';
import { InvestigationTimelineView } from './components/timeline/InvestigationTimelineView';
import { InvestigationReportView } from './components/reports/InvestigationReportView';
import { InvestigationDashboard } from './components/dashboard/InvestigationDashboard';
import { DataSourcesView } from './components/sources/DataSourcesView';
import { SettingsView } from './components/settings/SettingsView';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CaseProvider>
          <Routes>
            {/* Public Authentication Route */}
            <Route path="/login" element={<LoginView />} />

            {/* Protected Investigation Workspace Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <CaseWorkspaceLayout />
                </ProtectedRoute>
              }
            >
              {/* Default Redirect to Cases Directory */}
              <Route path="/" element={<Navigate to="/cases" replace />} />
              
              {/* Global Investigation Command Center */}
              <Route path="/dashboard" element={<InvestigationDashboard />} />
              
              {/* Case Directory & Case-Centric Workspace */}
              <Route path="/cases" element={<CasesListView />} />
              <Route path="/cases/:caseId" element={<CaseOverviewView />} />
              <Route path="/cases/:caseId/identities" element={<DigitalIdentitiesView />} />
              <Route path="/cases/:caseId/correlation" element={<ActorCorrelationView />} />
              <Route path="/cases/:caseId/graph" element={<RelationshipGraphView initialTracePath={false} />} />
              <Route path="/cases/:caseId/clusters" element={<ActorClustersView />} />
              <Route path="/cases/:caseId/evidence" element={<EvidenceAnalysisView />} />
              <Route path="/cases/:caseId/attribution" element={<Stage2AttributionView />} />
              <Route path="/cases/:caseId/candidates" element={<CandidateEntitiesView />} />
              <Route path="/cases/:caseId/attribution-graph" element={<RelationshipGraphView initialTracePath={true} />} />
              <Route path="/cases/:caseId/timeline" element={<InvestigationTimelineView />} />
              <Route path="/cases/:caseId/report" element={<InvestigationReportView />} />
              
              {/* Telemetry & System Configuration */}
              <Route path="/sources" element={<DataSourcesView />} />
              <Route path="/settings" element={<SettingsView />} />
            </Route>

            {/* Global Fallback Route */}
            <Route path="*" element={<Navigate to="/cases" replace />} />
          </Routes>
        </CaseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
