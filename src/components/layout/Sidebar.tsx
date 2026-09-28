import React from 'react';
import { 
  FileCheck2,
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
  LucideIcon
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  isDefault?: boolean;
  isStage2?: boolean;
  isPathTrace?: boolean;
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
        { id: 'case-builder', label: 'Case Builder', icon: FileCheck2, isDefault: true },
        { id: 'identities', label: 'Digital Identities', icon: Users, badge: '4 demo' },
        { id: 'correlation', label: 'Actor Correlation', icon: GitMerge },
        { id: 'graph', label: 'Relationship Graph', icon: Share2 },
        { id: 'clusters', label: 'Actor Clusters', icon: Boxes, badge: `${eligibleCount} eligible` },
        { id: 'evidence', label: 'Evidence Analysis', icon: Database },
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
        { id: 'attribution-graph', label: 'Attribution Graph', icon: Network, isPathTrace: true },
      ]
    },
    {
      title: 'CASE',
      items: [
        { id: 'timeline', label: 'Timeline', icon: Clock },
        { id: 'reports', label: 'Reports & Dossier', icon: FileText },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'sources', label: 'Data Sources', icon: Database },
        { id: 'settings', label: 'Settings', icon: Sliders },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#080d17] border-r border-slate-800 flex flex-col justify-between flex-shrink-0 min-h-screen select-none">
      {/* Brand / Logo Section */}
      <div>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
              DE-ANON ATTRIBUTION
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-1.5 py-0.5 rounded">
            SIH 2026
          </span>
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
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-slate-800 text-white font-semibold shadow-inner border border-slate-700/80'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                      } ${item.isStage2 ? 'border-l-2 border-l-emerald-500/90' : ''} ${item.isPathTrace ? 'border-l-2 border-l-cyan-500/90' : ''}`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isActive 
                            ? 'text-cyan-400' 
                            : item.isStage2 
                              ? 'text-emerald-400/80' 
                              : item.isPathTrace 
                                ? 'text-cyan-400/80'
                                : 'text-slate-500'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ml-1 flex-shrink-0 ${
                          item.isStage2
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : item.id === 'candidates'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                              : 'bg-slate-800/80 text-slate-400 border border-slate-700/50'
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

      {/* Legal Compliance & Operational Boundary Footer */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        <div className="bg-[#0b1220] border border-slate-800 rounded-lg p-2.5 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-wider">OPERATIONAL BOUNDARY</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            All AI correlation signals are probabilistic. Real-world attribution requires sworn investigator verification.
          </p>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
          <span>Warrant #CR-2026-8819</span>
          <span className="text-emerald-400 font-bold">AUTHORIZED</span>
        </div>
      </div>
    </aside>
  );
};
