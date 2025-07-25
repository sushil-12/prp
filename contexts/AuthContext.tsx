import { AuthError, AuthService, AuthUser } from '@/lib/services/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: AuthError | null;
  isAuthenticating: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: (idToken: string) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      console.log('🔥 FIREBASE: Auth state changed:', user ? 'user logged in' : 'user logged out');
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🚀 AUTH: Starting sign in process');
      setError(null);
      setLoading(true);
      setIsAuthenticating(true);
      const result = await AuthService.signIn({ email, password });
      console.log('SignIn result ==========================');
      console.log(result);
      console.log('✅ AUTH: Sign in successful, setting user');
      // Only set user state on successful authentication
      setUser(result.user);
      showToast('success', 'Sign In Successful', result.message);
    } catch (err: any) {
      console.log('❌ AUTH: Sign in failed:', err.code, err.message);
      setError(err);
      showToast('error', 'Sign In Failed', err.message);
      // Don't set user state on error - keep it null
      throw err;
    } finally {
      console.log('🏁 AUTH: Sign in process completed');
      setLoading(false);
      setIsAuthenticating(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      setIsAuthenticating(true);
      const result = await AuthService.signUp({ name, email, password, confirmPassword: password, agreeToTerms: true });
      // Only set user state on successful authentication
      setUser(result.user);
      showToast('success', 'Account Created', result.message);
    } catch (err: any) {
      setError(err);
      showToast('error', 'Sign Up Failed', err.message);
      // Don't set user state on error - keep it null
      throw err;
    } finally {
      setLoading(false);
      setIsAuthenticating(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await AuthService.signOut();
      setUser(null);
      showToast('info', 'Signed Out', result.message);
    } catch (err: any) {
      setError(err);
      showToast('error', 'Sign Out Failed', err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (idToken: string) => {
    try {
      setError(null);
      setLoading(true);
      setIsAuthenticating(true);
      const result = await AuthService.signInWithGoogle(idToken);
      // Only set user state on successful authentication
      setUser(result.user);
      showToast('success', 'Google Sign In Successful', result.message);
    } catch (err: any) {
      setError(err);
      showToast('error', 'Google Sign In Failed', err.message);
      // Don't set user state on error - keep it null
      throw err;
    } finally {
      setLoading(false);
      setIsAuthenticating(false);
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      setError(null);
      const result = await AuthService.sendPasswordResetEmail(email);
      showToast('success', 'Reset Email Sent', result.message);
    } catch (err: any) {
      setError(err);
      showToast('error', 'Reset Email Failed', err.message);
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticating,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    sendPasswordResetEmail,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 