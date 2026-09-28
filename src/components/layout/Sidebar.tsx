import React from 'react';
import { 
  Activity,
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
  LucideIcon
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  isStage2?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  eligibleCount: number;
  stage2Count: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  eligibleCount,
  stage2Count
}) => {
  const navSections: NavSection[] = [
    {
      title: 'INVESTIGATION',
      items: [
        { id: 'dashboard', label: 'Command Center', icon: Activity },
        { id: 'identities', label: 'Digital Identities', icon: Users, badge: '4 active' },
        { id: 'correlation', label: 'Actor Correlation', icon: GitMerge },
        { id: 'graph', label: 'Relationship Graph', icon: Share2 },
        { id: 'clusters', label: 'Actor Clusters', icon: Boxes, badge: `${eligibleCount} eligible` },
        { id: 'evidence', label: 'Evidence Inventory', icon: Database },
      ]
    },
    {
      title: 'ATTRIBUTION',
      items: [
        { 
          id: 'stage2', 
          label: 'Stage 2 Attribution', 
          icon: Fingerprint, 
          badge: stage2Count > 0 ? `${stage2Count} active` : undefined, 
          isStage2: true 
        },
        { id: 'candidates', label: 'Candidate Entities', icon: Building2, badge: '1 Lead' },
        { id: 'attribution-graph', label: 'Attribution Path', icon: Network },
      ]
    },
    {
      title: 'CASE MANAGEMENT',
      items: [
        { id: 'case-builder', label: 'Case Builder', icon: FileCheck2 },
        { id: 'reports', label: 'Investigation Report', icon: FileText, badge: 'Dossier' },
        { id: 'timeline', label: 'Forensic Timeline', icon: Clock },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'sources', label: 'Threat Intel Feeds', icon: Database },
        { id: 'settings', label: 'Engine Settings', icon: Sliders },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#0D0F12] border-r border-[#1E232B] flex flex-col justify-between flex-shrink-0 min-h-screen select-none">
      {/* Brand / Logo Section */}
      <div>
        <div className="p-4 border-b border-[#1E232B]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(234,88,12,0.6)]" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-100">
                SPECTRA ATTRIBUTION
              </span>
            </div>
            <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 border border-orange-500/30 px-1.5 py-0.5 rounded font-semibold">
              SIH26151
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 bg-[#14181F] px-2 py-1 rounded border border-[#232833]">
            <span className="text-slate-500">ACTIVE CASE</span>
            <span className="text-orange-400 font-bold">INV-2026-0151</span>
          </div>
        </div>

        {/* Grouped Navigation Sections */}
        <div className="p-3 space-y-4">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                {section.title}
              </div>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-orange-500/10 text-orange-400 font-semibold border-l-2 border-orange-500 shadow-[inset_0_1px_0_0_rgba(234,88,12,0.1)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#16191E]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
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
                              : 'bg-[#181D24] text-slate-400 border border-[#262D38]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Boundary & Statutory Warrant Footer */}
      <div className="p-3 border-t border-[#1E232B] space-y-2">
        <div className="bg-[#14181F] border border-[#232833] rounded-lg p-2.5 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">OPERATIONAL STANDARD</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Correlation ≠ Identification. Attribution Lead ≠ Confirmed Identity. Human investigator validation mandatory.
          </p>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
          <span className="text-slate-500">WARRANT #CR-2026-8819</span>
          <span className="text-orange-400 font-bold">AUTHORIZED</span>
        </div>
      </div>
    </aside>
  );
};
