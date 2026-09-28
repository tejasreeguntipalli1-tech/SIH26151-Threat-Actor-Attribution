import React, { useState } from 'react';
import { dataSourcesList } from '../../data/syntheticData';
import { Database, RefreshCw, CheckCircle2, ShieldAlert, Radio, Server, Activity, Globe, Lock } from 'lucide-react';

export const DataSourcesView: React.FC = () => {
  const [sources, setSources] = useState(dataSourcesList);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleSyncAll = () => {
    setSyncing(true);
    setSyncMessage('Polling Tor onion daemons, PGP keyservers, and blockchain mempools...');
    setTimeout(() => {
      setSyncing(false);
      setSyncMessage('All synthetic ingest pipelines synchronized. 12 new posts ingested.');
      setTimeout(() => setSyncMessage(null), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
              TELEMETRY & INGESTION
            </span>
            <span className="text-xs text-slate-400 font-mono">
              PIPELINE MONITORS
            </span>
          </div>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>Monitored Intelligence Data Feeds</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Active synthetic crawlers ingesting onion forum dumps, public PGP keyservers, and blockchain ledger UTXOs.
          </p>
        </div>

        <button
          onClick={handleSyncAll}
          disabled={syncing}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-950/60 flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Syncing Feeds...' : 'Sync Ingest Feeds'}</span>
        </button>
      </div>

      {syncMessage && (
        <div className="p-3 rounded-lg bg-emerald-950/70 border border-emerald-500/60 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((src) => (
          <div key={src.id} className="bg-[#0b1220] border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-3.5 transition-colors shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase bg-slate-900 text-emerald-400 px-2 py-0.5 rounded border border-slate-700">
                  {src.type}
                </span>
                <h3 className="text-sm font-bold font-mono text-white mt-1.5">
                  {src.name}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{src.status}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Coverage Targets:</span>
                <span className="text-slate-200">{src.coverage}</span>
              </div>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-slate-400">Indexed Records:</span>
                <span className="text-white font-bold">{src.recordsIndexed}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Last Telemetry Sync:</span>
                <span className="text-slate-300">{src.lastSync}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Pipeline Health:</span>
              <span className="text-emerald-400 font-bold">{src.health}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Boundary / Architecture Note */}
      <div className="bg-[#070b14] border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-400 space-y-1.5">
        <div className="flex items-center gap-2 text-slate-200 font-bold uppercase">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          <span>Synthetic Ingestion Sandbox Boundary</span>
        </div>
        <p className="leading-relaxed">
          In strict compliance with hackathon prototype boundaries, this interface displays synthesized simulation feeds. 
          No live onion network scraping or real-world criminal infrastructure is compromised. 
          The modular ingestion architecture is designed to integrate with FastAPI streaming backends and authorized dark web intelligence lakes.
        </p>
      </div>
    </div>
  );
};
