import React, { useState } from 'react';
import { 
  ActorCluster, 
  InvestigationConfig, 
  TimelineEvent, 
  AuditLogItem, 
  RealWorldAttributionLead,
  DigitalIdentity
} from './types/investigation';
import { 
  syntheticIdentities, 
  initialActorClusters, 
  initialStage2Leads, 
  syntheticTimelineEvents, 
  initialAuditLogs, 
  initialConfig 
} from './data/syntheticData';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CaseBuilderView } from './components/case/CaseBuilderView';
import { InvestigationDashboard } from './components/dashboard/InvestigationDashboard';
import { DigitalIdentitiesView } from './components/identities/DigitalIdentitiesView';
import { ActorCorrelationView } from './components/correlation/ActorCorrelationView';
import { RelationshipGraphView } from './components/graph/RelationshipGraphView';
import { ActorClustersView } from './components/clusters/ActorClustersView';
import { EvidenceAnalysisView } from './components/evidence/EvidenceAnalysisView';
import { InvestigationTimelineView } from './components/timeline/InvestigationTimelineView';
import { Stage2AttributionView } from './components/stage2/Stage2AttributionView';
import { CandidateEntitiesView } from './components/stage2/CandidateEntitiesView';
import { InvestigationReportView } from './components/reports/InvestigationReportView';
import { DataSourcesView } from './components/sources/DataSourcesView';
import { SettingsView } from './components/settings/SettingsView';
import { Stage2ConfirmModal } from './components/modals/Stage2ConfirmModal';
import { Info, X, CheckCircle2 } from 'lucide-react';

