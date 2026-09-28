import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCase } from '../context/CaseContext';
import { 
  FileCheck2, 
  Users, 
  GitMerge, 
  Share2, 
  Database, 
  Fingerprint, 
  Clock, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Boxes,
  Calendar,
  User,
  ShieldAlert
} from 'lucide-react';

export const CaseOverviewView: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { activeCase, selectCase, identities, clusters, pairwiseRelationships, indicators, candidateEntities } = useCase();
  const navigate = useNavigate();

  // Ensure active case is synchronized with URL param
  React.useEffect(() => {
    if (caseId && caseId !== activeCase.id) {
      selectCase(caseId);
    }
  }, [caseId, activeCase.id, selectCase]);

  const primaryCluster = clusters.find(c => c.id === 'Actor Cluster A') || clusters[0];

  return (
    <div className="space-y-6">
      {/* 1. Case Administrative Metadata Card */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
              <span className="font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded">
                CASE {activeCase.id}
              </span>
              <span className="text-slate-400">Codename: <strong className="text-white">{activeCase.codename}</strong></span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold">{activeCase.warrantNumber}</span>
              <span className="text-slate-600">|</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                {activeCase.status}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight font-sans">
              {activeCase.name}
            </h1>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 flex-wrap pt-1">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-orange-400" />
                <span>Investigator: <strong className="text-slate-200">{activeCase.leadInvestigator}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Created: {activeCase.createdDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Last Updated: {activeCase.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => navigate(`/cases/${activeCase.id}/report`)}
              className="px-3.5 py-2 rounded-lg bg-[#181D26] hover:bg-[#202734] text-slate-200 border border-[#2A3342] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-orange-400" />
              <span>Full Dossier</span>
            </button>
            <button
              onClick={() => navigate(`/cases/${activeCase.id}/graph`)}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-950/60 flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Relationship Graph</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Investigation Indicators Grid (5 Concise Metrics Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div 
          onClick={() => navigate(`/cases/${activeCase.id}/identities`)}
          className="bg-[#12161E] border border-[#202632] hover:border-orange-500/50 rounded-xl p-4 transition-all cursor-pointer shadow-md"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] font-mono">Digital Identities</span>
            <Users className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{identities.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-sans">Correlated Personas &rarr;</div>
        </div>

        <div 
          onClick={() => navigate(`/cases/${activeCase.id}/clusters`)}
          className="bg-[#12161E] border border-[#202632] hover:border-orange-500/50 rounded-xl p-4 transition-all cursor-pointer shadow-md"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] font-mono">Actor Clusters</span>
            <Boxes className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{clusters.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-sans">Primary: {primaryCluster.actorCorrelationScore}% &rarr;</div>
        </div>

        <div 
          onClick={() => navigate(`/cases/${activeCase.id}/evidence`)}
          className="bg-[#12161E] border border-[#202632] hover:border-orange-500/50 rounded-xl p-4 transition-all cursor-pointer shadow-md"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] font-mono">Evidence Items</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{indicators.length * 3}</div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-sans">6 Dimensions &rarr;</div>
        </div>

        <div 
          onClick={() => navigate(`/cases/${activeCase.id}/correlation`)}
          className="bg-[#12161E] border border-[#202632] hover:border-orange-500/50 rounded-xl p-4 transition-all cursor-pointer shadow-md"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] font-mono">Correlation Links</span>
            <GitMerge className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{pairwiseRelationships.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-sans">5 Pairwise Pairs &rarr;</div>
        </div>

        <div 
          onClick={() => navigate(`/cases/${activeCase.id}/attribution`)}
          className="bg-[#12161E] border border-amber-900/30 hover:border-amber-500/50 rounded-xl p-4 transition-all cursor-pointer shadow-md"
        >
          <div className="flex items-center justify-between text-amber-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] font-mono">Attribution Leads</span>
            <Fingerprint className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">1 Lead</div>
          <div className="text-[11px] text-amber-400/80 mt-0.5 font-sans">Candidate A (82%) &rarr;</div>
        </div>
      </div>

      {/* 3. Concise Investigation Narrative Summary (Requirement #6) */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl space-y-3 font-sans">
        <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
          <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-400" />
            <span>Investigation Summary</span>
          </h2>
          <span className="text-[11px] font-mono text-slate-500">EXECUTIVE OVERVIEW</span>
        </div>

        <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
          <p>
            {activeCase.summary}
          </p>
          <p className="text-slate-400">
            Independent bilateral correlation confirmed strong continuity across all four ingested handles: 
            <strong className="text-slate-200"> @shadow_x17</strong> (initial access broker on Dread), 
            <strong className="text-slate-200"> @x_shadow</strong> (credential escrow broker on XSS), 
            <strong className="text-slate-200"> @darkx17</strong> (staging mirror publisher on BreachForums), and 
            <strong className="text-slate-200"> @x17_dev</strong> (developer toolchain author). A shared 4096-bit RSA PGP key (<code>0x7E4A8F2C91B4</code>) and an idiosyncratic double-hyphen syntax pattern provide incontrovertible technical anchors.
          </p>
        </div>
      </div>

      {/* 4. Investigation Progress: Stage 1 vs Stage 2 */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#1E2430] pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span>Two-Stage Pipeline Status</span>
          </h3>
          <span className="text-[10px] text-slate-400">MANDATORY INVESTIGATOR DECISION GATE ENFORCED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stage 1 Progress Card */}
          <div className="bg-[#0D1016] border border-orange-500/40 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-orange-400">
                STAGE 1 &bull; DIGITAL ACTOR CORRELATION
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                ✓ COMPLETED
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-white font-bold text-sm">Actor Cluster A (TA-001)</span>
              <span className="text-2xl font-black text-orange-400">92%</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Synthesizes 4 digital identities across 5 correlation dimensions. Threshold standard (&ge;80%) met and formally verified by Lead Investigator INV-017.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate(`/cases/${activeCase.id}/correlation`)}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
              >
                <span>Inspect Stage 1 Dimensions</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Stage 2 Progress Card */}
          <div className="bg-[#0D1016] border border-amber-500/40 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-amber-400">
                STAGE 2 &bull; REAL-WORLD ATTRIBUTION
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                ● HUMAN VALIDATION REQUIRED
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-white font-bold text-sm">Candidate Entity A (Meridian S.R.O.)</span>
              <span className="text-2xl font-black text-amber-300">82%</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Entity resolution mapped hosting IP 185.220.101.45 and mirror domain darkx17-vault.is to corporate registrant in Prague, CZ. Retained as primary lead.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate(`/cases/${activeCase.id}/attribution`)}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <span>Enter Stage 2 Workspace</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Case Navigation Tiles */}
      <div className="space-y-3 font-mono">
        <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
          Dedicated Investigation Workspaces:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div 
            onClick={() => navigate(`/cases/${activeCase.id}/identities`)}
            className="p-4 rounded-xl bg-[#12161E] border border-[#232A36] hover:border-orange-500/60 transition-all cursor-pointer shadow-md group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <Users className="w-5 h-5 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-[10px] text-slate-500 uppercase">Stage 1</span>
            </div>
            <h4 className="font-bold text-white text-sm">Digital Identities (4)</h4>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              Examine detailed persona tabs: aliases, writing samples, activity patterns, and PGP keys.
            </p>
          </div>

          <div 
            onClick={() => navigate(`/cases/${activeCase.id}/graph`)}
            className="p-4 rounded-xl bg-[#12161E] border border-[#232A36] hover:border-orange-500/60 transition-all cursor-pointer shadow-md group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <Share2 className="w-5 h-5 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-[10px] text-slate-500 uppercase">Topology</span>
            </div>
            <h4 className="font-bold text-white text-sm">Relationship Graph</h4>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              Actor-centered network topology with explicit pairwise edges and bilateral signal inspectors.
            </p>
          </div>

          <div 
            onClick={() => navigate(`/cases/${activeCase.id}/evidence`)}
            className="p-4 rounded-xl bg-[#12161E] border border-[#232A36] hover:border-orange-500/60 transition-all cursor-pointer shadow-md group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <Database className="w-5 h-5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-[10px] text-slate-500 uppercase">Inventory</span>
            </div>
            <h4 className="font-bold text-white text-sm">Evidence Analysis</h4>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              Categorized evidence inventory: Supporting, Conflicting, and Unknown gaps across 6 dimensions.
            </p>
          </div>

          <div 
            onClick={() => navigate(`/cases/${activeCase.id}/correlation`)}
            className="p-4 rounded-xl bg-[#12161E] border border-[#232A36] hover:border-orange-500/60 transition-all cursor-pointer shadow-md group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <GitMerge className="w-5 h-5 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-[10px] text-slate-500 uppercase">Multi-Signal</span>
            </div>
            <h4 className="font-bold text-white text-sm">Actor Correlation</h4>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              In-depth 6-dimension evaluation calculating Actor Correlation Evidence Strength (92%).
            </p>
          </div>

          <div 
            onClick={() => navigate(`/cases/${activeCase.id}/attribution`)}
            className="p-4 rounded-xl bg-[#12161E] border border-[#232A36] hover:border-amber-500/60 transition-all cursor-pointer shadow-md group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <Fingerprint className="w-5 h-5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-[10px] text-slate-500 uppercase">Stage 2</span>
            </div>
            <h4 className="font-bold text-white text-sm">Attribution Workspace</h4>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              Real-world entity resolution chain, multi-hypothesis candidate board, and sworn validation.
            </p>
          </div>

          <div 
            onClick={() => navigate(`/cases/${activeCase.id}/report`)}
            className="p-4 rounded-xl bg-[#12161E] border border-[#232A36] hover:border-orange-500/60 transition-all cursor-pointer shadow-md group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <FileText className="w-5 h-5 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-[10px] text-slate-500 uppercase">Dossier</span>
            </div>
            <h4 className="font-bold text-white text-sm">Investigation Dossier (Report)</h4>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              Audit-grade narrative report (18 sections) with PDF generation and structured JSON export.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
