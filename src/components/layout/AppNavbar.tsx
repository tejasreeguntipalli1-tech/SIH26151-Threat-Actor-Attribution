import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCase } from '../../context/CaseContext';
import { 
  User, 
  LogOut, 
  ChevronDown, 
  Menu,
  X,
  Shield,
  FolderOpen
} from 'lucide-react';

interface AppNavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { activeCase, cases, selectCase } = useCase();
  const navigate = useNavigate();
  const location = useLocation();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showCaseSelector, setShowCaseSelector] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.includes('/graph') || path.includes('/attribution-graph')) {
      return { workspace: 'Case Workspace', section: 'Relationship Graph' };
    }
    if (path.includes('/identities')) {
      return { workspace: 'Case Workspace', section: 'Digital Identities' };
    }
    if (path.includes('/correlation')) {
      return { workspace: 'Case Workspace', section: 'Actor Correlation' };
    }
    if (path.includes('/clusters')) {
      return { workspace: 'Case Workspace', section: 'Actor Clusters' };
    }
    if (path.includes('/evidence')) {
      return { workspace: 'Case Workspace', section: 'Evidence Analysis' };
    }
    if (path.includes('/attribution') || path.includes('/candidates')) {
      return { workspace: 'Case Workspace', section: 'Attribution Workspace' };
    }
    if (path.includes('/timeline')) {
      return { workspace: 'Case Workspace', section: 'Timeline' };
    }
    if (path.includes('/report')) {
      return { workspace: 'Case Workspace', section: 'Investigation Report' };
    }
    if (path.startsWith('/cases/') && path.split('/').length === 3) {
      return { workspace: 'Case Workspace', section: 'Overview' };
    }
    if (path === '/cases') {
      return { workspace: 'Case Management', section: 'Cases Directory' };
    }
    if (path === '/dashboard') {
      return { workspace: 'Command Center', section: 'Dashboard' };
    }
    if (path === '/sources') {
      return { workspace: 'System Telemetry', section: 'Threat Intel Feeds' };
    }
    if (path === '/settings') {
      return { workspace: 'System', section: 'Engine Settings' };
    }
    return { workspace: 'Case Workspace', section: 'Overview' };
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <>
      <header className="h-14 bg-[#0D0F12] border-b border-[#1E232B] px-4 sm:px-6 flex items-center justify-between flex-shrink-0 select-none sticky top-0 z-30">
        {/* Left: Current Section / Breadcrumbs (Prompt Specified) */}
        <div className="flex items-center gap-2.5 font-mono text-xs overflow-hidden">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-lg bg-[#14181F] border border-[#232833] text-slate-400 hover:text-white mr-1"
              title="Toggle Sidebar"
            >
              {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          )}

          <div className="flex items-center gap-1.5 font-bold text-white tracking-wider flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(234,88,12,0.8)]" />
            <span className="text-orange-400">SPECTRA</span>
          </div>

          <span className="text-slate-600 font-sans">›</span>

          <span className="text-slate-400 hidden sm:inline whitespace-nowrap">
            {breadcrumbs.workspace}
          </span>

          <span className="text-slate-600 font-sans hidden sm:inline">›</span>

          <span className="text-white font-semibold truncate tracking-wide">
            {breadcrumbs.section}
          </span>
        </div>

        {/* Right: Case ID, Investigator, Profile, Logout (Prompt Specified) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 font-mono text-xs">
          {/* Case ID Badge with dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCaseSelector(!showCaseSelector)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#14181F] hover:bg-[#1A202A] border border-[#232833] transition-colors text-left"
              title="Current Active Case"
            >
              <span className="text-[10px] text-slate-500 uppercase font-bold">CASE:</span>
              <span className="font-bold text-white tracking-wide text-xs">{activeCase.id}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {/* Case Quick-Switcher Dropdown */}
            {showCaseSelector && (
              <div className="absolute right-0 sm:left-auto top-full mt-1.5 w-72 bg-[#12161E] border border-[#232A36] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in duration-100 font-mono text-xs">
                <div className="px-2 py-1 text-[10px] text-slate-500 uppercase font-bold border-b border-[#1E232B] mb-1 flex items-center justify-between">
                  <span>Investigation Cases</span>
                  <button 
                    onClick={() => { setShowCaseSelector(false); navigate('/cases'); }}
                    className="text-orange-400 hover:underline"
                  >
                    All Cases
                  </button>
                </div>
                <div className="space-y-1">
                  {cases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        selectCase(c.id);
                        setShowCaseSelector(false);
                        navigate(`/cases/${c.id}`);
                      }}
                      className={`w-full text-left p-2 rounded-lg transition-colors flex items-start justify-between ${
                        c.id === activeCase.id 
                          ? 'bg-orange-500/15 border border-orange-500/40 text-white' 
                          : 'hover:bg-[#181D26] text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs">{c.id}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[180px] font-sans">{c.name}</div>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase bg-[#181D26] text-slate-400 border border-[#242C38]">
                        {c.status === 'ACTIVE INVESTIGATION' ? 'Active' : 'Review'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Investigator Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#14181F] border border-[#232833] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Active Clearance" />
            <span className="text-[10px] text-slate-500">INV:</span>
            <span className="font-bold text-white text-xs">{user?.name?.split(' ')[2] || 'INV-017'}</span>
          </div>

          {/* Profile Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#14181F] hover:bg-[#1A202A] border border-[#232833] text-slate-300 hover:text-white transition-colors"
              title="Investigator Profile"
            >
              <User className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline text-xs">Profile</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {/* Profile Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-[#12161E] border border-[#232A36] rounded-xl shadow-2xl p-3 z-50 animate-in fade-in duration-100 font-mono text-xs">
                <div className="pb-2.5 border-b border-[#1E232B] mb-2 space-y-1">
                  <div className="font-bold text-white text-xs">{user?.name}</div>
                  <div className="text-[10px] text-slate-400 font-sans">{user?.email}</div>
                  <div className="text-[10px] text-orange-400 font-semibold">{user?.role}</div>
                </div>

                <div className="space-y-1 text-[11px] text-slate-300 py-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Clearance:</span>
                    <span className="text-emerald-400 font-bold">LEVEL 4 // TOP SECRET</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Warrant:</span>
                    <span className="text-white font-mono">{activeCase.warrantNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Session:</span>
                    <span className="text-emerald-400 font-semibold">● Active Clearance</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1E232B] mt-2">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-900/60 text-red-300 transition-colors text-xs font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                      <span>Logout Session</span>
                    </div>
                    <span className="text-[10px] font-mono text-red-400 uppercase">Exit</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Direct Logout Button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 text-red-300 hover:text-red-200 transition-colors"
            title="Sign out of SPECTRA"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline text-xs font-semibold">Logout</span>
          </button>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#12161E] border border-[#232A36] rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl font-mono text-xs">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <LogOut className="w-4 h-4 text-orange-400" />
              <span>Confirm Investigator Logout</span>
            </div>

            <p className="text-slate-300 font-sans leading-relaxed text-xs">
              Are you sure you want to end your active investigative session? Your case state and audit trail will remain securely preserved on disk.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1E232B]">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3.5 py-1.5 rounded-lg bg-[#181D26] hover:bg-[#202733] text-slate-300 border border-[#2A3342] text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-lg shadow-red-950/50"
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppNavbar;
