import { AuthUser, LoginRequest, LoginResponse } from './types';

const AUTH_STORAGE_KEY = 'spectra_auth_session';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Simulate network latency for realistic API behavior
    await new Promise((r) => setTimeout(r, 200));

    // Controlled demo credential authentication
    const user: AuthUser = {
      id: 'USR-INV-017',
      username: credentials.username || 'investigator@spectra.gov',
      name: 'Special Agent INV-017',
      badgeNumber: 'CR-8819',
      role: 'Lead Forensic Investigator',
      agency: 'Cyber Threat Intelligence & Attribution Cell (SPECTRA)',
      token: 'jwt-spectra-' + Date.now() + '-secure'
    };

    const response: LoginResponse = {
      user,
      token: user.token!,
      expiresIn: 86400
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response));
    return response;
  },

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 100));
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    try {
      const parsed: LoginResponse = JSON.parse(raw);
      return parsed.user;
    } catch {
      return null;
    }
  }
};
