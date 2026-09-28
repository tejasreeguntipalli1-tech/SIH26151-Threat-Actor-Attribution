import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound, 
  Info,
  X,
  FileCheck2
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('investigator@argus.gov');
  const [password, setPassword] = useState('Argus2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter an authorized investigator email or username.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your security clearance password.');
      return;
    }

    setIsLoading(true);
    const res = await login(email, password, rememberMe);
    setIsLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleQuickDemo = () => {
    setEmail('investigator@argus.gov');
    setPassword('Argus2026!');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] flex flex-col justify-between selection:bg-orange-500/20 selection:text-orange-300 font-sans text-slate-100">
      {/* Top Classification Header Strip */}
      <div className="bg-[#0D1016] border-b border-[#1E232B] px-4 py-1.5 text-center text-[11px] font-mono tracking-widest text-slate-400 uppercase flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span>RESTRICTED ACCESS // LAW ENFORCEMENT & CYBER DEFENSE CLEARANCE ONLY</span>
        <span className="text-slate-600">|</span>
        <span className="text-orange-400 font-semibold">SIH26151</span>
      </div>

      {/* Main Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#12161E] border border-[#232A36] rounded-2xl shadow-2xl p-8 space-y-6 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Platform Branding */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 shadow-lg shadow-orange-950/40 mb-2">
              <Shield className="w-7 h-7" />
            </div>
            
            <div className="inline-block px-2.5 py-0.5 rounded bg-[#181D26] border border-[#262F3E] text-[10px] font-mono text-orange-400 font-semibold tracking-wider uppercase mb-1">
              Argus Attribution Platform
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight">
              Threat Actor De-Anonymization
            </h1>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Multi-signal digital identity correlation and explainable real-world entity resolution workstation.
            </p>
          </div>

          {/* Error Message Banner */}
          {errorMessage && (
            <div className="bg-red-950/60 border border-red-800 text-red-300 p-3 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block text-[11px] uppercase tracking-wider">Access Denied</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Username Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-slate-400 tracking-wider flex items-center justify-between">
                <span>Investigator Email / Handle</span>
                <span className="text-slate-500 text-[10px]">ID: INV-017</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investigator@argus.gov"
                  className="w-full bg-[#0A0D14] border border-[#232A36] focus:border-orange-500 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-600 font-mono focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-slate-400 tracking-wider flex items-center justify-between">
                <span>Security Clearance Passphrase</span>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-orange-400 hover:text-orange-300 text-[10px] lowercase transition-colors"
                >
                  forgot passphrase?
                </button>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0A0D14] border border-[#232A36] focus:border-orange-500 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-600 font-mono focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-[#0A0D14] border-[#232A36] text-orange-600 focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-slate-400 font-mono">Persist Session Token</span>
              </label>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-900/60">
                Warrant #CR-2026-8819
              </span>
            </div>

            {/* Sign In Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-orange-950/60 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Clearance...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Fill Demo Credentials Box */}
          <div className="bg-[#0A0D14] border border-[#1E232B] rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-slate-400">
                <KeyRound className="w-3.5 h-3.5 text-orange-400" />
                <span className="font-semibold uppercase">SIH Evaluator Demo Login:</span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-[10px] text-orange-400 hover:text-orange-300 font-bold underline"
              >
                Auto Fill
              </button>
            </div>
            <div className="text-[11px] font-mono text-slate-400 bg-[#12161E] p-2 rounded border border-[#202632] space-y-0.5">
              <div>User: <code className="text-slate-200">investigator@argus.gov</code></div>
              <div>Pass: <code className="text-slate-200">Argus2026!</code></div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal Placeholder */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#12161E] border border-[#232A36] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E232B]">
              <div className="flex items-center gap-2 text-white font-bold font-mono text-sm">
                <Lock className="w-4 h-4 text-orange-400" />
                <span>Security Clearance Recovery</span>
              </div>
              <button 
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#181D26]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Investigative cryptographic keys and session passphrases are managed under federal warrant protocol. To reset credentials, contact your designated Cyber Attribution Cell Administrator with Sworn Badge ID <code>#IN-7492</code>.
            </p>

            <div className="bg-[#0A0D14] p-3 rounded-lg border border-[#1E232B] text-[11px] font-mono text-slate-400">
              Admin Gateway: <span className="text-orange-400">secops@attribution.internal</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-semibold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legal & Statutory Footer */}
      <footer className="bg-[#0A0D12] border-t border-[#1E232B] px-6 py-3 text-center text-[10px] font-mono text-slate-500">
        ARGUS DE-ANONYMIZATION PLATFORM &bull; STATUTORY STANDARD: CORRELATION &ne; IDENTIFICATION &bull; ATTRIBUTION LEAD &ne; CONFIRMED IDENTITY
      </footer>
    </div>
  );
};
