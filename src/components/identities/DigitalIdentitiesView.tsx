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
  Filter,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileCode2,
  Fingerprint
} from 'lucide-react';

export type IdentityTabType = 
  | 'overview' 
  | 'aliases' 
  | 'writing' 
  | 'writing-characteristics' 
  | 'activity' 
  | 'technical' 
  | 'pgp' 
  | 'wallets' 
  | 'infrastructure' 
  | 'evidence';

export const DigitalIdentitiesView: React.FC = () => {
  const { identities, activeCase, pairwiseRelationships, selectedClusterId } = useCase();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState('ALL');
  const [selectedIdentity, setSelectedIdentity] = useState<DigitalIdentity>(identities[0] || null);
  const [activeTab, setActiveTab] = useState<IdentityTabType>('overview');

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

  const tabs: { id: IdentityTabType; label: string; count?: number }[] = [
    { id: 'overview', label: 'Identity Overview' },
    { id: 'aliases', label: 'Known Aliases', count: selectedIdentity?.aliases.length },
    { id: 'writing', label: 'Writing Samples' },
    { id: 'writing-characteristics', label: 'Writing Characteristics' },
    { id: 'activity', label: 'Activity Pattern' },
    { id: 'technical', label: 'Technical Indicators' },
    { id: 'pgp', label: 'PGP Indicators' },
    { id: 'wallets', label: 'Wallet Indicators' },
    { id: 'infrastructure', label: 'Domains / Infrastructure' },
    { id: 'evidence', label: 'Evidence References', count: relevantPairwise.length }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#12161E] border border-[#232A36] rounded-xl p-5 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-[#C85F0A]/15 text-[#E97817] px-2.5 py-0.5 rounded border border-[#C85F0A]/40 uppercase tracking-wider">
              STAGE 1 EVIDENCE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              CASE: {activeCase.id}
            </span>
            <span className="text-xs text-slate-600 font-mono">|</span>
            <span className="text-xs text-slate-400 font-mono">
              PERSONA PROFILER
            </span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <Users className="w-5 h-5 text-[#E97817]" />
            <span>Digital Identities Under Investigation</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Indexed darknet handles, alias variations, cryptographic fingerprints, and writing profiles aggregated from darknet and developer sources.
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
              className="bg-[#0D1016] border border-[#202734] rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#E97817] font-mono w-60"
            />
          </div>

          <select
            value={selectedPlatformFilter}
            onChange={(e) => setSelectedPlatformFilter(e.target.value)}
            className="bg-[#0D1016] border border-[#202734] rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#E97817] font-mono"
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
        {/* Left Column: Identities List (40%) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
            <span>Indexed Personas ({filteredIdentities.length})</span>
            <span className="text-[10px] text-[#E97817]">Select to inspect</span>
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
                      ? 'bg-[#181D26] border-[#C85F0A] ring-1 ring-[#C85F0A]/50 shadow-orange-950/30'
                      : 'bg-[#12161E] border-[#232A36] hover:border-slate-700 hover:bg-[#151A24]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0D1016] border border-[#202734] flex items-center justify-center font-mono font-bold text-[#E97817] text-base">
                        {id.avatarLetter}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-sm">
                            @{id.username}
                          </span>
                          <span className="text-[10px] font-mono font-semibold bg-[#181D26] text-[#E97817] px-1.5 py-0.2 rounded border border-[#2A3444]">
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

        {/* Right Column: Tabbed Identity Inspector (60%) */}
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
                    <span className="text-xs font-mono bg-[#C85F0A]/15 text-[#E97817] px-2 py-0.5 rounded border border-[#C85F0A]/40 font-semibold">
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
                  className="px-3 py-1.5 rounded-lg bg-[#C85F0A] hover:bg-[#E97817] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-orange-950/60"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>Compare Correlation</span>
                </button>
              </div>

              {/* 10 Separate Tabs as required by Part 9 */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 border-b border-[#1E2430] text-xs font-mono">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#C85F0A]/20 text-orange-300 border border-[#C85F0A]/50 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-[#181D26]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {tab.count !== undefined && (
                        <span className="text-[10px] opacity-75">({tab.count})</span>
                      )}
                    </button>
                  );
                })}
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
                      <span className="text-[#E97817] font-bold">{selectedIdentity.clusterId}</span>
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
                      <span className="font-bold text-[#E97817]">EXTRACTED DARKNET FORUM POST SAMPLE</span>
                      <span>NLP TTR: {selectedIdentity.stylometry.vocabularyRichnessTTR}</span>
                    </div>

                    <div className="p-3 rounded bg-[#151A24] border border-[#202836] text-orange-300/90 italic leading-relaxed text-xs font-mono">
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

              {/* Tab 4: Writing Characteristics */}
              {activeTab === 'writing-characteristics' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <div className="bg-[#0D1016] border border-[#1E2430] p-3.5 rounded-lg space-y-2.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">NLP Stylometric Markers:</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2.5 bg-[#151A24] rounded border border-[#202836]">
                        <span className="text-[10px] text-slate-500 block">Type-Token Ratio (TTR):</span>
                        <span className="text-white font-bold">{selectedIdentity.stylometry.vocabularyRichnessTTR}</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5">High Lexical Richness</span>
                      </div>
                      <div className="p-2.5 bg-[#151A24] rounded border border-[#202836]">
                        <span className="text-[10px] text-slate-500 block">Casing Convention:</span>
                        <span className="text-white font-bold">{selectedIdentity.stylometry.casingHabit || 'Strict Lowercase'}</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5">Terminal/Bash Syntax</span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-[#151A24] rounded border border-[#202836] space-y-1">
                      <span className="text-[10px] text-slate-500 block">Distinctive Lexical Tokens & Bigrams:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(selectedIdentity.stylometry.distinctivePhrases || ['-- [delimiter]', 'escrow-first', 'zero-log', 'no-wire']).map((phrase, i) => (
                          <span key={i} className="text-[10px] bg-[#0D1016] text-[#E97817] px-2 py-0.5 rounded border border-[#C85F0A]/30">
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Activity Pattern */}
              {activeTab === 'activity' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Diurnal Active Window:</span>
                      <span className="text-white font-bold">{selectedIdentity.temporal.activeHoursUtc}</span>
                    </div>

                    <div className="bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Derived Timezone:</span>
                      <span className="text-[#E97817] font-bold">{selectedIdentity.temporal.timezoneEstimate}</span>
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

              {/* Tab 6: Technical Indicators */}
              {activeTab === 'technical' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <div className="bg-[#0D1016] border border-[#1E2430] p-3.5 rounded-lg space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">User-Agent Telemetry:</span>
                    <div className="p-2 rounded bg-[#151A24] border border-[#202836] text-slate-300 text-[11px]">
                      {selectedIdentity.technical.userAgents?.[0] || 'Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0'}
                    </div>
                  </div>
                  <div className="bg-[#0D1016] border border-[#1E2430] p-3.5 rounded-lg space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Onion Relays & Hidden Services:</span>
                    <div className="p-2 rounded bg-[#151A24] border border-[#202836] text-[#E97817] text-[11px]">
                      {selectedIdentity.technical.onionAddresses?.[0] || 'xshadow7v3...onion (Authenticated Dread Node)'}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 7: PGP Indicators */}
              {activeTab === 'pgp' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <div className="bg-[#0D1016] border border-[#1E2430] p-3.5 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">OpenPGP Key Identifier:</span>
                      <span className="text-emerald-400 font-bold text-[10px]">RSA 4096-bit</span>
                    </div>
                    <div className="p-2 rounded bg-[#151A24] border border-[#202836] text-white font-bold text-sm">
                      {selectedIdentity.technical.pgpKeyId}
                    </div>
                    <div className="text-[10px] text-slate-400 pt-1">
                      Fingerprint: <code>9F8A 2B4C 5D6E 7F80 1A2B 3C4D 7E4A 8F2C 91B4 E1F2</code>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-bold">
                      &check; Cryptographic Collision: Corroborated with @x_shadow profile header
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 8: Wallet Indicators */}
              {activeTab === 'wallets' && (
                <div className="space-y-3 font-mono text-xs animate-in fade-in duration-100">
                  <div className="bg-[#0D1016] border border-[#1E2430] p-3.5 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Bitcoin SegWit Address:</span>
                      <span className="text-orange-400 font-bold text-[10px]">{selectedIdentity.technical.walletType}</span>
                    </div>
                    <div className="p-2 rounded bg-[#151A24] border border-[#202836] text-slate-200 break-all text-[11px]">
                      {selectedIdentity.technical.cryptoWallets[0] || 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Escrow Deposit UTXO Cluster: <code>3J98t1Wp... (Multi-sig 2-of-3)</code>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 9: Domains / Infrastructure */}
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
                      <span className="font-bold text-[#E97817]">darkx17-vault.is</span>
                      <span className="text-emerald-400 text-[10px]">Active Mirror Gateway</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 10: Evidence References */}
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
                          <span className="text-[#E97817] font-bold text-sm">{pw.overallScore}%</span>
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
