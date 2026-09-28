import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  badgeNumber: string;
  agency: string;
  warrantAuthorization: string;
  lastLogin: string;
  sessionActive: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-inv-017',
  name: 'Senior Investigator INV-017',
  email: 'investigator@spectra.gov',
  role: 'Cyber Attribution Analyst',
  badgeNumber: 'SP-7492',
  agency: 'SPECTRA Threat Actor Attribution Unit (SIH26151)',
  warrantAuthorization: 'Warrant #CR-2026-8819',
  lastLogin: '2026-09-28 10:14 UTC',
  sessionActive: true
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check existing stored session
    try {
      const stored = localStorage.getItem('spectra_auth_session') || sessionStorage.getItem('spectra_auth_session');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error reading auth session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string, rememberMe = false): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate cryptographic challenge verification delay
    await new Promise(res => setTimeout(res, 600));

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Valid demo credentials
    const validEmails = ['investigator@spectra.gov', 'investigator', 'admin', 'analyst@spectra.gov', 'sih2026@spectra.gov'];
    const validPasses = ['spectra2026!', 'spectra2026', 'password123', 'sih2026'];

    if ((validEmails.includes(cleanEmail) && validPasses.includes(cleanPass)) || (cleanEmail && cleanPass.length >= 6)) {
      const sessionUser: UserProfile = {
        ...DEFAULT_USER,
        email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@spectra.gov`,
        lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      };

      setUser(sessionUser);

      if (rememberMe) {
        localStorage.setItem('spectra_auth_session', JSON.stringify(sessionUser));
      } else {
        sessionStorage.setItem('spectra_auth_session', JSON.stringify(sessionUser));
      }

      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { 
      success: false, 
      error: 'Invalid investigative credentials. Check username and security clearance passphrase.' 
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spectra_auth_session');
    sessionStorage.removeItem('spectra_auth_session');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
