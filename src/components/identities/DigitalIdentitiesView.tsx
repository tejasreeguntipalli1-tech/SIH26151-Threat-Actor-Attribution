import React, { useState } from 'react';
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
  Server
} from 'lucide-react';

interface DigitalIdentitiesViewProps {
  identities: DigitalIdentity[];
  onSelectForCorrelation: (identityId: string) => void;
  onNavigate: (tabId: string) => void;
}

export const DigitalIdentitiesView: React.FC<DigitalIdentitiesViewProps> = ({
  identities,
  onSelectForCorrelation,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClusterFilter, setSelectedClusterFilter] = useState('ALL');
  const [selectedIdentity, setSelectedIdentity] = useState<DigitalIdentity | null>(identities[0] || null);

  const filteredIdentities = identities.filter((id) => {
    const matchesSearch = 
      id.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.aliases.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
      id.platform.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCluster = 
      selectedClusterFilter === 'ALL' || id.clusterId === selectedClusterFilter;

    return matchesSearch && matchesCluster;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0b1220] border border-slate-800 rounded-xl p-4">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <span>Digital Identities Under Investigation</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Profiles aggregated across monitored dark web forums, paste repositories, and peer-to-peer marketplaces.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search handle, alias, platform..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#070b14] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono w-60"
            />
          </div>

          <select
            value={selectedClusterFilter}
            onChange={(e) => setSelectedClusterFilter(e.target.value)}
            className="bg-[#070b14] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
          >
            <option value="ALL">All Clusters</option>
            <option value="TA-001">Cluster TA-001</option>
            <option value="TA-002">Cluster TA-002</option>
            <option value="TA-003">Cluster TA-003</option>
          </select>
        </div>
      </div>

      {/* Main Grid: List + Deep Profile Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Identity Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
            Indexed Personas ({filteredIdentities.length})
          </div>

          {filteredIdentities.map((id) => {
            const isSelected = selectedIdentity?.id === id.id;
            return (
              <div
                key={id.id}
                onClick={() => setSelectedIdentity(id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#0f1a30] border-emerald-500/70 shadow-lg shadow-emerald-950/30'
                    : 'bg-[#0b1220] border-slate-800 hover:border-slate-700 hover:bg-[#0c1424]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-emerald-400 text-base">
                      {id.avatarLetter}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-sm">
                          @{id.username}
                        </span>
                        {id.clusterId && (
                          <span className="text-[10px] font-mono font-semibold bg-slate-900 text-teal-400 px-1.5 py-0.2 rounded border border-teal-900/60">
                            {id.clusterId}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-sans">{id.platform}</div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    id.riskRating === 'HIGH' 
                      ? 'bg-red-950/50 text-red-300 border-red-800/80' 
                      : id.riskRating === 'ELEVATED'
                        ? 'bg-amber-950/50 text-amber-300 border-amber-800/80'
                        : 'bg-blue-950/50 text-blue-300 border-blue-800/80'
                  }`}>
                    {id.riskRating} RISK
                  </span>
                </div>

                {/* Aliases */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {id.aliases.map((alias, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-mono bg-[#070c16] text-slate-400 px-1.5 py-0.5 rounded border border-slate-800"
                    >
                      ~{alias}
                    </span>
                  ))}
                </div>

                {/* Quick Indicators Bar */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{id.temporal.activeHoursUtc.split(' ')[0]} UTC</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Key className="w-3 h-3 text-slate-500" />
                    <span>{id.technical.pgpKeyId !== 'NOT AVAILABLE' ? id.technical.pgpKeyId : 'NO PGP'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Profile Inspector */}
        <div className="lg:col-span-7">
          {selectedIdentity ? (
            <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 space-y-5 sticky top-20 shadow-xl">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-bold font-mono text-white">
                      @{selectedIdentity.username}
                    </h3>
                    <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                      STATUS: {selectedIdentity.status}
                    </span>
                    {selectedIdentity.clusterId && (
                      <span className="text-xs font-mono bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800">
                        CLUSTER: {selectedIdentity.clusterId}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    Observed: {selectedIdentity.firstSeen} &rarr; Last: {selectedIdentity.lastSeen}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectForCorrelation(selectedIdentity.id);
                    onNavigate('correlation');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/60"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>Compare in Correlation</span>
                </button>
              </div>

              {/* 1. Stylometry & Demonstration Sample */}
              <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 font-semibold border-b border-slate-800/80 pb-1.5">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Writing Style & Stylometry Features</span>
                  </span>
                  <span className="text-[11px] text-slate-400">TTR: {selectedIdentity.stylometry.vocabularyRichnessTTR}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Avg Sentence Length:</span>
                    <span className="text-slate-200 font-bold">{selectedIdentity.stylometry.avgSentenceLength} words/sentence</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Punctuation Style:</span>
                    <span className="text-slate-200">{selectedIdentity.stylometry.punctuationHabit}</span>
                  </div>
                </div>

                <div className="mt-2 bg-[#0d1527] border border-slate-800 rounded p-2.5 text-xs font-mono text-emerald-300/90 leading-relaxed italic">
                  "{selectedIdentity.stylometry.sampleText}"
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] font-mono text-slate-400">Distinctive Phrases:</span>
                  {selectedIdentity.stylometry.distinctivePhrases.map((phrase, i) => (
                    <span key={i} className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                      "{phrase}"
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Behavioural Profile */}
              <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3.5 space-y-2">
                <div className="text-xs font-mono text-slate-300 font-semibold border-b border-slate-800/80 pb-1.5 flex items-center gap-1.5 text-teal-400">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Behavioural & Operational Profile</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-mono">Primary Role</span>
                    <span className="text-slate-200 font-medium">{selectedIdentity.behavioural.primaryRole}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-mono">OPSEC Discipline</span>
                    <span className="text-emerald-400 font-mono font-bold">{selectedIdentity.behavioural.opsecDiscipline}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-mono">Trading Method</span>
                    <span className="text-slate-300 font-mono">{selectedIdentity.behavioural.tradingMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-mono">Monitored Sections</span>
                    <span className="text-slate-300">{selectedIdentity.behavioural.forumSections.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* 3. Temporal Patterns */}
              <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3.5 space-y-2">
                <div className="text-xs font-mono text-slate-300 font-semibold border-b border-slate-800/80 pb-1.5 flex items-center gap-1.5 text-blue-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Temporal & Active Time Distribution</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Active Hours:</span>
                    <span className="text-emerald-300 font-bold">{selectedIdentity.temporal.activeHoursUtc}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Timezone Estimate:</span>
                    <span className="text-slate-200">{selectedIdentity.temporal.timezoneEstimate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Peak Day:</span>
                    <span className="text-slate-200">{selectedIdentity.temporal.peakDay}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Burst Cadence:</span>
                    <span className="text-slate-200">{selectedIdentity.temporal.burstFrequency}</span>
                  </div>
                </div>
              </div>

              {/* 4. Technical Indicators */}
              <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3.5 space-y-2">
                <div className="text-xs font-mono text-slate-300 font-semibold border-b border-slate-800/80 pb-1.5 flex items-center gap-1.5 text-purple-400">
                  <Server className="w-3.5 h-3.5" />
                  <span>Technical & Digital Indicators</span>
                </div>
                
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block">PGP Key ID / Fingerprint:</span>
                    {selectedIdentity.technical.pgpKeyId !== 'NOT AVAILABLE' ? (
                      <span className="text-emerald-400 font-bold">
                        {selectedIdentity.technical.pgpKeyId} ({selectedIdentity.technical.pgpFingerprint})
                      </span>
                    ) : (
                      <span className="text-amber-400/90 font-bold bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-900/60">
                        NOT AVAILABLE (Missing Evidence - Not treated as negative)
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block">Crypto Wallets:</span>
                    {selectedIdentity.technical.cryptoWallets.length > 0 ? (
                      <div className="space-y-0.5">
                        {selectedIdentity.technical.cryptoWallets.map((wallet, i) => (
                          <div key={i} className="text-cyan-300 truncate">
                            {wallet} <span className="text-[10px] text-slate-400">({selectedIdentity.technical.walletType})</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-amber-400/90 font-bold bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-900/60">
                        INSUFFICIENT DATA / NOT AVAILABLE
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block">Infrastructure IPs & Tor Onions:</span>
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {selectedIdentity.technical.onionAddresses.map((onion, i) => (
                        <span key={i} className="text-[10px] bg-slate-900 text-purple-300 px-2 py-0.5 rounded border border-purple-900/60">
                          {onion}
                        </span>
                      ))}
                      {selectedIdentity.technical.infrastructureIps.map((ip, i) => (
                        <span key={i} className="text-[10px] bg-slate-900 text-slate-200 px-2 py-0.5 rounded border border-slate-700">
                          IP: {ip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center bg-[#0b1220] border border-slate-800 rounded-xl text-slate-500 text-xs font-mono">
              Select an identity to view detailed digital profile
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
