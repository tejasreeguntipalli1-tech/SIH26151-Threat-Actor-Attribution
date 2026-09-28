import React, { useState } from 'react';
import { 
  ActorCluster, 
  DigitalIdentity, 
  InvestigationConfig, 
  AuditLogItem 
} from '../../types/investigation';
import { 
  Plus, 
  Trash2, 
  Eye, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Fingerprint, 
  GitMerge, 
  Share2, 
  FileText, 
  Clock, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Layers, 
  Server, 
  Globe, 
  Key, 
  Wallet, 
  User, 
  Check, 
  X, 
  RefreshCw, 
  Info, 
  ChevronDown, 
  ChevronUp,
  FileCheck2,
  Database
} from 'lucide-react';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { EvidenceCounter } from '../common/EvidenceCounter';

interface CaseBuilderViewProps {
  identities: DigitalIdentity[];
  clusters: ActorCluster[];
  config: InvestigationConfig;
  onAddIdentity: (identity: Partial<DigitalIdentity>) => void;
  onRemoveIdentity: (id: string) => void;
  onImportSyntheticCase: () => void;
  onOpenStage2Modal: (cluster: ActorCluster) => void;
  onNavigate: (tabId: string) => void;
  onSelectCluster: (clusterId: string) => void;
}

export const CaseBuilderView: React.FC<CaseBuilderViewProps> = ({
  identities,
  clusters,
  config,
  onAddIdentity,
  onRemoveIdentity,
  onImportSyntheticCase,
  onOpenStage2Modal,
  onNavigate,
  onSelectCluster
}) => {
  // Selected identity for View modal
  const [selectedIdentity, setSelectedIdentity] = useState<DigitalIdentity | null>(null);

  // Form toggle state
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // New Identity form fields
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPlatform, setNewPlatform] = useState<string>('Forum-X (Dread)');
  const [newIdentityType, setNewIdentityType] = useState<string>('Forum Account');
  const [newObservedDate, setNewObservedDate] = useState<string>('2026-08-28 14:00 UTC');
  const [newSource, setNewSource] = useState<string>('BreachForums Database Mirror #17');
  const [newNotes, setNewNotes] = useState<string>('');

  // Correlation simulation state
  const [correlationState, setCorrelationState] = useState<'idle' | 'running' | 'complete'>('complete');
  const [correlationStep, setCorrelationStep] = useState<number>(4);
  const [selectedEvidenceItem, setSelectedEvidenceItem] = useState<{
    title: string;
    type: string;
    confidence: string;
    source: string;
    details: string;
    rawPayload: string;
  } | null>(null);

  // Active Cluster A
  const clusterA = clusters.find(c => c.id === 'Actor Cluster A') || clusters[0];

  // Pipeline stages definition
  const pipelineStages = [
    { id: 'identities', label: '1. DIGITAL IDENTITIES', status: 'COMPLETE', tab: 'identities', desc: 'Ingested raw handles & forensic feeds' },
    { id: 'extraction', label: '2. FEATURE EXTRACTION', status: 'COMPLETE', tab: 'identities', desc: 'Extracted stylometric n-grams & keys' },
    { id: 'correlation', label: '3. MULTI-SIGNAL CORRELATION', status: correlationState === 'complete' ? 'COMPLETE' : correlationState === 'running' ? 'RUNNING' : 'READY', tab: 'correlation', desc: 'Scored pairwise similarity dimensions' },
    { id: 'graph', label: '4. RELATIONSHIP GRAPH', status: 'COMPLETE', tab: 'graph', desc: 'Topological evidence graph built' },
    { id: 'clusters', label: '5. ACTOR CLUSTERS', status: 'COMPLETE', tab: 'clusters', desc: 'Synthesized Actor Cluster A' },
    { id: 'strength', label: '6. ACTOR EVIDENCE STRENGTH', status: 'COMPLETE', tab: 'clusters', desc: 'Calculated 92% aggregate confidence' },
    { id: 'validation', label: '7. INVESTIGATOR VALIDATION', status: clusterA.stage2Initiated ? 'COMPLETE' : 'REQUIRES VALIDATION', tab: 'clusters', desc: 'Mandatory human confirmation gate' },
    { id: 'eligibility', label: '8. STAGE 2 ELIGIBILITY', status: clusterA.actorCorrelationScore >= config.stage2Threshold ? 'ELIGIBLE' : 'LOCKED', tab: 'stage2', desc: 'Threshold 80% met (Score: 92%)' },
    { id: 'stage2', label: '9. REAL-WORLD ATTRIBUTION', status: clusterA.stage2Initiated ? 'RUNNING' : 'READY', tab: 'stage2', desc: 'Entity resolution across 6 dimensions' },
    { id: 'human-val', label: '10. HUMAN VALIDATION', status: 'MANDATORY', tab: 'stage2', desc: 'Judicial attribution sign-off' }
  ];

  // Handle run correlation processing sequence
  const handleRunCorrelation = () => {
    setCorrelationState('running');
    setCorrelationStep(1);

    setTimeout(() => {
      setCorrelationStep(2);
    }, 600);

    setTimeout(() => {
      setCorrelationStep(3);
    }, 1200);

    setTimeout(() => {
      setCorrelationStep(4);
      setCorrelationState('complete');
    }, 1800);
  };

  // Form submit handler
  const handleCreateIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) return;

    onAddIdentity({
      username: newUsername.trim(),
      platform: newPlatform,
      firstSeen: newObservedDate,
      lastSeen: newObservedDate,
      avatarLetter: newUsername.charAt(0).toUpperCase(),
      status: 'ACTIVE',
      riskRating: 'HIGH',
      clusterId: 'Actor Cluster A',
      stylometry: {
        avgSentenceLength: 14.0,
        vocabularyRichnessTTR: 0.65,
        punctuationHabit: 'Double hyphens (--), lowercase syntax',
        casingHabit: 'lowercase',
        sampleText: newNotes || 'manual forensic entry -- awaiting automated NLP processing',
        distinctivePhrases: ['escrow mandatory', 'verified pgp']
      },
      behavioural: {
        primaryRole: newIdentityType,
        tradingMethod: 'Escrow',
        opsecDiscipline: 'STRICT',
        forumSections: ['Marketplace'],
        antiForensicHabits: ['Tor routing']
      },
      temporal: {
        activeHoursUtc: '20:00 - 02:00 UTC',
        peakDay: 'Friday',
        timezoneEstimate: 'UTC+03:00',
        burstFrequency: 'Moderate'
      },
      technical: {
        pgpKeyId: '0x7E4A8F2C91B4',
        cryptoWallets: ['bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'],
        walletType: 'BTC SegWit',
        onionAddresses: [],
        infrastructureIps: ['185.220.101.45'],
        userAgents: ['Tor Browser 115.0']
      }
    });

    setNewUsername('');
    setNewNotes('');
    setShowAddForm(false);
  };

  // Forensic evidence explainability items
  const explainabilityItems = [
    {
      title: 'Deterministic PGP Key ID Match',
      type: 'Cryptographic Indicator',
      confidence: '100% Deterministic',
      source: 'Keyserver hkp://keys.openpgp.org & Dread Escrow Signatures',
      details: 'RSA-4096 cryptographic signature verified across all three handles (@shadow_x17, @x_shadow, @darkx17). The public key ID 0x7E4A8F2C91B4 possesses an identical 160-bit SHA-1 fingerprint (9B2E 7E4A 8F2C 91B4 55F0 3341 A1C9 8021 6F5D E017) created on 2024-02-19.',
      rawPayload: '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP v4 (GnuPG v2.2.27)\nComment: KeyID 0x7E4A8F2C91B4 [shadow_x17_official]\nmQINBFnK4... verified on Dread subforum 4091\n-----END PGP PUBLIC KEY BLOCK-----'
    },
    {
      title: 'Stylometric Syntax & Orthography Fingerprint',
      type: 'Behavioral Stylometry',
      confidence: 'Cosine Similarity: 0.91',
      source: 'Natural Language Processing Model (TF-IDF & N-Gram Cosine)',
      details: 'Identical syntactic patterns: 100% sentence-starts strictly lowercased, pervasive double hyphen delimiters ("--") used exclusively as clause separators, zero exclamation marks, and high-frequency stem recurrence ("escrow mandatory or no deal", "clean dump", "pm with pgp").',
      rawPayload: 'Sample Analysis Comparison:\n- @shadow_x17: "new dump verified from tier-1 telecom -- ready for escrow."\n- @x_shadow: "selling vpn access to eu energy firm -- serious buyers only."\n- @darkx17: "db release thread updated -- mirror deployed at darkx17-vault.is."\nOrthographic overlap coefficient: 0.912'
    },
    {
      title: 'Co-Occurring Bitcoin Native SegWit Wallet Cluster',
      type: 'Financial Blockchain Ledger',
      confidence: '95% Confidence (UTXO Cluster)',
      source: 'BlockCypher & Chainalysis Transaction Ledger #842109',
      details: 'Direct on-chain wallet reuse: Address bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh co-mingled transaction inputs in Bitcoin block 842109. Funds from Dread escrow and BreachForums subscriptions consolidated into identical Wasabi CoinJoin mixer whirlpool.',
      rawPayload: 'TxID: 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b\nInput 0: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh (0.428 BTC)\nOutput 0: 185.220.101.45 Hosting Lease Payment (0.015 BTC)\nOutput 1: Wasabi CoinJoin Whirlpool Pool (0.413 BTC)'
    },
    {
      title: 'Synchronized UTC Diurnal Activity Window',
      type: 'Temporal Telemetry',
      confidence: '89% Diurnal Correlation',
      source: 'Server Timestamps from Forum Posts and Telegram Dispatches',
      details: 'Posts occur strictly between 20:00 UTC and 04:00 UTC (peak density Thursday, Friday, and Saturday nights). The 8-hour diurnal quiet period indicates a sleep cycle aligned with UTC+03:00 / UTC+03:30 (Eastern Europe / Middle East timezone).',
      rawPayload: 'Telemetry Histogram:\n20:00 - 22:00 UTC: 34 posts\n22:00 - 01:00 UTC: 88 posts (Peak)\n01:00 - 04:00 UTC: 41 posts\n04:00 - 18:00 UTC: 2 posts (Complete operational silence)'
    },
    {
      title: 'Colocated Reverse Proxy Infrastructure',
      type: 'Infrastructure Telemetry',
      confidence: '90% Hosting Infrastructure',
      source: 'Netcraft & Censys SSL Scanner Certificate Log',
      details: 'Darknet onion gateway redirects terminate at clear-web IP 185.220.101.45 (Njalla / FlokiNET bulletproof colo). Staging SSL certificate on darkx17-vault.is explicitly links reverse proxy to leak portal.',
      rawPayload: 'IP: 185.220.101.45\nASN: AS48231 (FlokiNET Ltd)\nOpen Ports: 80, 443, 2222\nSSL Subject: CN=darkx17-vault.is\nIssuer: Let\'s Encrypt Authority R3\nDNS Record: darkx17-vault.is -> 185.220.101.45'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Philosophy Header */}
      <div className="bg-gradient-to-r from-[#0a101d] via-[#0d1627] to-[#0a101d] border-b-2 border-cyan-500/40 -mx-6 -mt-6 p-6 pb-5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                CASE WORKSTATION
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
                CASE: {config.investigationId}
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                WARRANT #CR-2026-8819 ACTIVE
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
              <FileCheck2 className="w-6 h-6 text-cyan-400" />
              <span>Investigation Case Builder</span>
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Ingest multi-source darknet handles, execute AI correlation pipeline, and evaluate Stage 2 attribution eligibility.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={onImportSyntheticCase}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-mono font-semibold transition-all shadow-md hover:shadow-cyan-950/50"
              title="Reload canonical Smart India Hackathon synthetic case INV-2026-0151"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>IMPORT SYNTHETIC CASE</span>
            </button>

            <button
              onClick={() => onNavigate('stage2')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-emerald-950/50 border border-emerald-400/40"
            >
              <Fingerprint className="w-4 h-4 text-emerald-200" />
              <span>STAGE 2 ATTRIBUTION</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Workstation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Case Inputs & Digital Identity Ingestion (3 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Digital Identities
                </h2>
              </div>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                {identities.length} Loaded
              </span>
            </div>

            {/* Add Identity Button / Form Toggle */}
            <div>
              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full py-2 px-3 rounded-lg border border-dashed border-cyan-500/40 hover:border-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 hover:text-white text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-cyan-400" />
                  <span>+ Ingest Digital Identity</span>
                </button>
              ) : (
                <form onSubmit={handleCreateIdentity} className="bg-[#070b14] border border-slate-700/80 rounded-lg p-3 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-[11px] font-bold text-slate-200">New Handle Form</span>
                    <button 
                      type="button" 
                      onClick={() => setShowAddForm(false)}
                      className="text-slate-400 hover:text-white text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Handle / Username *</label>
                    <input
                      type="text"
                      placeholder="e.g. @dark_broker17"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full bg-[#0b1220] border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Platform</label>
                    <select
                      value={newPlatform}
                      onChange={(e) => setNewPlatform(e.target.value)}
                      className="w-full bg-[#0b1220] border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Forum-X (Dread)">Forum-X (Dread)</option>
                      <option value="Market-Y (XSS)">Market-Y (XSS)</option>
                      <option value="Chat-Z (BreachForums)">Chat-Z (BreachForums)</option>
                      <option value="Exploit.in">Exploit.in</option>
                      <option value="Telegram">Telegram Channel</option>
                      <option value="Jabber / OTR">Jabber / OTR Server</option>
                      <option value="Wickr / Session">Wickr / Session</option>
                      <option value="Git Commits">Public Git Commits</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Identity Type</label>
                    <select
                      value={newIdentityType}
                      onChange={(e) => setNewIdentityType(e.target.value)}
                      className="w-full bg-[#0b1220] border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Forum Account">Forum Account</option>
                      <option value="Messaging Persona">Messaging Persona</option>
                      <option value="Initial Access Broker">Initial Access Broker</option>
                      <option value="Infrastructure Operator">Infrastructure Operator</option>
                      <option value="PGP Keyring Identity">PGP Keyring Identity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Source / Context</label>
                    <input
                      type="text"
                      value={newSource}
                      onChange={(e) => setNewSource(e.target.value)}
                      className="w-full bg-[#0b1220] border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Notes / Sample Text</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. escrow mandatory -- check pgp..."
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      className="w-full bg-[#0b1220] border border-slate-700 rounded px-2.5 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs resize-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Add to Case
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Ingested Identities List */}
            <div className="space-y-2.5">
              {identities.map((idItem) => (
                <div 
                  key={idItem.id} 
                  className="bg-[#070b14] border border-slate-800 hover:border-slate-700 rounded-lg p-3 space-y-2 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-slate-800 text-cyan-400 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs">
                        {idItem.avatarLetter}
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                          @{idItem.username}
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans truncate max-w-[130px]">
                          {idItem.platform}
                        </div>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/80">
                      {idItem.riskRating}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-1.5">
                    <span>First Seen:</span>
                    <span className="text-slate-300">{idItem.firstSeen.split(' ')[0]}</span>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 pt-0.5">
                    <button
                      onClick={() => setSelectedIdentity(idItem)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-mono transition-colors"
                      title="Inspect Raw Telemetry"
                    >
                      <Eye className="w-3 h-3 text-cyan-400" />
                      <span>VIEW</span>
                    </button>
                    {identities.length > 2 && (
                      <button
                        onClick={() => onRemoveIdentity(idItem.id)}
                        className="p-1 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 text-[10px] transition-colors"
                        title="Remove from Case"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Ingestion Tip */}
            <div className="bg-[#070b14] border border-cyan-950 rounded-lg p-2.5 text-[11px] text-slate-400 font-sans flex items-start gap-2">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                Ingested handles retain raw forensic hashes and PGP credentials for deterministic correlation.
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER COLUMN: Interactive Pipeline & Stage 1 Result Card (6 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Interactive Pipeline Card */}
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Investigation Pipeline
                </h2>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                CLICK ANY STAGE TO INSPECT
              </span>
            </div>

            {/* Stepper Pipeline Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {pipelineStages.map((stage, idx) => {
                const isComplete = stage.status === 'COMPLETE';
                const isRunning = stage.status === 'RUNNING';
                const isEligible = stage.status === 'ELIGIBLE';
                const isRequiresVal = stage.status === 'REQUIRES VALIDATION';
                const isMandatory = stage.status === 'MANDATORY';
                
                return (
                  <button
                    key={stage.id}
                    onClick={() => onNavigate(stage.tab)}
                    className={`text-left p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                      isComplete
                        ? 'bg-slate-900/90 border-emerald-500/60 hover:border-emerald-400'
                        : isRunning
                          ? 'bg-cyan-950/40 border-cyan-500 animate-pulse'
                          : isEligible
                            ? 'bg-emerald-950/40 border-emerald-400 text-emerald-200'
                            : isRequiresVal
                              ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                              : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono font-bold text-slate-200 truncate">
                        {stage.label}
                      </div>
                      <div className="text-[9px] text-slate-400 font-sans mt-0.5 line-clamp-1">
                        {stage.desc}
                      </div>
                    </div>

                    <div className="mt-2 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                      <span className={`text-[8px] font-mono font-bold px-1 py-0.5 rounded ${
                        isComplete
                          ? 'bg-emerald-950 text-emerald-300'
                          : isRunning
                            ? 'bg-cyan-900 text-cyan-200'
                            : isEligible
                              ? 'bg-emerald-900 text-emerald-200'
                              : isRequiresVal
                                ? 'bg-amber-900 text-amber-200'
                                : 'bg-slate-800 text-slate-400'
                      }`}>
                        {stage.status}
                      </span>
                      <ArrowRight className="w-2.5 h-2.5 text-slate-500" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Run Actor Correlation Action Banner */}
            <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <GitMerge className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Correlation Engine
                  </span>
                  {correlationState === 'complete' && (
                    <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  {correlationState === 'running' 
                    ? `Processing Step ${correlationStep}/4: Calculating pairwise similarity vectors...`
                    : 'Correlates handles across stylometry, PGP keyrings, crypto UTXOs, and infrastructure.'}
                </p>
              </div>

              <button
                onClick={handleRunCorrelation}
                disabled={correlationState === 'running'}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  correlationState === 'running'
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 cursor-wait'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/60 border border-cyan-400/50'
                }`}
              >
                {correlationState === 'running' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                    <span>CORRELATING...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>RUN ACTOR CORRELATION</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STAGE 1 RESULT CARD: Actor Cluster A */}
          {/* ========================================================================= */}
          <div className="bg-[#0b1220] border-2 border-emerald-500/50 rounded-xl p-5 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header with Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    STAGE 1 CORRELATED CLUSTER
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                    3 HANDLES LINKED
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <span>{clusterA.codename}</span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <ConfidenceBadge 
                  score={clusterA.actorCorrelationScore} 
                  band={clusterA.classification} 
                  size="lg" 
                />
              </div>
            </div>

            {/* Supporting / Conflicting / Unknown Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="bg-[#070b14] border border-emerald-950 rounded-lg p-2.5">
                <span className="text-[10px] text-slate-400 block uppercase">Supporting</span>
                <span className="text-sm font-bold text-emerald-400">11 Verified</span>
              </div>
              <div className="bg-[#070b14] border border-red-950 rounded-lg p-2.5">
                <span className="text-[10px] text-slate-400 block uppercase">Conflicting</span>
                <span className="text-sm font-bold text-amber-400">1 Logged</span>
              </div>
              <div className="bg-[#070b14] border border-slate-800 rounded-lg p-2.5">
                <span className="text-[10px] text-slate-400 block uppercase">Unknown / Gaps</span>
                <span className="text-sm font-bold text-slate-400">2 Pending</span>
              </div>
            </div>

            {/* Stage 2 Eligibility Callout Banner */}
            <div className="bg-gradient-to-r from-emerald-950/60 to-[#070b14] border border-emerald-500/50 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>STAGE 2 ELIGIBLE — CRITICAL DECISION GATE CLEARED</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Correlation evidence strength (92%) exceeds the 80% threshold. Stage 2 Real-World Attribution may be formally initiated.
                </p>
              </div>

              <button
                onClick={() => onOpenStage2Modal(clusterA)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/70 border border-emerald-400 flex-shrink-0"
              >
                <Fingerprint className="w-4 h-4 text-emerald-200" />
                <span>INITIATE STAGE 2 ATTRIBUTION</span>
              </button>
            </div>

            {/* "WHY ARE THESE IDENTITIES CONNECTED?" Forensic Explainability Drawer */}
            <div className="border border-slate-800 rounded-lg overflow-hidden">
              <div className="bg-[#070b14] p-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Why Are These Identities Connected?
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  5 DETERMINISTIC EVIDENCE SIGNALS
                </span>
              </div>

              <div className="divide-y divide-slate-800/80 bg-[#060a12]">
                {explainabilityItems.map((item, i) => (
                  <div 
                    key={i} 
                    className="p-3 hover:bg-[#090e1a] transition-colors cursor-pointer group"
                    onClick={() => setSelectedEvidenceItem(item)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-bold text-cyan-300 group-hover:text-cyan-200">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                          {item.details}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0 font-mono">
                        <span className="text-[10px] font-bold text-emerald-400 block">
                          {item.confidence}
                        </span>
                        <span className="text-[9px] text-cyan-400 group-hover:underline flex items-center gap-1 justify-end mt-1">
                          <span>Inspect Raw</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Case Summary & Investigation Metrics (3 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Case Summary
                </h2>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                ACTIVE
              </span>
            </div>

            {/* Case Dossier Header */}
            <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[10px]">CASE ID:</span>
                <span className="text-white font-bold">{config.investigationId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[10px]">INVESTIGATOR:</span>
                <span className="text-cyan-300 font-semibold truncate max-w-[130px]">{config.leadInvestigator.split(' ')[0]} {config.leadInvestigator.split(' ')[1]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[10px]">THRESHOLD:</span>
                <span className="text-amber-300 font-bold">{config.stage2Threshold}% Min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[10px]">JURISDICTION:</span>
                <span className="text-slate-300">Interpol / CCBI</span>
              </div>
            </div>

            {/* Case-Centric Metrics Grid */}
            <div className="space-y-2 font-mono">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Investigative Metrics
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#070b14] border border-slate-800 rounded p-2 text-center">
                  <div className="text-base font-bold text-white">{identities.length}</div>
                  <div className="text-[9px] text-slate-400 uppercase">Identities</div>
                </div>
                <div className="bg-[#070b14] border border-slate-800 rounded p-2 text-center">
                  <div className="text-base font-bold text-cyan-400">7</div>
                  <div className="text-[9px] text-slate-400 uppercase">Relationships</div>
                </div>
                <div className="bg-[#070b14] border border-slate-800 rounded p-2 text-center">
                  <div className="text-base font-bold text-white">{clusters.length}</div>
                  <div className="text-[9px] text-slate-400 uppercase">Clusters</div>
                </div>
                <div className="bg-[#070b14] border border-slate-800 rounded p-2 text-center">
                  <div className="text-base font-bold text-emerald-400">18</div>
                  <div className="text-[9px] text-slate-400 uppercase">Evidence Items</div>
                </div>
                <div className="bg-[#070b14] border border-emerald-950 rounded p-2 text-center">
                  <div className="text-base font-bold text-emerald-300">1</div>
                  <div className="text-[9px] text-emerald-400 uppercase">Stage 2 Eligible</div>
                </div>
                <div className="bg-[#070b14] border border-cyan-950 rounded p-2 text-center">
                  <div className="text-base font-bold text-cyan-300">2</div>
                  <div className="text-[9px] text-cyan-400 uppercase">Attribution Leads</div>
                </div>
              </div>

              <div className="bg-[#070b14] border border-amber-950/80 rounded p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] text-slate-300">Pending Validation:</span>
                </div>
                <span className="text-xs font-bold text-amber-300">1 Candidate</span>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="space-y-2 pt-1 font-mono">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Quick Navigation
              </span>

              <button
                onClick={() => onNavigate('graph')}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Relationship Graph</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </button>

              <button
                onClick={() => onNavigate('timeline')}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Investigation Timeline</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </button>

              <button
                onClick={() => onNavigate('reports')}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generate Dossier Report</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mission / Core Principle Statement Banner */}
      <div className="bg-[#0b1220] border-t-2 border-cyan-500/50 rounded-xl p-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold">
              AI
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                AI FINDS PATTERNS. GRAPH CONNECTS EVIDENCE. INVESTIGATORS VALIDATE ATTRIBUTION.
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                Core Legal Mandate: Correlation ≠ Identification &nbsp;|&nbsp; Attribution Lead ≠ Confirmed Identity
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center text-[10px] font-mono text-slate-400">
            <span className="px-2 py-1 rounded bg-[#070b14] border border-slate-800">
              Zero Autonomous Verdicts
            </span>
            <span className="px-2 py-1 rounded bg-[#070b14] border border-slate-800">
              Judicial Admissibility Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Modal: View Digital Identity Raw Telemetry */}
      {selectedIdentity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0b1220] border-2 border-cyan-500/70 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative font-mono text-xs max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center font-bold">
                  {selectedIdentity.avatarLetter}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono">
                    @{selectedIdentity.username} — Raw Ingestion Dossier
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    Platform: {selectedIdentity.platform} | Risk: {selectedIdentity.riskRating}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedIdentity(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="bg-[#070b14] p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">First Seen:</span>
                  <span className="text-slate-200">{selectedIdentity.firstSeen}</span>
                </div>
                <div className="bg-[#070b14] p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Last Seen:</span>
                  <span className="text-slate-200">{selectedIdentity.lastSeen}</span>
                </div>
              </div>

              {/* Technical indicators */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                  Cryptographic & Infrastructure Fingerprints
                </span>
                <div className="bg-[#070b14] p-3 rounded border border-slate-800 space-y-2 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">PGP Key ID / Fingerprint:</span>
                    <span className="text-cyan-300 font-semibold">{selectedIdentity.technical.pgpKeyId}</span>
                    {selectedIdentity.technical.pgpFingerprint && (
                      <span className="text-slate-400 block text-[10px] mt-0.5">{selectedIdentity.technical.pgpFingerprint}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Crypto Wallets:</span>
                    <span className="text-emerald-400">{selectedIdentity.technical.cryptoWallets.join(', ') || 'None recorded'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Infrastructure IPs:</span>
                    <span className="text-amber-300">{selectedIdentity.technical.infrastructureIps.join(', ') || 'Tor only'}</span>
                  </div>
                </div>
              </div>

              {/* Stylometry sample */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                  Forensic Stylometry Sample Text
                </span>
                <p className="bg-[#070b14] border border-slate-800 rounded p-3 text-slate-300 italic font-serif leading-relaxed">
                  "{selectedIdentity.stylometry.sampleText}"
                </p>
              </div>

              {/* Distinctive phrases */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-slate-400 font-mono uppercase">Key N-Grams:</span>
                {selectedIdentity.stylometry.distinctivePhrases.map((phrase, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    "{phrase}"
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedIdentity(null)}
                className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Raw Evidence Source / Payload */}
      {selectedEvidenceItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0b1220] border-2 border-cyan-500/70 rounded-xl max-w-xl w-full p-5 shadow-2xl relative font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                  {selectedEvidenceItem.type}
                </span>
                <h3 className="text-sm font-bold text-white mt-1">
                  {selectedEvidenceItem.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedEvidenceItem(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 font-sans text-xs">
              <div className="bg-[#070b14] p-2.5 rounded border border-slate-800 font-mono text-[11px]">
                <span className="text-slate-400 block text-[10px] uppercase">Provenance Source:</span>
                <span className="text-slate-200">{selectedEvidenceItem.source}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">
                  Evidentiary Synthesis:
                </span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {selectedEvidenceItem.details}
                </p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1 font-mono">
                  Raw Telemetry Payload:
                </span>
                <pre className="bg-[#050811] p-3 rounded border border-slate-800 text-cyan-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-tight">
                  {selectedEvidenceItem.rawPayload}
                </pre>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedEvidenceItem(null)}
                className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
