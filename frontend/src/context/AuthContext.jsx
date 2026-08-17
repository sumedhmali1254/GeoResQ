import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Mock user profiles
const mockUsers = {
  citizen: {
    id: 'citizen-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    role: 'citizen',
    phone: '+91 98765 43210',
    area: 'Kurla West, Mumbai',
    isAuthenticated: true,
  },
  authority: {
    id: 'auth-001',
    name: 'Cmdr. Priya Mehta',
    email: 'priya.mehta@ndma.gov.in',
    role: 'authority',
    department: 'Mumbai Disaster Management Authority',
    designation: 'Command Officer',
    badgeId: 'MDMA-2847',
    isAuthenticated: true,
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('georesq_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('georesq_token'));

  const login = useCallback(async (credentials) => {
    // Mock login — replace with real API call
    const { email, password, role } = credentials;

    // Simple mock validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const mockToken = 'mock-jwt-token-' + Date.now();
    const userProfile = role === 'citizen' ? {
      ...mockUsers.citizen,
      email,
      name: credentials.name || mockUsers.citizen.name,
    } : {
      ...mockUsers.authority,
      email,
      name: credentials.name || mockUsers.authority.name,
    };

    localStorage.setItem('georesq_token', mockToken);
    localStorage.setItem('georesq_user', JSON.stringify(userProfile));
    setToken(mockToken);
    setUser(userProfile);
    return userProfile;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('georesq_token');
    localStorage.removeItem('georesq_user');
    setToken(null);
    setUser(null);
  }, []);

  const switchRole = useCallback((role) => {
    setUser((prev) => (prev ? { ...prev, role } : null));
  }, []);

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
