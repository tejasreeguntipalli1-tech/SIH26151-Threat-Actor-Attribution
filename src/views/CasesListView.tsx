import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCase, InvestigationCase } from '../context/CaseContext';
import { 
  FolderOpen, 
  Plus, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  User, 
  Search, 
  Filter, 
  Boxes, 
  FileCheck2,
  X,
  AlertTriangle
} from 'lucide-react';

export const CasesListView: React.FC = () => {
  const { cases, activeCaseId, selectCase, createCase } = useCase();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNewCaseModal, setShowNewCaseModal] = useState<boolean>(false);

  // New case form state
  const [newCaseName, setNewCaseName] = useState('');
  const [newCodename, setNewCodename] = useState('');
  const [newTargetActor, setNewTargetActor] = useState('');
  const [newPriority, setNewPriority] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM'>('HIGH');
  const [newSummary, setNewSummary] = useState('');

  const filteredCases = cases.filter(c => {
    if (filterStatus !== 'ALL' && c.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.codename.toLowerCase().includes(q) || c.targetActor.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenCase = (caseId: string) => {
    selectCase(caseId);
    navigate(`/cases/${caseId}`);
  };

  const handleCreateCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseName.trim()) return;

    const created = createCase({
      name: newCaseName.trim(),
      codename: newCodename.trim() || `OP-${Date.now().toString().slice(-4)}`,
      targetActor: newTargetActor.trim() || 'Unassigned Threat Cluster',
      priority: newPriority,
      summary: newSummary.trim() || 'New threat actor de-anonymization investigation.'
    });

    setShowNewCaseModal(false);
    navigate(`/cases/${created.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
              CASE MANAGEMENT
            </span>
            <span className="text-xs text-slate-400 font-mono">
              CENTRAL INVESTIGATION REPOSITORY
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 font-mono">
            <FolderOpen className="w-6 h-6 text-orange-400" />
            <span>Active Investigation Cases</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage dark web threat actor correlation and attribution dossiers authorized under active judicial warrants.
          </p>
        </div>

        <button
          onClick={() => setShowNewCaseModal(true)}
          className="px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-orange-950/60 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Investigation Case</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search cases by ID, name, or codename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D1016] border border-[#202734] focus:border-orange-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 font-mono focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-400 text-[11px] uppercase">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#0D1016] border border-[#202734] rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none text-xs"
          >
            <option value="ALL">All Statuses ({cases.length})</option>
            <option value="ACTIVE INVESTIGATION">Active Investigation</option>
            <option value="PENDING REVIEW">Pending Review</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map((c) => {
          const isActive = c.id === activeCaseId;
          return (
            <div
              key={c.id}
              className={`bg-[#12161E] border rounded-xl p-5 space-y-4 transition-all shadow-lg ${
                isActive 
                  ? 'border-orange-500/60 shadow-orange-950/20' 
                  : 'border-[#232A36] hover:border-slate-700'
              }`}
            >
              {/* Header Strip */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono font-bold text-orange-400 text-sm">{c.id}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-[#161B24] px-1.5 py-0.2 rounded border border-[#202734]">
                      {c.codename}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      c.status === 'ACTIVE INVESTIGATION'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-white tracking-tight font-sans">
                    {c.name}
                  </h2>
                </div>

                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                  c.priority === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-orange-950 text-orange-400 border border-orange-800'
                }`}>
                  {c.priority}
                </span>
              </div>

              {/* Summary Narrative */}
              <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                {c.summary}
              </p>

              {/* Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 bg-[#0D1016] border border-[#1E2430] p-3 rounded-lg text-xs font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Personas:</span>
                  <span className="text-white font-bold">{c.identitiesCount} Ingested</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Stage 1 Score:</span>
                  <span className="text-orange-400 font-bold">{c.correlationScore}% Strength</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Stage 2 Lead:</span>
                  <span className="text-amber-400 font-bold">{c.attributionConfidence > 0 ? `${c.attributionConfidence}% Lead` : 'Pending'}</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#1E2430] text-xs font-mono">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{c.leadInvestigator}</span>
                </div>

                <button
                  onClick={() => handleOpenCase(c.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-orange-950/40"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Case Creation Modal */}
      {showNewCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#12161E] border border-[#232A36] rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl font-mono text-xs">
            <div className="flex items-start justify-between pb-3 border-b border-[#1E2430]">
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">CASE REGISTRATION</span>
                <h3 className="text-base font-bold text-white mt-0.5">Register New Threat Actor Investigation</h3>
              </div>
              <button 
                onClick={() => setShowNewCaseModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCaseSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 uppercase font-bold">Operation Name / Case Title:</label>
                <input
                  type="text"
                  required
                  value={newCaseName}
                  onChange={(e) => setNewCaseName(e.target.value)}
                  placeholder="e.g. Operation CipherHound // Ransomware Brokerage"
                  className="w-full bg-[#0D1016] border border-[#202734] focus:border-orange-500 rounded-lg p-2.5 text-xs text-white font-sans focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 uppercase font-bold">Codename:</label>
                  <input
                    type="text"
                    value={newCodename}
                    onChange={(e) => setNewCodename(e.target.value)}
                    placeholder="CIPHER-HOUND"
                    className="w-full bg-[#0D1016] border border-[#202734] focus:border-orange-500 rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 uppercase font-bold">Priority:</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-[#0D1016] border border-[#202734] rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 uppercase font-bold">Primary Target Threat Actor:</label>
                <input
                  type="text"
                  value={newTargetActor}
                  onChange={(e) => setNewTargetActor(e.target.value)}
                  placeholder="e.g. Actor Cluster C (TA-003)"
                  className="w-full bg-[#0D1016] border border-[#202734] focus:border-orange-500 rounded-lg p-2.5 text-xs text-white font-sans focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 uppercase font-bold">Initial Investigation Scope / Summary:</label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Outline dark web forums, observed handle leaks, and initial technical anchors..."
                  className="w-full bg-[#0D1016] border border-[#202734] focus:border-orange-500 rounded-lg p-2.5 text-xs text-white font-sans focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#1E2430]">
                <button
                  type="button"
                  onClick={() => setShowNewCaseModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#181D26] hover:bg-[#202734] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-wider shadow-md shadow-orange-950/60"
                >
                  Initialize Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
