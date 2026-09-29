import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { 
  Activity,
  FolderOpen,
  FolderPlus,
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
  CheckCircle,
  FileCode,
  FileSearch,
  Timer,
  Scan,
  UserCheck,
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
        { to: '/cases?action=new', label: 'New Investigation', icon: FolderPlus },
      ]
    },
    {
      title: 'DIGITAL INVESTIGATION',
      items: [
        { to: `/cases/${caseId}/identities`, label: 'Digital Identities', icon: Users, badge: `${identities.length}` },
        { to: `/cases/${caseId}/correlation`, label: 'Actor Correlation', icon: GitMerge, badge: `${activeCase.correlationScore}%` },
        { to: `/cases/${caseId}/graph`, label: 'Relationship Graph', icon: Share2 },
        { to: `/cases/${caseId}/clusters`, label: 'Actor Clusters', icon: Boxes, badge: `${clusters.length}` },
      ]
    },
    {
      title: 'EVIDENCE ANALYSIS',
      items: [
        { to: `/cases/${caseId}/evidence`, label: 'Evidence Overview', icon: Database, badge: '18' },
        { to: `/cases/${caseId}/evidence?tab=stylometry`, label: 'Stylometry', icon: FileCode },
        { to: `/cases/${caseId}/evidence?tab=behaviour`, label: 'Behaviour Analysis', icon: Activity },
        { to: `/cases/${caseId}/evidence?tab=temporal`, label: 'Temporal Analysis', icon: Timer },
        { to: `/cases/${caseId}/evidence?tab=technical`, label: 'Technical Indicators', icon: Terminal },
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
        { to: `/cases/${caseId}/attribution?tab=validation`, label: 'Human Validation', icon: UserCheck },
      ]
    },
    {
      title: 'REPORTING',
      items: [
        { to: `/cases/${caseId}/timeline`, label: 'Investigation Timeline', icon: Clock },
        { to: `/cases/${caseId}/evidence?tab=findings`, label: 'Findings', icon: FileSearch },
        { to: `/cases/${caseId}/report`, label: 'Investigation Report', icon: FileText, badge: 'Dossier' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { to: '/sources', label: 'Data Sources', icon: Cpu },
        { to: '/sources?tab=jobs', label: 'Jobs & Scans', icon: Scan },
        { to: '/settings', label: 'Settings', icon: Sliders },
      ]
    }
  ];

  return (
    <aside className="w-64 h-full bg-[#0D0F12] flex flex-col justify-between flex-shrink-0 select-none font-mono overflow-hidden">
      {/* Brand Header */}
      <div className="flex-shrink-0">
        <div className="p-4 border-b border-[#1E232B]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E97817] shadow-[0_0_8px_rgba(233,120,23,0.6)]" />
              <span className="text-xs font-bold tracking-wider text-slate-100">
                SPECTRA ATTRIBUTION
              </span>
            </div>
            <span className="text-[10px] text-[#E97817] bg-[#C85F0A]/15 border border-[#C85F0A]/40 px-1.5 py-0.5 rounded font-semibold">
              SIH2026
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 bg-[#14181F] px-2 py-1 rounded border border-[#232833]">
            <span className="text-slate-500">ACTIVE CASE</span>
            <span className="text-[#E97817] font-bold">{caseId}</span>
          </div>
        </div>
      </div>

      {/* Grouped Navigation Sections - Independent Smooth Scroll */}
      <div className="p-3 space-y-4 overflow-y-auto flex-1 min-h-0">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {section.title}
            </div>
            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const currentFullUrl = location.pathname + location.search;
                const isActive = item.to.includes('?') 
                  ? currentFullUrl === item.to 
                  : (location.pathname === item.to && !location.search);

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onCloseMobile}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#C85F0A]/15 text-[#E97817] font-semibold border-l-2 border-[#E97817] shadow-[inset_0_1px_0_0_rgba(233,120,23,0.1)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#16191E]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate font-sans">
                      <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isActive 
                          ? 'text-[#E97817]' 
                          : item.isStage2 
                            ? 'text-amber-400/90' 
                            : 'text-slate-500'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded border ${
                        isActive
                          ? 'bg-[#C85F0A]/30 text-orange-300 border-[#C85F0A]/60'
                          : item.isStage2
                            ? 'bg-amber-950/40 text-amber-400 border-amber-800/40'
                            : 'bg-[#181D26] text-slate-400 border-[#262F3E]'
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

      {/* Statutory Footer */}
      <div className="p-3 border-t border-[#1E232B] flex-shrink-0 bg-[#0A0C0E]">
        <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span className="truncate">WARRANT {activeCase.warrantNumber}</span>
        </div>
        <div className="text-[9px] text-slate-600 font-mono mt-0.5">
          SPECTRA Engine v2.4 &bull; Stage 1/2 Air-Gapped
        </div>
      </div>
    </aside>
  );
};
