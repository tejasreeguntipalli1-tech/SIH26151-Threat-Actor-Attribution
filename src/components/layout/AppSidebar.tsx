import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { 
  Activity,
  FolderOpen,
  Users, 
  GitMerge, 
  Share2, 
  Boxes, 
  Database, 
  Clock, 
  Fingerprint, 
  FileText, 
  Sliders,
  ShieldAlert,
  Building2,
  Network,
  FileCheck2,
  Layers,
  Cpu,
  Terminal,
  ShieldCheck,
  LucideIcon
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  isStage2?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface AppSidebarProps {
  onCloseMobile?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ onCloseMobile }) => {
  const { activeCase, identities, clusters } = useCase();
  const location = useLocation();

  const caseId = activeCase.id;

  const navSections: NavSection[] = [
    {
      title: 'CASE MANAGEMENT',
      items: [
        { to: '/cases', label: 'Investigation Cases', icon: FolderOpen, badge: '2 Active' },
        { to: `/cases/${caseId}`, label: 'Case Overview', icon: FileCheck2 },
      ]
    },
    {
      title: 'DIGITAL INVESTIGATION',
      items: [
        { to: `/cases/${caseId}/identities`, label: 'Digital Identities', icon: Users, badge: `${identities.length} active` },
        { to: `/cases/${caseId}/correlation`, label: 'Actor Correlation', icon: GitMerge, badge: `${activeCase.correlationScore}%` },
        { to: `/cases/${caseId}/graph`, label: 'Relationship Graph', icon: Share2 },
        { to: `/cases/${caseId}/clusters`, label: 'Actor Clusters', icon: Boxes, badge: `${clusters.length} clusters` },
      ]
    },
    {
      title: 'EVIDENCE ANALYSIS',
      items: [
        { to: `/cases/${caseId}/evidence`, label: 'Evidence Inventory', icon: Database, badge: '18 items' },
      ]
    },
    {
      title: 'ATTRIBUTION',
      items: [
        { 
          to: `/cases/${caseId}/attribution`, 
          label: 'Attribution Workspace', 
          icon: Fingerprint, 
          badge: activeCase.stage2Status === 'NOT_INITIATED' ? 'Gate Required' : 'Active Lead',
          isStage2: true 
        },
        { to: `/cases/${caseId}/candidates`, label: 'Candidate Entities', icon: Building2, badge: '1 Lead' },
        { to: `/cases/${caseId}/attribution-graph`, label: 'Attribution Path', icon: Network },
      ]
    },
    {
      title: 'REPORTING',
      items: [
        { to: `/cases/${caseId}/timeline`, label: 'Investigation Timeline', icon: Clock },
        { to: `/cases/${caseId}/report`, label: 'Investigation Dossier', icon: FileText, badge: 'Dossier' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { to: '/sources', label: 'Threat Intel Feeds', icon: Cpu },
        { to: '/settings', label: 'Engine Settings', icon: Sliders },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0D0F12] border-r border-[#1E232B] flex flex-col justify-between flex-shrink-0 min-h-screen select-none font-mono">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-[#1E232B]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(234,88,12,0.6)]" />
              <span className="text-xs font-bold tracking-wider text-slate-100">
                ARGUS ATTRIBUTION
              </span>
            </div>
            <span className="text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/30 px-1.5 py-0.5 rounded font-semibold">
              SIH26151
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 bg-[#14181F] px-2 py-1 rounded border border-[#232833]">
            <span className="text-slate-500">ACTIVE WORKSPACE</span>
            <span className="text-orange-400 font-bold">{caseId}</span>
          </div>
        </div>

        {/* Grouped Navigation Sections */}
        <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-210px)]">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {section.title}
              </div>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  // Exact match or subroute match
                  const isActive = location.pathname === item.to || (item.to.includes('/evidence') && location.pathname.includes('/evidence') && item.to === `/cases/${caseId}/evidence`);

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onCloseMobile}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-orange-500/10 text-orange-400 font-semibold border-l-2 border-orange-500 shadow-[inset_0_1px_0_0_rgba(234,88,12,0.1)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#16191E]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate font-sans">
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isActive 
                            ? 'text-orange-400' 
                            : item.isStage2 
                              ? 'text-amber-400/90' 
                              : 'text-slate-500'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ml-1 flex-shrink-0 ${
                          isActive
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                            : item.isStage2
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                              : 'bg-[#181D26] text-slate-400 border border-[#262D38]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Standard & Warrant Footer */}
      <div className="p-3 border-t border-[#1E232B] space-y-2">
        <div className="bg-[#14181F] border border-[#232833] rounded-lg p-2.5 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
            <span className="text-[10px] uppercase tracking-wider text-slate-300">STATUTORY STANDARD</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug font-sans">
            Correlation &ne; Identification. Attribution Lead &ne; Confirmed Identity. Human validation mandatory.
          </p>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span className="text-slate-500">{activeCase.warrantNumber}</span>
          <span className="text-orange-400 font-bold">AUTHORIZED</span>
        </div>
      </div>
    </aside>
  );
};
