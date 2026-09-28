import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { DigitalIdentity } from '../../types/investigation';
import { 
  Users, 
  Search, 
  Key, 
  Wallet, 
  Clock, 
  MessageSquare, 
  Activity, 
  ShieldCheck, 
  ExternalLink, 
  GitCompare,
  Server,
  Globe,
  FileText,
  Terminal,
  Share2,
  Calendar,
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';

export const DigitalIdentitiesView: React.FC = () => {
  const { identities, activeCase, pairwiseRelationships, selectedClusterId } = useCase();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState('ALL');
  const [selectedIdentity, setSelectedIdentity] = useState<DigitalIdentity>(identities[0] || null);
  const [activeTab, setActiveTab] = useState<'overview' | 'aliases' | 'writing' | 'activity' | 'technical' | 'infrastructure' | 'evidence'>('overview');

  const filteredIdentities = identities.filter((id) => {
    const matchesSearch = 
      id.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.aliases.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
      id.platform.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = 
      selectedPlatformFilter === 'ALL' || id.platform.toLowerCase().includes(selectedPlatformFilter.toLowerCase());

    return matchesSearch && matchesPlatform;
  });

  // Correlated pairwise relationships involving the selected identity
  const relevantPairwise = pairwiseRelationships.filter(
    rel => rel.sourceIdentityId === selectedIdentity?.id || rel.targetIdentityId === selectedIdentity?.id
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#12161E] border border-[#232A36] rounded-xl p-5 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
              STAGE 1 EVIDENCE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              CASE: {activeCase.id}
            </span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <Users className="w-5 h-5 text-orange-400" />
            <span>Digital Identities Under Investigation</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Indexed handles, alias variations, cryptographic fingerprints, and writing profiles aggregated from darknet and developer sources.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search handle, alias, platform..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0D1016] border border-[#202734] rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono w-60"
            />
          </div>

          <select
            value={selectedPlatformFilter}
            onChange={(e) => setSelectedPlatformFilter(e.target.value)}
            className="bg-[#0D1016] border border-[#202734] rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500 font-mono"
          >
            <option value="ALL">All Sources ({identities.length})</option>
            <option value="Dread">Dread Forum</option>
            <option value="XSS">XSS Marketplace</option>
            <option value="BreachForums">BreachForums Mirror</option>
            <option value="Git">Developer Repositories</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Identity List/Table + Tabbed Deep Profile Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Identies List (45%) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
            <span>Indexed Personas ({filteredIdentities.length})</span>
            <span className="text-[10px] text-orange-400">Click to inspect</span>
          </div>

          <div className="space-y-2.5">
            {filteredIdentities.map((id) => {
              const isSelected = selectedIdentity?.id === id.id;
              return (
                <div
                  key={id.id}
                  onClick={() => setSelectedIdentity(id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all shadow-md ${
                    isSelected
                      ? 'bg-[#181D26] border-orange-500/80 ring-1 ring-orange-500/40 shadow-orange-950/20'
                      : 'bg-[#12161E] border-[#232A36] hover:border-slate-700 hover:bg-[#151A24]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0D1016] border border-[#202734] flex items-center justify-center font-mono font-bold text-orange-400 text-base">
                        {id.avatarLetter}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-sm">
                            @{id.username}
                          </span>
                          <span className="text-[10px] font-mono font-semibold bg-[#181D26] text-orange-400 px-1.5 py-0.2 rounded border border-[#2A3444]">
                            {id.clusterId}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-sans mt-0.5">{id.platform}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border bg-emerald-950/50 text-emerald-400 border-emerald-800/80">
                      CORRELATED
                    </span>
                  </div>

                  {/* Known Aliases Strip */}
                  <div className="mt-3 flex flex-wrap gap-1 font-mono">
                    {id.aliases.map((alias, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] bg-[#0D1016] text-slate-400 px-1.5 py-0.5 rounded border border-[#202734]"
                      >
                        ~{alias}
                      </span>
                    ))}
                  </div>

                  {/* Summary Bar */}
                  <div className="mt-3 pt-2.5 border-t border-[#1E2430] flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{id.temporal.activeHoursUtc.split(' ')[0]} UTC</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Key className="w-3 h-3 text-slate-500" />
                      <span>{id.technical.pgpKeyId}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Tabbed Identity Inspector (55%) (Requirement #7) */}
        <div className="lg:col-span-7">
          {selectedIdentity && (
            <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-4 shadow-xl sticky top-20">
              {/* Identity Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#1E2430]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold font-mono text-white">
                      @{selectedIdentity.username}
                    </h2>
                    <span className="text-xs font-mono bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30 font-semibold">
                      {selectedIdentity.clusterId}
                    </span>
                    <span className="text-xs font-mono bg-[#181D26] text-slate-300 px-2 py-0.5 rounded border border-[#262F3E]">
                      Role: {selectedIdentity.behavioural.primaryRole}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    Observed Range: {selectedIdentity.firstSeen} &rarr; {selectedIdentity.lastSeen}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/cases/${activeCase.id}/correlation`)}
                  className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-orange-950/60"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>Compare Correlation</span>
                </button>
              </div>

              {/* Requirement #7 Tab Navigation */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-[#1E2430] text-xs font-mono">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-[#181D26]'
                  }`}
                >
                  Overview
                </button>

                <button
                  onClick={() => setActiveTab('aliases')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'aliases'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-[#181D26]'
                  }`}
                >
                  Known Aliases ({selectedIdentity.aliases.length})
                </button>

                <button
                  onClick={() => setActiveTab('writing')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'writing'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-[#181D26]'
                  }`}
                >
                  Writing Samples
                </button>

                <button
                  onClick={() => setActiveTab('activity')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'activity'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-[#181D26]'
                  }`}
                >
                  Activity Pattern
                </button>

                <button
                  onClick={() => setActiveTab('technical')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'technical'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-[#181D26]'
                  }`}
                >
                  PGP & Wallets
                </button>

                <button
                  onClick={() => setActiveTab('infrastructure')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'infrastructure'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-[#181D26]'
                  }`}
                >
                  Domains & Infra
                </button>

                <button
                  onClick={() => setActiveTab('evidence')}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'evidence'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-[#181D26]'
                  }`}
                >
                  Evidence Refs ({relevantPairwise.length})
                </button>
              </div>

              {/* Tab 1: Identity Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Platform of Ingestion:</span>
                      <span className="text-white font-bold">{selectedIdentity.platform}</span>
                    </div>

                    <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Assigned Cluster:</span>
                      <span className="text-orange-400 font-bold">{selectedIdentity.clusterId}</span>
                    </div>

                    <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Primary Modus Operandi:</span>
                      <span className="text-slate-200">{selectedIdentity.behavioural.primaryRole}</span>
                    </div>

                    <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">OPSEC Discipline:</span>
                      <span className="text-emerald-400 font-bold">{selectedIdentity.behavioural.opsecDiscipline}</span>
                    </div>
                  </div>

                  <div className="bg-[#0D1016] border border-[#1E2430] p-3.5 rounded-lg space-y-1.5">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Investigative Context:</span>
                    <p className="text-slate-300 font-sans leading-relaxed text-xs">
                      Persona @{selectedIdentity.username} was ingested via automated darknet crawler telemetry monitoring {selectedIdentity.platform}. Demonstrates recurring syntactic, temporal, and cryptographic commonality with the primary cluster threat actor.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Known Aliases */}
              {activeTab === 'aliases' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">
                    Recorded Alias Variants & Derivations:
                  </span>
                  <div className="space-y-2">
                    {selectedIdentity.aliases.map((alias, i) => (
                      <div key={i} className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg flex items-center justify-between">
                        <div>
                          <span className="text-white font-bold">~{alias}</span>
                          <span className="text-slate-500 text-[10px] block font-sans">Historical Token Derivation</span>
                        </div>
                        <span className="text-[10px] bg-orange-950 text-orange-400 px-2 py-0.5 rounded border border-orange-900/60 font-semibold">
                          Stem Match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Writing Samples */}
              {activeTab === 'writing' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <div className="bg-[#0D1016] border border-[#1E2430] p-3.5 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] border-b border-[#1E2430] pb-1.5">
                      <span className="font-bold text-orange-400">EXTRACTED DARKNET FORUM POST SAMPLE</span>
                      <span>NLP TTR: {selectedIdentity.stylometry.vocabularyRichnessTTR}</span>
                    </div>

                    <div className="p-3 rounded bg-[#151A24] border border-[#202836] text-orange-300/90 italic leading-relaxed text-xs">
                      "{selectedIdentity.stylometry.sampleText}"
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div>
                        <span className="text-slate-500 text-[10px] block">Punctuation Habit:</span>
                        <span className="text-white font-semibold">{selectedIdentity.stylometry.punctuationHabit}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Sentence Structure:</span>
                        <span className="text-white font-semibold">{selectedIdentity.stylometry.avgSentenceLength} words/sentence</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Activity Pattern */}
              {activeTab === 'activity' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Diurnal Active Window:</span>
                      <span className="text-white font-bold">{selectedIdentity.temporal.activeHoursUtc}</span>
                    </div>

                    <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Derived Timezone:</span>
                      <span className="text-orange-400 font-bold">{selectedIdentity.temporal.timezoneEstimate}</span>
                    </div>

                    <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Peak Operational Day:</span>
                      <span className="text-white font-bold">{selectedIdentity.temporal.peakDay}</span>
                    </div>

                    <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Burst Frequency:</span>
                      <span className="text-slate-200">{selectedIdentity.temporal.burstFrequency}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Technical Indicators */}
              {activeTab === 'technical' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <div className="bg-[#0D1016] border border-[#1E2430] p-3.5 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">OpenPGP Key Signature:</span>
                      <span className="text-emerald-400 font-bold text-[10px]">RSA 4096-bit</span>
                    </div>
                    <div className="p-2 rounded bg-[#151A24] border border-[#202836] text-white font-bold">
                      {selectedIdentity.technical.pgpKeyId}
                    </div>
                  </div>

                  <div className="bg-[#0D1016] border border-[#1E2430] p-3.5 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Bitcoin Wallet Address:</span>
                      <span className="text-orange-400 font-bold text-[10px]">{selectedIdentity.technical.walletType}</span>
                    </div>
                    <div className="p-2 rounded bg-[#151A24] border border-[#202836] text-slate-200 break-all text-[11px]">
                      {selectedIdentity.technical.cryptoWallets[0] || 'No published UTXO address'}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 6: Domains & Infrastructure */}
              {activeTab === 'infrastructure' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Hosting & Proxy Nodes:</span>
                    {selectedIdentity.technical.infrastructureIps.map((ip, i) => (
                      <div key={i} className="flex items-center justify-between text-slate-200 p-2 rounded bg-[#151A24]">
                        <span className="font-bold">{ip}</span>
                        <span className="text-slate-500 text-[10px]">AS206238 FlokiNET/Njalla</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Target Gateway Mirrors:</span>
                    <div className="flex items-center justify-between text-slate-200 p-2 rounded bg-[#151A24]">
                      <span className="font-bold text-orange-400">darkx17-vault.is</span>
                      <span className="text-emerald-400 text-[10px]">Active Mirror</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 7: Evidence References */}
              {activeTab === 'evidence' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Bilateral Correlation Records ({relevantPairwise.length}):
                  </span>
                  <div className="space-y-2">
                    {relevantPairwise.map((pw) => (
                      <div key={pw.id} className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white">@{pw.sourceUsername} &harr; @{pw.targetUsername}</div>
                          <div className="text-[10px] text-slate-400 font-sans">{pw.relationshipType}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-orange-400 font-bold text-sm">{pw.overallScore}%</span>
                          <span className="text-[9px] text-slate-500 block uppercase">Strength</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
