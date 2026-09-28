import React, { useState } from 'react';
import { TimelineEvent } from '../../types/investigation';
import { 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  UserPlus, 
  Key, 
  GitMerge, 
  Boxes, 
  ShieldCheck, 
  Fingerprint, 
  Activity,
  ArrowRight
} from 'lucide-react';

interface InvestigationTimelineViewProps {
  events: TimelineEvent[];
  selectedClusterId?: string;
}

export const InvestigationTimelineView: React.FC<InvestigationTimelineViewProps> = ({
  events,
  selectedClusterId
}) => {
  const [filterCluster, setFilterCluster] = useState<string>(selectedClusterId || 'ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEvents = events.filter((evt) => {
    const matchesCluster = filterCluster === 'ALL' || evt.clusterId === filterCluster;
    const matchesCategory = filterCategory === 'ALL' || evt.category === filterCategory;
    const matchesSearch = 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.identitiesInvolved.some(id => id.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCluster && matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'CREATION': return <UserPlus className="w-4 h-4 text-blue-400" />;
      case 'TECHNICAL': return <Key className="w-4 h-4 text-purple-400" />;
      case 'RELATIONSHIP': return <GitMerge className="w-4 h-4 text-teal-400" />;
      case 'CLUSTER': return <Boxes className="w-4 h-4 text-emerald-400" />;
      case 'INVESTIGATOR': return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      case 'STAGE2': return <Fingerprint className="w-4 h-4 text-cyan-400" />;
      default: return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                CHRONOLOGICAL RECONSTRUCTION
              </span>
              <span className="text-xs text-slate-400 font-mono">
                SYNTHETIC FORENSIC TIMELINE
              </span>
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span>Investigation Chronology & Decision Timeline</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Tracks the full lifecycle from early dark web account creation through multi-signal correlation detection, cluster creation, and authorized Stage 2 entity resolution.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search events, handles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#070b14] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-500 w-48"
              />
            </div>

            <select
              value={filterCluster}
              onChange={(e) => setFilterCluster(e.target.value)}
              className="bg-[#070b14] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Clusters</option>
              <option value="TA-001">Cluster TA-001</option>
              <option value="TA-002">Cluster TA-002</option>
              <option value="TA-003">Cluster TA-003</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#070b14] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Event Types</option>
              <option value="CREATION">Account Creation</option>
              <option value="TECHNICAL">Technical Indicator</option>
              <option value="RELATIONSHIP">Relationship Detected</option>
              <option value="CLUSTER">Cluster Created</option>
              <option value="INVESTIGATOR">Investigator Decision</option>
            </select>
          </div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-6 relative">
        {/* Continuous vertical timeline bar */}
        <div className="absolute left-8 md:left-48 top-8 bottom-8 w-0.5 bg-slate-800" />

        <div className="space-y-6">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-8 group">
              {/* Date Column */}
              <div className="md:w-36 flex-shrink-0 text-left md:text-right pl-12 md:pl-0">
                <span className="font-mono text-xs font-bold text-slate-300 block">
                  {evt.date.split(' ')[0]}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {evt.date.split(' ').slice(1).join(' ')}
                </span>
              </div>

              {/* Node Icon Circle */}
              <div className="absolute left-6 md:left-[184px] top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0b1220] border-2 border-slate-700 group-hover:border-emerald-400 flex items-center justify-center shadow-lg transition-colors z-10">
                {getCategoryIcon(evt.category)}
              </div>

              {/* Event Card Content */}
              <div className="flex-1 bg-[#070b14] border border-slate-800 group-hover:border-slate-700 rounded-xl p-4 transition-all ml-12 md:ml-0 shadow-md">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {evt.category}
                      </span>
                      {evt.clusterId && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-900/60">
                          {evt.clusterId}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold font-mono text-white mt-1.5">
                      {evt.title}
                    </h4>
                  </div>

                  {evt.confidenceImpact && (
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      {evt.confidenceImpact}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
                  {evt.description}
                </p>

                {/* Identities Involved */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>Involved:</span>
                    {evt.identitiesInvolved.map((handle, i) => (
                      <span key={i} className="text-emerald-300 bg-[#0b1220] px-1.5 py-0.5 rounded border border-slate-700">
                        @{handle}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400">EVENT ID: {evt.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
