import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: 'auth-001',
    name: 'Command Officer',
    role: 'authority', // 'authority' | 'citizen'
    department: 'Mumbai Disaster Management Authority',
    isAuthenticated: true,
  });
  const [token, setToken] = useState(localStorage.getItem('georesq_token'));

  const login = useCallback(async (credentials) => {
    // Mock login — replace with real API call
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('georesq_token', mockToken);
    setToken(mockToken);
    setUser({
      id: 'auth-001',
      name: 'Command Officer',
      role: credentials.role || 'authority',
      department: 'Mumbai Disaster Management Authority',
      isAuthenticated: true,
    });
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('georesq_token');
    setToken(null);
    setUser(null);
  }, []);

  const switchRole = useCallback((role) => {
    setUser((prev) => (prev ? { ...prev, role } : null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole }}>
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
