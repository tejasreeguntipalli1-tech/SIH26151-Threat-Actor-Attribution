import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCase } from '../../context/CaseContext';
import { 
  Shield, 
  Search, 
  User, 
  LogOut, 
  ChevronDown, 
  Activity, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  Menu,
  X,
  FileCheck2,
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cases/${activeCase.id}/graph?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="bg-[#0D0F12] border-b border-[#1E232B] px-4 py-2 sticky top-0 z-30 select-none">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Mobile Toggle & Global Case Context Bar */}
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-1.5 rounded-lg bg-[#14181F] border border-[#232833] text-slate-400 hover:text-white"
                title="Toggle Sidebar"
              >
                {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            )}

            {/* Global Case Context Bar (Requirement #18) */}
            <div className="relative">
              <button
                onClick={() => setShowCaseSelector(!showCaseSelector)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14181F] hover:bg-[#1A202A] border border-[#232833] transition-colors text-left"
              >
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <div className="font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">CASE:</span>
                    <span className="text-xs font-bold text-white tracking-wide">{activeCase.id}</span>
                    <span className="text-[10px] bg-orange-500/10 text-orange-400 px-1.5 py-0.2 rounded border border-orange-500/30 font-semibold ml-1">
                      {activeCase.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[200px] sm:max-w-xs font-sans">
                    {activeCase.name}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1 flex-shrink-0" />
              </button>

              {/* Case Quick-Switcher Dropdown */}
              {showCaseSelector && (
                <div className="absolute left-0 top-full mt-1.5 w-80 bg-[#12161E] border border-[#232A36] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in duration-100 font-mono text-xs">
                  <div className="px-2 py-1 text-[10px] text-slate-500 uppercase font-bold border-b border-[#1E232B] mb-1 flex items-center justify-between">
                    <span>Active Investigation Cases</span>
                    <button 
                      onClick={() => { setShowCaseSelector(false); navigate('/cases'); }}
                      className="text-orange-400 hover:underline"
                    >
                      View All
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
                          <div className="font-bold text-[11px] text-orange-400">{c.id}</div>
                          <div className="text-[10px] text-slate-300 font-sans truncate max-w-[180px]">{c.name}</div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#181D26] text-slate-400 font-mono">
                          {c.correlationScore}% Score
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: Global Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative flex-1 max-w-md mx-4">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search case handles, PGP keys, IP nodes, candidate entities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#14181F] border border-[#232833] focus:border-orange-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none transition-colors"
            />
          </form>

          {/* Right: Top-Right User & Profile Area (Requirement #2) */}
          <div className="flex items-center gap-3">
            {/* User Profile Card */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#14181F] hover:bg-[#1A202A] border border-[#232833] transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-mono font-bold text-xs flex-shrink-0">
                  {user?.badgeNumber?.slice(-2) || '17'}
                </div>
                <div className="hidden sm:block text-left font-mono">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5 leading-tight">
                    <span>{user?.name || 'Investigator INV-017'}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Active Clearance" />
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">
                    {user?.role || 'Security Analyst'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
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
                      <span className="text-emerald-400 font-bold">AUTHORIZED</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Warrant:</span>
                      <span className="text-white font-mono">#CR-2026-8819</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Status:</span>
                      <span className="text-emerald-400 font-semibold">● Active Session</span>
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
          </div>
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

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-[#181D26] hover:bg-[#202734] text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider transition-colors shadow-md shadow-red-950/60"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