export function App() {
  // Investigation Command Center is the primary landing page
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [config, setConfig] = useState<InvestigationConfig>(initialConfig);
  const [identities, setIdentities] = useState<DigitalIdentity[]>(syntheticIdentities.slice(0, 4));
  const [clusters, setClusters] = useState<ActorCluster[]>(initialActorClusters);
  const [leads, setLeads] = useState<Record<string, RealWorldAttributionLead>>(initialStage2Leads);
  const [events, setEvents] = useState<TimelineEvent[]>(syntheticTimelineEvents);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  
  // Selected cluster for cross-stage workflow (Actor Cluster A)
  const [selectedClusterId, setSelectedClusterId] = useState<string>('Actor Cluster A');
  const [preselectedCorrelationId, setPreselectedCorrelationId] = useState<string | undefined>(undefined);

  // Critical Gate Modal State
  const [modalCluster, setModalCluster] = useState<ActorCluster | null>(null);

  // Pipeline Step Info Modal
  const [pipelineStepModal, setPipelineStepModal] = useState<{ step: number; title: string; description: string } | null>(null);

  // Active cluster object
  const activeCluster = clusters.find(c => c.id === selectedClusterId) || clusters[0];

  // Ingestion actions
  const handleAddIdentity = (newIdData: Partial<DigitalIdentity>) => {
    const newId: DigitalIdentity = {
      id: `id-${Date.now().toString().slice(-4)}`,
      username: newIdData.username || 'unknown_handle',
      aliases: [],
      platform: newIdData.platform || 'Forum-X (Dread)',
      firstSeen: newIdData.firstSeen || new Date().toISOString(),
      lastSeen: newIdData.lastSeen || new Date().toISOString(),
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

    // Add audit log
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      investigator: 'INV-017',
      action: 'Digital Identity Ingested',
      target: newId.username,
      reason: `Investigator added @${newId.username} on ${newId.platform} to Case ${config.investigationId}`,
      details: `Forensic indicators queued for automated stylometric and cryptographic correlation.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleRemoveIdentity = (idToRemove: string) => {
    setIdentities(prev => prev.filter(i => i.id !== idToRemove));
  };

  const handleImportSyntheticCase = () => {
    setIdentities(syntheticIdentities.slice(0, 4));
    setClusters(initialActorClusters);
    setLeads(initialStage2Leads);
    setEvents(syntheticTimelineEvents);
    setSelectedClusterId('Actor Cluster A');

    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      investigator: 'INV-017',
      action: 'Synthetic Case Restored',
      target: 'INV-2026-0151',
      reason: 'Reloaded canonical Smart India Hackathon dark web extortion case dossier',
      details: '4 digital handles, 7 correlated relationships, and 2 candidate entities synchronized.'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Handle Threshold or Weight Config Update
  const handleUpdateConfig = (newConfig: InvestigationConfig) => {
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

  // Open the Critical Gate Confirmation Modal
  const handleOpenStage2Modal = (clusterToOpen: ActorCluster) => {
    setModalCluster(clusterToOpen);
  };

  // Investigator confirms initiation in the modal
  const handleConfirmStage2 = (clusterId: string) => {
    setClusters(prev => prev.map(c => {
      if (c.id === clusterId) {
        return {
          ...c,
          stage2Initiated: true,
          stage2Status: 'STAGE 2 INITIATED'
        };
      }
      return c;
    }));

    // Add audit log
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      investigator: 'INV-017',
      action: 'Stage 2 Initiated',
      target: clusterId,
      reason: 'Investigator cleared Critical Decision Gate. Initiated entity resolution linking digital indicators to real-world candidate entities.',
      clusterId,
      details: `Stage 2 Real-World Attribution formally authorized for cluster ${clusterId}.`
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Add timeline event
    const newEvt: TimelineEvent = {
      id: `evt-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      title: `Stage 2 Attribution Initiated: ${clusterId}`,
      category: 'STAGE2',
      description: `Investigator cleared Critical Decision Gate. Digital indicators transferred to Entity Resolution Engine.`,
      identitiesInvolved: clusters.find(c => c.id === clusterId)?.identities.map(i => i.username) || [],
      clusterId,
      confidenceImpact: 'Entity Resolution Active',
      badgeType: 'success'
    };
    setEvents(prev => [newEvt, ...prev]);

    setSelectedClusterId(clusterId);
    setActiveTab('stage2');
  };

  // Global search handler
  const handleGlobalSearch = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('case') || q.includes('builder') || q.includes('ingest')) {
      setActiveTab('case-builder');
    } else if (q.includes('shadow') || q.includes('dark') || q.includes('id-') || q.includes('persona')) {
      setActiveTab('identities');
    } else if (q.includes('correlat') || q.includes('stylomet') || q.includes('pair')) {
      setActiveTab('correlation');
    } else if (q.includes('graph') || q.includes('network') || q.includes('node') || q.includes('path') || q.includes('trace')) {
      setActiveTab('graph');
    } else if (q.includes('candidate') || q.includes('meridian') || q.includes('vortex')) {
      setActiveTab('candidates');
    } else if (q.includes('cluster') || q.includes('gate') || q.includes('ta-001') || q.includes('actor')) {
      setActiveTab('clusters');
    } else if (q.includes('gap') || q.includes('missing') || q.includes('matrix')) {
      setActiveTab('evidence');
    } else if (q.includes('entity') || q.includes('stage 2') || q.includes('attribution') || q.includes('ind-') || q.includes('185.')) {
      setActiveTab('stage2');
    } else if (q.includes('time') || q.includes('chronolog')) {
      setActiveTab('timeline');
    } else if (q.includes('report') || q.includes('dossier') || q.includes('pdf')) {
      setActiveTab('reports');
    } else {
      setActiveTab('case-builder');
    }
  };

  // Pipeline step click details
  const handleOpenPipelineStep = (step: number) => {
    const stepDetails: Record<number, { title: string; description: string }> = {
      1: {
        title: 'Step 1: Digital Identities Ingestion',
        description: 'Monitors raw darknet forum posts, marketplace listings, and chat archives. Extracts handles, public PGP keys, and Bitcoin/Monero deposit addresses.'
      },
      2: {
        title: 'Step 2: Multi-Signal Actor Correlation',
        description: 'Analyzes pairwise similarity across 5 signals (Username, Stylometry, Behaviour, Temporal, Technical) to compute Actor Correlation Confidence (0-100%).'
      },
      3: {
        title: 'Step 3: Actor Validation & Critical Gate',
        description: 'Aggregates correlated handles into Probable Digital Actor Clusters. Validates eligibility against the configurable 80% threshold. Enforces mandatory investigator sign-off.'
      },
      4: {
        title: 'Step 4: Real-World Entity Attribution',
        description: 'Stage 2 workspace executing entity resolution across 6 dimensions. Maps digital indicators to candidate entities (Meridian Analytics / Subject A. K.).'
      },
      5: {
        title: 'Step 5: Human Validation & Attribution Lead',
        description: 'Final investigator validation sign-off. Accepts, rejects, or requests further evidence. Produces: Attribution Lead — Human Validation Required.'
      }
    };

    setPipelineStepModal({
      step,
      title: stepDetails[step]?.title || `Pipeline Step ${step}`,
      description: stepDetails[step]?.description || 'Pipeline step details.'
    });
  };

  // Reset demo
  const handleResetData = () => {
    setConfig(initialConfig);
    setIdentities(syntheticIdentities.slice(0, 4));
    setClusters(initialActorClusters);
    setLeads(initialStage2Leads);
    setEvents(syntheticTimelineEvents);
    setAuditLogs(initialAuditLogs);
    setActiveTab('case-builder');
    setSelectedClusterId('Actor Cluster A');
  };

  const eligibleCount = clusters.filter(c => c.actorCorrelationScore >= config.stage2Threshold).length;
  const stage2Count = clusters.filter(c => c.stage2Initiated).length;

  return (
    <div className="min-h-screen bg-[#0A0D12] text-slate-100 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-300">
      {/* Top Header with Shared Context & 5-Step Pipeline */}
      <Header
        config={config}
        activeCluster={activeCluster}
        stage2Count={stage2Count}
        activeTab={activeTab}
        onNavigate={(tab) => setActiveTab(tab)}
        onSearch={handleGlobalSearch}
        onOpenPipelineModal={handleOpenPipelineStep}
      />

      {/* Main Container: Sidebar + Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tabId) => setActiveTab(tabId)}
          eligibleCount={eligibleCount}
          stage2Count={stage2Count}
        />

        {/* Primary Content View */}
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
          {activeTab === 'case-builder' && (
            <CaseBuilderView
              identities={identities}
              clusters={clusters}
              config={config}
              onAddIdentity={handleAddIdentity}
              onRemoveIdentity={handleRemoveIdentity}
              onImportSyntheticCase={handleImportSyntheticCase}
              onOpenStage2Modal={handleOpenStage2Modal}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectCluster={(cId) => setSelectedClusterId(cId)}
            />
          )}

          {activeTab === 'dashboard' && (
            <InvestigationDashboard
              clusters={clusters}
              config={config}
              events={events}
              auditLogs={auditLogs}
              onOpenStage2Modal={handleOpenStage2Modal}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectCluster={(cId) => setSelectedClusterId(cId)}
            />
          )}

          {activeTab === 'sources' && (
            <DataSourcesView />
          )}

          {activeTab === 'identities' && (
            <DigitalIdentitiesView
              identities={identities}
              onSelectForCorrelation={(id) => {
                setPreselectedCorrelationId(id);
                setActiveTab('correlation');
              }}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'correlation' && (
            <ActorCorrelationView
              identities={identities}
              config={config}
              preselectedId={preselectedCorrelationId}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'graph' && (
            <RelationshipGraphView 
              initialTracePath={false}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'attribution-graph' && (
            <RelationshipGraphView 
              initialTracePath={true}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'clusters' && (
            <ActorClustersView
              clusters={clusters}
              config={config}
              onOpenStage2Modal={handleOpenStage2Modal}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectCluster={(cId) => setSelectedClusterId(cId)}
            />
          )}

          {activeTab === 'evidence' && (
            <EvidenceAnalysisView
              clusters={clusters}
              selectedClusterId={selectedClusterId}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenStage2Modal={handleOpenStage2Modal}
            />
          )}

          {activeTab === 'timeline' && (
            <InvestigationTimelineView
              events={events}
              selectedClusterId={selectedClusterId}
            />
          )}

          {activeTab === 'stage2' && (
            <Stage2AttributionView
              cluster={activeCluster}
              config={config}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenStage2Modal={handleOpenStage2Modal}
            />
          )}

          {activeTab === 'candidates' && (
            <CandidateEntitiesView
              config={config}
              onNavigate={(tab) => setActiveTab(tab)}
              onTraceGraphPath={() => setActiveTab('attribution-graph')}
            />
          )}

          {activeTab === 'reports' && (
            <InvestigationReportView
              clusters={clusters}
              identities={identities}
              leads={leads}
              config={config}
              auditLogs={auditLogs}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              config={config}
              onUpdateConfig={handleUpdateConfig}
              auditLogs={auditLogs}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Critical Decision Gate Modal */}
      <Stage2ConfirmModal
        cluster={modalCluster}
        isOpen={!!modalCluster}
        onClose={() => setModalCluster(null)}
        onConfirm={handleConfirmStage2}
      />

      {/* Pipeline Step Detail Modal */}
      {pipelineStepModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0b1220] border-2 border-cyan-500/70 rounded-xl max-w-md w-full p-5 shadow-2xl relative font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{pipelineStepModal.title}</span>
              </div>
              <button onClick={() => setPipelineStepModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-4 text-slate-300 leading-relaxed font-sans">
              {pipelineStepModal.description}
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setPipelineStepModal(null)}
                className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
