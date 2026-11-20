import { useCallback, useMemo, useState } from 'react';
import { currentUser } from '../data/mockData';
import { AuthContext } from './contexts';

function readSavedUser() {
  try {
    const savedUser = localStorage.getItem('authUser');
    const user = savedUser ? JSON.parse(savedUser) : null;
    return user && typeof user.name === 'string' ? user : null;
  } catch {
    localStorage.removeItem('authUser');
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('authUser');
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;
      return parsedUser && typeof parsedUser.name === 'string' ? parsedUser : null;
    } catch {
      localStorage.removeItem('authUser');
      return null;
    }
  });

  const login = useCallback((profile = currentUser) => {
    localStorage.setItem('authUser', JSON.stringify(profile));
    setUser(profile);
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem('authUser');
    setUser(null);
  }, []);
  const contextValue = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
