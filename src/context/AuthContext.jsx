import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '..api/authService.js';

// Create Auth Context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const result = await authService.validateToken();
        if (result.valid && result.user) {
          setCurrentUser(result.user);
        }
      } catch (err) {
        console.error('Session restore error:', err);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);
  
  // Register new user
  const register = async (name, email, password) => {
    setError(null);
    try {
      const result = await authService.register(name, email, password);

      if (result.success) {
        setCurrentUser(result.user);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (email, password) => {
    setError(null);
    try {
      const result = await authService.login(email, password);

      if (result.success) {
        setCurrentUser(result.user);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setError(null);
  };

  // Update user profile
  const updateUser = async (updates) => {
    setError(null);
    try {
      const result = await authService.updateUser(currentUser.id, updates);

      if (result.success) {
        setCurrentUser(result.user);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Failed to update profile. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    clearError,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;